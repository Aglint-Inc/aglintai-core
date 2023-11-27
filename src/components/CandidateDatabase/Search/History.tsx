import { CircularProgress, Paper, Stack } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import {
  CandidateDatabaseSearch,
  CandidateHistoryCard,
  ClearHistory,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { SearchHistoryType } from '@/src/types/data.types';
import { getTimeDifference } from '@/src/utils/jsonResume';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { similarJobs } from '@/src/utils/prompts/candidateDb/similarJobs';
import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { CandidateSearchState } from '../context/CandidateSearchProvider';
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
      const candidates = supabaseWrap(
        await supabase
          .from('candidates')
          .select()
          .eq('recruiter_id', recruiter.id),
      );

      setCandidatesCount(candidates.length);
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

      const seedJobsSkills = [];

      if (queryJson.jobTitles.length > 0) {
        seedJobsSkills.push(
          (async () => await similarJobs(queryJson.jobTitles))(),
        );
      }
      if (queryJson.skills.length > 0) {
        seedJobsSkills.push(
          (async () => await similarSkills(queryJson.skills))(),
        );
      }
      const r = await Promise.allSettled(seedJobsSkills);
      if (r.length > 0 && r[0].status === 'fulfilled' && r[0].value) {
        queryJson.jobTitles = [
          ...queryJson.jobTitles,
          ...r[0].value.related_jobs,
        ];
      }

      if (
        r.length > 0 &&
        queryJson.skills.length > 0 &&
        r[1].status === 'fulfilled' &&
        r[1].value
      ) {
        queryJson.skills = [...queryJson.skills, ...r[1].value.related_skills];
      }
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
          })
          .select(),
      );
      router.push(`/candidates/search?searchQryId=${history.id}`);
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
        textCandidateCount={candidatesCount}
        slotInputSearch={
          <>
            <UITextField
              value={searchQuery}
              placeholder='Type your requirement here and press enter'
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
                    textHeader={queryJsonToTitle(hist.query_json as any)}
                    textPosted={diffrence}
                    onClickCard={{
                      onClick: () => {
                        router.push(
                          `/candidates/search?searchQryId=${hist.id}`,
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
            //
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
