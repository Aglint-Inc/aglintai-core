import { AllCandidateListItem } from '@/devlink2';
import { TopCandidateListItem } from '@/devlink2/TopCandidateListItem';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';

import CandidateAvatar from '../Common/CandidateAvatar';
import InterviewScore from '../Common/InterviewScore';
import ResumeScore from '../Common/ResumeScore';
import { capitalize, formatTimeStamp, getCandidateName } from '../utils';

const ApplicationCard = ({
  section,
  detailedView,
  application,
  index,
  checkList,
  handleSelect,
  isInterview,
  handleOpenDetails,
  isSelected = false,
}: {
  section: JobApplicationSections;
  detailedView: boolean;
  application: JobApplication;
  index: number;
  checkList: Set<string>;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (index: number) => void;
  isInterview: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpenDetails: () => void;
  isSelected: boolean;
}) => {
  const creationDate = formatTimeStamp(application.created_at);
  const handleCheck = () => {
    handleSelect(index);
  };
  const profile = <CandidateAvatar application={application} fontSize={12} />;
  const resumeScore = <ResumeScore application={application} />;
  const interviewScore =
    section === JobApplicationSections.NEW ? (
      <></>
    ) : (
      <InterviewScore application={application} />
    );
  const isChecked = checkList.has(application.application_id);
  const name = getCandidateName(
    application.candidates.first_name,
    application.candidates.last_name,
  );
  const summary = (application?.json_resume as any)?.overview ?? '---';
  const strength = (application?.json_resume as any)?.strength ?? '---';
  const weakness = (application?.json_resume as any)?.weakness ?? '---';
  return detailedView ? (
    <AllCandidateListItem
      onclickSelect={{ onClick: handleCheck }}
      isChecked={isChecked}
      slotProfileImage={profile}
      name={name}
      jobTitle={
        application.candidates.job_title
          ? capitalize(application.candidates.job_title)
          : '---'
      }
      slotResumeScore={resumeScore}
      email={application.candidates.email || '---'}
      phone={application.candidates.phone || '---'}
      isInterviewVisible={isInterview}
      slotInterviewScore={interviewScore}
      appliedDate={creationDate}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
      isHighlighted={isSelected}
    />
  ) : (
    <TopCandidateListItem
      onclickSelect={{ onClick: handleCheck }}
      name={name}
      isChecked={isChecked}
      isHighlighted={isSelected}
      slotProfileImage={profile}
      slotScores={
        <>
          {resumeScore}
          {interviewScore}
        </>
      }
      summary={summary}
      strength={strength}
      weakness={weakness}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
    />
  );
};

export default ApplicationCard;
