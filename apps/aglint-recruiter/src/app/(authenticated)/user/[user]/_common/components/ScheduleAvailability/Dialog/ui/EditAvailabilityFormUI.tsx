import {
  type InterviewLoadType,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import Typography from '@components/typography';
import { Label } from '@components/ui/label';
import { type Dispatch, type SetStateAction } from 'react';

import InterviewLimitInput from '@/authenticated/components/InterviewLoad';
import KeywordSection from '@/authenticated/components/KeywordSection';
import DayWithTime from '@/company/components/WorkingHours/WorkTime/WorkTimeEditDialog/ui/DayWithTime';
import TimezonePicker from '@/components/Common/TimezonePicker';
import type timeZone from '@/utils/timeZone';

type FormProp = {
  timeZone: (typeof timeZone)[number] | null;
  setTimeZone: Dispatch<SetStateAction<(typeof timeZone)[number] | null>>;
  dailyLimit: InterviewLoadType['daily'];
  weeklyLmit: InterviewLoadType['weekly'];
  // eslint-disable-next-line no-unused-vars
  handleDailyValue: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleWeeklyValue: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleType: (type: 'Hours' | 'Interviews') => void;
  workingHours: SchedulingSettingType['workingHours'];
  setWorkingHours: Dispatch<
    SetStateAction<SchedulingSettingType['workingHours']>
  >;
  keywords: {
    title: string;
    description: string;
    value: any[];
    changeHandler: Dispatch<SetStateAction<any[]>>;
  }[];
};

export const EditAvailabilityForm = ({
  timeZone,
  setTimeZone,
  dailyLimit,
  weeklyLmit,
  handleDailyValue,
  handleWeeklyValue,
  handleType,
  workingHours,
  setWorkingHours,
  keywords,
}: FormProp) => {
  return (
    <div>
      <div className='flex gap-8'>
        <div className='mb-4 flex flex-col gap-4'>
          <Label>Edit Working Hours</Label>
          {workingHours.map((day, i) => {
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
              .set(
                'hour',
                parseInt(day.timeRange.endTime?.split(':')[0] || '0'),
              )
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
                  setWorkingHours((pre) => {
                    const data = [...pre];
                    data[i].timeRange.startTime =
                      dayjsLocal(value).format('HH:mm');
                    return data;
                  });
                }}
                selectEndTime={(value, i) => {
                  setWorkingHours((pre) => {
                    const data = [...pre];
                    data[i].timeRange.endTime =
                      dayjsLocal(value).format('HH:mm');
                    return data;
                  });
                }}
                setWorkingHours={setWorkingHours}
              />
            );
          })}
        </div>
        <div>
          <div className='mb-4 flex w-fit flex-col gap-4'>
            <Label htmlFor='zipcode' className='text-left'>
              Time Zone
            </Label>
            <TimezonePicker
              width='280'
              value={timeZone?.tzCode || null}
              onChange={(value) => setTimeZone(value)}
            />
          </div>
          <div className='mb-4 flex flex-col gap-4'>
            <Label>Interview Load</Label>
            <InterviewLimitInput
              value={dailyLimit.value}
              max={dailyLimit.max}
              type={dailyLimit.type}
              onValueChange={handleDailyValue}
              onTypeChange={handleType}
              mode='day'
            />
            <InterviewLimitInput
              value={weeklyLmit.value}
              max={weeklyLmit.max}
              type={weeklyLmit.type}
              onValueChange={handleWeeklyValue}
              onTypeChange={handleType}
              mode='week'
            />
          </div>
        </div>
      </div>
      <div>
        {keywords.map((keyword) => {
          return (
            <div className='mb-4 flex flex-col gap-4' key={keyword.title}>
              <Typography
                variant='p'
                type='small'
                className='mb-1 text-lg font-semibold'
              >
                {keyword.title}
              </Typography>
              <Typography variant='p' type='small' className='mb-4'>
                {keyword.description}
              </Typography>
              <KeywordSection
                keywords={keyword.value}
                setKeywords={keyword.changeHandler}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
