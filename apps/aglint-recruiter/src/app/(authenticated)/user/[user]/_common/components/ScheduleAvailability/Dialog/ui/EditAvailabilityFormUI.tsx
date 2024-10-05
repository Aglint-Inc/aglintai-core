import { type InterviewLoadType } from '@aglint/shared-types';
import { Label } from '@components/ui/label';
import { ScrollArea } from '@components/ui/scroll-area';
import { type Dispatch, type SetStateAction } from 'react';

import InterviewLimitInput from '@/authenticated/components/InterviewLoad';
import KeywordSection from '@/authenticated/components/KeywordSection';
import TimezonePicker from '@/components/Common/TimezonePicker';
import UITypography from '@/components/Common/UITypography';
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
