import { Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AllInterviewCard, ScheduleWithAgent } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ResumeJson } from '@/src/pages/api/resumeScoring/types';
import { getFullName } from '@/src/utils/jsonResume';

import ScheduleProgress from '../../Common/ScheduleProgress';
import { ApplicationList } from '../store';

function ListCardInterviewSchedule({
  app,
  onClickCard,
  slotCheckbox = <></>,
  slotResumeScore = <></>,
  isJobDasboard = false,
  isSelected = false,
  isChecked = false,
}: {
  app: ApplicationList;
  // eslint-disable-next-line no-unused-vars
  onClickCard: (app: ApplicationList) => void;
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
        fontSize: '24px',
      };

  return (
    <>
      <Stack
        onClick={() => {
          onClickCard(app);
        }}
      >
        <AllInterviewCard
          isDragVisible={isChecked}
          slotScheduleWithAgent={<ScheduleWithAgent />}
          textCurrentRole={
            <Stack style={{ textTransform: 'capitalize' }}>
              {(app.file?.resume_json as unknown as ResumeJson)?.basics
                ?.currentJobTitle || <></>}
            </Stack>
          }
          isSelected={isSelected}
          propsGrid={{
            style: {
              gridTemplateColumns: isJobDasboard && '25% 15% 15% 20% 25%',
            },
          }}
          isSchedulerTable={!isJobDasboard}
          isCheckBoxVisible={isJobDasboard}
          slotCheckbox={slotCheckbox}
          textName={
            <Stack style={{ textTransform: 'capitalize' }}>
              {getFullName(
                app.candidates.first_name,
                app.candidates.last_name,
              ).toLowerCase()}
            </Stack>
          }
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
      </Stack>
    </>
  );
}

const SessionProgressPipeline = ({ app }: { app: ApplicationList }) => {
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
  return <ScheduleProgress sessions={sessions} />;
};

export default ListCardInterviewSchedule;
