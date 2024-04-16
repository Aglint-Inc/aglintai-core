import { useRouter } from 'next/navigation';
import React from 'react';

import { PageLayout } from '@/devlink2';
import { InterviewStatic, SchedulingDashboard } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';

import InterviewDetailsByMonths from './InterviewDetailsByMonths';
import LeaderBoardWidget from './LeaderBoardWidget';
import YourScheduleMeetings from './YourScheduleMeetings';

const SchedulingDashboardComp = () => {
  const router = useRouter();
  return (
    <PageLayout
      slotBody={
        <SchedulingDashboard
          onClickCandidates={{
            onClick: () =>
              router.push(`${pageRoutes.SCHEDULING}?tab=candidates`),
          }}
          onClickInterviewTypes={{
            onClick: () =>
              router.push(`${pageRoutes.SCHEDULING}?tab=interviewtypes`),
          }}
          onClickInterviewers={{
            onClick: () =>
              router.push(`${pageRoutes.SCHEDULING}?tab=interviewers`),
          }}
          onClickMySchedule={{
            onClick: () =>
              router.push(`${pageRoutes.SCHEDULING}?tab=myschedules`),
          }}
          onClickScheduleSetting={{
            onClick: () =>
              router.push(
                `${pageRoutes.SCHEDULING}?tab=settings&subtab=interviewLoad`,
              ),
          }}
          slotFirstGrid={<YourScheduleMeetings meetings={dummyMeeting} />}
          slotGridInterviewDetail={
            <>
              <InterviewDetailsByMonths
                meetingData={dummyMeetingAnalyticsDetails}
              />
              <LeaderBoardWidget
                interviewers={[
                  {
                    id: 'sadasd',
                    name: 'tester',
                    photo: '',
                    title: 'tester',
                    hours: 12,
                    interviews: 5,
                  },
                ]}
                filter='week'
                setFilter={(x) => {
                  x;
                }}
              />
            </>
          }
          slotInterviewStatic={
            <>
              <InterviewStatic />
              <InterviewStatic />
            </>
          }
        />
      }
    />
  );
};

export default SchedulingDashboardComp;

const dummyMeetingAnalyticsDetails: {
  month:
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
  completed: number;
  canceled: number;
}[] = [
  {
    month: 'jan',
    completed: 4,
    canceled: 6,
  },
  {
    month: 'feb',
    completed: 3,
    canceled: 8,
  },
  {
    month: 'mar',
    completed: 2,
    canceled: 5,
  },
  {
    month: 'apr',
    completed: 1,
    canceled: 7,
  },
  {
    month: 'may',
    completed: 7,
    canceled: 3,
  },
  {
    month: 'jun',
    completed: 8,
    canceled: 2,
  },
  {
    month: 'jul',
    completed: 8,
    canceled: 3,
  },
  {
    month: 'aug',
    completed: 4,
    canceled: 5,
  },
  {
    month: 'sep',
    completed: 5,
    canceled: 6,
  },
  {
    month: 'oct',
    completed: 7,
    canceled: 8,
  },
  {
    month: 'nov',
    completed: 9,
    canceled: 8,
  },
  {
    month: 'dec',
    completed: 5,
    canceled: 6,
  },
];

const dummyMeeting: {
  candidate: {
    name: string;
    image: string;
  };
  meetingClient: {
    icon: string;
    name: string;
  };
  meetingName: string;
  time: {
    start: string;
    end: string;
  };
}[] = [
  {
    candidate: { name: 'tester', image: '' },
    meetingClient: {
      name: 'google',
      icon: '',
    },
    meetingName: 'test Meesad',

    time: {
      start: '2024-04-16T10:00:00+05:30',
      end: '2024-04-16T10:30:00+05:30',
    },
  },
  {
    candidate: { name: 'tester', image: '' },
    meetingClient: {
      name: 'google',
      icon: '',
    },
    meetingName: 'test Meesad',

    time: {
      start: '2024-04-16T10:00:00+05:30',
      end: '2024-04-16T10:30:00+05:30',
    },
  },
  {
    candidate: { name: 'tester', image: '' },
    meetingClient: {
      name: 'google',
      icon: '',
    },
    meetingName: 'test Meesad',

    time: {
      start: '2024-04-16T10:00:00+05:30',
      end: '2024-04-16T10:30:00+05:30',
    },
  },
];
