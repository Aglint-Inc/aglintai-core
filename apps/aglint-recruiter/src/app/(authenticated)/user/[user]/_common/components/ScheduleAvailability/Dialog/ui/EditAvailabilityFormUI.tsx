import {
  type InterviewLoadType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Label } from '@components/ui/label';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { type Dispatch, type SetStateAction } from 'react';

import InterviewLimitInput from '@/authenticated/components/InterviewLoad';
import KeywordSection from '@/authenticated/components/KeywordSection';
import DayWithTime from '@/company/components/WorkingHours/WorkTime/WorkTimeEditDialog/ui/DayWithTime';
import TimezonePicker from '@/components/Common/TimezonePicker';
import UITypography from '@/components/Common/UITypography';
import type timeZone from '@/utils/timeZone';

type FormProp = {
  timeZone: (typeof timeZone)[number];
  setTimeZone: Dispatch<SetStateAction<(typeof timeZone)[number]>>;
  dailyLimit: InterviewLoadType['daily'];
  weeklyLmit: InterviewLoadType['weekly'];
  // eslint-disable-next-line no-unused-vars
  handleDailyValue: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleWeeklyValue: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleType: (type: 'Hours' | 'Interviews') => void;
  workingHours: schedulingSettingType['workingHours'];
  setWorkingHours: Dispatch<
    SetStateAction<schedulingSettingType['workingHours']>
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
    <ScrollArea className='h-[500px] w-full'>
      <div className='mb-4 flex w-fit flex-col gap-4'>
        <Label htmlFor='zipcode' className='text-left'>
          Time Zone
        </Label>
        <TimezonePicker
          width='280'
          value={timeZone?.tzCode}
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
        />
        <InterviewLimitInput
          value={weeklyLmit.value}
          max={weeklyLmit.max}
          type={weeklyLmit.type}
          onValueChange={handleWeeklyValue}
          onTypeChange={handleType}
        />
      </div>
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
                  data[i].timeRange.endTime = dayjsLocal(value).format('HH:mm');
                  return data;
                });
              }}
              setWorkingHours={setWorkingHours}
            />
          );
        })}
      </div>
      <div>
        {keywords.map((keyword) => {
          return (
            <div className='mb-4 flex flex-col gap-4' key={keyword.title}>
              <UITypography
                variant='p'
                type='small'
                className='mb-1 text-lg font-semibold'
              >
                {keyword.title}
              </UITypography>
              <UITypography variant='p' type='small' className='mb-4'>
                {keyword.description}
              </UITypography>
              <KeywordSection
                keywords={keyword.value}
                setKeywords={keyword.changeHandler}
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
