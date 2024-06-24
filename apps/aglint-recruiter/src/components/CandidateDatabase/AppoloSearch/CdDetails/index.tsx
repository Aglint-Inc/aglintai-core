import { Avatar, Collapse, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { CandidateDialog } from '@/devlink/CandidateDialog';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { CdExperienceCard } from '@/devlink/CdExperienceCard';
import { EmailOutReach } from '@/devlink/EmailOutReach';
import LoaderGrey from '@/public/lottie/LoaderGrey';
import CompanyLogo from '@/src/components/Common/CompanyLogo';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MuiAvatar from '../../../Common/MuiAvatar';
import AddToListComp from '../AddToList';
import {
  setCandidates,
  setEmailOutReach,
  setSelectedCandidate,
  useCandidateStore,
} from '../store';
import { Candidate } from '../types';
import { updateCredits } from '../utils';

function CandidateDetail() {
  const selectedCandidate = useCandidateStore(
    (state) => state.selectedCandidate,
  );
  const candidates = useCandidateStore((state) => state.candidates);
  const candidateHistory = useCandidateStore((state) => state.candidateHistory);
  const [emailFetch, setEmailFetch] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (emailFetch || emailError) {
      setEmailFetch(false);
      setEmailError(false);
    }
  }, [selectedCandidate]);

  const emailOutReachHandler = async (
    selCandidate: Candidate,
  ): Promise<boolean> => {
    if (selCandidate.email_fetch_status == 'not fetched') {
      const resEmail = await axios.post('/api/candidatedb/get-email', {
        id: selCandidate.id,
      });

      if (resEmail.status !== 200) {
        toast.error('Unable to fetch email. Please try again.');
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

  return (
    <Stack
      sx={{
        borderLeft: `1px solid var(--neutral-6)`,
      }}
    >
      <Collapse in={Boolean(selectedCandidate)} orientation='horizontal'>
        <Stack sx={{ overflowY: 'scroll', height: 'calc(100vh - 64px)' }}>
          <CandidateDialog
            isAddListVisible={true}
            slotAddtoList={<AddToListComp isSaveToList={false} />}
            slotEmailOutReach={
              <EmailOutReach
                slotLoaderIcon={
                  <Stack sx={{ mt: '-4px' }}>
                    <LoaderGrey />
                  </Stack>
                }
                isEmailOutreachVisible={
                  !emailFetch &&
                  !emailError &&
                  selectedCandidate?.email_fetch_status !== 'unable to fetch' &&
                  selectedCandidate?.email_status !== 'unavailable'
                }
                isUnableFetch={
                  emailError ||
                  selectedCandidate?.email_fetch_status === 'unable to fetch' ||
                  selectedCandidate?.email_status === 'unavailable'
                }
                isFetchingVisible={emailFetch}
                onClickEmailOutreach={{
                  onClick: async () => {
                    setEmailFetch(true);
                    const res = await emailOutReachHandler(selectedCandidate);
                    if (!res) {
                      setEmailError(true);
                    }
                    setEmailFetch(false);
                  },
                }}
              />
            }
            isBookmarkVisible={false}
            slotAddJob={''}
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
            isStarActive={candidateHistory?.bookmarked_candidates?.includes(
              selectedCandidate?.id,
            )}
            isLinkedinVisible={Boolean(selectedCandidate?.linkedin_url)}
            isPhoneVisible={false}
            isViewResumeVisible={false}
            slotDetails={
              <CandidateExperience
                isArrowVisible={false}
                slotCandidateExperienceCard={selectedCandidate?.employment_history.map(
                  (exp, ind) => {
                    return (
                      <>
                        {ind === 0 && <Stack pt={'var(--space-2)'}></Stack>}
                        <CdExperienceCard
                          key={exp.id}
                          textRole={exp.organization_name}
                          isLogoVisible={
                            selectedCandidate?.organization?.id ===
                            exp?.organization_id
                          }
                          isActive={
                            ind === 0 &&
                            selectedCandidate?.organization?.id ===
                              exp?.organization_id
                          }
                          slotLogo={
                            <Avatar
                              variant='rounded'
                              src={selectedCandidate?.organization?.logo_url}
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
                      </>
                    );
                  },
                )}
              />
            }
            textName={selectedCandidate?.name || '--'}
            textJobRoleAtCompany={selectedCandidate?.title}
            textLocation={[
              selectedCandidate?.city,
              selectedCandidate?.state,
              selectedCandidate?.country,
            ]
              .filter(Boolean)
              .join(', ')}
            isAddedToJobVisible={false}
            slotAvatar={
              <MuiAvatar
                level={getFullName(selectedCandidate?.name, '')}
                src={
                  selectedCandidate?.photo_url?.includes('static')
                    ? null
                    : selectedCandidate?.photo_url
                }
                variant={'rounded-small'}
              />
            }
            onClickGit={{
              onClick: () => {
                window.open(selectedCandidate?.github_url, '_blank');
              },
            }}
            isGitVisible={Boolean(selectedCandidate?.github_url)}
            onClickFacebook={{
              onClick: () => {
                window.open(selectedCandidate?.facebook_url, '_blank');
              },
            }}
            isFacebookVisible={Boolean(selectedCandidate?.facebook_url)}
            onClickTwitter={{
              onClick: () => {
                window.open(selectedCandidate?.twitter_url, '_blank');
              },
            }}
            isTwitterVisible={Boolean(selectedCandidate?.twitter_url)}
            isOverviewVisible={false}
            onClickLinkedin={{
              onClick: () => {
                window.open(selectedCandidate?.linkedin_url, '_blank');
              },
            }}
            onClickPhone={{
              onClick: () => {
                navigator.clipboard.writeText(
                  selectedCandidate?.phone_numbers[0].raw_number,
                );
              },
            }}
          />
        </Stack>
      </Collapse>
    </Stack>
  );
}

export default CandidateDetail;
