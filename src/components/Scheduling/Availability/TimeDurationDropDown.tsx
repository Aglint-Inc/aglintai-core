import { SelectChangeEvent } from '@mui/material';
import React from 'react';

import toast from '@/src/utils/toast';

import {
  setIsisCalenderLoading,
  setTimeSlot,
  useAvailableStore,
  useSyncInterviewersCalender,
} from './store';
import UISelect from '../../Common/Uiselect';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

const TimeDurationDropDown = () => {
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const { handleSync } = useSyncInterviewersCalender();
  const handleOnchange = async (e: SelectChangeEvent<number>) => {
    try {
      setIsisCalenderLoading(true);
      const timeSlotReq = Number(e.target.value);
      const currMonth = new Date().toISOString();
      await handleSync(timeSlotReq, currMonth);
      setTimeSlot(timeSlotReq);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsisCalenderLoading(false);
    }
  };

  return (
    <>
      <UISelect
        menuOptions={[
          { name: '30 minutes', value: 30 },
          { name: '45 minutes', value: 45 },
          { name: '1 hour', value: 60 },
          { name: '1 hour 30 minutes', value: 90 },
          { name: '2 hour', value: 120 },
        ]}
        onChange={handleOnchange}
        value={timeSlot}
        defaultValue={timeSlot}
        fullWidth
        size='sm'
      />
    </>
  );
};

export default TimeDurationDropDown;
