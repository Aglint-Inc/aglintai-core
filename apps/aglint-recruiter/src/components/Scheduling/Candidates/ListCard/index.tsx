/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { AllInterviewCard } from '@/devlink2/AllInterviewCard';
import { EmptyInterviewProgress } from '@/devlink2/EmptyInterviewProgress';
import { ScheduleWithAgent } from '@/devlink2/ScheduleWithAgent';
import { getFullName } from '@/src/utils/jsonResume';

import ScheduleProgress from '../../Common/ScheduleProgress';
import { ApplicationList } from '../queries/hooks';

function ListCardInterviewSchedule({
  app,
  onClickCard,
}: {
  app: ApplicationList[number];
  onClickCard: (app: ApplicationList[number]) => void;
}) {
  const [isHover, setIsHovered] = useState(false);

  return (
    <Stack
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <AllInterviewCard
        onClickCard={{ onClick: () => onClickCard(app) }}
        isDragVisible={false}
        slotScheduleWithAgent={<ScheduleWithAgent />}
        textCurrentRole={app.candidates.current_job_title || '--'}
        isSelected={false}
        slotBookmark={<></>}
        isSchedulerTable={true}
        isCheckBoxVisible={false}
        slotCheckbox={<></>}
        textName={getFullName(
          app.candidates.first_name,
          app.candidates.last_name,
        )}
        isResumeScoreVisible={false}
        slotResumeScore={<></>}
        textInterviewPanel={'0'}
        slotInterviewProgress={
          <>
            <SessionProgressPipeline isHover={isHover} app={app} />
          </>
        }
        textRelatedJob={app.public_jobs?.job_title}
      />
    </Stack>
  );
}

const SessionProgressPipeline = ({
  app,
  isHover,
}: {
  app: ApplicationList[0];
  isHover: boolean;
}) => {
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
        session_duration,
        session_name: name,
        schedule_type,
        session_type,
        status: 'not_scheduled',
        date: null,
      };
      if (interview_meeting) {
        response.status = interview_meeting.status;
        response.date = {
          start_time: interview_meeting.start_time,
          end_time: interview_meeting.end_time,
        };
      }
      return response;
    },
  );
  //  if sessions is empty, show empty interview progress

  return sessions.length ? (
    <ScheduleProgress sessions={sessions} />
  ) : (
    <Stack display={'flex'} flexDirection={'row'} gap={'4px'}>
      Intview plan not found
    </Stack>
  );
};

export default ListCardInterviewSchedule;
