import { Paper } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import { CandidateDatabaseSearch, CandidateHistoryCard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { SearchHistoryType } from '@/src/types/data.types';
import { getTimeDifference } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { JDSearchModal } from '../JDSearchModal';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

function CandidateSearchHistory() {
  const { recruiter } = useAuthDetails();
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<SearchHistoryType[]>([]);
  const router = useRouter();
  const [isJdPopUpOpen, setIsJdPopUPopOpen] = useState(false);
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
                    router.push(`/candidates/search?query=${searchQuery}`);
                  }
                },
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
                      onClick: () => handleDeleteHistory(hist.id),
                    }}
                    textHeader={hist.search_query}
                    textPosted={diffrence}
                    onClickCard={{
                      onClick: () => {
                        if (hist.is_search_jd) {
                          localStorage.setItem(`jd`, hist.search_query);
                          router.push(`/candidates/search?isJDSearch=${true}`);
                        } else {
                          router.push(
                            `/candidates/search?query=${hist.search_query}`,
                          );
                        }
                      },
                    }}
                  />
                );
              })}
          </>
        }
        onClickSearchJobDescription={{
          onClick: () => {
            setIsJdPopUPopOpen(true);
          },
        }}
        onClickSearch={{
          onClick: () => {
            router.push(`/candidates/search?query=${searchQuery}`);
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
          <JDSearchModal
            setJdPopup={setIsJdPopUPopOpen}
            onClickSubmit={(str) => {
              localStorage.setItem(`jd`, str);
              router.push(`/candidates/search?isJDSearch=${true}`);
            }}
          />
        </Paper>
      </MuiPopup>
    </>
  );
}

export default CandidateSearchHistory;
