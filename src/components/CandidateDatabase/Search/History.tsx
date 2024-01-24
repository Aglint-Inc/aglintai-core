import { CircularProgress, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';

import {
  CandidateDatabaseSearch,
  CandidateHistoryCard,
  CdSearchHistoryLoader,
  ClearHistory,
  NavSublink,
  SavedList,
  SavedListLoader,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { CandidateListTypeDB, SearchHistoryType } from '@/src/types/data.types';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import { getTimeDifference } from '@/src/utils/jsonResume';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import EmptyState from './EmptyState';
import { Candidate } from '../AppoloSearch/types';
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
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQrySearching, setIsQrySearching] = useState(false);
  const [deleteHistoryId, setDeleteHistoryId] = useState(-1);
  const [list, setList] = useState<CandidateListTypeDB[]>([]);
  const [editText, setEditText] = useState('');
  const [text, setText] = useState('');
  const [editList, setEditList] = useState<CandidateListTypeDB>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [deleteList, setDeleteList] = useState(null);
  const { jobsData } = useJobs();
  const router = useRouter();
  const [isJdPopUpOpen, setIsJdPopUPopOpen] = useState(false);

  useEffect(() => {
    if (router.isReady && !router.query.currentTab) {
      router.push('/candidates/history?currentTab=aglint+candidates');
    }
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
      await fetchList();
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

  //Seaarch with API
  const getCandsFromApi = async () => {
    try {
      if (searchQuery.length === 0 || isQrySearching) return;
      setIsQrySearching(true);
      const res = await axios.post('/api/candidatedb/query', {
        query: searchQuery,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      let aiSearchQuery = JSON.parse(res.data);

      const resCand = await axios.post('/api/candidatedb/search', {
        page: 1,
        per_page: 25,
        person_titles: aiSearchQuery.person_titles,
        person_locations: aiSearchQuery.person_locations,
        organization_ids: [],
        person_seniorities: aiSearchQuery.person_seniorities,
      });

      if (resCand.data.error) {
        toast.error(resCand.data.error);
        return;
      }

      let fetchedCandidates: Candidate[] = resCand.data.people;
      const fetchedIds = fetchedCandidates.map((c) => c.id);

      const [history] = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .insert({
            recruiter_id: recruiter.id,
            query_json: {
              person_titles: aiSearchQuery.person_titles,
              person_locations: aiSearchQuery.person_locations,
              organization_ids: [],
              person_seniorities: aiSearchQuery.person_seniorities,
              companies: aiSearchQuery.companies,
              pagination: resCand.data.pagination,
            },
            search_query: searchQuery,
            db_search: 'aglint',
            candidates: fetchedIds,
            used_credits: {
              export_credits: 1,
              phone_credits: 0,
              email_credits: 0,
            },
          })
          .select(),
      );
      router.push(`/candidates/aglintdb?id=${history.id}`);
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
    } finally {
      setIsQrySearching(false);
    }
    //
  };

  const fetchList = async (): Promise<boolean> => {
    const { data, error } = await supabase
      .from('candidate_list')
      .select('*')
      .eq('recruiter_id', recruiter.id);
    if (!error) {
      setList(data);
    }
    return true;
  };

  const submitHandler = async () => {
    const { data, error } = await supabase
      .from('candidate_list')
      .insert({ name: text, recruiter_id: recruiter.id })
      .select();
    if (!error) {
      setList([...list, data[0]]);
      setText('');
      setIsInputVisible(false);
    } else {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const updateHandler = async () => {
    const { data, error } = await supabase
      .from('candidate_list')
      .update({ name: editText })
      .eq('id', editList.id)
      .select();
    if (!error) {
      setList(
        list.map((list) => {
          if (list.id === editList.id) {
            return data[0];
          }
          return list;
        }),
      );
      setEditText('');
      setEditList(null);
    } else {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const handleDeleteList = async () => {
    try {
      supabaseWrap(
        await supabase.from('candidate_list').delete().eq('id', deleteList.id),
      ) as CandidateListTypeDB[];
      setList((p) => p.filter((p) => p.id !== deleteList.id));
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setDeleteList(null);
    }
  };

  let currentTab: 'aglint candidates' | 'my Candidates' | 'book mark' = router
    .query.currentTab as any;

  const multiTextFieldRef = useRef(null);

  return (
    <>
      <CandidateDatabaseSearch
        isViewAllCandidateVisible={true}
        isSearchByJdVisible={currentTab === 'my Candidates'}
        isSearchInAglintVisible={currentTab === 'aglint candidates'}
        isSearchInAllVisible={currentTab === 'my Candidates'}
        isSavedListVisible={currentTab === 'aglint candidates'}
        isInputVisible={isInputVisible}
        slotNavSublink={
          <>
            <NavSublink
              textLink='Aglint DB'
              isActive={currentTab === 'aglint candidates'}
              onClickNav={{
                onClick: () => {
                  router.query.currentTab = 'aglint candidates';
                  router.push(router);
                },
              }}
            />
            <NavSublink
              textLink='My Candidates'
              isActive={currentTab === 'my Candidates'}
              onClickNav={{
                onClick: () => {
                  router.query.currentTab = 'my Candidates';
                  router.push(router);
                },
              }}
            />
          </>
        }
        slotInputSearch={
          <Stack pl={0.5}>
            <UITextField
              value={searchQuery}
              placeholder={
                currentTab === 'my Candidates'
                  ? 'Ex: Software engineer with 2 years of experience'
                  : 'Software Engineer in San Francisco'
              }
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              InputProps={{
                onKeyDown: (e) => {
                  if (e.code === 'Enter') {
                    if (currentTab === 'my Candidates') {
                      getMatchingCandsFromQry();
                    } else {
                      getCandsFromApi();
                    }
                  }
                },
              }}
            />
          </Stack>
        }
        isSavedListEmpty={!isHistoryLoading && list.length === 0}
        slotInput={
          <UITextField
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        }
        onClickSubmit={{
          onClick: () => {
            submitHandler();
          },
        }}
        onClickCreateNewList={{
          onClick: () => {
            setIsInputVisible(true);
          },
        }}
        onClickClose={{
          onClick: () => {
            setText('');
            setIsInputVisible(false);
          },
        }}
        slotSavedList={
          isHistoryLoading ? (
            <>
              <SavedListLoader /> <SavedListLoader /> <SavedListLoader />
            </>
          ) : (
            list.map((list, index) => (
              <ScrollList uniqueKey={index} key={index}>
                <SavedList
                  isCheckboxVisible={false}
                  slotInputTextSavedList={
                    <Stack
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <UITextField
                        ref={multiTextFieldRef}
                        // rest={{
                        //   sx: { border: 'none', '& fieldset': { border: 'none' } },
                        //   inputProps: { style: { fontSize: '14px' } },
                        // }}
                        value={editText}
                        onChange={(e) => {
                          setEditText(e.target.value);
                        }}
                      />
                    </Stack>
                  }
                  onClickDelete={{
                    onClick: (e) => {
                      e.stopPropagation();
                      setDeleteList(list);
                    },
                  }}
                  isSavedListInputVisible={editList?.id === list.id}
                  isSavedListTextVisible={editList?.id !== list.id}
                  onClickClose={{
                    onClick: (e) => {
                      e.stopPropagation();
                      setEditList(null);
                    },
                  }}
                  onClickSubmit={{
                    onClick: (e) => {
                      e.stopPropagation();
                      updateHandler();
                    },
                  }}
                  onClickEdit={{
                    onClick: (e) => {
                      e.stopPropagation();
                      setEditText(list.name);
                      setEditList(list);
                      setTimeout(() => {
                        if (multiTextFieldRef.current) {
                          multiTextFieldRef.current.focus();
                        }
                      }, 100);
                    },
                  }}
                  isEditVisible={editList?.id !== list.id}
                  key={list.id}
                  textRole={list.name}
                  textCountCandidate={`(${list.candidates.length} candidates)`}
                  onClickList={{
                    onClick: () => {
                      router.push(`/candidates/aglintdb?list=${list.id}`);
                    },
                  }}
                />
              </ScrollList>
            ))
          )
        }
        slotCandidateHistoryCard={
          <>
            {isHistoryLoading && (
              <>
                <CdSearchHistoryLoader />
                <CdSearchHistoryLoader />
                <CdSearchHistoryLoader />
                <CdSearchHistoryLoader />
                <CdSearchHistoryLoader />
              </>
            )}
            {!isHistoryLoading && history.length === 0 && (
              <Stack
                alignItems={'center'}
                height={'100%'}
                justifyContent={'center'}
                pt={10}
              >
                <EmptyState />
                <Typography variant='body2'>No search history</Typography>
              </Stack>
            )}
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
                  <ScrollList uniqueKey={index} key={index}>
                    <CandidateHistoryCard
                      colorPropsCategory={{
                        style: {
                          backgroundColor:
                            hist.db_search == 'candidate'
                              ? '#EDF7FF'
                              : '#FF622433',
                        },
                      }}
                      key={index}
                      textCategory={
                        hist.db_search == 'candidate'
                          ? 'My Candidates'
                          : 'Aglint DB'
                      }
                      isSearchByJobVisible={true}
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
                          if (hist.db_search === 'aglint') {
                            router.push(`/candidates/aglintdb?id=${hist.id}`);
                            return;
                          }
                          router.push(
                            `/candidates/search?searchQryId=${hist.id}&search_title=${hist.search_query}`,
                          );
                        },
                      }}
                    />
                  </ScrollList>
                );
              })}
          </>
        }
        onClickSearchJobDescription={{
          onClick: () => {
            setIsJdPopUPopOpen(true);
          },
        }}
        onClickViewAllCandidate={{
          onClick: () => {
            router.push('/candidates');
          },
        }}
        onClickSearch={{
          onClick: () => {
            if (currentTab === 'my Candidates') {
              getMatchingCandsFromQry();
            } else {
              getCandsFromApi();
            }
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
          open: Boolean(deleteList),
          onClose: () => {
            setDeleteList(null);
          },
        }}
      >
        <ClearHistory
          onClickCancel={{
            onClick: () => {
              setDeleteList(null);
            },
          }}
          onClickClearHistory={{
            onClick: () => {
              handleDeleteList();
            },
          }}
        />
      </MuiPopup>
      <MuiPopup
        props={{
          open: Boolean(deleteHistoryId !== -1),
          onClose: () => {
            setDeleteHistoryId(-1);
          },
        }}
      >
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
      </MuiPopup>
    </>
  );
}

export default CandidateSearchHistory;

const queryJsonToTitle = (queryJson: CandidateSearchState['queryJson']) => {
  return queryJson.jobTitles.join(', ');
};
