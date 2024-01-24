import { Avatar, Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  CandidateDialog,
  CandidateExperience,
  CdExperienceCard,
  EmailOutReach,
} from '@/devlink';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import { palette } from '@/src/context/Theme/Theme';
import { useBoundStore } from '@/src/store';
import { getFullName } from '@/src/utils/jsonResume';

import AddToListComp from '../AddToList';
import { Candidate } from '../types';
import MuiAvatar from '../../../Common/MuiAvatar';
import CompanyLogo from '../../../JobApplicationsDashboard/Common/CompanyLogo';

function CandidateDetail({
  handleBookmark,
  emailOutReachHandler,
}: {
  // eslint-disable-next-line no-unused-vars
  handleBookmark: (candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  emailOutReachHandler: (selCandidate: Candidate) => Promise<boolean>;
}) {
  const selectedCandidate = useBoundStore((state) => state.selectedCandidate);
  const setSelectedCandidate = useBoundStore(
    (state) => state.setSelectedCandidate,
  );
  const candidates = useBoundStore((state) => state.candidates);
  const candidateHistory = useBoundStore((state) => state.candidateHistory);
  const [emailFetch, setEmailFetch] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (emailFetch || emailError) {
      setEmailFetch(false);
      setEmailError(false);
    }
  }, [selectedCandidate]);

  return (
    <Stack
      sx={{
        borderLeft: `1px solid ${palette.grey[200]}`,
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
                  selectedCandidate?.email_fetch_status !== 'unable to fetch'
                }
                isUnableFetch={
                  emailError ||
                  selectedCandidate?.email_fetch_status === 'unable to fetch'
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
            onClickStar={{
              onClick: () => {
                handleBookmark(selectedCandidate);
              },
            }}
            isLinkedinVisible={Boolean(selectedCandidate?.linkedin_url)}
            isPhoneVisible={false}
            isViewResumeVisible={false}
            slotDetails={
              <CandidateExperience
                slotCandidateExperienceCard={selectedCandidate?.employment_history.map(
                  (exp, ind) => {
                    return (
                      <CdExperienceCard
                        key={exp.id}
                        textRole={exp.organization_name}
                        isLogoVisible={
                          selectedCandidate?.organization?.id ===
                          exp?.organization_id
                        }
                        isActive={ind === 0}
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
                        textDate={`${dayjs(exp.start_date).format(
                          'MMM YYYY',
                        )} - ${
                          exp.end_date
                            ? dayjs(exp.end_date).format('MMM YYYY')
                            : 'Present'
                        }`}
                      />
                    );
                  },
                )}
              />
            }
            textName={selectedCandidate?.name}
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
                variant={'rounded'}
                width={'100%'}
                height={'100%'}
                fontSize={'12px'}
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
