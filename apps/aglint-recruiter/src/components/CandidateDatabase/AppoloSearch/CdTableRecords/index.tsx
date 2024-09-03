import { Avatar, Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { CdAglintEmptyTable } from '@/devlink/CdAglintEmptyTable';
import { CdExperienceCard } from '@/devlink/CdExperienceCard';
import { CdLoadMore } from '@/devlink/CdLoadMore';
import { CdTableAglint } from '@/devlink/CdTableAglint';
import { CdTableLoader } from '@/devlink/CdTableLoader';
import { Checkbox } from '@/devlink/Checkbox';
import { EmptyStateCandidateSearchAglint } from '@/public/lottie/EmptyLottie';
import CompanyLogo from '@/src/components/Common/CompanyLogo';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

import {
  setCandidateHistory,
  setCandidates,
  setSelectedCandidate,
  setSelectedCandidates,
  useCandidateStore,
} from '../store';
import { type Candidate, type CandidateSearchHistoryType } from '../types';
import { calculateTotalExperience } from '../utils';

function CdTableRecords({ loading }) {
  const { toast } = useToast();
  const router = useRouter();
  const filters = useCandidateStore((state) => state.filters);
  const selectedCandidate = useCandidateStore(
    (state) => state.selectedCandidate,
  );
  const selectedCandidates = useCandidateStore(
    (state) => state.selectedCandidates,
  );
  const candidateHistory = useCandidateStore((state) => state.candidateHistory);
  const candidates = useCandidateStore((state) => state.candidates);
  const [fetchingNextPage, setFetchingNextPage] = useState(false);

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
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
      setFetchingNextPage(false);
    }
  };
  return (
    <>
      {!loading && candidates?.length === 0 && (
        <CdAglintEmptyTable slotLottie={<EmptyStateCandidateSearchAglint />} />
      )}
      {!loading &&
        candidates?.map((candidate) => (
          <CdTableAglint
            isActiveSelectVisible={selectedCandidate?.id === candidate.id}
            slotCheckbox={
              <Checkbox
                isChecked={selectedCandidates?.includes(candidate)}
                onClickCheck={{
                  onClick: (e) => {
                    e.stopPropagation();
                    if (selectedCandidates?.includes(candidate)) {
                      setSelectedCandidates(
                        selectedCandidates.filter((c) => c.id !== candidate.id),
                      );
                    } else {
                      setSelectedCandidates([...selectedCandidates, candidate]);
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
            textLocation={[candidate.city, candidate.state, candidate.country]
              .filter(Boolean)
              .join(', ')}
            slotCdExperienceCard={
              <>
                {candidate.employment_history.slice(0, 3).map((exp, ind) => {
                  return (
                    <Stack key={ind} maxWidth={'300px'} width='100%'>
                      <CdExperienceCard
                        key={exp.id}
                        textRole={exp.organization_name}
                        isLogoVisible={
                          candidate?.organization?.id === exp?.organization_id
                        }
                        bgColorProps={
                          {
                            // style: {
                            //   backgroundColor:
                            //     selectedCandidate?.id === candidate.id
                            //       ? ind === 0
                            //         ? 'rgba(206, 226, 242, 0.50)'
                            //         : 'rgba(206, 226, 242, 0.30)'
                            //       : ind === 0
                            //         ? 'rgba(233, 235, 237, 0.50)'
                            //         : '#F7F9FB',
                            // },
                          }
                        }
                        isActive={
                          ind === 0 &&
                          candidate?.organization?.id === exp?.organization_id
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
                                  ? exp.organization_name.trim().toLowerCase()
                                  : null
                              }
                            />
                          </Avatar>
                        }
                        textDate={`${
                          exp.start_date
                            ? dayjs(exp.start_date).format('MMM YYYY') + ' - '
                            : ''
                        }  ${
                          exp.end_date
                            ? dayjs(exp.end_date).format('MMM YYYY')
                            : 'Present'
                        }`}
                      />
                    </Stack>
                  );
                })}
                <Typography variant='body1' sx={{ textWrap: 'nowrap' }}>
                  {candidate.employment_history.length > 3 &&
                    `+ ${candidate.employment_history.length - 3} more`}
                </Typography>
              </>
            }
            slotProfileImage={
              <>
                <MuiAvatar
                  level={getFullName(candidate.first_name, candidate.last_name)}
                  src={
                    candidate.photo_url?.includes('static')
                      ? null
                      : candidate.photo_url
                  }
                  variant={'rounded-small'}
                />
              </>
            }
          />
        ))}
      {(loading || fetchingNextPage) &&
        Array.from({ length: 25 }, (_, index) => <CdTableLoader key={index} />)}
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
    </>
  );
}

export default CdTableRecords;
