import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { CandidateDetails, CandidateSideDrawer } from '@/devlink';
import { SummaryBlock } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import {
  AnalysisBlockSection,
  NewEducationDetails,
  NewExperienceDetails,
  NewSkillDetails
} from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import EmailIcon from '@/src/components/JobApplicationsDashboard/Common/Icons/emailIcon';
import LinkedInIcon from '@/src/components/JobApplicationsDashboard/Common/Icons/linkedinIcon';
import PhoneIcon from '@/src/components/JobApplicationsDashboard/Common/Icons/phoneIcon';
import CopyWrapper from '@/src/components/JobApplicationsDashboard/Common/Wrappers/copyWrapper';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { setIsViewProfileOpen, useSchedulingApplicationStore } from '../store';

function CandidateDetailsJobDrawer() {
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const isViewProfileOpen = useSchedulingApplicationStore(
    (state) => state.isViewProfileOpen
  );

  const application: JobApplication = useMemo(
    () =>
      ({
        ...selectedApplication?.applications,
        candidates: selectedApplication?.candidates,
        candidate_files: selectedApplication?.file
      }) as unknown as JobApplication,
    [
      selectedApplication?.applications,
      selectedApplication?.candidates,
      selectedApplication?.file
    ]
  );

  const resumeJson: any = useMemo(
    () => selectedApplication?.file?.resume_json,
    [selectedApplication?.file?.resume_json]
  );

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isViewProfileOpen}
        onClose={() => {
          setIsViewProfileOpen(false);
        }}
      >
        <CandidateSideDrawer
          textAppliedOn={dayjs(
            selectedApplication.applications.created_at
          ).format('DD MMM YYYY')}
          isNavigationButtonVisible={false}
          slotSocialLink={
            <>
              {selectedApplication.candidates.linkedin && (
                <CopyWrapper content={selectedApplication.candidates.linkedin}>
                  <LinkedInIcon />
                </CopyWrapper>
              )}
              {selectedApplication.candidates.phone && (
                <CopyWrapper content={selectedApplication.candidates.phone}>
                  <PhoneIcon />
                </CopyWrapper>
              )}
              {selectedApplication.candidates.email && (
                <CopyWrapper content={selectedApplication.candidates.email}>
                  <EmailIcon />
                </CopyWrapper>
              )}
            </>
          }
          slotCandidateImage={
            <MuiAvatar
              src={selectedApplication.candidates.avatar}
              level={selectedApplication.candidates.first_name}
              variant='circular'
              height='24px'
              width='24px'
              fontSize='8px'
            />
          }
          isLocationVisible={Boolean(selectedApplication.candidates.country)}
          isResumeVisible={Boolean(selectedApplication.file.file_url)}
          isRoleVisible={Boolean(resumeJson.currentJobTitle)}
          onClickResume={{
            onClick: () => {
              window.open(selectedApplication.file.file_url, '_blank');
            }
          }}
          textRole={resumeJson.currentJobTitle || ''}
          textName={`${selectedApplication.candidates.first_name || ''} ${selectedApplication.candidates.last_name || ''}`}
          textLocation={[
            selectedApplication.candidates.city,
            selectedApplication.candidates.state,
            selectedApplication.candidates.country
          ]
            .filter(Boolean)
            .join(', ')}
          isOverviewVisible={resumeJson.overview}
          slotOverview={
            <>
              <SummaryBlock
                arrowProps={{
                  style: {
                    display: 'none'
                  }
                }}
                title={'Overview'}
                description={resumeJson.overview}
              />
            </>
          }
          slotCandidateDetails={
            <CandidateDetails
              slotInterviewScore={
                <>
                  <AnalysisBlockSection application={application} />
                  <NewExperienceDetails
                    positions={resumeJson.positions}
                    relevance={
                      (selectedApplication.applications.score_json as any)
                        ?.relevance?.positions
                    }
                  />
                  <NewEducationDetails
                    schools={resumeJson.schools}
                    relevance={
                      (selectedApplication.applications.score_json as any)
                        ?.relevance?.schools
                    }
                  />
                  <NewSkillDetails
                    skills={resumeJson.skills}
                    relevance={
                      (selectedApplication.applications.score_json as any)
                        ?.skills
                    }
                  />
                </>
              }
            />
          }
        />
      </Drawer>
    </>
  );
}

export default CandidateDetailsJobDrawer;
