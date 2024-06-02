import { Drawer } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../hooks';
import {
  setinitialSessions,
  setSelectedApplicationLog,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import RescheduleSlot from './RescheduleSlot';
import StepScheduleFilter from './StepScheduleFilter';
import SelectDateRange from './StepSelectDate';
import StepSlotOptions from './StepSlotOptions';
import {
  setDateRange,
  setFilteredSchedulingOptions,
  setIsScheduleNowOpen,
  setSchedulingOptions,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';
import { filterSchedulingOptions } from './StepScheduleFilter/utils';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const currentDate = dayjs();
  const initialEndDate = currentDate.add(7, 'day');
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    selectedApplication,
    initialSessions,
    selectedSessionIds,
    selectedCombIds,
    selectedApplicationLog,
  } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedCombIds: state.selectedCombIds,
    selectedApplicationLog: state.selectedApplicationLog,
  }));

  const {
    dateRange,
    schedulingOptions,
    isScheduleNowOpen,
    scheduleFlow,
    stepScheduling,
    filters,
  } = useSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    schedulingOptions: state.schedulingOptions,
    isScheduleNowOpen: state.isScheduleNowOpen,
    scheduleFlow: state.scheduleFlow,
    stepScheduling: state.stepScheduling,
    filters: state.filters,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDateRange({
      start_date: currentDate.toISOString(),
      end_date: initialEndDate.toISOString(),
    });
    return () => {
      setIsScheduleNowOpen(false);
      setSchedulingOptions([]);
      setSelectedSessionIds([]);
    };
  }, []);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const onClickSendToCandidate = async () => {
    try {
      setSaving(true);
      if (isDebrief && selectedCombIds.length === 0) {
        toast.warning('Please select a time slot to schedule.');
      } else {
        const bodyParams: ApiBodyParamsSendToCandidate = {
          dateRange,
          initialSessions,
          is_mail: true,
          is_debrief: isDebrief,
          recruiter_id: recruiter.id,
          recruiterUser,
          selCoordinator: null,
          selectedApplication,
          selectedSessionIds,
          selectedDebrief: schedulingOptions.find(
            (opt) => opt.plan_comb_id === selectedCombIds[0],
          ),
          user_tz: dayjs.tz.guess(),
          selectedApplicationLog,
        };
        const res = await axios.post(
          '/api/scheduling/application/sendtocandidate',
          bodyParams,
        );

        if (res.status === 200 && res.data) {
          setinitialSessions(
            initialSessions.map((session) => ({
              ...session,
              interview_meeting: selectedSessionIds.includes(session.id)
                ? session.interview_meeting
                  ? {
                      ...session.interview_meeting,
                      status: 'waiting',
                    }
                  : { status: 'waiting', interview_schedule_id: null }
                : session.interview_meeting
                  ? { ...session.interview_meeting }
                  : null,
            })),
          );
        }
        resetState();
      }
    } catch (e) {
      toast.error('Error sending to candidate.');
    } finally {
      setSaving(false);
      refetch();
      fetchInterviewDataByApplication();
    }
  };

  const resetState = () => {
    setIsScheduleNowOpen(false);
    setSchedulingOptions([]);
    setSelectedSessionIds([]);
    setStepScheduling('pick_date');
    setSelectedApplicationLog(null);
  };

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isScheduleNowOpen}
        onClose={() => {
          resetState();
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
              if (stepScheduling === 'preference') {
                const { allFilteredOptions } = filterSchedulingOptions({
                  filters,
                  schedulingOptions,
                });

                setFilteredSchedulingOptions(allFilteredOptions);
                setStepScheduling('slot_options');
              } else if (stepScheduling === 'slot_options') {
                if (!saving) {
                  onClickSendToCandidate();
                }
              }
            },
          }}
          onClickCancel={{
            onClick: () => {
              resetState();
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
