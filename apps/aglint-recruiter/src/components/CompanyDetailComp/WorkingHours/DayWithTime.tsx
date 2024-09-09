import { schedulingSettingType } from '@aglint/shared-types';
import { Checkbox } from '@components/ui/checkbox';
import React, { Dispatch } from 'react';

import TimePicker from '@/components/Common/TimePicker';
import { capitalize } from '@/utils/text/textUtils';

function DayWithTime({
  day,
  endTime,
  startTime,
  setWorkingHours,
  selectStartTime,
  selectEndTime,
  i,
}: {
  day: schedulingSettingType['workingHours'][0];
  endTime: string;
  startTime: string;
  setWorkingHours: Dispatch<
    React.SetStateAction<schedulingSettingType['workingHours']>
  >;
  // eslint-disable-next-line no-unused-vars
  selectStartTime: (value: any, i: number) => void;
  // eslint-disable-next-line no-unused-vars
  selectEndTime: (value: any, i: number) => void;
  i: number;
}) {
  return (
    <div key={i} className='flex gap-2 flex-center items-center'>
      <div className='flex gap-2 flex-center min-w-[120px] items-center'>
        <Checkbox
          onClick={() => {
            setWorkingHours((pre) => {
              const data = pre;
              data[Number(i)].isWorkDay = !data[Number(i)].isWorkDay;
              return [...data];
            });
          }}
          defaultChecked={day.isWorkDay}
        />
        <p>{capitalize(day.day)}</p>
      </div>
      <TimePicker
        onChange={(value) => {
          selectStartTime(value, i);
        }}
        value={new Date(startTime)}
      />
      <p>to</p>
      <TimePicker
        onChange={(value) => {
          selectEndTime(value, i);
        }}
        value={new Date(endTime)}
      />
    </div>
  );
}

export default DayWithTime;