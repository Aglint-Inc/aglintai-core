import { GlobalIcon } from '@/devlink/GlobalIcon';
import { PiplelineTab } from '@/devlink3/PiplelineTab';
import { useApplication } from '@/src/context/ApplicationContext';

import {
  setSelectedSessionIds,
  setSelectedStageId,
  useApplicationDetailStore,
} from '../store';

function Progress() {
  const {
    interview: { data: stages },
  } = useApplication();

  const { selectedStageId } = useApplicationDetailStore((state) => ({
    selectedStageId: state.selectedStageId,
  }));

  return (
    <>
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
          <PiplelineTab
            key={stage.interview_plan.id}
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
            onClickTab={{
              onClick: () => {
                setSelectedStageId(stage.interview_plan.id);
                setSelectedSessionIds([]);
              },
            }}
            isActive={selectedStageId === stage.interview_plan.id}
            color={
              isNotScheduled ? 'neutral' : isCompleted ? 'success' : 'info'
            }
            textProgress={`${completedSessions}/${totalSessions} Interviews completed`}
          />
        );
      })}
    </>
  );
}

export default Progress;
