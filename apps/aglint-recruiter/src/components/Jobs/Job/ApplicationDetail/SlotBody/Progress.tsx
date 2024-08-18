import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { StagePipeline } from '@/devlink3/StagePipeline';
import { applicationQuery } from '@/src/queries/application';

function Progress({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const { data: stages } = useQuery(
    applicationQuery.interview({
      application_id,
      job_id,
      enabled: true,
    }),
  );
  return (
    <Stack direction={'row'}>
      {stages.map((stage, index) => {
        const isCompleted = stage.sessions.every((session) => {
          return session.interview_meeting.status === 'completed';
        });
        const isNotScheduled = stage.sessions.every((session) => {
          return session.interview_meeting.status === 'not_scheduled';
        });
        const totalSessions = stage.sessions.length;
        const completedSessions = stage.sessions.filter(
          (session) => session.interview_meeting.status === 'completed',
        ).length;

        return (
          <StagePipeline
            key={index}
            textStageName={`Stage ${index + 1} ${stage.interview_plan.name}`}
            slotIcon={
              <GlobalIcon
                iconName={
                  isNotScheduled
                    ? 'brightness_1'
                    : isCompleted
                      ? 'check_circle'
                      : 'workspaces'
                }
                color={
                  isNotScheduled ? 'neutral' : isCompleted ? 'success' : 'info'
                }
              />
            }
            isLeft={index !== 0}
            isRight={index !== stages.length - 1}
            color={
              isNotScheduled ? 'neutral' : isCompleted ? 'success' : 'info'
            }
            textInterviewProgress={`${completedSessions}/${totalSessions} Interviews completed`}
          />
        );
      })}
    </Stack>
  );
}

export default Progress;
