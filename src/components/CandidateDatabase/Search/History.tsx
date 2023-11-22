import { CircularProgress, Paper } from '@mui/material';
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
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { CandidateSearchState } from '../context/CandidateSearchProvider';
import { JDSearchModal } from '../JDSearchModal';
import { getRelevantCndidates } from '../utils';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

function CandidateSearchHistory() {
  const { recruiter } = useAuthDetails();
  const [history, setHistory] = useState<SearchHistoryType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQrySearching, setIsQrySearching] = useState(false);
  const [showDeletepopUp, setShowDeletePopup] = useState(false);
  const { jobsData } = useJobs();
  const router = useRouter();
  const [isJdPopUpOpen, setIsJdPopUPopOpen] = useState(false);
  useEffect(() => {
    getHistory();
  }, [recruiter]);

  const getHistory = async () => {
    try {
      const history = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .select()
          .eq('recruiter_id', recruiter.id),
      ) as SearchHistoryType[];
      setHistory(history);
    } catch (err) {
      toast.error(API_FAIL_MSG);
    }
  };

  const handleDeleteHistory = async (historyId) => {
    try {
      setHistory((p) => p.filter((p) => p.id !== historyId));
      supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .delete()
          .eq('id', historyId),
      ) as SearchHistoryType[];
    } catch (err) {
      setHistory((p) => p.filter((p) => p.id !== historyId));
      toast.error(API_FAIL_MSG);
    }
  };

  const deleteAllHistory = async () => {
    try {
      supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .delete()
          .eq('recruiter_id', recruiter.id),
      );
      setHistory([]);
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setShowDeletePopup(false);
    }
  };

  const getMatchingCandsFromQry = async () => {
    try {
      if (isQrySearching) return;
      setIsQrySearching(true);
      const p = await searchJdToJson(searchQuery);

      const cndates = (await getRelevantCndidates(
        p,
        jobsData.jobs.map((j) => j.id),
        25,
      )) as any;
      const [history] = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .insert({
            recruiter_id: recruiter.id,
            is_search_jd: false,
            query_json: p,
            search_results: cndates,
          })
          .select(),
      );
      router.push(`/candidates/search?searchQryId=${history.id}`);
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
      //
    } finally {
      setIsQrySearching(false);
    }
  };

  return (
    <>
      <CandidateDatabaseSearch
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
                        handleDeleteHistory(hist.id);
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
          </>
        }
        onClickClearHistory={{
          onClick: () => {
            history.length > 0 && setShowDeletePopup(true);
          },
        }}
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
          open: showDeletepopUp,
          onClose: () => {
            setShowDeletePopup(false);
          },
        }}
      >
        <Paper>
          <ClearHistory
            onClickCancel={{
              onClick: () => {
                setShowDeletePopup(false);
              },
            }}
            onClickClearHistory={{
              onClick: deleteAllHistory,
            }}
          />
        </Paper>
      </MuiPopup>
    </>
  );
}

export default CandidateSearchHistory;

const queryJsonToTitle = (queryJson: CandidateSearchState['queryJson']) => {
  return queryJson.jobTitles.join(', ') + queryJson.skills.join(', ');
};
