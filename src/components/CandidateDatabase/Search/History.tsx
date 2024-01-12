import { CircularProgress, Paper, Stack } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import {
  CandidateDatabaseSearch,
  CandidateHistoryCard,
  ClearHistory,
  NavSublink,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { SearchHistoryType } from '@/src/types/data.types';
import { getTimeDifference } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { CandidateSearchState } from '../context/CandidateSearchProvider';
import { getFilteredCands } from '../Database/utils';
import { JDSearchModal } from '../JDSearchModal';
import { getRelevantCndidates } from '../utils';
import Loader from '../../Common/Loader';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

function CandidateSearchHistory() {
  const { recruiter } = useAuthDetails();
  const [history, setHistory] = useState<SearchHistoryType[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQrySearching, setIsQrySearching] = useState(false);
  const [candidatesCount, setCandidatesCount] = useState(0);
  const [deleteHistoryId, setDeleteHistoryId] = useState(-1);
  const { jobsData } = useJobs();
  const router = useRouter();
  const [isJdPopUpOpen, setIsJdPopUPopOpen] = useState(false);
  useEffect(() => {
    getHistory();
  }, [recruiter]);

  const getHistory = async () => {
    try {
      setIsHistoryLoading(true);
      const history = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .select()
          .eq('recruiter_id', recruiter.id),
      ) as SearchHistoryType[];
      const { total_results } = await getFilteredCands({
        recruiter_id: recruiter.id,
        currPage: 1,
        location_filter: '',
        name_filter: '',
        job_role: '',
        sort_param: 'first_name',
        is_sort_desc: false,
      });

      setCandidatesCount(total_results);

      setHistory(history);
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleDeleteHistory = async () => {
    try {
      setHistory((p) => p.filter((p) => p.id !== deleteHistoryId));
      supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .delete()
          .eq('id', deleteHistoryId),
      ) as SearchHistoryType[];
    } catch (err) {
      setHistory((p) => p.filter((p) => p.id !== deleteHistoryId));
      toast.error(API_FAIL_MSG);
    } finally {
      setDeleteHistoryId(-1);
    }
  };

  const getMatchingCandsFromQry = async () => {
    try {
      if (searchQuery.length === 0 || isQrySearching) return;
      setIsQrySearching(true);
      const queryJson = await searchJdToJson(searchQuery);

      const cndates = (await getRelevantCndidates(
        queryJson,
        jobsData.jobs.map((j) => j.id),
        25,
      )) as any;
      const [history] = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .insert({
            recruiter_id: recruiter.id,
            is_search_jd: false,
            query_json: queryJson,
            search_results: cndates,
            search_query: searchQuery,
          })
          .select(),
      );
      router.push(
        `/candidates/search?searchQryId=${history.id}&search_title=${searchQuery}`,
      );
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
    } finally {
      setIsQrySearching(false);
    }
  };

  return (
    <>
      <CandidateDatabaseSearch
        isSearchInAglintVisible={false}
        isSearchInAllVisible={true}
        textCandidateCount={candidatesCount}
        slotNavSublink={
          <>
            <NavSublink
              textLink='Aglint DB'
              isActive={router.pathname === pageRoutes.MYCANDIDATES}
              onClickNav={{
                onClick: () => {
                  router.push(pageRoutes.MYCANDIDATES);
                },
              }}
            />
            <NavSublink
              textLink='My Candidates'
              isActive={router.pathname === pageRoutes.AGLINTCANDIDATES}
              onClickNav={{
                onClick: () => {
                  router.push(pageRoutes.AGLINTCANDIDATES);
                },
              }}
            />
            {/* <NavSublink
              textLink='All Bookmarks'
              isActive={true}
              onClickNav={{ onClick: () => {} }}
            /> */}
          </>
        }
        // onClickClearHistory={}
        slotInputSearch={
          <>
            <UITextField
              value={searchQuery}
              placeholder='Ex: Software engineer with 2 years of experience'
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              InputProps={{
                onKeyDown: (e) => {
                  if (e.code === 'Enter') {
                    getMatchingCandsFromQry();
                  }
                },
              }}
            />
          </>
        }
        slotCandidateHistoryCard={
          <>
            {history
              .sort((h1, h2) => {
                const d1 = new Date(h1.created_at);
                const d2 = new Date(h2.created_at);
                return d2.getTime() - d1.getTime();
              })
              .map((hist, index) => {
                let diffrence = getTimeDifference(
                  hist.created_at,
                  new Date().toISOString(),
                );
                return (
                  <CandidateHistoryCard
                    key={index}
                    isSearchByJobVisible={hist.is_search_jd}
                    isSearchByTypeVisible={false}
                    onClickDelete={{
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDeleteHistoryId(hist.id);
                      },
                    }}
                    textHeader={
                      hist.search_query ??
                      queryJsonToTitle(hist.query_json as any)
                    }
                    textPosted={diffrence}
                    onClickCard={{
                      onClick: () => {
                        router.push(
                          `/candidates/search?searchQryId=${hist.id}&search_title=${hist.search_query}`,
                        );
                      },
                    }}
                  />
                );
              })}
            {isHistoryLoading && (
              <>
                <Stack>
                  <Loader />
                </Stack>
              </>
            )}
          </>
        }
        onClickSearchJobDescription={{
          onClick: () => {
            setIsJdPopUPopOpen(true);
          },
        }}
        onClickSearch={{
          onClick: () => {
            getMatchingCandsFromQry();
          },
        }}
        isClearHistoryVisible={history.length > 0}
        slotLottieSearch={
          isQrySearching && (
            <>
              <CircularProgress
                color='inherit'
                size={'15px'}
                sx={{ color: palette.grey[400] }}
              />
            </>
          )
        }
        onClickDbRequest={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                'Aglint : Request Aglint Candidate Database',
              )}&body=${encodeURIComponent(
                ` 
Hello,

I would like for Aglint Candidate Database.

Thank you,
[Your Name]
`,
              )}`,
            );
          },
        }}
        onClickAllCandidate={{
          onClick: () => {
            router.push('/candidates?page_no=1');
          },
        }}
      />
      <MuiPopup
        props={{
          open: isJdPopUpOpen,
          onClose: () => {
            setIsJdPopUPopOpen(false);
          },
        }}
      >
        <Paper>
          <JDSearchModal setJdPopup={setIsJdPopUPopOpen} />
        </Paper>
      </MuiPopup>
      <MuiPopup
        props={{
          open: Boolean(deleteHistoryId !== -1),
          onClose: () => {
            setDeleteHistoryId(-1);
          },
        }}
      >
        <Paper>
          <ClearHistory
            onClickCancel={{
              onClick: () => {
                setDeleteHistoryId(-1);
              },
            }}
            onClickClearHistory={{
              onClick: () => {
                handleDeleteHistory();
              },
            }}
          />
        </Paper>
      </MuiPopup>
    </>
  );
}

export default CandidateSearchHistory;

const queryJsonToTitle = (queryJson: CandidateSearchState['queryJson']) => {
  return queryJson.jobTitles.join(', ');
};
