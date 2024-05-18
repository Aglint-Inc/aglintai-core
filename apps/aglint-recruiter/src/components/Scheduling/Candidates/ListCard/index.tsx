import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  AllInterviewCard,
  EmptyInterviewProgress,
  ScheduleWithAgent,
} from '@/devlink2';
import { ResumeJson } from '@/src/apiUtils/resumeScoring/types';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import ScheduleProgress from '../../Common/ScheduleProgress';
import { ApplicationList } from '../store';

function ListCardInterviewSchedule({
  app,
  onClickCard,
  slotBookmark = <></>,
  slotCheckbox = <></>,
  slotResumeScore = <></>,
  isJobDasboard = false,
  isSelected = false,
  isChecked = false,
}: {
  app: ApplicationList;
  // eslint-disable-next-line no-unused-vars
  onClickCard: (app: ApplicationList) => void;
  slotBookmark?: ReactNode;
  slotResumeScore?: ReactNode;
  isJobDasboard?: boolean;
  slotCheckbox?: ReactNode;
  isSelected?: boolean;
  isChecked?: boolean;
}) {
  const avatarStyles = isJobDasboard
    ? {
        width: '18px',
        height: '18px',
        fontSize: '12px',
      }
    : {
        width: '100%',
        height: '100%',
        fontSize: '20px',
      };

  return (
    <AllInterviewCard
      onClickCard={{ onClick: () => onClickCard(app) }}
      isDragVisible={isChecked}
      slotScheduleWithAgent={<ScheduleWithAgent />}
      textCurrentRole={
        (app.file?.resume_json as unknown as ResumeJson)?.basics
          ?.currentJobTitle || <></>
      }
      isSelected={isSelected}
      propsGrid={{
        style: {
          gridTemplateColumns: isJobDasboard && '60px 300px 250px 1fr',
        },
      }}
      slotBookmark={slotBookmark}
      isSchedulerTable={!isJobDasboard}
      isCheckBoxVisible={isJobDasboard}
      slotCheckbox={slotCheckbox}
      textName={getFullName(
        app.candidates.first_name,
        app.candidates.last_name,
      ).toLowerCase()}
      slotCandidateImage={
        <Stack
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <MuiAvatar
            level={getFullName(
              app.candidates.first_name,
              app.candidates.last_name,
            )}
            src={app.candidates.avatar}
            variant={'circular'}
            width={avatarStyles.width}
            height={avatarStyles.height}
            fontSize={avatarStyles.fontSize}
          />
        </Stack>
      }
      isResumeScoreVisible={isJobDasboard}
      slotResumeScore={isJobDasboard ? slotResumeScore : <></>}
      textInterviewPanel={'0'}
      slotInterviewProgress={<SessionProgressPipeline app={app} />}
      textRelatedJob={app.public_jobs?.job_title}
    />
  );
}

const SessionProgressPipeline = ({ app }: { app: ApplicationList }) => {
  const router = useRouter();
  const sessions: Parameters<typeof ScheduleProgress>[0]['sessions'] = (
    app?.interview_session_meetings ?? []
  ).map(
    ({
      interview_meeting,
      interview_session: {
        session_duration,
        name,
        schedule_type,
        session_type,
      },
    }) => {
      const response: (typeof sessions)[number] = {
        duration: session_duration,
        name,
        scheduleType: schedule_type,
        sessionType: session_type,
        status: 'not_scheduled',
        date: null,
      };
      if (interview_meeting) {
        response.status = interview_meeting.status;
        response.date = {
          startTime: interview_meeting.start_time,
          endTime: interview_meeting.end_time,
        };
      }
      return response;
    },
  );
  //  if sessions is empty, show empty interview progress
  return sessions.length ? (
    <ScheduleProgress sessions={sessions} />
  ) : (
    <EmptyInterviewProgress
      onClickCreateInterviewPlan={{
        onClick: (e) => {
          e.stopPropagation();
          router.push(`/jobs/${app.public_jobs.id}/interview-plan`);
        },
      }}
    />
  );
};

export default ListCardInterviewSchedule;
