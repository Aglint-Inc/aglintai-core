import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

import { useApplicationDetails } from '../../../hooks/useApplicationDetails';
import { useApplicationMeta } from '../../../hooks/useApplicationMeta';
import {
  type StageWithSessions,
  useInterviewStages,
} from '../../../hooks/useInterviewStages';
import {
  setIsScheduleOpen,
  setSelectedSessionIds,
  useApplicationDetailStore,
} from '../../../stores/applicationDetail';
import { ApplicantDetailStage } from '../../ui/ApplicationDetailStage';
import BreakCard from '../../ui/BreakCard';
import ScheduleIndividualCard from '../IndividualSession';

function StageIndividual({ stage }: { stage: StageWithSessions[0] }) {
  const router = useRouterPro();
  const selectedStageId = router.queryParams.stage as string;
  const { selectedSessionIds } = useApplicationDetailStore((state) => ({
    selectedSessionIds: state.selectedSessionIds,
  }));
  const { refetch } = useInterviewStages();
  const { data: meta } = useApplicationMeta();
  const {
    data: { job_status, status },
  } = useApplicationDetails();

  const sessions = stage.sessions;
  const isStageSelected = selectedStageId === stage.interview_plan.id;
  const isCurrentSessionSelected = sessions.some((session) =>
    selectedSessionIds.includes(session.interview_session.id),
  );

  const onClickCheckBox = ({ session_id }: { session_id: string }) => {
    if (selectedSessionIds.includes(session_id)) {
      return setSelectedSessionIds(
        selectedSessionIds.filter((id) => id !== session_id),
      );
    }
    return setSelectedSessionIds([...selectedSessionIds, session_id]);
  };

  const onChangeBreak = async (session_id: string, break_duration: string) => {
    await supabase
      .from('interview_session')
      .update({ break_duration: Number(break_duration) })
      .eq('id', session_id);
    refetch();
  };

  return (
    <>
      <ApplicantDetailStage
        textName={`Stage ${stage.interview_plan.plan_order} ${stage.interview_plan.name}`}
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
                    selectedSessionIds={selectedSessionIds}
                    onClickCheckBox={onClickCheckBox}
                    isCheckboxVisible={
                      job_status === 'published' &&
                      status === 'interview' &&
                      (!interview_meeting ||
                        interview_meeting.status === 'not_scheduled' ||
                        interview_meeting.status === 'cancelled' ||
                        interview_meeting.status === 'reschedule')
                    }
                    candidate={{
                      name: meta?.name,
                      current_job_title: meta?.current_job_title,
                      timezone: meta?.timezone,
                    }}
                    isEditIconVisible={true}
                    isViewDetailVisible={true}
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