import { Drawer } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import toast from '@/src/utils/toast';

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

function SelfSchedulingDrawer() {
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
  } = useSchedulingApplicationStore((state) => ({
    dateRange: state.dateRange,
    noOptions: state.noOptions,
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    isScheduleNowOpen: state.isScheduleNowOpen,
    selectedSessionIds: state.selectedSessionIds,
    schedulingOptions: state.schedulingOptions,
    totalSlots: state.totalSlots,
    selCoordinator: state.selCoordinator,
    stepScheduling: state.stepScheduling,
  }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
      if (isDebrief && !selectedId) {
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
            selected_comb_id: selectedId,
            selectedApplication,
            selectedSessionIds,
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
        setSelectedSessionIds([]);
        setIsScheduleNowOpen(false);
      }
    } catch (e) {
      //
    } finally {
      setSaving(false);
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
          isSelectedNumber={false}
          slotSideDrawerbody={
            <>
              {stepScheduling === 'pick_date' ? (
                <SelectDateRange />
              ) : (
                <StepSlotOptions />
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
