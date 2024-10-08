import InterviewStages, { type StageProps } from '@components/interview-stage';
import { useEffect } from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';

import { useInterviewStages } from '../../hooks/useInterviewStages';
import { setSelectedSessionIds } from '../../stores/applicationDetail';

function Progress() {
  const router = useRouterPro();

  const { data: stages } = useInterviewStages();

  const selectedStageId = router.queryParams.stage as string;

  useEffect(() => {
    if (!selectedStageId) {
      router.setQueryParams({ stage: stages[0].interview_plan.id });
    }
  }, [stages]);

  const stageList: StageProps[] = stages.map((stage, index) => {
    const isCompleted = stage.sessions.every((session) => {
      return session.interview_meeting.status === 'completed';
    });

    const isConfirmed = stage.sessions.every((session) => {
      return session.interview_meeting.status === 'confirmed';
    });

    // const isNotScheduled = stage.sessions.every((session) => {
    //   return session.interview_meeting.status === 'not_scheduled';
    // });

    const isCancelled = stage.sessions.every((session) => {
      return session.interview_meeting.status === 'cancelled';
    });

    const isWaiting = stage.sessions.every((session) => {
      return session.interview_meeting.status === 'waiting';
    });

    const totalSessions = stage.sessions.length;
    const completedSessions = stage.sessions.filter(
      (session) => session.interview_meeting.status === 'completed',
    ).length;

    return {
      testName: `Stage ${index + 1} ${stage.interview_plan.name}`,
      description: `${completedSessions}/${totalSessions} Interviews completed`,
      onClick: () => {
        setSelectedSessionIds([]);
        router.setQueryParams({ stage: stage.interview_plan.id });
      },
      isActive: selectedStageId === stage.interview_plan.id,
      status: isCompleted
        ? 'completed'
        : isConfirmed
          ? 'confirmed'
          : isWaiting
            ? 'waiting'
            : isCancelled
              ? 'cancelled'
              : 'not_scheduled',
    };
  });

  return (
    <>
      <InterviewStages
        stages={stageList}
        orientation='vertical'
        className='max-w-md'
      />
    </>
  );
}

export default Progress;
