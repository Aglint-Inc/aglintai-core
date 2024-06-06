import { Drawer, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';

import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import { useSelfSchedulingDrawer } from './hooks';
import RescheduleSlot from './RescheduleSlot';
import StepScheduleFilter from './StepScheduleFilter';
import SelectDateRange from './StepSelectDate';
import StepSlotOptions from './StepSlotOptions';
import {
  resetFilterStore,
  setDateRange,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const [saving, setSaving] = useState(false);
  const currentDate = dayjs();
  const initialEndDate = currentDate.add(7, 'day');
  const { initialSessions, selectedSessionIds } = useSchedulingApplicationStore(
    (state) => ({
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
    }),
  );

  const { isScheduleNowOpen, scheduleFlow, stepScheduling, fetchingPlan } =
    useSchedulingFlowStore((state) => ({
      isScheduleNowOpen: state.isScheduleNowOpen,
      scheduleFlow: state.scheduleFlow,
      stepScheduling: state.stepScheduling,
      fetchingPlan: state.fetchingPlan,
    }));

  useEffect(() => {
    setDateRange({
      start_date: currentDate.toISOString(),
      end_date: initialEndDate.toISOString(),
    });
    return () => {
      resetFilterStore();
      setSelectedSessionIds([]);
    };
  }, []);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const { resetStateSelfScheduling, sendToCandidate } = useSelfSchedulingDrawer(
    { saving, setSaving, isDebrief, refetch },
  );

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isScheduleNowOpen}
        onClose={() => {
          resetStateSelfScheduling();
        }}
      >
        <SideDrawerLarge
          onClickBack={{
            onClick: () => {
              stepScheduling === 'preference'
                ? setStepScheduling('pick_date')
                : setStepScheduling('preference');
            },
          }}
          textDrawertitle={
            scheduleFlow === 'self_scheduling'
              ? 'Send Self Scheduling Link'
              : scheduleFlow === 'email_agent'
                ? 'Schedule With Email Agent'
                : scheduleFlow === 'phone_agent'
                  ? 'Schedule With Phone Agent'
                  : 'Schedule Now'
          }
          onClickPrimary={{
            onClick: () => {
              sendToCandidate();
            },
          }}
          onClickCancel={{
            onClick: () => {
              resetStateSelfScheduling();
            },
          }}
          textPrimaryButton={
            !isDebrief
              ? stepScheduling === 'preference'
                ? 'Continue'
                : 'Send to Candidate'
              : 'Schedule Now'
          }
          isSelectedNumber={false}
          slotSideDrawerbody={
            !fetchingPlan ? (
              <>
                {stepScheduling === 'pick_date' ? (
                  <SelectDateRange />
                ) : stepScheduling === 'reschedule' ? (
                  <RescheduleSlot />
                ) : stepScheduling === 'preference' ? (
                  <StepScheduleFilter />
                ) : (
                  <StepSlotOptions isDebrief={isDebrief} />
                )}
              </>
            ) : (
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
            )
          }
          isBottomBar={
            stepScheduling === 'slot_options' || stepScheduling === 'preference'
          }
        />
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
