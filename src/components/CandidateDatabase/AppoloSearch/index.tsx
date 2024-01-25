import { Avatar, Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { cloneDeep, set } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  CdAglintDb,
  CdAglintEmptyTable,
  CdExperienceCard,
  CdLoadMore,
  CdTableAglint,
  CdTableLoader,
  Checkbox
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useBoundStore } from '@/src/store';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import AddToListComp from './AddToList';
import CandidateDetail from './CandidateDetails';
import EditFilter from './EditFilter';
import EmailOutReachComp from './EmailOutReach';
import { EmptyStateCandidateSearchAglint } from './EmptyLottie';
import ListDropdown from './ListDropdown';
import { Candidate, CandidateSearchHistoryType } from './types';
import {
  calculateTotalExperience,
  processCandidatesInBatches,
  updateCredits,
} from './utils';
import ViewSavedList from './ViewSavedList';
import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';

function AppoloSearch() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const setCandidateLists = useBoundStore((state) => state.setLists);
  const list = useBoundStore((state) => state.list);
  const setList = useBoundStore((state) => state.setList);
  const lists = useBoundStore((state) => state.lists);
  const setLists = useBoundStore((state) => state.setLists);
  const setIsFilterOpen = useBoundStore((state) => state.setIsFilterOpen);
  const filters = useBoundStore((state) => state.filters);
  const setFilters = useBoundStore((state) => state.setFilters);
  const setIsFilterLoading = useBoundStore((state) => state.setIsFilterLoading);
  const setEmailOutReach = useBoundStore((state) => state.setEmailOutReach);
  const setSelectedCandidate = useBoundStore(
    (state) => state.setSelectedCandidate,
  );
  const selectedCandidate = useBoundStore((state) => state.selectedCandidate);
  const selectedCandidates = useBoundStore((state) => state.selectedCandidates);
  const setSelectedCandidates = useBoundStore(
    (state) => state.setSelectedCandidates,
  );
  const isSelectAll = useBoundStore((state) => state.isSelectAll);
  const setIsSelectAll = useBoundStore((state) => state.setIsSelectAll);
  const candidateHistory = useBoundStore((state) => state.candidateHistory);
  const setCandidateHistory = useBoundStore(
    (state) => state.setCandidateHistory,
  );
  const candidates = useBoundStore((state) => state.candidates);
  const setCandidates = useBoundStore((state) => state.setCandidates);

  const [text, setText] = useState('');
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [fetchingNextPage, setFetchingNextPage] = useState(false);

  useEffect(() => {
    if (router.isReady && recruiter?.id) {
      if (!loading) {
        setLoading(true);
      }
      (async () => {
        if (router.query.id) {
          await fetchCandidates(Number(router.query.id));
          setLoading(false);
        }
        if (router.query.list) {
          await fetchList(String(router.query.list));
          setLoading(false);
        }
      })();
    }
  }, [router, recruiter]);

  useEffect(() => {
    if (!candidateHistory?.id) return;

    setFilters(candidateHistory.query_json);
  }, [candidateHistory?.id]);

  const fetchList = async (id: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('candidate_list')
      .select('*')
      .eq('recruiter_id', recruiter.id);
    if (!error) {
      setCandidateLists(data.filter((l) => l.id !== id));
      const list = data.find((l) => l.id === id);
      setList(list);
      const uniqueCand = [...new Set(list.candidates)];
      const resCand = await processCandidatesInBatches(uniqueCand);
      setCandidates(resCand as unknown as Candidate[]);
    }
    return true;
  };

  const fetchCandidates = async (id: number): Promise<boolean> => {
    const { data, error } = await supabase
      .from('candidate_search_history')
      .select('*')
      .eq('id', id);
    if (!error) {
      setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
      const cand = [...data[0].candidates, ...data[0].bookmarked_candidates];
      const uniqueCand = [...new Set(cand)];
      const resCand = await processCandidatesInBatches(uniqueCand);
      setCandidates(resCand as unknown as Candidate[]);
      const { data: cdList, error: cdError } = await supabase
        .from('candidate_list')
        .select()
        .eq('recruiter_id', recruiter.id);
      if (!cdError) {
        setCandidateLists(cdList);
      }
    }
    return true;
  };

  // console.log(candidateHistory);

  const handlePillRemove = (path, index) => {
    const updated = cloneDeep(filters);
    updated[String(path)] = filters[String(path)].filter(
      (s, idx) => idx !== index,
    );
    setFilters(updated);
  };

  const handleUpdatePillInput = (path: string, inputText: string) => {
    if (!inputText) return;
    const inputVals = inputText.split(',').filter((s) => Boolean(s.trim()));
    const updated = cloneDeep(filters);
    set(updated, path, [...filters[String(path)], ...inputVals]);
    setFilters(updated);
  };

  const handleApplyFilters = async () => {
    try {
      if (
        filters.person_locations.length === 0 &&
        filters.person_titles.length === 0 &&
        filters.companies.length === 0
      ) {
        toast.warning('Please add at least one filter');
        return;
      }

      setIsFilterLoading(true);
      setSelectedCandidates([]);
      setSelectedCandidate(null);
      let org_ids = [];

      if (filters.companies.length > 0) {
        const { data: dbCompanies, error: errorCompanies } = await supabase
          .from('company_search_cache')
          .select()
          .in(
            'company_name',
            filters.companies.map((c) => c.toLowerCase()),
          );

        if (errorCompanies) {
          toast.error('Something went wrong! Please try again later.');
          setIsFilterLoading(false);
          return;
        }

        const remainingCompanies = filters.companies.filter(
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
        person_titles: filters.person_titles,
        person_locations: filters.person_locations,
        organization_ids: org_ids,
        person_seniorities: filters.person_seniorities,
      });

      if (!resCand.data.people) {
        toast.error('Something went wrong! Please try again later.');
        setIsFilterLoading(false);
      }

      let fetchedCandidates: Candidate[] = resCand.data.people;
      const fetchedIds = fetchedCandidates.map((c) => c.id);

      const { data, error } = await supabase
        .from('candidate_search_history')
        .update({
          query_json: {
            ...filters,
            pagination: resCand.data.pagination,
          },
          candidates: fetchedIds,
          used_credits: {
            export_credits: candidateHistory.used_credits.export_credits + 1,
            ...candidateHistory.used_credits,
          },
        })
        .eq('id', Number(router.query.id))
        .select();

      if (!error) {
        setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
        setCandidates(
          fetchedCandidates.map((cand) => ({
            ...cand,
            email_fetch_status: 'not fetched',
          })),
        );
      }
      setIsFilterLoading(false);
      setIsFilterOpen(false);
    } catch (e) {
      toast.error('Something went wrong! Please try again later.');
      setIsFilterLoading(false);
    }
  };

  const emailOutReachHandler = async (
    selCandidate: Candidate,
  ): Promise<boolean> => {
    if (selCandidate.email_fetch_status == 'not fetched') {
      const resEmail = await axios.post('/api/candidatedb/get-email', {
        id: selCandidate.id,
      });

      if (resEmail.status !== 200) {
        toast.error('Unable to fetch email. Please try again later.');
        return;
      }

      updateCredits(
        {
          ...candidateHistory.used_credits,
          email_credits: candidateHistory.used_credits.email_credits + 1,
        },
        candidateHistory.id,
      );

      if (resEmail.data.person?.email) {
        const updatedSelectedCandidate = {
          ...selCandidate,
          email: resEmail.data.person?.email,
          email_fetch_status: 'success',
        };

        // Update the selected candidate array
        const updatedSearchResults = candidates.map((candidate) => {
          if (candidate.id === selCandidate.id) {
            return updatedSelectedCandidate;
          }
          return candidate;
        });

        setSelectedCandidate({
          ...selCandidate,
          email: resEmail.data.person?.email,
          email_fetch_status: 'success',
        });

        const { error } = await supabase
          .from('aglint_candidates')
          .update({
            email: resEmail.data.person?.email,
            email_fetch_status: 'success',
          })
          .eq('id', selCandidate.id)
          .select();

        if (!error) {
          // Update the candidate history in state
          setCandidates(updatedSearchResults as unknown as Candidate[]);
          setEmailOutReach('single');
          return true;
        }
      } else {
        await supabase
          .from('aglint_candidates')
          .update({
            email_fetch_status: 'unable to fetch',
          })
          .eq('id', selCandidate.id)
          .select();
        setSelectedCandidate({
          ...selCandidate,
          email_fetch_status: 'unable to fetch',
        });
        toast.error('Unable to fetch email for this candidate.');
        return false;
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setEmailOutReach('single');
      return true;
    }
  };

  const updateHandler = async () => {
    const { data, error } = await supabase
      .from('candidate_list')
      .update({ name: text })
      .eq('id', list.id)
      .select();
    if (!error) {
      setList(data[0]);
      setLists(
        lists.map((l) => {
          if (l.id === list.id) {
            return data[0];
          }
          return l;
        }),
      );
      setText('');
      setIsEditVisible(false);
    } else {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const handleOpenDropdownList = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdownList = () => {
    setAnchorEl(null);
  };

  const handleNextPage = async () => {
    try {
      setFetchingNextPage(true);
      if (
        candidateHistory.query_json.pagination.page >=
        candidateHistory.query_json.pagination.total_pages
      ) {
        return;
      }

      const resCand = await axios.post('/api/candidatedb/search', {
        page: candidateHistory.query_json.pagination.page + 1,
        per_page: 25,
        person_titles: filters.person_titles,
        person_locations: filters.person_locations,
        organization_ids: filters.organization_ids,
        person_seniorities: filters.person_seniorities,
      });
      if (!resCand.data.people) {
        toast.error('Something went wrong! Please try again later.');
      }
      let fetchedCandidates: Candidate[] = resCand.data.people;
      const fetchedIds = fetchedCandidates.map((c) => c.id);

      const { data, error } = await supabase
        .from('candidate_search_history')
        .update({
          query_json: {
            ...filters,
            pagination: resCand.data.pagination,
          },
          candidates: [...candidateHistory.candidates, ...fetchedIds],
          used_credits: {
            export_credits: candidateHistory.used_credits.export_credits + 1,
            ...candidateHistory.used_credits,
          },
        })
        .eq('id', Number(router.query.id))
        .select();
      if (!error) {
        setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
        setCandidates([...candidates, ...fetchedCandidates]);
      }
      setFetchingNextPage(false);
    } catch (e) {
      toast.error('Something went wrong! Please try again later.');
      setFetchingNextPage(false);
    }
  };

  return (
    <Stack overflow={'hidden'}>
      <EditFilter
        handleApplyFilters={handleApplyFilters}
        handlePillRemove={handlePillRemove}
        handleUpdatePillInput={handleUpdatePillInput}
      />

      <EmailOutReachComp />

      <ListDropdown
        anchorEl={anchorEl}
        handleClose={handleCloseDropdownList}
        setAnchorEl={setAnchorEl}
      />

      <CdAglintDb
        onClickList={{
          onClick: (e) => {
            handleOpenDropdownList(e);
          },
        }}
        isSubmitVisible={isEditVisible}
        isEditVisible={!isEditVisible}
        onClickEdit={{
          onClick: () => {
            setText(list.name);
            setIsEditVisible(true);
          },
        }}
        onClickClose={{
          onClick: () => {
            setIsEditVisible(false);
          },
        }}
        onClickSubmit={{
          onClick: () => {
            updateHandler();
          },
        }}
        onClickEmailOutReach={{
          onClick: () => {
            if (selectedCandidates.length === 0) {
              toast.warning('Please select atleast one candidate');
              return;
            } else {
              setEmailOutReach('multiple');
            }
          },
        }}
        onClickBack={{
          onClick: () => {
            window.history.back();
            setSelectedCandidates([]);
            setIsSelectAll(false);
            setSelectedCandidate(null);
          },
        }}
        slotInput={
          isEditVisible ? (
            <UITextField
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          ) : (
            <Stack direction={'row'} spacing={1} pr={1}>
              <UITypography fontBold='normal' type='small'>
                {list?.name}
              </UITypography>
              <UITypography fontBold='normal' type='small' variant='caption'>
                {`(${list?.candidates.length} candidates)`}
              </UITypography>
            </Stack>
          )
        }
        isCdHeaderVisible={Boolean(router.query.id)}
        isListHeaderVisible={Boolean(router.query.list)}
        slotSavetoList={<AddToListComp isSaveToList={true} />}
        isEditQueryVisible={router.query.id ? true : false}
        slotViewSaveList={<ViewSavedList />}
        textNoCandidateSelected={`${selectedCandidates.length} candidate selected`}
        textHeader={
          (router.query.id ? candidateHistory?.search_query : list?.name) || ''
        }
        onClickCloseSelected={{
          onClick: () => {
            setSelectedCandidates([]);
            setIsSelectAll(false);
          },
        }}
        isHeaderVisible={!isSelectAll && selectedCandidates.length === 0}
        slotCheckbox={
          <Checkbox
            isChecked={isSelectAll}
            onClickCheck={{
              onClick: () => {
                if (candidates.length > 0) {
                  setIsSelectAll(!isSelectAll);
                  if (isSelectAll) {
                    setSelectedCandidates([]);
                  } else {
                    setSelectedCandidates(candidates);
                  }
                }
              },
            }}
          />
        }
        isSelectedVisible={selectedCandidates.length > 0}
        onClickCandidateData={{
          onClick: () => {
            router.push('/candidates/history?currentTab=aglint+candidates');
            setSelectedCandidates([]);
            setIsSelectAll(false);
            setCandidateHistory(null);
            setSelectedCandidate(null);
          },
        }}
        onClickEditQuery={{
          onClick: () => {
            setIsFilterOpen(true);
          },
        }}
        slotEmailOut={
          <CandidateDetail emailOutReachHandler={emailOutReachHandler} />
        }
        slotCdTableAglint={
          <Stack
            overflow={'auto'}
            height={'calc(100vh - 112px)'}
            width={'100%'}
            pt={'2px'}
          >
            {!loading && candidates?.length === 0 && (
              <CdAglintEmptyTable
                slotLottie={<EmptyStateCandidateSearchAglint />}
              />
            )}
            {!loading &&
              candidates?.map((candidate, index) => (
                <ScrollList uniqueKey={index} key={index}>
                  <CdTableAglint
                    isActiveSelectVisible={
                      selectedCandidate?.id === candidate.id
                    }
                    onClickEmailReachOut={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedCandidate(candidate);
                        emailOutReachHandler(candidate);
                      },
                    }}
                    slotCheckbox={
                      <Checkbox
                        isChecked={selectedCandidates?.includes(candidate)}
                        onClickCheck={{
                          onClick: (e) => {
                            e.stopPropagation();
                            if (selectedCandidates?.includes(candidate)) {
                              setSelectedCandidates(
                                selectedCandidates.filter(
                                  (c) => c.id !== candidate.id,
                                ),
                              );
                            } else {
                              setSelectedCandidates([
                                ...selectedCandidates,
                                candidate,
                              ]);
                            }
                          },
                        }}
                      />
                    }
                    onClickCard={{
                      onClick: () => {
                        setSelectedCandidate(candidate);
                      },
                    }}
                    key={candidate.id}
                    textName={candidate.name || '--'}
                    textRole={
                      candidate.title +
                      (candidate.employment_history
                        ? ` (${calculateTotalExperience(candidate.employment_history)} years)`
                        : '')
                    }
                    textLocation={[
                      candidate.city,
                      candidate.state,
                      candidate.country,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                    slotCdExperienceCard={
                      <>
                        {candidate.employment_history
                          .slice(0, 3)
                          .map((exp, ind) => {
                            return (
                              <CdExperienceCard
                                key={exp.id}
                                textRole={exp.organization_name}
                                isLogoVisible={
                                  candidate?.organization?.id ===
                                  exp?.organization_id
                                }
                                bgColorProps={{
                                  style: {
                                    backgroundColor:
                                      selectedCandidate?.id === candidate.id
                                        ? ind === 0
                                          ? 'rgba(206, 226, 242, 0.50)'
                                          : 'rgba(206, 226, 242, 0.30)'
                                        : ind === 0
                                          ? 'rgba(233, 235, 237, 0.50)'
                                          : '#F7F9FB',
                                  },
                                }}
                                isActive={
                                  ind === 0 &&
                                  candidate?.organization?.id ===
                                    exp?.organization_id
                                }
                                slotLogo={
                                  <Avatar
                                    variant='rounded'
                                    src={candidate?.organization?.logo_url}
                                    sx={{ height: 40, width: 40 }}
                                  >
                                    <CompanyLogo
                                      companyName={
                                        exp.organization_name
                                          ? exp.organization_name
                                              .trim()
                                              .toLowerCase()
                                          : null
                                      }
                                    />
                                  </Avatar>
                                }
                                textDate={`${
                                  exp.start_date
                                    ? dayjs(exp.start_date).format('MMM YYYY') +
                                      ' - '
                                    : ''
                                }  ${
                                  exp.end_date
                                    ? dayjs(exp.end_date).format('MMM YYYY')
                                    : 'Present'
                                }`}
                              />
                            );
                          })}
                        <Typography variant='body2'>
                          {candidate.employment_history.length > 3 &&
                            `+ ${candidate.employment_history.length - 3} more`}
                        </Typography>
                      </>
                    }
                    slotProfileImage={
                      <>
                        <MuiAvatar
                          level={getFullName(
                            candidate.first_name,
                            candidate.last_name,
                          )}
                          src={
                            candidate.photo_url?.includes('static')
                              ? null
                              : candidate.photo_url
                          }
                          variant={'rounded'}
                          width={'80px'}
                          height={'80px'}
                          fontSize={'30px'}
                        />
                      </>
                    }
                  />
                </ScrollList>
              ))}
            {(loading || fetchingNextPage) &&
              Array.from({ length: 25 }, (_, index) => (
                <CdTableLoader key={index} />
              ))}
            {router.query.id &&
              !loading &&
              candidates?.length > 0 &&
              candidateHistory?.query_json.pagination.page <
                candidateHistory?.query_json.pagination.total_pages && (
                <Stack
                  direction={'row'}
                  width={'100%'}
                  justifyContent={'center'}
                  p={4}
                >
                  <CdLoadMore
                    onClickLoad={{
                      onClick: () => {
                        handleNextPage();
                      },
                    }}
                  />
                </Stack>
              )}
          </Stack>
        }
      />
    </Stack>
  );
}

export default AppoloSearch;
