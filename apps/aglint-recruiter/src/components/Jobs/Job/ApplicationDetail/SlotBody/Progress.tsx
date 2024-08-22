import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { PiplelineTab } from '@/devlink3/PiplelineTab';
import { useApplication } from '@/src/context/ApplicationContext';

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
