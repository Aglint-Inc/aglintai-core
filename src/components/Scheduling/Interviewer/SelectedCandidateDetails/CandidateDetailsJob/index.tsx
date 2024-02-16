import dayjs from 'dayjs';
import { useMemo } from 'react';

import { CandidateDetails, CandidateSideDrawer } from '@/devlink';
import { SummaryBlock } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import {
  AnalysisBlockSection,
  NewEducationDetails,
  NewExperienceDetails,
  NewSkillDetails,
} from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import EmailIcon from '@/src/components/JobApplicationsDashboard/Common/Icons/emailIcon';
import LinkedInIcon from '@/src/components/JobApplicationsDashboard/Common/Icons/linkedinIcon';
import PhoneIcon from '@/src/components/JobApplicationsDashboard/Common/Icons/phoneIcon';
import CopyWrapper from '@/src/components/JobApplicationsDashboard/Common/Wrappers/copyWrapper';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { useInterviewerStore } from '../../store';

function CandidateDetailsJob() {
  const selectedSchedule = useInterviewerStore(
    (state) => state.selectedSchedule,
  );

  const application: JobApplication = useMemo(
    () =>
      ({
        ...selectedSchedule?.applications,
        candidates: selectedSchedule?.candidate,
        candidate_files: selectedSchedule?.file,
      }) as unknown as JobApplication,
    [
      selectedSchedule?.applications,
      selectedSchedule?.candidate,
      selectedSchedule?.file,
    ],
  );

  const resumeJson: any = useMemo(
    () => selectedSchedule?.file?.resume_json,
    [selectedSchedule?.file?.resume_json],
  );

  return (
    <>
      <CandidateSideDrawer
        textAppliedOn={dayjs(selectedSchedule.applications.created_at).format(
          'DD MMM YYYY',
        )}
        isNavigationButtonVisible={false}
        slotSocialLink={
          <>
            {selectedSchedule.candidate.linkedin && (
              <CopyWrapper content={selectedSchedule.candidate.linkedin}>
                <LinkedInIcon />
              </CopyWrapper>
            )}
            {selectedSchedule.candidate.phone && (
              <CopyWrapper content={selectedSchedule.candidate.phone}>
                <PhoneIcon />
              </CopyWrapper>
            )}
            {selectedSchedule.candidate.email && (
              <CopyWrapper content={selectedSchedule.candidate.email}>
                <EmailIcon />
              </CopyWrapper>
            )}
          </>
        }
        slotCandidateImage={
          <MuiAvatar
            src={selectedSchedule.candidate.avatar}
            level={selectedSchedule.candidate.first_name}
            variant='circular'
            height='24px'
            width='24px'
            fontSize='8px'
          />
        }
        isLocationVisible={Boolean(selectedSchedule.candidate.country)}
        isResumeVisible={Boolean(selectedSchedule.file.file_url)}
        isRoleVisible={Boolean(resumeJson.currentJobTitle)}
        onClickResume={{
          onClick: () => {
            window.open(selectedSchedule.file.file_url, '_blank');
          },
        }}
        textRole={resumeJson.currentJobTitle || ''}
        textName={`${selectedSchedule.candidate.first_name || ''} ${selectedSchedule.candidate.last_name || ''}`}
        textLocation={[
          selectedSchedule.candidate.city,
          selectedSchedule.candidate.state,
          selectedSchedule.candidate.country,
        ]
          .filter(Boolean)
          .join(', ')}
        isOverviewVisible={resumeJson.overview}
        slotOverview={
          <>
            <SummaryBlock
              arrowProps={{
                style: {
                  display: 'none',
                },
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
                    selectedSchedule.applications.score_json?.relevance
                      ?.positions
                  }
                />
                <NewEducationDetails
                  schools={resumeJson.schools}
                  relevance={
                    selectedSchedule.applications.score_json?.relevance?.schools
                  }
                />
                <NewSkillDetails
                  skills={resumeJson.skills}
                  relevance={
                    selectedSchedule.applications.score_json?.relevance?.skills
                  }
                />
              </>
            }
          />
        }
      />
    </>
  );
}

export default CandidateDetailsJob;
