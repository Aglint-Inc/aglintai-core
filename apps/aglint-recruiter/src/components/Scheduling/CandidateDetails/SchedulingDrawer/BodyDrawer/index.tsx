import { Stack } from '@mui/material';

import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';

import RequestAvailability from '../../RequestAvailability';
import { useSchedulingApplicationStore } from '../../store';
import ScheduleAllOptions from '../ScheduleAllOptions';
import SelfScheduleSuccess from '../SelfScheduleSuccess';
import StepSlotOptions from '../StepSlotOptions';
import { useSchedulingFlowStore } from '../store';
import AgentFinalScreenCta from './AgentFinalScreenCta';
import EmailPreviewSelfSchedule from './EmailPreviewSelfSchedule';
import RescheduleSlot from './RescheduleSlot';
import StepScheduleFilter from './StepScheduleFilter';
import SelectDateRange from './StepSelectDate/StepSelectDate';

function BodyDrawer() {
  const { initialSessions, selectedSessionIds } = useSchedulingApplicationStore(
    (state) => ({
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
    }),
  );

  const { stepScheduling, fetchingPlan } = useSchedulingFlowStore((state) => ({
    stepScheduling: state.stepScheduling,
    fetchingPlan: state.fetchingPlan,
  }));

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  return (
    <div>
      {!fetchingPlan ? (
        <>
          {stepScheduling === 'pick_date' ? (
            <SelectDateRange />
          ) : stepScheduling === 'agents_final_screen_cta' ? (
            <AgentFinalScreenCta />
          ) : stepScheduling === 'reschedule' ? (
            <RescheduleSlot />
          ) : stepScheduling === 'preference' ? (
            <StepScheduleFilter />
          ) : stepScheduling === 'request_availibility' ? (
            <RequestAvailability />
          ) : stepScheduling === 'slot_options' ? (
            <StepSlotOptions isDebrief={isDebrief} />
          ) : stepScheduling === 'self_scheduling_email_preview' ? (
            <EmailPreviewSelfSchedule />
          ) : stepScheduling === 'success_screen' ? (
            <SelfScheduleSuccess />
          ) : stepScheduling === 'schedule_all_options' ? (
            <ScheduleAllOptions />
          ) : (
            ''
          )}
        </>
      ) : (
        <Stack height={'calc(100vh - 96px)'}>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            height={'100%'}
            alignItems={'center'}
          >
            <Stack height={'150px'} width={'150px'}>
              <CandidateSlotLoad />
            </Stack>
          </Stack>
        </Stack>
      )}
    </div>
  );
}

export default BodyDrawer;
