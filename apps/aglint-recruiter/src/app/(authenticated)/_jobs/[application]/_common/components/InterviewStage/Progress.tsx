import { useEffect } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import { useRouterPro } from '@/hooks/useRouterPro';

import { setSelectedSessionIds } from '../../stores/applicationDetail';
import StageIcon from '../ui/StageIcon';
import { StageListCard } from '../ui/StageListCard';

function Progress() {
  const router = useRouterPro();
  const {
    interview: { data: stages },
  } = useApplication();

  const selectedStageId = router.queryParams.stage as string;

  useEffect(() => {
    if (!selectedStageId) {
      router.setQueryParams({ stage: stages[0].interview_plan.id });
    }
  }, [stages]);

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
          <StageListCard
            key={stage.interview_plan.id}
            textStageName={`Stage ${index + 1} ${stage.interview_plan.name}`}
            slotIcon={
              <StageIcon
                isNotScheduled={isNotScheduled}
                isCompleted={isCompleted}
                size={14}
              />
            }
            onClickTab={() => {
              setSelectedSessionIds([]);
              router.setQueryParams({ stage: stage.interview_plan.id });
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
