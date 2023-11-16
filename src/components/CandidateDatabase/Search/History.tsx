import { InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

import { CandidateDatabaseSearch, CandidateHistoryCard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { SearchHistoryType } from '@/src/types/data.types';
import { getTimeDifference } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useCandidateSearchCtx } from '../context/CandidateSearchProvider';
import { candidateSearchByQuery } from '../utils';
import UITextField from '../../Common/UITextField';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

function CandidateSearchHistory({ handleSetPopup }) {
  const { recruiter } = useAuthDetails();
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<SearchHistoryType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { jobsData } = useJobs();

  const { updatenewSearchRes, candidateSearchState } = useCandidateSearchCtx();
  useEffect(() => {
    getHistory();
  }, [recruiter]);

  // const createCandidateEmbedding = async (candidate: JobApplcationDB) => {
  //   const { data: emb } = await axios.post('/api/ai/create-embeddings', {
  //     text: candidate.resume_text,
  //   });
  //   const embedding = emb.data[0].embedding;
  //   supabaseWrap(
  //     await supabase
  //       .from('job_applications')
  //       .update({
  //         resume_embedding: embedding,
  //       })
  //       .eq('application_id', candidate.application_id),
  //   );
  // };

  // const createEmbeddings = async (jobId: string) => {
  //   try {
  //     const candidates = supabaseWrap(
  //       await supabase
  //         .from('job_applications')
  //         .select()
  //         .eq('job_id', jobId)
  //         .not('resume_text', 'is', null),
  //     ) as JobApplcationDB[];

  //     for (let cand of candidates) {
  //       await createCandidateEmbedding(cand);
  //     }
  //   } catch (err) {
  //     toast.error(API_FAIL_MSG);
  //   }
  // };

  const handleSearchQuery = async () => {
    try {
      if (!searchQuery) return;
      setIsSearching(true);
      const newSearchState = await candidateSearchByQuery(
        searchQuery,
        jobsData.jobs.map((j) => j.id),
        recruiter.id,
        candidateSearchState.maxProfiles,
      );

      updatenewSearchRes(newSearchState);
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsSearching(false);
    }
  };

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
                    handleSearchQuery();
                  }
                },
                endAdornment: isSearching && (
                  <InputAdornment position='end'>
                    <CircularProgress
                      color='inherit'
                      size={'15px'}
                      sx={{ color: palette.grey[400] }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </>
        }
        onClickClearHistory={{
          onClick: () => {
            deleteAllHistory();
          },
        }}
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
                      onClick: () => {
                        handleDeleteHistory(hist.id);
                      },
                    }}
                    textHeader={hist.search_query}
                    textPosted={diffrence}
                  />
                );
              })}
          </>
        }
        onClickSearchJobDescription={{
          onClick: () => {
            handleSetPopup(true);
          },
        }}
      />
    </>
  );
}

export default CandidateSearchHistory;
