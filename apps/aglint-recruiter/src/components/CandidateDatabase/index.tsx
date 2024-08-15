import { CandidateListTypeDB, SearchHistoryType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { CircularProgress, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateDatabaseSearch } from '@/devlink/CandidateDatabaseSearch';
import { CandidateHistoryCard } from '@/devlink/CandidateHistoryCard';
import { CdSearchHistoryLoader } from '@/devlink/CdSearchHistoryLoader';
import { ClearHistory } from '@/devlink/ClearHistory';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { NavSublink } from '@/devlink/NavSublink';
import { SavedList } from '@/devlink/SavedList';
import { SavedListLoader } from '@/devlink/SavedListLoader';
import { SearchAglintCd } from '@/devlink/SearchAglintCd';
import { WelcomeMatDiscoverTalent } from '@/devlink2/WelcomeMatDiscoverTalent';
import { WelcomeMatTalentDirectory } from '@/devlink2/WelcomeMatTalentDirectory';
import { WelcomeMatTalentRediscovery } from '@/devlink2/WelcomeMatTalentRediscovery';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { getTimeDifference } from '@/src/utils/jsonResume';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { CandidateSearchState } from '../../context/CandidateSearchProvider/CandidateSearchProvider';
import Loader from '../Common/Loader';
import MuiPopup from '../Common/MuiPopup';
import UITextField from '../Common/UITextField';
import { Candidate } from './AppoloSearch/types';
import { JDSearchModal } from './JobDescriprionModal/JDSearchModal';
import EmptyState from './Search/EmptyState';
import { getRelevantCndidates } from './utils';

function CandidateSearchHistory() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const [history, setHistory] = useState<SearchHistoryType[]>([]);
  const [text, setText] = useState<string>(''); //this is search input
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQrySearching, setIsQrySearching] = useState<boolean>(false);
  const [deleteHistoryId, setDeleteHistoryId] = useState(-1);
  const [list, setList] = useState<CandidateListTypeDB[]>([]); //this is saved list
  const [editListText, setEditListText] = useState<string>('');
  const [editList, setEditList] = useState<CandidateListTypeDB>(null);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false); //in list page edit list input visible or not
  const [deleteList, setDeleteList] = useState<CandidateListTypeDB>(null);
  const { jobs } = useJobs();
  const [isJdPopUpOpen, setIsJdPopUPopOpen] = useState<boolean>(false);
  const [isCandidates, setIsCandidates] = useState<boolean>(false);
  const [deleteHistory, setDeleteHistory] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady && !router.query.currentTab) {
      router.push(`/candidates/history?currentTab=discover talent`);
    }
    getHistory();
    getCandidates();
  }, [recruiter]);

  const getHistory = async () => {
    try {
      const history = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .select()
          .eq('recruiter_id', recruiter.id),
      ) as SearchHistoryType[];
      await fetchList();
      setHistory(history);
    } catch (err) {
      // toast.error('Something went wrong. Please try again.');
      return err.message;
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const getCandidates = async () => {
    try {
      const history = supabaseWrap(
        await supabase
          .from('candidates')
          .select()
          .eq('recruiter_id', recruiter.id),
      );

      if (history.length === 0) {
        setIsCandidates(false);
      } else {
        setIsCandidates(true);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleDeleteHistory = async () => {
    try {
      supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .delete()
          .eq('id', deleteHistoryId),
      );
      setHistory((p) => p.filter((p) => p.id !== deleteHistoryId));
    } catch (err) {
      setHistory((p) => p.filter((p) => p.id !== deleteHistoryId));
      toast.error('Something went wrong. Please try again.');
    } finally {
      setDeleteHistoryId(-1);
      setDeleteHistory(false);
    }
  };

  const getMatchingCandsFromQry = async () => {
    try {
      if (searchQuery.length === 0 || isQrySearching) return;
      setIsQrySearching(true);
      const queryJson = await searchJdToJson(searchQuery);

      const cndates = (await getRelevantCndidates(
        queryJson,
        jobs.data.map((j) => j.id),
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
      toast.error('Something went wrong. Please try again.');
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

      let org_ids = [];

      if (aiSearchQuery?.companies?.length > 0) {
        const { data: dbCompanies, error: errorCompanies } = await supabase
          .from('company_search_cache')
          .select()
          .in(
            'company_name',
            aiSearchQuery.companies.map((c) => c.toLowerCase()),
          );

        if (errorCompanies) {
          toast.error('Something went wrong. Please try again.');
          return;
        }

        const remainingCompanies = aiSearchQuery.companies.filter(
          (c) =>
            !dbCompanies.map((d) => d.company_name).includes(c.toLowerCase()),
        );

        org_ids = [
          ...org_ids,
          ...dbCompanies.map((c) => (c.search_result as any).id),
        ];

        await Promise.all(
          remainingCompanies.map(async (company) => {
            const resComp = await axios.post('/api/candidatedb/get-company', {
              name: company,
            });
            if (resComp.data.organizations) {
              const dbCompanies = resComp.data.organizations.map((org) => {
                return {
                  company_name: org.name.toLowerCase(),
                  search_result: org,
                  website_url: org.website_url,
                };
              });
              org_ids = [
                ...org_ids,
                ...resComp.data.organizations.map((c) => c.id),
              ];
              await supabase.from('company_search_cache').insert(dbCompanies);
            }
          }),
        );
      }

      const resCand = await axios.post('/api/candidatedb/search', {
        page: 1,
        per_page: 25,
        person_titles: aiSearchQuery.person_titles,
        person_locations: aiSearchQuery.person_locations,
        organization_ids: org_ids,
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
      toast.error('Something went wrong. Please try again.');
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
    if (text) {
      const { data, error } = await supabase
        .from('candidate_list')
        .insert({ name: text, recruiter_id: recruiter.id })
        .select();
      if (!error) {
        setList([...list, data[0]]);
        setText('');
        setIsInputVisible(false);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } else {
      toast.error('Please enter the list name then submit');
    }
  };

  const updateHandler = async () => {
    const { data, error } = await supabase
      .from('candidate_list')
      .update({ name: editListText })
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
      setEditListText('');
      setEditList(null);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleDeleteList = async () => {
    try {
      supabaseWrap(
        await supabase.from('candidate_list').delete().eq('id', deleteList.id),
      );
      setList((p) => p.filter((p) => p.id !== deleteList.id));
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setDeleteList(null);
    }
  };

  let currentTab:
    | 'discover talent'
    | 'talent rediscovery'
    | 'talent directory' = router.query.currentTab as any;

  const multiTextFieldRef = useRef(null);

  const isWelMatVisible = () => {
    if (currentTab === 'talent rediscovery') {
      return localStorage.getItem('talentRediscovery') === 'true';
    } else if (currentTab === 'discover talent') {
      return localStorage.getItem('discoverTalent') === 'true';
    }
  };

  return (
    <>
      {WelcomeMatDiscoverTalent}
      <CandidateDatabaseSearch
        slotSearchAglintCd={
          <>
            {isHistoryLoading ? (
              <Loader />
            ) : (
              <YTransform uniqueKey={router.query.currentTab}>
                <>
                  {currentTab === 'discover talent' &&
                    localStorage.getItem('discoverTalent') !== 'true' && (
                      <WelcomeMatDiscoverTalent
                        slotSearch={
                          <UITextField
                            value={searchQuery}
                            placeholder={'Software Engineer in San Francisco'}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                            }}
                            InputProps={{
                              onKeyDown: async (e) => {
                                if (e.code === 'Enter') {
                                  await getCandsFromApi();
                                  localStorage.setItem(
                                    'discoverTalent',
                                    'true',
                                  );
                                }
                              },
                            }}
                          />
                        }
                        slotLoader={
                          <CircularProgress
                            color='inherit'
                            size={'15px'}
                            sx={{ color: 'var(--neutral-6)' }}
                          />
                        }
                        isLoading={isQrySearching}
                        onClickSearch={{
                          onClick: async () => {
                            await getCandsFromApi();
                            localStorage.setItem('discoverTalent', 'true');
                          },
                        }}
                      />
                    )}

                  {currentTab === 'talent rediscovery' &&
                    localStorage.getItem('talentRediscovery') !== 'true' && (
                      <WelcomeMatTalentRediscovery
                        isSearchVisible={isCandidates}
                        isLoading={isQrySearching}
                        slotLoader={
                          <CircularProgress
                            color='inherit'
                            size={'15px'}
                            sx={{ color: 'var(--neutral-6)' }}
                          />
                        }
                        onclickSearch={{
                          onClick: async () => {
                            await getMatchingCandsFromQry();
                            localStorage.setItem('talentRediscovery', 'true');
                          },
                        }}
                        slotSearch={
                          <UITextField
                            value={searchQuery}
                            placeholder={
                              'Ex: Software engineer with 2 years of experience'
                            }
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                            }}
                            InputProps={{
                              onKeyDown: async (e) => {
                                if (e.code === 'Enter') {
                                  if (isCandidates) {
                                    await getMatchingCandsFromQry();
                                    localStorage.setItem(
                                      'talentRediscovery',
                                      'true',
                                    );
                                  } else {
                                    toast.error(
                                      'No candidates are linked to the jobs. Please add candidates.',
                                    );
                                  }
                                }
                              },
                            }}
                          />
                        }
                      />
                    )}

                  {currentTab === 'talent directory' && !isCandidates && (
                    <WelcomeMatTalentDirectory />
                  )}

                  {(currentTab === 'talent rediscovery' ||
                    currentTab === 'discover talent') &&
                    isWelMatVisible() && (
                      <SearchAglintCd
                        // isViewAllCandidateVisible={true}
                        slotSearchButton={
                          <ButtonSolid
                            textButton='Search'
                            size={2}
                            isLoading={isQrySearching}
                            onClickButton={{
                              onClick: () => {
                                if (currentTab === 'talent rediscovery') {
                                  getMatchingCandsFromQry();
                                } else {
                                  getCandsFromApi();
                                }
                              },
                            }}
                          />
                        }
                        isSearchByJdVisible={
                          currentTab === 'talent rediscovery'
                        }
                        isSearchInAglintVisible={
                          currentTab === 'discover talent'
                        }
                        isSearchInAllVisible={
                          currentTab === 'talent rediscovery'
                        }
                        isSavedListVisible={currentTab === 'discover talent'}
                        isInputVisible={isInputVisible}
                        slotInputSearch={
                          <UITextField
                            height={32}
                            value={searchQuery}
                            placeholder={
                              currentTab === 'talent rediscovery'
                                ? 'Ex: Software engineer with 2 years of experience'
                                : 'Software Engineer in San Francisco'
                            }
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                            }}
                            InputProps={{
                              onKeyDown: (e) => {
                                if (e.code === 'Enter') {
                                  if (currentTab === 'talent rediscovery') {
                                    getMatchingCandsFromQry();
                                  } else {
                                    getCandsFromApi();
                                  }
                                }
                              },
                              endAdornment: searchQuery && (
                                <Stack
                                  onClick={() => setSearchQuery('')}
                                  sx={{
                                    p: '3px',
                                    '&:hover': {
                                      backgroundColor: 'var(--neutral-3)',
                                      cursor: 'pointer',
                                    },
                                  }}
                                >
                                  <GlobalIcon iconName='close' size={5} />
                                </Stack>
                              ),
                            }}
                          />
                        }
                        isSavedListEmpty={
                          !isHistoryLoading && list.length === 0
                        }
                        slotInput={
                          <UITextField
                            rest={{ autoFocus: true }}
                            placeholder='Enter List name'
                            value={text}
                            onChange={(e) => {
                              setText(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                submitHandler();
                              }
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
                              <SavedListLoader /> <SavedListLoader />
                              <SavedListLoader />
                            </>
                          ) : (
                            list.map((list) => (
                              <SavedList
                                // isInlineEditVisible={editList?.id === list.id}

                                slotInputTextSavedList={
                                  <Stack
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <UITextField
                                      placeholder='Enter List name'
                                      ref={multiTextFieldRef}
                                      value={editListText}
                                      onChange={(e) => {
                                        setEditListText(e.target.value);
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
                                isSavedListInputVisible={
                                  editList?.id === list.id
                                }
                                isSavedListTextVisible={
                                  editList?.id !== list.id
                                }
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
                                    setEditListText(list.name);
                                    setEditList(list);
                                    setTimeout(() => {
                                      if (multiTextFieldRef.current) {
                                        multiTextFieldRef.current.focus();
                                      }
                                    }, 100);
                                  },
                                }}
                                isCardVisible={editList?.id !== list.id}
                                isEditVisible={editList?.id !== list.id}
                                key={list.id}
                                textRole={list.name}
                                textCountCandidate={`${list.candidates.length} candidates`}
                                onClickList={{
                                  onClick: () => {
                                    router.push(
                                      `/candidates/aglintdb?list=${list.id}`,
                                    );
                                  },
                                }}
                              />
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
                            {!isHistoryLoading &&
                              history.filter((h) => {
                                if (currentTab === 'talent rediscovery') {
                                  return h.db_search === 'candidate';
                                } else {
                                  return h.db_search === 'aglint';
                                }
                              }).length === 0 && (
                                <Stack
                                  alignItems={'center'}
                                  height={'100%'}
                                  justifyContent={'center'}
                                  pt={10}
                                >
                                  <EmptyState />
                                  <Typography variant='body1'>
                                    No search history found.
                                  </Typography>
                                </Stack>
                              )}
                            {history
                              .sort((h1, h2) => {
                                const d1 = new Date(h1.created_at);
                                const d2 = new Date(h2.created_at);
                                return d2.getTime() - d1.getTime();
                              })
                              .filter((h) => {
                                if (currentTab === 'talent rediscovery') {
                                  return h.db_search === 'candidate';
                                } else {
                                  return h.db_search === 'aglint';
                                }
                              })
                              .map((hist, index) => {
                                let diffrence = getTimeDifference(
                                  hist.created_at,
                                  new Date().toISOString(),
                                );
                                return (
                                  <CandidateHistoryCard
                                    onClickKebab={{
                                      onClick: (e) => {
                                        e.stopPropagation();
                                      },
                                    }}
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
                                        e.stopPropagation();
                                        setDeleteHistoryId(hist.id);
                                        setDeleteHistory(true);
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
                                          router.push(
                                            `/candidates/aglintdb?id=${hist.id}`,
                                          );
                                          return;
                                        }
                                        router.push(
                                          `/candidates/search?searchQryId=${hist.id}&search_title=${hist.search_query}`,
                                        );
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
                      />
                    )}
                </>
              </YTransform>
            )}
          </>
        }
        slotNavSublink={
          <>
            <NavSublink
              textLink='Discover Talent'
              isActive={currentTab === 'discover talent'}
              onClickNav={{
                onClick: () => {
                  router.query.currentTab = 'discover talent';
                  router.push(router);
                },
              }}
            />
            <NavSublink
              textLink='Talent Rediscovery'
              isActive={currentTab === 'talent rediscovery'}
              onClickNav={{
                onClick: () => {
                  router.query.currentTab = 'talent rediscovery';
                  router.push(router);
                },
              }}
            />
            <NavSublink
              textLink='Talent Directory'
              isActive={currentTab === 'talent directory'}
              onClickNav={{
                onClick: () => {
                  if (isCandidates) {
                    router.push('/candidates?page_no=1');
                  } else {
                    router.query.currentTab = 'talent directory';
                    router.push(router);
                  }
                },
              }}
            />
          </>
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
        <JDSearchModal setJdPopup={setIsJdPopUPopOpen} />
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
          textDesc={
            'Are you sure you want to delete this list? Once deleted, it cannot be recovered.'
          }
          textHeader={`Delete ${
            list.filter((l) => l.id === deleteList?.id)[0]?.name || ''
          }`}
          slotCloseButton={
            <IconButtonGhost
              iconName='close'
              iconSize={4}
              size={1}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setDeleteList(null);
                },
              }}
            />
          }
          slotButton={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{
                  onClick: () => {
                    setDeleteList(null);
                  },
                }}
              />
              <ButtonSolid
                textButton='Clear History'
                size={2}
                onClickButton={{
                  onClick: () => {
                    handleDeleteList();
                  },
                }}
              />
            </>
          }
        />
      </MuiPopup>

      <MuiPopup
        props={{
          open: deleteHistory,
          onClose: () => {
            setDeleteHistory(false);
            setTimeout(() => {
              setDeleteHistoryId(-1);
            }, 500);
          },
        }}
      >
        <ClearHistory
          textDesc={`By clicking 'Delete,' you're confirming that you want to remove this search history, and it cannot be undone.`}
          textHeader={`Delete ${
            history.filter((h) => h.id === deleteHistoryId)[0]?.search_query
          }`}
          slotCloseButton={
            <IconButtonGhost
              iconName='close'
              iconSize={4}
              size={1}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setDeleteHistory(false);
                  setTimeout(() => {
                    setDeleteHistoryId(-1);
                  }, 500);
                },
              }}
            />
          }
          slotButton={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{
                  onClick: () => {
                    setDeleteHistory(false);
                    setTimeout(() => {
                      setDeleteHistoryId(-1);
                    }, 500);
                  },
                }}
              />
              <ButtonSolid
                textButton='Delete'
                color={'error'}
                size={2}
                onClickButton={{
                  onClick: () => {
                    handleDeleteHistory();
                  },
                }}
              />
            </>
          }
        />
      </MuiPopup>
    </>
  );
}

export default CandidateSearchHistory;

const queryJsonToTitle = (queryJson: CandidateSearchState['queryJson']) => {
  return queryJson.jobTitles.join(', ');
};
