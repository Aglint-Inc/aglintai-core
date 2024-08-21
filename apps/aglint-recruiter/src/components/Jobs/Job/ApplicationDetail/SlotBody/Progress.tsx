import { Stack } from '@mui/material';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { StagePipeline } from '@/devlink3/StagePipeline';
import { useApplication } from '@/src/context/ApplicationContext';

import { setSelectedSessionIds, setSelectedStageId } from '../store';

function Progress() {
  const {
    interview: { data: stages },
  } = useApplication();

  return (
    <Stack
      direction={'row'}
      gap={'10px'}
      sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
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
          <Stack
            width={'100%'}
            minWidth={'250px'}
            key={index}
            onClick={() => {
              setSelectedStageId(stage.interview_plan.id);
              setSelectedSessionIds([]);
            }}
          >
            <StagePipeline
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
                    isNotScheduled
                      ? 'neutral'
                      : isCompleted
                        ? 'success'
                        : 'info'
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
          </Stack>
        );
      })}
    </Stack>
  );
}

export default Progress;
