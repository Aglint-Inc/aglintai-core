import {
  Avatar,
  CircularProgress,
  Dialog,
  MenuItem,
  Stack,
  Switch,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { cloneDeep, set } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  CdAglintDb,
  CdEditQuerry,
  CdExperienceCard,
  CdTableAglint,
  Checkbox,
  JobPills,
} from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { useBoundStore } from '@/src/store';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import CandidateDetail from './CandidateDetail';
import { Candidate, CandidateSearchHistoryType } from './types';
import { employeeRange, initialQuery } from './utils';
import FilterInput from '../Search/FilterInput';
import AUIButton from '../../Common/AUIButton';
import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';

function AppoloSearch() {
  const router = useRouter();
  const [bookmark, setBookmark] = useState(false);
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const setCandidateHistory = useBoundStore(
    (state) => state.setCandidateHistory,
  );
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [filters, setFilters] = useState<any>(initialQuery());
  const candidateHistory = useBoundStore((state) => state.candidateHistory);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        await fetchCandidates(Number(router.query.id));
      })();
    }
  }, [router]);

  const fetchCandidates = async (id: number): Promise<boolean> => {
    const { data, error } = await supabase
      .from('candidate_search_history')
      .select('*')
      .eq('id', id);
    if (!error) {
      setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
    }
    // const response = await axios.post('/api/candidatedb/search', {
    //   page: 1,
    //   per_page: 10,
    //   ...params,
    // });

    // eslint-disable-next-line no-console

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

  let candidates = [];

  if (Boolean(candidateHistory) && bookmark) {
    candidates =
      candidateHistory.search_results.filter((candidate) =>
        candidateHistory.bookmarked_candidates.includes(candidate.id),
      ) || [];
  } else {
    candidates = candidateHistory?.search_results || [];
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
      per_page: 99,
      person_titles: filters.jobTitles,
      person_locations: filters.locations,
    });

    if (!resCand.data.people) {
      toast.error('Something went wrong! Please try again later.');
      setIsFilterLoading(false);
    }

    const { data, error } = await supabase
      .from('candidate_search_history')
      .update({
        query_json: {
          page: 1,
          per_page: 99,
          person_titles: filters.jobTitles,
          person_locations: filters.locations,
        },
        search_results: resCand.data.people,
      })

      .eq('id', Number(router.query.id))
      .select();

    if (!error) {
      setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
    }
    setIsFilterLoading(false);
    setIsFilterOpen(false);
  };

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

  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  return (
    <Stack overflow={'hidden'}>
      <Dialog
        open={isfilterOpen}
        fullWidth={true}
        maxWidth={'md'}
        onClose={() => {
          setIsFilterOpen(false);
        }}
      >
        <CdEditQuerry
          onClickResetQuery={{
            onClick: () => {
              setFilters(initialQuery());
            },
          }}
          slotCompanySizeInput={
            <UITextField
              select
              defaultValue={'10001'}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  companySize: e.target.value,
                }));
              }}
            >
              {employeeRange.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  {range.show}
                </MenuItem>
              ))}
            </UITextField>
          }
          slotPreferredCompanySuggestion={filters.companies.map(
            (title, index) => {
              return (
                <JobPills
                  key={index}
                  onClickDelete={{
                    onClick: () => {
                      handlePillRemove('companies', index);
                    },
                  }}
                  textJob={title}
                />
              );
            },
          )}
          slotJobSuggestion={filters.jobTitles.map((title, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('jobTitles', index);
                  },
                }}
                textJob={title}
              />
            );
          })}
          slotLocationSuggestion={filters.locations.map((title, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('locations', index);
                  },
                }}
                textJob={title}
              />
            );
          })}
          slotApplyFilterButton={
            <>
              <AUIButton
                variant='primary'
                size='small'
                onClick={() => {
                  !isFilterLoading && handleApplyFilters();
                }}
                endIcon={
                  isFilterLoading && (
                    <CircularProgress
                      color='inherit'
                      size={'15px'}
                      sx={{ color: palette.grey[400] }}
                    />
                  )
                }
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    width={12}
                    height={12}
                    alt=''
                    src={'/images/svg/graphUp.svg'}
                    style={{ marginRight: '10px' }}
                  />
                  <p> Apply </p>
                </div>
              </AUIButton>
            </>
          }
          slotPreferredCompaniesInput={
            <FilterInput
              handleAdd={(s) => {
                handleUpdatePillInput('companies', s);
              }}
              path='excludedCompanies'
            />
          }
          slotJobInput={
            <FilterInput
              handleAdd={(s) => {
                handleUpdatePillInput('jobTitles', s);
              }}
              path='jobTitles'
            />
          }
          slotLocationInput={
            <FilterInput
              handleAdd={(s) => {
                handleUpdatePillInput('locations', s);
              }}
              path='location'
            />
          }
        />
      </Dialog>

      <CandidateDetail
        candidateHistory={candidateHistory}
        candidates={candidates}
        handleBookmark={handleBookmark}
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
      />

      <CdAglintDb
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
            checked={bookmark}
            onChange={handleBookmarkToogle}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        slotCdTableAglint={
          <Stack overflow={'auto'} height={'calc(100vh - 112px)'}>
            {candidates.map((candidate) => (
              <CdTableAglint
                slotCheckbox={
                  <Checkbox
                    isChecked={selectedCandidates?.includes(candidate)}
                    onClickCheck={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedCandidates((p) => {
                          if (!p) return [candidate];
                          if (p.includes(candidate)) {
                            return p.filter((c) => c !== candidate);
                          }
                          return [...p, candidate];
                        });
                      },
                    }}
                  />
                }
                notBookmark={
                  !candidateHistory.bookmarked_candidates.includes(candidate.id)
                }
                isBookMarked={candidateHistory.bookmarked_candidates.includes(
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
                slotCdExperienceCard={candidate.employment_history
                  .slice(0, 3)
                  .map((exp, ind) => {
                    return (
                      <CdExperienceCard
                        key={exp.id}
                        textRole={exp.organization_name}
                        isLogoVisible={
                          candidate?.organization?.id === exp?.organization_id
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
