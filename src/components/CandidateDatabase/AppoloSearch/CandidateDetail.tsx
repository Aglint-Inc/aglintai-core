import { Avatar, Drawer, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  CandidateDialog,
  CandidateExperience,
  CandidateExperienceCard,
} from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { useBoundStore } from '@/src/store';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { Candidate, CandidateSearchHistoryType } from './types';
import EmailOutReach from '../Database/EmailOutReach/EmailOutReach';
import { OutReachCtxProvider } from '../Database/EmailOutReach/OutReachCtx';
import MuiAvatar from '../../Common/MuiAvatar';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';

function CandidateDetail({
  selectedCandidate,
  setSelectedCandidate,
  candidates,
  candidateHistory,
  handleBookmark,
}: {
  selectedCandidate: Candidate;
  // eslint-disable-next-line no-unused-vars
  setSelectedCandidate: (candidate: Candidate) => void;
  candidates: Candidate[];
  candidateHistory: CandidateSearchHistoryType;
  // eslint-disable-next-line no-unused-vars
  handleBookmark: (candidate: Candidate) => void;
}) {
  const router = useRouter();
  const [emailOutReach, setToggleOutreach] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const setCandidateHistory = useBoundStore(
    (state) => state.setCandidateHistory,
  );

  const emailOutReachHandler = async () => {
    if (selectedCandidate.email?.includes('email_not_unlocked')) {
      const resEmail = await axios.post('/api/candidatedb/get-email', {
        id: selectedCandidate.id,
      });

      if (resEmail.status !== 200) {
        toast.error('Something went wrong');
        return;
      }

      if (resEmail.data.person?.email) {
        const updatedSelectedCandidate = {
          ...selectedCandidate,
          email: resEmail.data.person?.email,
        };

        // Update the selected candidate in search_results array
        const updatedSearchResults = candidates.map((candidate) => {
          if (candidate.id === selectedCandidate.id) {
            return updatedSelectedCandidate;
          }
          return candidate;
        });

        setSelectedCandidate({
          ...selectedCandidate,
          email: resEmail.data.person?.email,
        });

        const { data, error } = await supabase
          .from('candidate_search_history')
          .update({
            search_results: updatedSearchResults as any,
          })
          .match({ id: Number(router.query.id) })
          .select();

        if (!error) {
          // Update the candidate history in state
          setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
        }
      }
      setToggleOutreach(true);
    } else {
      setToggleOutreach(true);
    }
  };

  return (
    <Drawer
      anchor={'right'}
      open={Boolean(selectedCandidate)}
      onClose={() => {
        setSelectedCandidate(null);
      }}
    >
      {selectedCandidate && (
        <Stack direction={'row'}>
          <CandidateDialog
            onClickEmailOutreach={{
              onClick: async () => {
                await emailOutReachHandler();
              },
            }}
            onClickClose={{
              onClick: () => {
                setSelectedCandidate(null);
              },
            }}
            onClickNext={{
              onClick: () => {
                const index = candidates.findIndex(
                  (c) => c.id === selectedCandidate.id,
                );
                if (index === candidates.length - 1) {
                  setSelectedCandidate(candidates[0]);
                } else {
                  setSelectedCandidate(candidates[index + 1]);
                }
              },
            }}
            onClickPrev={{
              onClick: () => {
                const index = candidates.findIndex(
                  (c) => c.id === selectedCandidate.id,
                );
                if (index === 0) {
                  setSelectedCandidate(candidates[candidates.length - 1]);
                } else {
                  setSelectedCandidate(candidates[index - 1]);
                }
              },
            }}
            isStarActive={candidateHistory.bookmarked_candidates.includes(
              selectedCandidate.id,
            )}
            onClickStar={{
              onClick: () => {
                handleBookmark(selectedCandidate);
              },
            }}
            isLinkedinVisible={Boolean(selectedCandidate.linkedin_url)}
            isPhoneVisible={Boolean(
              selectedCandidate.phone_numbers
                ? selectedCandidate.phone_numbers[0]?.raw_number
                : false,
            )}
            isEmailVisible={false}
            isViewResumeVisible={false}
            slotDetails={
              <CandidateExperience
                slotCandidateExperienceCard={selectedCandidate.employment_history.map(
                  (exp) => (
                    <CandidateExperienceCard
                      key={exp.id}
                      textCompany={exp.organization_name}
                      textRole={exp.title}
                      slotLogo={
                        selectedCandidate.organization &&
                        selectedCandidate.organization.id !==
                          exp.organization_id ? (
                          <CompanyLogo
                            companyName={
                              exp.organization_name
                                ? exp.organization_name.trim().toLowerCase()
                                : null
                            }
                          />
                        ) : (
                          <Avatar
                            variant='square'
                            src={
                              selectedCandidate.organization &&
                              selectedCandidate.organization.id ===
                                exp.organization_id
                                ? selectedCandidate.organization.logo_url
                                : ''
                            }
                            sx={{ height: 40, width: 40 }}
                          />
                        )
                      }
                      textDate={`${dayjs(exp.start_date).format(
                        'MMM YYYY',
                      )} - ${
                        exp.end_date
                          ? dayjs(exp.end_date).format('MMM YYYY')
                          : 'Present'
                      }`}
                    />
                  ),
                )}
              />
            }
            textName={selectedCandidate.name}
            textJobRoleAtCompany={selectedCandidate.title}
            textLocation={[
              selectedCandidate.city,
              selectedCandidate.state,
              selectedCandidate.country,
            ]
              .filter(Boolean)
              .join(', ')}
            isAddedToJobVisible={false}
            slotAvatar={
              <MuiAvatar
                level={getFullName(selectedCandidate.name, '')}
                src={
                  selectedCandidate.photo_url?.includes('static')
                    ? null
                    : selectedCandidate.photo_url
                }
                variant={'rounded'}
                width={'100%'}
                height={'100%'}
                fontSize={'12px'}
              />
            }
            onClickMail={{
              onClick: () => {
                navigator.clipboard.writeText(selectedCandidate.email);
              },
            }}
            isOverviewVisible={false}
            onClickLinkedin={{
              onClick: () => {
                navigator.clipboard.writeText(selectedCandidate.linkedin_url);
              },
            }}
            onClickPhone={{
              onClick: () => {
                navigator.clipboard.writeText(
                  selectedCandidate.phone_numbers[0].raw_number,
                );
              },
            }}
          />
          <Stack
            height={'100vh'}
            sx={{
              width: emailOutReach ? '745px' : 0,
              transition: 'width 0.3s ease-in-out',
              borderLeft: emailOutReach
                ? `1px solid ${palette.grey[200]}`
                : 'none',
              height: '100%',
            }}
          >
            <OutReachCtxProvider
              selcandidate={
                !emailOutReach
                  ? null
                  : {
                      candidateId: selectedCandidate.id,
                      candOverview: selectedCandidate.title,
                      email: selectedCandidate.email,
                      firstName: selectedCandidate.first_name,
                      lastName: selectedCandidate.last_name,
                    }
              }
            >
              <EmailOutReach
                onClose={() => {
                  setToggleOutreach(false);
                }}
              />
            </OutReachCtxProvider>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}

export default CandidateDetail;
