/* eslint-disable security/detect-object-injection */
import {
  AllCandidateListItem,
  InsightTagAmbitious,
  InsightTagEmpty,
  // InsightTagAmbitious,
  InsightTagExperienced,
  InsightTagKnowledgeable,
  InsightTagLeader,
  InsightTagReliable,
  // InsightTagReliable,
  InsightTagSkilled,
} from '@/devlink2';
import { TopCandidateListItem } from '@/devlink2/TopCandidateListItem';
import {
  JdScore,
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
  return !detailedView ? (
    <AllCandidateListItem
      onclickSelect={{ onClick: handleCheck }}
      isChecked={isChecked}
      slotProfileImage={profile}
      name={name}
      jobTitle={
        (application.json_resume as any)?.basics?.currentJobTitle
          ? capitalize((application.json_resume as any).basics.currentJobTitle)
          : '---'
      }
      location={
        (application.json_resume as any)?.basics?.location
          ? capitalize((application.json_resume as any).basics.location)
          : '---'
      }
      slotResumeScore={resumeScore}
      email={application.candidates.email || '---'}
      phone={application.candidates.phone || '---'}
      isInterviewVisible={isInterview}
      slotAssessmentScore={interviewScore}
      appliedDate={creationDate}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
      isHighlighted={isSelected}
      experience={getExperienceCount(
        (application.json_resume as any)?.basics?.totalExperience,
      )}
    />
  ) : (
    <TopCandidateListItem
      onclickSelect={{ onClick: handleCheck }}
      name={name}
      isChecked={isChecked}
      isHighlighted={isSelected}
      slotScores={
        <>
          {resumeScore}
          {interviewScore}
        </>
      }
      summary={summary}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
      slotInsights={<Insights jdScore={application.jd_score as JdScore} />}
    />
  );
};

const getExperienceCount = (months: number) => {
  return months ? Math.trunc(months / 12) : '---';
};

const Insights = ({ jdScore }: { jdScore: JdScore }) => {
  if (jdScore?.badges) {
    const badgeList = badgePriority
      .reduce((acc, curr) => {
        if (jdScore.badges[curr])
          acc.push(getBadge(curr, jdScore.badges[curr]));
        return acc;
      }, [])
      .filter((f) => f);
    const hasBadges = badgeList.length !== 0;
    return hasBadges ? <>{badgeList}</> : <InsightTagEmpty />;
  }
  return <InsightTagEmpty />;
};

const badgePriority = [
  'leadership',
  'jobStability',
  'careerGrowth',
  'positions',
  'skills',
  'schools',
];

const getBadge = (key: string, count: number) => {
  switch (key) {
    case 'skills':
      return <InsightTagSkilled experience={count} />;
    case 'schools':
      return <InsightTagKnowledgeable experience={count} />;
    case 'positions':
      return <InsightTagExperienced experience={count} />;
    case 'leadership':
      return count >= 70 ? <InsightTagLeader /> : null;
    case 'jobStability':
      return count >= 90 ? <InsightTagReliable /> : null;
    case 'careerGrowth':
      return count >= 90 ? <InsightTagAmbitious /> : null;
  }
};

export default ApplicationCard;
