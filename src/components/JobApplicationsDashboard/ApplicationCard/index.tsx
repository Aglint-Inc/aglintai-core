/* eslint-disable security/detect-object-injection */
import posthog from 'posthog-js';
import React, { useMemo } from 'react';

import { CandidateSkillPills } from '@/devlink';
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
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';

import CandidateAvatar from '../Common/CandidateAvatar';
import InterviewScore from '../Common/InterviewScore';
import ResumeScore from '../Common/ResumeScore';
import {
  capitalize,
  formatTimeStamp,
  getCandidateName,
  getReasonings,
  getScreeningStatus,
} from '../utils';

const ApplicationCard = ({
  detailedView,
  application,
  index,
  handleSelect,
  isInterview,
  handleOpenDetails,
  isSelected = false,
}: {
  detailedView: boolean;
  application: JobApplication;
  index: number;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (index: number) => void;
  isInterview: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpenDetails: () => void;
  isSelected: boolean;
}) => {
  const {
    section,
    cardStates: {
      checkList: { list },
    },
    showInterview,
  } = useJobApplications();
  const creationDate = formatTimeStamp(application?.applied_at || null);
  const handleCheck = () => {
    handleSelect(index);
  };
  const profile = <CandidateAvatar application={application} fontSize={12} />;
  const resumeScore = <ResumeScore application={application} />;
  const interviewScore = showInterview ? (
    <InterviewScore application={application} />
  ) : (
    <></>
  );
  const isChecked = list.has(application.id);
  const name = getCandidateName(
    application.candidates.first_name,
    application.candidates.last_name,
  );
  const overview =
    (application?.candidate_files?.resume_json as any)?.overview ?? '---';
  const analysis = getReasonings(
    (application?.score_json as ScoreJson)?.reasoning || null,
  );
  const { isNotInvited, isPending, isSubmitted } =
    getScreeningStatus(application);
  const [key1, key2] = useMemo(
    () => [Math.random(), Math.random()],
    [list.has(application.id)],
  );
  return !detailedView ? (
    <AllCandidateListItem
      key={key1}
      onclickSelect={{ onClick: handleCheck }}
      isChecked={isChecked}
      slotProfileImage={profile}
      name={name}
      jobTitle={
        (application.candidate_files?.resume_json as any)?.basics
          ?.currentJobTitle
          ? capitalize(
              (application.candidate_files?.resume_json as any).basics
                .currentJobTitle,
            )
          : '---'
      }
      location={
        (application.candidate_files?.resume_json as any)?.basics?.location
          ?.city
          ? capitalize(
              (application.candidate_files?.resume_json as any).basics.location
                .city,
            )
          : '---'
      }
      slotResumeScore={resumeScore}
      isInterviewVisible={isInterview}
      slotAssessmentScore={interviewScore}
      appliedDate={creationDate}
      onclickCandidate={{
        onClick: () => {
          posthog.capture('candidate card clicked');
          handleOpenDetails();
        },
      }}
      isHighlighted={isSelected}
      experience={getExperienceCount(
        (application.candidate_files?.resume_json as any)?.basics
          ?.totalExperience,
      )}
      isScreeningVisible={section !== JobApplicationSections.NEW}
      isScreenStatusPending={isPending}
      isScreenStatusSubmitted={isSubmitted}
      isScreeningStatusNotInvited={isNotInvited}
    />
  ) : (
    <TopCandidateListItem
      key={key2}
      slotProfileImage={profile}
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
      overview={overview}
      analysis={analysis}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
      slotInsights={<Insights application={application} />}
    />
  );
};

const getExperienceCount = (months: number) => {
  return months ? Math.trunc(months / 12) : '---';
};

const Insights = ({ application }: { application: JobApplication }) => {
  const jdScore = application.score_json as ScoreJson;
  if (jdScore?.badges) {
    const badgeList = badgePriority
      .reduce((acc, curr: keyof ScoreJson['badges']) => {
        if (jdScore.badges[curr])
          acc.push(
            getBadge(
              curr,
              jdScore.badges[curr],
              getPills(
                curr,
                jdScore.relevance,
                application.candidate_files.resume_json,
              ),
            ),
          );
        return acc;
      }, [])
      .filter((f) => f);
    const hasBadges = badgeList.length !== 0;
    return hasBadges ? <>{badgeList}</> : <InsightTagEmpty />;
  }
  return <InsightTagEmpty />;
};

const getPills = (
  badge: keyof ScoreJson['badges'],
  relevance: ScoreJson['relevance'],
  resume: any,
) => {
  switch (badge) {
    case 'skills':
      return getSkillPills(relevance.skills);
    case 'schools':
      return getEducationPills(resume.schools, relevance.schools);
    case 'positions':
      return getPositionPills(resume.positions, relevance.positions);
    default:
      return [];
  }
};

const getSkillPills = (skills: ScoreJson['relevance']['skills']) => {
  return Object.entries(skills).reduce((acc, [key, value], i) => {
    if (value === 'high')
      acc.push(<CandidateSkillPills key={i} textSkill={key} />);
    return acc;
  }, []);
};

const getEducationPills = (
  schools,
  relevance: ScoreJson['relevance']['schools'],
) => {
  const educationList =
    Array.isArray(schools) &&
    schools
      .filter(
        (e) =>
          e.institution &&
          typeof e.institution === 'string' &&
          e.institution.trim() !== '',
      )
      .reduce((acc, e, i) => {
        if (relevance && relevance[i] && relevance[i] === 'high')
          acc.push(
            <CandidateSkillPills
              key={i}
              textSkill={`${
                e.degree &&
                typeof e.degree === 'string' &&
                e.degree.trim() !== ''
                  ? `${e.degree} - `
                  : ''
              }${e.institution}`}
            />,
          );
        return acc;
      }, []);
  return educationList;
};

const getPositionPills = (
  positions,
  relevance: ScoreJson['relevance']['positions'],
) => {
  const positionsList =
    Array.isArray(positions) &&
    positions
      .filter(
        (e) => e.title && typeof e.title === 'string' && e.title.trim() !== '',
      )
      .reduce((acc, e, i) => {
        if (relevance && relevance[i] && relevance[i] === 'high')
          acc.push(
            <CandidateSkillPills
              key={i}
              textSkill={`${e.title}${
                e.org && typeof e.org === 'string' && e.org.trim() !== ''
                  ? ` - ${e.org}`
                  : ''
              }`}
            />,
          );
        return acc;
      }, []);
  return positionsList;
};

const badgePriority = [
  'leadership',
  'jobStability',
  'careerGrowth',
  'positions',
  'skills',
  'schools',
];

const getBadge = (key: string, count: number, pills: any) => {
  switch (key) {
    case 'skills':
      return (
        <InsightTagSkilled
          experience={pills.length}
          slotSkills={<>{pills}</>}
        />
      );
    case 'schools':
      return (
        <InsightTagKnowledgeable
          experience={pills.length}
          slotEducation={<>{pills}</>}
        />
      );
    case 'positions':
      return (
        <InsightTagExperienced
          experience={pills.length}
          slotExperiences={<>{pills}</>}
        />
      );
    case 'leadership':
      return count >= 70 ? <InsightTagLeader /> : null;
    case 'jobStability':
      return count >= 90 ? <InsightTagReliable /> : null;
    case 'careerGrowth':
      return count >= 90 ? <InsightTagAmbitious /> : null;
  }
};

export default ApplicationCard;
