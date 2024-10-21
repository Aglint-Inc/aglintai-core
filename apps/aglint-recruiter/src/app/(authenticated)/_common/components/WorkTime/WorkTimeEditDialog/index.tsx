import { dayjsLocal } from '@aglint/shared-utils/src/scheduling';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';

import type { WorkingHour } from '../ui/TimeList';
import DayWithTime from './ui/DayWithTime';

export const WorkTimeEditDialog = ({
  isOpen,
  handleUpdate,
  workingHours,
  setIsOpen,
  isUpdating,
}: {
  isOpen: boolean;
  isUpdating: boolean;
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (data: { workingHours: WorkingHour[] }) => Promise<void>;
  workingHours: WorkingHour[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [localWorkingHours, setLocalWorkingHours] =
    useState<WorkingHour[]>(workingHours);

  const handleUpdateAndClose = async () => {
    await handleUpdate({ workingHours: localWorkingHours });
    setIsOpen(false);
  };

  useEffect(() => {
    setLocalWorkingHours(workingHours);
  }, [workingHours]);
  return (
    <UIDialog
      open={isOpen}
      size='xl'
      onClose={() => !isUpdating && setIsOpen(false)}
      title={'Edit Working Hours'}
      slotButtons={
        <>
          <UIButton
            variant='outline'
            size='sm'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </UIButton>
          <UIButton
            size='sm'
            onClick={handleUpdateAndClose}
            isLoading={isUpdating}
          >
            Update
          </UIButton>
        </>
      }
    >
      <div className='flex flex-col gap-4'>
        {localWorkingHours.map((day, i) => {
          const startTime = dayjsLocal()
            .set(
              'hour',
              parseInt(day.timeRange.startTime?.split(':')[0] || '0'),
            )
            .set(
              'minute',
              parseInt(day.timeRange.startTime?.split(':')[1] || '0'),
            )
            .toISOString();

          const endTime = dayjsLocal()
            .set('hour', parseInt(day.timeRange.endTime?.split(':')[0] || '0'))
            .set(
              'minute',
              parseInt(day.timeRange.endTime?.split(':')[1] || '0'),
            )
            .toISOString();

          return (
            <DayWithTime
              key={i}
              day={day}
              i={i}
              startTime={startTime}
              endTime={endTime}
              selectStartTime={(value, i) => {
                setLocalWorkingHours((pre) => {
                  const data = [...pre];
                  data[i].timeRange.startTime =
                    dayjsLocal(value).format('HH:mm');
                  return data;
                });
              }}
              selectEndTime={(value, i) => {
                setLocalWorkingHours((pre) => {
                  const data = [...pre];
                  data[i].timeRange.endTime = dayjsLocal(value).format('HH:mm');
                  return data;
                });
              }}
              setWorkingHours={setLocalWorkingHours}
            />
          );
        })}
      </div>
    </UIDialog>
  );
};
