/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import posthog from 'posthog-js';
import React, { useMemo } from 'react';

import { CandidateSkillPills } from '@/devlink';
import {
  AllCandidateListItem,
  AnalysisBlock,
  AnalysisPill,
  InsightTagAmbitious,
  InsightTagEmpty,
  // InsightTagAmbitious,
  InsightTagExperienced,
  InsightTagKnowledgeable,
  InsightTagLeader,
  InsightTagReliable,
  // InsightTagReliable,
  InsightTagSkilled,
  RcCheckbox,
  ScreeningStatus
} from '@/devlink2';
import { TopCandidateListItem } from '@/devlink2/TopCandidateListItem';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
  ScoreJson
} from '@/src/context/JobApplicationsContext/types';

import { InvitedIcon } from './Icons/invited';
import { SubmittedIcon } from './Icons/submitted';
import { UninvitedIcon } from './Icons/uninvited';
import CandidateAvatar from '../Common/CandidateAvatar';
import InterviewScore from '../Common/InterviewScore';
import ResumeScore from '../Common/ResumeScore';
import {
  analysisRatings,
  capitalize,
  formatTimeStamp,
  getCandidateDetails,
  getDisqualificationStatus,
  getScreeningStatus,
  mapScoreToAnalysis
} from '../utils';
import ListCardInterviewSchedule from '../../Scheduling/AllSchedules/ListCard';

const ApplicationCard = ({
  detailedView,
  application,
  index,
  handleSelect,
  handleOpenDetails,
  isSelected = false
}: {
  detailedView: boolean;
  application: JobApplication;
  index: number;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (index: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleOpenDetails: () => void;
  isSelected: boolean;
}) => {
  const {
    cardStates: {
      checkList: { list }
    },
    views,
    section
  } = useJobApplications();
  const creationDate = formatTimeStamp(application?.applied_at || null);
  const handleCheck = () => {
    handleSelect(index);
  };
  const profile = <CandidateAvatar application={application} fontSize={12} />;
  const resumeScore = <ResumeScore application={application} />;
  const interviewScore = <InterviewScore application={application} />;
  const isChecked = list.has(application.id);
  const overview =
    (application?.candidate_files?.resume_json as any)?.overview ?? '---';
  const [key1, key2] = useMemo(
    () => [Math.random(), Math.random()],
    [list.has(application.id)]
  );

  const name = getCandidateDetails(application, 'name');
  const jobTitle = getCandidateDetails(application, 'job_title');
  const location = getCandidateDetails(application, 'location');
  return !detailedView ? (
    views.interview ? (
      <ListCardInterviewSchedule
        isSelected={isSelected}
        app={
          {
            ...application,
            public_jobs: { id: application.job_id, job_title: jobTitle.value }
          } as any
        }
        isJobDasboard={true}
        onClickCard={() => {
          posthog.capture('candidate card clicked');
          handleOpenDetails();
        }}
        slotCheckbox={
          <RcCheckbox
            onclickCheck={{ onClick: handleCheck }}
            isChecked={isChecked}
            text={<></>}
          />
        }
      />
    ) : (
      <AllCandidateListItem
        key={key1}
        onclickSelect={{ onClick: handleCheck }}
        isChecked={isChecked}
        slotProfileImage={profile}
        name={name.value}
        jobTitle={jobTitle.value}
        location={location.value}
        slotResumeScore={resumeScore}
        isInterviewVisible={views.assessment}
        slotAssessmentScore={interviewScore}
        appliedDate={creationDate}
        onclickCandidate={{
          onClick: () => {
            posthog.capture('candidate card clicked');
            handleOpenDetails();
          }
        }}
        isHighlighted={isSelected}
        experience={getExperienceCount(
          (application.candidate_files?.resume_json as any)?.basics
            ?.totalExperience
        )}
        isScreeningVisible={views.screening}
        slotScreening={<ScreeningStatusComponent application={application} />}
        isDisqualifiedVisible={section === JobApplicationSections.DISQUALIFIED}
        slotDisqualified={
          <DisqualificationComponent application={application} />
        }
      />
    )
  ) : (
    <TopCandidateListItem
      key={key2}
      slotProfileImage={profile}
      onclickSelect={{ onClick: handleCheck }}
      name={name.value}
      isChecked={isChecked}
      isHighlighted={isSelected}
      slotScores={
        <>
          {resumeScore}
          {/* {interviewScore} */}
        </>
      }
      overview={overview}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        }
      }}
      slotInsights={<Insights application={application} />}
      slotAnalysis={
        <AnalysisSection score_json={application.score_json as ScoreJson} />
      }
    />
  );
};

const AnalysisSection: React.FC<{ score_json: ScoreJson }> = ({
  score_json
}) => {
  const reasoning = score_json?.reasoning ?? null;
  const scores = score_json?.scores ?? null;
  if (!reasoning || !scores) return <>---</>;
  const analyses = Object.entries(score_json.scores).map(([key, value], i) => {
    const reasoningKey = mapScoreToAnalysis(key as keyof ScoreJson['scores']);
    if (
      key &&
      typeof value === 'number' &&
      (score_json?.reasoning[reasoningKey] ?? null)
    ) {
      return (
        <>
          <AnalysisBlock
            slotAnalysisPill={<AnalysisPillComponent score={value} />}
            key={i}
            description={reasoning[reasoningKey]}
            title={capitalize(key)}
          />
        </>
      );
    }
  });
  return <>{analyses}</>;
};

const DisqualificationComponent: React.FC<{ application: JobApplication }> = ({
  application
}) => {
  const {
    emailValidity: { isFetching, isValidEmail }
  } = application;
  const { views } = useJobApplications();
  const { isNotInvited, timeInfo, disqualificationStatus } = useMemo(
    () => getDisqualificationStatus(application.status_emails_sent),
    [
      ...Object.values(application?.status_emails_sent ?? {}),
      application.phone_screening
    ]
  );
  if (!views.disqualified) return <></>;
  if (isFetching) return <FetchingEmail />;
  if (!isValidEmail) return <InavlidEmail />;
  if (isNotInvited)
    return (
      <ScreeningStatus
        slotIcon={<UninvitedIcon />}
        isDurationVisible={false}
        textStatus={
          <Stack style={{ color: '#68737D' }}>{disqualificationStatus}</Stack>
        }
      />
    );
  return (
    <ScreeningStatus
      slotIcon={<InvitedIcon />}
      isDurationVisible={true}
      textStatus={disqualificationStatus}
      textDuration={timeInfo}
    />
  );
};

export const ScreeningStatusComponent: React.FC<{
  application: JobApplication;
}> = ({ application }) => {
  const {
    emailValidity: { isFetching, isValidEmail }
  } = application;
  const { isNotInvited, isPending, timeInfo, screeningStatus } = useMemo(
    () =>
      getScreeningStatus(
        application.status_emails_sent,
        application.phone_screening
      ),
    [
      ...Object.values(application?.status_emails_sent ?? {}),
      application.phone_screening
    ]
  );
  if (isFetching) return <FetchingEmail />;
  if (!isValidEmail) return <InavlidEmail />;
  if (isNotInvited)
    return (
      <ScreeningStatus
        slotIcon={<UninvitedIcon />}
        isDurationVisible={false}
        textStatus={
          <Stack style={{ color: '#68737D' }}>{screeningStatus}</Stack>
        }
      />
    );
  if (isPending)
    return (
      <ScreeningStatus
        slotIcon={<InvitedIcon />}
        isDurationVisible={true}
        textStatus={screeningStatus}
        textDuration={timeInfo}
      />
    );
  return (
    <ScreeningStatus
      slotIcon={<SubmittedIcon />}
      isDurationVisible={true}
      textStatus={screeningStatus}
      textDuration={timeInfo}
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
                application.candidate_files.resume_json
              )
            )
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
  resume: any
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
  relevance: ScoreJson['relevance']['schools']
) => {
  const educationList =
    Array.isArray(schools) &&
    schools
      .filter(
        (e) =>
          e.institution &&
          typeof e.institution === 'string' &&
          e.institution.trim() !== ''
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
            />
          );
        return acc;
      }, []);
  return educationList;
};

const getPositionPills = (
  positions,
  relevance: ScoreJson['relevance']['positions']
) => {
  const positionsList =
    Array.isArray(positions) &&
    positions
      .filter(
        (e) => e.title && typeof e.title === 'string' && e.title.trim() !== ''
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
            />
          );
        return acc;
      }, []);
  return positionsList;
};

export const AnalysisPillComponent: React.FC<{ score: number }> = ({
  score
}) => {
  if (typeof score !== 'number') return <></>;
  const { color, high, low, medium, value: text } = analysisRatings(score);
  return (
    <AnalysisPill
      isPoor={low}
      isAverage={medium}
      isHigh={high}
      score={text}
      scoreProps={{ style: { color } }}
    />
  );
};

const badgePriority = [
  'leadership',
  'jobStability',
  'careerGrowth',
  'positions',
  'skills',
  'schools'
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

export const FetchingEmail = () => {
  return <>---</>;
};

export const InavlidEmail = () => {
  return (
    <ScreeningStatus
      slotIcon={<UninvitedIcon />}
      isDurationVisible={false}
      textStatus={<Stack style={{ color: '#68737D' }}>{'Invalid email'}</Stack>}
    />
  );
};

export default ApplicationCard;
