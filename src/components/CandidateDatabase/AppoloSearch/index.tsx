import { Avatar, Stack, Switch } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { cloneDeep, set } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  CdAglintDb,
  CdExperienceCard,
  CdTableAglint,
  Checkbox,
} from '@/devlink';
import { useBoundStore } from '@/src/store';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import CandidateDetail from './CandidateDetail';
import EditFilter from './EditFilter';
import EmailOutReachComp from './EmailOutReach';
import { Candidate, CandidateSearchHistoryType } from './types';
import { processCandidatesInBatches } from './utils';
import MuiAvatar from '../../Common/MuiAvatar';

function AppoloSearch() {
  const router = useRouter();
  const bookmark = useBoundStore((state) => state.bookmark);
  const setBookmark = useBoundStore((state) => state.setBookmark);
  const setIsFilterOpen = useBoundStore((state) => state.setIsFilterOpen);
  const filters = useBoundStore((state) => state.filters);
  const setFilters = useBoundStore((state) => state.setFilters);
  const setIsFilterLoading = useBoundStore((state) => state.setIsFilterLoading);
  const setEmailOutReach = useBoundStore((state) => state.setEmailOutReach);
  const setSelectedCandidate = useBoundStore(
    (state) => state.setSelectedCandidate,
  );
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
  const dbCandidates = useBoundStore((state) => state.candidates);
  const setCandidates = useBoundStore((state) => state.setCandidates);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        await fetchCandidates(Number(router.query.id));
      })();
    }
  }, [router]);

  useEffect(() => {
    if (!candidateHistory?.id) return;

    let cand = {
      companies: [],
      jobTitles: (candidateHistory.query_json as { person_titles: string[] })
        .person_titles,
      locations: (candidateHistory.query_json as { person_locations: string[] })
        .person_locations,
      companySize: '10001',
    };

    setFilters(cand);
  }, [candidateHistory?.id]);

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
    }
    return true;
  };

  const handleBookmarkToogle = async () => {
    setBookmark(!bookmark);
  };

  const handleBookmark = async (candidate: Candidate) => {
    if (!candidateHistory.bookmarked_candidates.includes(candidate.id)) {
      setCandidateHistory({
        ...candidateHistory,
        bookmarked_candidates: [
          ...candidateHistory.bookmarked_candidates,
          candidate.id,
        ],
      });
      await supabase
        .from('candidate_search_history')
        .update({
          bookmarked_candidates: [
            ...candidateHistory.bookmarked_candidates,
            candidate.id,
          ],
        })
        .eq('id', Number(router.query.id));
    } else {
      setCandidateHistory({
        ...candidateHistory,
        bookmarked_candidates: candidateHistory.bookmarked_candidates.filter(
          (id) => id !== candidate.id,
        ),
      });
      await supabase
        .from('candidate_search_history')
        .update({
          bookmarked_candidates: candidateHistory.bookmarked_candidates.filter(
            (id) => id !== candidate.id,
          ),
        })
        .eq('id', Number(router.query.id));
    }
  };

  let candidates: Candidate[] = [];

  if (Boolean(candidateHistory) && bookmark) {
    candidates = dbCandidates.filter((candidate) =>
      candidateHistory.bookmarked_candidates.includes(candidate.id),
    );
  } else {
    candidates = dbCandidates || [];
  }

  // console.log(candidateHistory);

  const handlePillRemove = (path, index) => {
    setFilters((p) => {
      const updated = cloneDeep(p);
      updated[String(path)] = filters[String(path)].filter(
        (s, idx) => idx !== index,
      );
      return updated;
    });
  };

  const handleUpdatePillInput = (path: string, inputText: string) => {
    if (!inputText) return;
    const inputVals = inputText.split(',').filter((s) => Boolean(s.trim()));
    setFilters((p) => {
      const updated = cloneDeep(p);
      set(updated, path, [...filters[String(path)], ...inputVals]);
      return updated;
    });
  };

  const handleApplyFilters = async () => {
    setIsFilterLoading(true);

    const resCand = await axios.post('/api/candidatedb/search', {
      page: 1,
      per_page: 50,
      person_titles: filters.jobTitles,
      person_locations: filters.locations,
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
          page: 1,
          per_page: 50,
          person_titles: filters.jobTitles,
          person_locations: filters.locations,
        },
        candidates: fetchedIds,
      })
      .eq('id', Number(router.query.id))
      .select();

    if (!error) {
      setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
      setCandidates(fetchedCandidates);
    }
    setIsFilterLoading(false);
    setIsFilterOpen(false);
  };

  const emailOutReachHandler = async (selCandidate: Candidate) => {
    if (selCandidate.email?.includes('email_not_unlocked')) {
      const resEmail = await axios.post('/api/candidatedb/get-email', {
        id: selCandidate.id,
      });

      if (resEmail.status !== 200) {
        toast.error('Something went wrong');
        return;
      }

      if (resEmail.data.person?.email) {
        const updatedSelectedCandidate = {
          ...selCandidate,
          email: resEmail.data.person?.email,
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
        });

        const { error } = await supabase
          .from('aglint_candidates')
          .update({
            email: resEmail.data.person?.email,
          })
          .eq('id', selCandidate.id)
          .select();

        if (!error) {
          // Update the candidate history in state
          setCandidates(updatedSearchResults);
        }
      }
      setEmailOutReach(true);
    } else {
      setEmailOutReach(true);
    }
  };

  const handleMultipleBookmark = async (selectedCandidates: Candidate[]) => {
    if (selectedCandidates.length === 0) return;
    const bookmarkedResults = candidateHistory.bookmarked_candidates;

    const updatedBookmarkedResults = [
      ...bookmarkedResults,
      ...selectedCandidates
        .filter((candidate) => !bookmarkedResults.includes(candidate.id))
        .map((candidate) => candidate.id),
    ];

    const { data, error } = await supabase
      .from('candidate_search_history')
      .update({
        bookmarked_candidates: updatedBookmarkedResults as any,
      })
      .eq('id', Number(router.query.id))
      .select();

    if (!error) {
      setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
      toast.success('Candidates bookmarked successfully');
    }
    setSelectedCandidates([]);
    setIsSelectAll(false);
  };

  return (
    <Stack overflow={'hidden'}>
      <EditFilter
        handleApplyFilters={handleApplyFilters}
        handlePillRemove={handlePillRemove}
        handleUpdatePillInput={handleUpdatePillInput}
      />

      <EmailOutReachComp />

      <CdAglintDb
        onClickBookmark={{
          onClick: () => {
            handleMultipleBookmark(selectedCandidates);
          },
        }}
        textNoCandidateSelected={`${selectedCandidates.length} candidate selected`}
        textHeader={candidateHistory?.search_query}
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
                setIsSelectAll(!isSelectAll);
                if (isSelectAll) {
                  setSelectedCandidates([]);
                } else {
                  setSelectedCandidates(candidates);
                }
              },
            }}
          />
        }
        isSelectedVisible={selectedCandidates.length > 0}
        onClickCandidateData={{
          onClick: () => {
            router.push('/candidates/history?currentTab=aglint+candidates');
          },
        }}
        onClickEditQuery={{
          onClick: () => {
            setIsFilterOpen(true);
          },
        }}
        slotToggle={
          <Switch
            color='secondary'
            size='small'
            checked={bookmark}
            onChange={handleBookmarkToogle}
          />
        }
        slotEmailOut={
          <CandidateDetail
            handleBookmark={handleBookmark}
            emailOutReachHandler={emailOutReachHandler}
          />
        }
        slotCdTableAglint={
          <Stack overflow={'auto'} height={'calc(100vh - 112px)'}>
            {candidates.map((candidate) => (
              <CdTableAglint
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
                        let selCand = [];
                        if (!selectedCandidates) {
                          selCand = [candidate];
                        }
                        if (selectedCandidates?.includes(candidate)) {
                          selCand = selectedCandidates.filter(
                            (c) => c !== candidate,
                          );
                        }
                        setSelectedCandidates(selCand);
                      },
                    }}
                  />
                }
                notBookmark={
                  !candidateHistory.bookmarked_candidates?.includes(
                    candidate.id,
                  )
                }
                isBookMarked={candidateHistory.bookmarked_candidates?.includes(
                  candidate.id,
                )}
                onClickBookmark={{
                  onClick: (e) => {
                    e.stopPropagation();
                    handleBookmark(candidate);
                  },
                }}
                onClickBookMarked={{
                  onClick: (e) => {
                    e.stopPropagation();
                    handleBookmark(candidate);
                  },
                }}
                onClickCard={{
                  onClick: () => {
                    setSelectedCandidate(candidate);
                  },
                }}
                key={candidate.id}
                textName={candidate.name}
                textRole={candidate.title}
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
                            isActive={ind === 0}
                            slotLogo={
                              <Avatar
                                variant='rounded'
                                src={candidate?.organization?.logo_url}
                                sx={{ height: 40, width: 40 }}
                              />
                            }
                            textDate={`${dayjs(exp.start_date).format(
                              'MMM YYYY',
                            )} - ${
                              exp.end_date
                                ? dayjs(exp.end_date).format('MMM YYYY')
                                : 'Present'
                            }`}
                          />
                        );
                      })}
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
            ))}
          </Stack>
        }
      />
    </Stack>
  );
}

export default AppoloSearch;
