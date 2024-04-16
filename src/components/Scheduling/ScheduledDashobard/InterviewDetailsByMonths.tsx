import React from 'react';

import { InterviewDetailPill, NewInterviewDetail } from '@/devlink3';
import { capitalizeAll } from '@/src/utils/text/textUtils';

const InterviewDetailsMeetingAnalytic = ({
  meetingData,
}: InterviewDetailsMeetingAnalyticType) => {
  const meetData = initialData.map((item) => {
    const temp = meetingData.find((md) => md.month === item.month);
    return temp
      ? {
          month: temp.month,
          completed: (temp.completed / (temp.canceled + temp.completed)) * 100,
          canceled: (temp.canceled / (temp.canceled + temp.completed)) * 100,
        }
      : item;
  });

  return (
    <NewInterviewDetail
      slotInterviewDetailPill={
        <>
          {meetData.map((item, index) => {
            return (
              <InterviewDetailPill
                key={index}
                textMonth={capitalizeAll(item.month)}
                propsWidthGreen={{
                  style: {
                    width: `${item.completed}%`,
                  },
                }}
                propsWidthGrey={{
                  style: {
                    width: `${item.canceled}%`,
                  },
                }}
              />
            );
          })}
        </>
      }
    />
  );
};

export default InterviewDetailsMeetingAnalytic;

type MonthName =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';

type InterviewDetailsMeetingAnalyticType = {
  meetingData: { month: MonthName; completed: number; canceled: number }[];
};

const initialData: InterviewDetailsMeetingAnalyticType['meetingData'] = [
  {
    month: 'jan',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'feb',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'mar',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'apr',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'may',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'jun',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'jul',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'aug',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'sep',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'oct',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'nov',
    completed: 0,
    canceled: 0,
  },
  {
    month: 'dec',
    completed: 0,
    canceled: 0,
  },
];
