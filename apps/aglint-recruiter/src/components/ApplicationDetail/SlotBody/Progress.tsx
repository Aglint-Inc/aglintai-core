import { PiplelineTab } from '@devlink3/PiplelineTab';
import { CheckCircle, CircleCheck, Network } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useApplication } from '@/context/ApplicationContext';

import { setSelectedSessionIds } from '../store';

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
          <PiplelineTab
            key={stage.interview_plan.id}
            textStageName={`Stage ${index + 1} ${stage.interview_plan.name}`}
            slotIcon={
              isNotScheduled ? (
                <CircleCheck className='text-neutral-500' />
              ) : isCompleted ? (
                <CheckCircle className='text-green-500' />
              ) : (
                <Network className='text-blue-500' />
              )
            }
            onClickTab={{
              onClick: () => {
                setSelectedSessionIds([]);
                const currentQuery = { ...router.query };
                currentQuery.stage = stage.interview_plan.id;
                router.replace({
                  pathname: router.pathname,
                  query: currentQuery,
                });
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
