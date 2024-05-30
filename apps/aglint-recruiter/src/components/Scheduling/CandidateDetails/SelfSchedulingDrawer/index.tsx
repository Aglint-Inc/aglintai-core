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
  setDateRange,
  setinitialSessions,
  setIsScheduleNowOpen,
  setSchedulingOptions,
  setSelectedSessionIds,
  setStepScheduling,
  useSchedulingApplicationStore,
} from '../store';
import SelectDateRange from './StepSelectDate';
import StepSlotOptions from './StepSlotOptions';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const currentDate = dayjs();
  const initialEndDate = currentDate.add(7, 'day');
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    dateRange,
    selectedApplication,
    initialSessions,
    isScheduleNowOpen,
    selectedSessionIds,
    schedulingOptions,
    selCoordinator,
    stepScheduling,
    selectedCombIds,
    scheduleFlow,
  } = useSchedulingApplicationStore((state) => ({
    dateRange: state.dateRange,
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    isScheduleNowOpen: state.isScheduleNowOpen,
    selectedSessionIds: state.selectedSessionIds,
    schedulingOptions: state.schedulingOptions,
    selCoordinator: state.selCoordinator,
    stepScheduling: state.stepScheduling,
    selectedCombIds: state.selectedCombIds,
    scheduleFlow: state.scheduleFlow,
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
        const res = await axios.post(
          '/api/scheduling/application/sendtocandidate',
          {
            dateRange,
            initialSessions,
            is_mail: true,
            is_debrief: isDebrief,
            recruiter_id: recruiter.id,
            recruiterUser,
            schedulingOptions,
            selCoordinator,
            selectedApplication,
            selectedSessionIds,
            selectedDebrief: schedulingOptions.find(
              (opt) => opt.plan_comb_id === selectedCombIds[0],
            ),
            user_tz: dayjs.tz.guess(),
          } as ApiBodyParamsSendToCandidate,
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
              setStepScheduling('pick_date');
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
              if (!saving) onClickSendToCandidate();
            },
          }}
          onClickCancel={{
            onClick: () => {
              resetState();
            },
          }}
          textPrimaryButton={!isDebrief ? 'Send to Candidate' : 'Schedule Now'}
          isSelectedNumber={false}
          slotSideDrawerbody={
            <>
              {stepScheduling === 'pick_date' ? (
                <SelectDateRange />
              ) : (
                <StepSlotOptions isDebrief={isDebrief} />
              )}
            </>
          }
          isBottomBar={stepScheduling !== 'pick_date'}
        />
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
