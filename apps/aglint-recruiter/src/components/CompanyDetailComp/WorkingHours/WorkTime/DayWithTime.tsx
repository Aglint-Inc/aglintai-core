import type { schedulingSettingType } from '@aglint/shared-types';
import { Checkbox } from '@components/ui/checkbox';
import type { Dispatch } from 'react';

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
    <div key={i} className='flex-center flex items-center gap-2'>
      <div className='flex-center flex min-w-[120px] items-center gap-2'>
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
