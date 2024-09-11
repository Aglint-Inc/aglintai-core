import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useApplication } from '@/context/ApplicationContext';

import { setSelectedSessionIds } from '../store/store';
import StageIcon from './SlotBody/InterviewTabContent/_common/components/StageIcon';
import { StageListCard } from './SlotBody/InterviewTabContent/_common/components/StageListCard';

function Progress() {
  const router = useRouter();
  const {
    interview: { data: stages },
  } = useApplication();

  const selectedStageId = router.query.stage as string;

  useEffect(() => {
    if (!selectedStageId) {
      const currentQuery = { ...router.query };
      currentQuery.stage = stages[0].interview_plan.id;
      router.replace({
        pathname: router.pathname,
        query: currentQuery,
      });
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
              />
            }
            onClickTab={() => {
              setSelectedSessionIds([]);
              const currentQuery = { ...router.query };
              currentQuery.stage = stage.interview_plan.id;
              router.replace({
                pathname: router.pathname,
                query: currentQuery,
              });
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
