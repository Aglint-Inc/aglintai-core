import { SelectChangeEvent } from '@mui/material';
import { cloneDeep } from 'lodash';
import React from 'react';

import { InterviewerAvailabliity } from './availability.types';
import {
  setCheckedInterSlots,
  setInterviewers,
  setIsLoading,
  setTimeSlot,
  useAvailableStore,
} from './store';
import {
  countSlotStatus,
  getAvailability,
  initialiseCheckedInts,
} from './utils';
import UISelect from '../../Common/Uiselect';

const TimeDurationDropDown = () => {
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const interviewers = useAvailableStore((state) => state.interviewers);
  const handleOnchange = async (e: SelectChangeEvent<number>) => {
    try {
      setIsLoading(true);
      const timeSlotReq = Number(e.target.value);
      const promises = interviewers.map(async (int) => {
        const newInt = cloneDeep(int);
        if (
          newInt.slots.find((slotAv) => slotAv.timeDuration === timeSlotReq)
        ) {
          setTimeSlot(timeSlotReq);
          return newInt;
        }

        let intAval: InterviewerAvailabliity = {
          timeDuration: timeSlotReq,
          availability: await getAvailability(
            new Date().toISOString(),
            newInt.interviewerId,
            timeSlotReq,
          ),
          cntConfirmed: 0,
          cntRequested: 0,
        };
        intAval.cntConfirmed = countSlotStatus(
          newInt.slots,
          'confirmed',
          timeSlot,
        );
        intAval.cntRequested = countSlotStatus(
          newInt.slots,
          'requested',
          timeSlot,
        );
        newInt.slots.push(intAval);
        return newInt;
      });
      const newIntrs = await Promise.all(promises);
      setCheckedInterSlots(initialiseCheckedInts(newIntrs));
      setInterviewers(newIntrs);
      setTimeSlot(timeSlotReq);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
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
