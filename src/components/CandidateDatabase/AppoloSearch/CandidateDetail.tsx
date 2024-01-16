import { Avatar, Stack } from '@mui/material';
import dayjs from 'dayjs';

import {
  CandidateDialog,
  CandidateExperience,
  CandidateExperienceCard,
} from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { useBoundStore } from '@/src/store';
import { getFullName } from '@/src/utils/jsonResume';

import { Candidate, CandidateSearchHistoryType } from './types';
import MuiAvatar from '../../Common/MuiAvatar';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';

function CandidateDetail({
  selectedCandidate,
  setSelectedCandidate,
  candidates,
  candidateHistory,
  handleBookmark,
  emailOutReachHandler,
}: {
  selectedCandidate: Candidate;
  // eslint-disable-next-line no-unused-vars
  setSelectedCandidate: (candidate: Candidate) => void;
  candidates: Candidate[];
  candidateHistory: CandidateSearchHistoryType;
  // eslint-disable-next-line no-unused-vars
  handleBookmark: (candidate: Candidate) => void;
  emailOutReach: boolean;
  // eslint-disable-next-line no-unused-vars
  setEmailOutReach: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  emailOutReachHandler: (selCandidate: Candidate) => void;
}) {
  // eslint-disable-next-line no-unused-vars
  const setCandidateHistory = useBoundStore(
    (state) => state.setCandidateHistory,
  );

  return (
    <Stack
      sx={{
        borderLeft: `1px solid ${palette.grey[200]}`,
      }}
    >
      {selectedCandidate && (
        <>
          <Stack sx={{ overflowY: 'scroll', height: 'calc(100vh - 64px)' }}>
            <CandidateDialog
              textPhone={
                selectedCandidate.phone_numbers &&
                (selectedCandidate.phone_numbers[0]?.sanitized_number ||
                  selectedCandidate.phone_numbers[0]?.raw_number)
              }
              slotAddJob={''}
              onClickEmailOutreach={{
                onClick: async () => {
                  await emailOutReachHandler(selectedCandidate);
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
              isStarActive={
                candidateHistory.bookmarked_results?.filter(
                  (cand: Candidate) => cand.id === selectedCandidate.id,
                ).length > 0
              }
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
              onClickGit={{
                onClick: () => {
                  window.open(selectedCandidate.github_url, '_blank');
                },
              }}
              isGitVisible={Boolean(selectedCandidate.github_url)}
              onClickFacebook={{
                onClick: () => {
                  window.open(selectedCandidate.facebook_url, '_blank');
                },
              }}
              isFacebookVisible={Boolean(selectedCandidate.facebook_url)}
              onClickTwitter={{
                onClick: () => {
                  window.open(selectedCandidate.twitter_url, '_blank');
                },
              }}
              isTwitterVisible={Boolean(selectedCandidate.twitter_url)}
              isOverviewVisible={false}
              onClickLinkedin={{
                onClick: () => {
                  window.open(selectedCandidate.linkedin_url, '_blank');
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
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default CandidateDetail;
