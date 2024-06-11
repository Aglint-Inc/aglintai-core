/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import posthog from 'posthog-js';
import React, { useEffect, useMemo } from 'react';
import { useDrag, useDragLayer, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { CandidateSkillPills } from '@/devlink/CandidateSkillPills';
// import { // AllCandidateListItem } from '@/devlink2/// AllCandidateListItem';
import { AnalysisBlock } from '@/devlink2/AnalysisBlock';
import { AnalysisPill } from '@/devlink2/AnalysisPill';
import { CandidateListItem } from '@/devlink2/CandidateListItem';
import { InsightTagAmbitious } from '@/devlink2/InsightTagAmbitious';
import { InsightTagEmpty } from '@/devlink2/InsightTagEmpty';
// import { // InsightTagAmbitious } from '@/devlink2/// InsightTagAmbitious';
import { InsightTagExperienced } from '@/devlink2/InsightTagExperienced';
import { InsightTagKnowledgeable } from '@/devlink2/InsightTagKnowledgeable';
import { InsightTagLeader } from '@/devlink2/InsightTagLeader';
import { InsightTagReliable } from '@/devlink2/InsightTagReliable';
// import { // InsightTagReliable } from '@/devlink2/// InsightTagReliable';
import { InsightTagSkilled } from '@/devlink2/InsightTagSkilled';
import { JobHopper } from '@/devlink2/JobHopper';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { ScreeningStatus } from '@/devlink2/ScreeningStatus';
import { TopCandidateListItem } from '@/devlink2/TopCandidateListItem';
import { DragPill } from '@/devlink3/DragPill';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { CountJobs } from '@/src/context/JobsContext/types';

import ListCardInterviewSchedule from '../../Scheduling/Candidates/ListCard';
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
  mapScoreToAnalysis,
} from '../utils';
import { InvitedIcon } from './Icons/invited';
import { SubmittedIcon } from './Icons/submitted';
import { UninvitedIcon } from './Icons/uninvited';

const ApplicationCard = ({
  detailedView,
  application,
  index,
  handleSelect,
  handleOpenDetails,
  isSelected = false,
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
    job,
    cardStates: {
      checkList: { list },
    },
    views,
    section,
  } = useJobApplications();
  const creationDate = formatTimeStamp(application?.applied_at || null);
  const handleCheck = () => {
    handleSelect(index);
  };
  const profile = <CandidateAvatar application={application} />;
  // const resumeScore =
  //   job.status === 'draft' ? '---' : <ResumeScore application={application} />;
  const interviewScore = <InterviewScore application={application} />;
  const isChecked = list.has(application.id);
  const overview =
    (application?.candidate_files?.resume_json as any)?.overview ?? '---';
  const [key1, key2] = useMemo(
    () => [Math.random(), Math.random()],
    [isChecked],
  );

  const name = getCandidateDetails(application, 'name');
  const jobTitle = getCandidateDetails(application, 'job_title');
  const location = getCandidateDetails(application, 'location');
  return !detailedView ? (
    views.interview ? (
      <ListCardInterviewSchedule
        slotBookmark={<Banners application={application} />}
        isSelected={isSelected}
        app={
          {
            ...application,
            public_jobs: { id: application.job_id, job_title: jobTitle.value },
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
        isChecked={isChecked}
        // slotResumeScore={<ResumeScore application={application} />}
      />
    ) : (
      <CandidateListItem
        key={key1}
        slotBookmark={<Banners application={application} />}
        isDragVisible={isChecked}
        onClickSelect={{ onClick: handleCheck }}
        isChecked={isChecked}
        slotProfileImage={profile}
        name={name.value}
        jobTitle={jobTitle.value}
        location={location.value}
        // slotResumeScore={resumeScore}
        isInterviewVisible={views.assessment}
        slotAssessmentScore={interviewScore}
        appliedDate={creationDate}
        onClickCandidate={{
          onClick: () => {
            posthog.capture('candidate card clicked');
            handleOpenDetails();
          },
        }}
        isHighlighted={isSelected}
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
      slotBookmark={<Banners application={application} />}
      isDragVisible={isChecked}
      slotProfileImage={profile}
      onclickSelect={{ onClick: handleCheck }}
      name={name.value}
      isChecked={isChecked}
      isHighlighted={isSelected}
      slotScores={
        <>
          {/* {resumeScore} */}
          {/* {interviewScore} */}
        </>
      }
      overview={overview}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
      slotInsights={<Insights application={application} />}
      slotAnalysis={
        <AnalysisSection score_json={application.score_json as ScoreJson} />
      }
    />
  );
};

const AnalysisSection: React.FC<{ score_json: ScoreJson }> = ({
  score_json,
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
  application,
}) => {
  const {
    emailValidity: { isFetching, isValidEmail },
  } = application;
  const { views } = useJobApplications();
  const memoDependency = JSON.stringify(application?.status_emails_sent ?? {});
  const { isNotInvited, timeInfo, disqualificationStatus } = useMemo(
    () => getDisqualificationStatus(application.status_emails_sent),
    [memoDependency, application?.phone_screening],
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
    emailValidity: { isFetching, isValidEmail },
  } = application;
  const { isNotInvited, isPending, timeInfo, screeningStatus } = useMemo(
    () =>
      getScreeningStatus(
        application.status_emails_sent,
        application.phone_screening,
      ),
    [
      ...Object.values(application?.status_emails_sent ?? {}),
      application.phone_screening,
    ],
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

export const Insights = ({ application }: { application: JobApplication }) => {
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

export const AnalysisPillComponent: React.FC<{ score: number }> = ({
  score,
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
  'jobHopping',
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
    case 'jobHopping':
      return count >= 10 ? <JobHopper /> : null;
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

type DNDApplicationCardProps = {
  detailedView: boolean;
  application: JobApplication;
  index: number;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (index: number) => void;
  handleOpenDetails: () => void;
  isSelected: boolean;
};
const DNDApplicationCard = (props: DNDApplicationCardProps) => {
  const {
    cardStates: {
      checkList: { list },
    },
  } = useJobApplications();
  if (list.size === 0) return <ApplicationCard {...props} />;
  return <DraggableApplicationCard {...props} />;
};

const DraggableApplicationCard = (props: DNDApplicationCardProps) => {
  const [, dragRef, preview] = useDrag({
    type: 'application-card',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <Stack ref={dragRef as any}>
      <ApplicationCard {...props} />
    </Stack>
  );
};

const DragCard = ({ applicationLimit }: { applicationLimit: CountJobs }) => {
  const {
    cardStates: {
      checkList: { list },
    },
    section,
    selectAll,
  } = useJobApplications();
  const count = selectAll ? applicationLimit[section] : list.size;
  return (
    <Stack style={{ width: '200px' }}>
      <DragPill
        textLabel={`Move ${count} candidate${count === 1 ? '' : 's'}`}
      />
    </Stack>
  );
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    cursor: 'grabbing',
  };
}

export const CustomDragLayer = ({
  x,
  applicationLimit,
}: {
  x: number;
  applicationLimit: CountJobs;
}) => {
  const { itemType, isDragging, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  const renderItem = () => {
    switch (itemType) {
      case 'application-card':
        return <DragCard applicationLimit={applicationLimit} />;
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <Stack
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Stack
        style={getItemStyles(initialOffset, {
          x: x - 180 + (currentOffset?.x ?? 0),
          y: currentOffset?.y ?? 0,
        })}
      >
        {renderItem()}
      </Stack>
    </Stack>
  );
};

export default DNDApplicationCard;

const Banners = ({ application }: { application: JobApplication }) => {
  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
      {application?.bookmarked && <BookmarkIcon />}
      {application?.is_new && <NewIcon />}
    </Stack>
  );
};

const BookmarkIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.30098 3.25C4.31556 2.95833 4.41764 2.71042 4.60723 2.50625C4.81139 2.31667 5.05931 2.21458 5.35098 2.2H11.651C11.9426 2.21458 12.1906 2.31667 12.3947 2.50625C12.5843 2.71042 12.6864 2.95833 12.701 3.25V12.875C12.6718 13.1958 12.4968 13.3708 12.176 13.4C12.0593 13.4 11.9572 13.3708 11.8697 13.3125L8.50098 10.95L5.13223 13.3125C5.04473 13.3708 4.94264 13.4 4.82598 13.4C4.50514 13.3708 4.33014 13.1958 4.30098 12.875V3.25Z'
        fill='#F79A3E'
      />
    </svg>
  );
};

const NewIcon = () => {
  return (
    <svg
      width='33'
      height='18'
      viewBox='0 0 33 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='33' height='18' rx='4' fill='#467B7C' />
      <path
        d='M6.95941 13V5.9541H7.8139L11.6371 11.4375H11.7153V5.9541H12.5844V13H11.7299L7.90668 7.53613H7.82855V13H6.95941ZM16.4219 13.0928C14.918 13.0928 14.0098 12.0381 14.0098 10.3877V10.3828C14.0098 8.75684 14.9375 7.64355 16.3682 7.64355C17.7988 7.64355 18.668 8.70801 18.668 10.2803V10.6123H14.8789C14.9033 11.7012 15.5039 12.3359 16.4414 12.3359C17.1543 12.3359 17.5937 11.999 17.7354 11.6816L17.7549 11.6377H18.6045L18.5947 11.6768C18.4141 12.3896 17.6621 13.0928 16.4219 13.0928ZM16.3633 8.40039C15.582 8.40039 14.9863 8.93262 14.8936 9.93359H17.8037C17.7158 8.89355 17.1396 8.40039 16.3633 8.40039ZM21.0015 13L19.5269 7.73633H20.3765L21.4117 11.9453H21.4898L22.6666 7.73633H23.4722L24.649 11.9453H24.7271L25.7623 7.73633H26.607L25.1324 13H24.2779L23.1011 8.92773H23.023L21.8511 13H21.0015Z'
        fill='#F5FCFC'
      />
    </svg>
  );
};
