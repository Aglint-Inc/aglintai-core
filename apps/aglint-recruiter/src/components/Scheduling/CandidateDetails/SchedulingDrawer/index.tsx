import { Drawer, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';

import RequestAvailability from '../RequestAvailability';
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import ButtonReschedule from './ButtonReschedule';
import EmailPreviewSelfSchedule from './EmailPreviewSelfSchedule';
import HeaderIcon from './HeaderIcon';
import { useSelfSchedulingDrawer } from './hooks';
import RescheduleSlot from './RescheduleSlot';
import StepScheduleFilter from './StepScheduleFilter';
import SelectDateRange from './StepSelectDate';
import StepSlotOptions from './StepSlotOptions';
import {
  resetSchedulingFlowStore,
  setDateRange,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';
import SelfScheduleSuccess from './SelfScheduleSuccess';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const currentDate = dayjs();
  const initialEndDate = currentDate.add(7, 'day');
  const { initialSessions, selectedSessionIds, isSendingToCandidate } =
    useSchedulingApplicationStore((state) => ({
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
      isSendingToCandidate: state.isSendingToCandidate,
    }));

  const {
    isScheduleNowOpen,
    scheduleFlow,
    stepScheduling,
    fetchingPlan,
    dateRange,
  } = useSchedulingFlowStore((state) => ({
    isScheduleNowOpen: state.isScheduleNowOpen,
    scheduleFlow: state.scheduleFlow,
    stepScheduling: state.stepScheduling,
    fetchingPlan: state.fetchingPlan,
    dateRange: state.dateRange,
  }));

  useEffect(() => {
    if (!(dateRange.start_date || dateRange.end_date)) {
      setDateRange({
        start_date: currentDate.toISOString(),
        end_date: initialEndDate.toISOString(),
      });
    }
    return () => {
      resetSchedulingFlowStore();
      setSelectedSessionIds([]);
    };
  }, []);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  const { resetStateSelfScheduling, onClickPrimary } =
    useSelfSchedulingDrawer();

  const primaryButtonText = () => {
    if (!isDebrief) {
      if (scheduleFlow === 'self_scheduling') {
        if (
          stepScheduling === 'preference' ||
          stepScheduling === 'pick_date' ||
          stepScheduling === 'slot_options'
        ) {
          return 'Continue';
        } else if (stepScheduling === 'self_scheduling_email_preview') {
          return 'Send to Candidate';
        }
      } else if (scheduleFlow === 'email_agent') {
        return 'Schedule Via Email';
      } else if (scheduleFlow === 'phone_agent') {
        return 'Schedule Via Phone';
      } else {
        return 'Continue';
      }
    } else {
      if (stepScheduling === 'preference' || stepScheduling === 'pick_date') {
        return 'Continue';
      } else if (stepScheduling === 'slot_options') {
        return 'Schedule Now';
      }
    }
  };

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
          onClickCancel={{
            onClick: () => {
              resetStateSelfScheduling();
            },
          }}
          slotHeaderIcon={<HeaderIcon />}
          textDrawertitle={
            stepScheduling === 'reschedule'
              ? 'Reschedule'
              : scheduleFlow === 'self_scheduling'
                ? 'Send Self Scheduling Link'
                : scheduleFlow === 'email_agent'
                  ? 'Schedule With Email Agent'
                  : scheduleFlow === 'phone_agent'
                    ? 'Schedule With Phone Agent'
                    : scheduleFlow === 'create_request_availibility'
                      ? 'Request Availability'
                      : scheduleFlow === 'update_request_availibility'
                        ? 'Update Request Availability'
                        : scheduleFlow === 'debrief'
                          ? 'Schedule Debrief'
                          : 'Schedule Now'
          }
          slotButtons={
            <>
              <ButtonSoft
                size={2}
                color={'neutral'}
                textButton={stepScheduling === 'pick_date' ? 'Close' : 'Back'}
                onClickButton={{
                  onClick: () => {
                    if (stepScheduling === 'pick_date') {
                      resetStateSelfScheduling();
                    } else if (stepScheduling === 'slot_options') {
                      setStepScheduling('preference');
                    } else if (stepScheduling === 'preference') {
                      setStepScheduling('pick_date');
                    } else if (
                      stepScheduling === 'self_scheduling_email_preview'
                    ) {
                      setStepScheduling('slot_options');
                    }
                  },
                }}
              />

              {stepScheduling === 'reschedule' ? (
                <ButtonReschedule />
              ) : (
                <ButtonSolid
                  isLoading={isSendingToCandidate}
                  size={2}
                  textButton={primaryButtonText()}
                  onClickButton={{
                    onClick: async () => {
                      await onClickPrimary();
                      refetch();
                    },
                  }}
                />
              )}
            </>
          }
          slotSideDrawerbody={
            !fetchingPlan ? (
              <>
                {stepScheduling === 'pick_date' ? (
                  <SelectDateRange />
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
                ) : (
                  null
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
            )
          }
          isBottomBar={
            !fetchingPlan && stepScheduling !== 'request_availibility'
          }
        />
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
