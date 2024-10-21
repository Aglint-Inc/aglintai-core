import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { useApplicationDetails } from '../../../hooks/useApplicationDetails';
import { useApplicationMeta } from '../../../hooks/useApplicationMeta';
import { type StageWithSessions } from '../../../hooks/useInterviewStages';
import {
  setIsScheduleOpen,
  useApplicationDetailStore,
} from '../../../stores/applicationDetail';
import { ApplicantDetailStage } from '../../ui/ApplicationDetailStage';
import BreakCard from '../../ui/BreakCard';
import ScheduleIndividualCard from '../IndividualSession';

function StageIndividual({
  stage,
}: {
  stage: NonNullable<StageWithSessions>[0];
}) {
  const router = useRouterPro();
  const selectedStageId = router.queryParams.stage as string;
  const { selectedSessionIds } = useApplicationDetailStore((state) => ({
    selectedSessionIds: state.selectedSessionIds,
  }));
  const { data: meta } = useApplicationMeta();
  const { data } = useApplicationDetails();

  const sessions = stage.sessions;
  const isStageSelected = selectedStageId === stage.interview_plan.id;
  const isCurrentSessionSelected = sessions.some((session) =>
    selectedSessionIds.includes(session.interview_session.id),
  );

  const { mutate } = api.application.update_break.useMutation();

  const onChangeBreak = async (session_id: string, break_duration: string) => {
    mutate({
      session_id,
      break_duration: Number(break_duration),
    });
  };

  const selectedSessionType = sessions.find(
    (session) =>
      selectedSessionIds.length > 0 &&
      selectedSessionIds[0] === session.interview_session.id,
  )?.interview_session.session_type;

  return (
    <>
      <ApplicantDetailStage
        textName={`Stage  ${stage.interview_plan.plan_order} ${stage.interview_plan.name}`}
        textInterviewCount={`${sessions.length} Interview${sessions.length > 1 ? 's' : ''}`}
        slotInterviewStageDetail={
          <div className='flex flex-col gap-2'>
            {sessions.map((session) => {
              const interview_meeting = session.interview_meeting;
              return (
                <>
                  <ScheduleIndividualCard
                    session={session}
                    key={session.interview_session.id}
                    isCheckboxVisible={
                      data?.job_status === 'published' &&
                      data?.status === 'interview' &&
                      (interview_meeting.status === 'not_scheduled' ||
                        interview_meeting.status === 'cancelled' ||
                        interview_meeting.status === 'reschedule')
                    }
                    candidate={{
                      name: meta?.name ?? '',
                      current_job_title: meta?.current_job_title ?? '',
                      timezone: meta?.timezone ?? '',
                    }}
                    isCheckboxDisabled={
                      selectedSessionType !== undefined &&
                      ((selectedSessionType !== 'debrief' &&
                        !['individual', 'panel'].includes(
                          session.interview_session.session_type,
                        )) ||
                        (selectedSessionType === 'debrief' &&
                          selectedSessionIds[0] !==
                            session.interview_session.id))
                    }
                  />
                  {session.interview_session.break_duration !== 0 && (
                    <BreakCard session={session} onChange={onChangeBreak} />
                  )}
                </>
              );
            })}
          </div>
        }
        isCountVisible={!isCurrentSessionSelected}
        isScheduleButtonVisible={
          isStageSelected && selectedSessionIds.length > 0
        }
        slotScheduleButton={
          <UIButton
            variant={'default'}
            onClick={() => {
              setIsScheduleOpen(true);
            }}
          >
            Schedule
          </UIButton>
        }
      />
    </>
  );
}

export default StageIndividual;
