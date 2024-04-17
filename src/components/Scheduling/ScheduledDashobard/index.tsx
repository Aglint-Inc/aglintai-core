import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  InterviewModuleStats,
  InterviewModuleStatsCard,
  InterviewStatic,
  SchedulingDashboard,
} from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';

import InterviewMeetingAnalytic from './InterviewMeetingAnalytic';
import LeaderBoardWidget from './LeaderBoardWidget';
import YourScheduleMeetings from './YourScheduleMeetings';

const SchedulingDashboardComp = () => {
  const router = useRouter();
  const [leaderBoardFilter, setLeaderBoardFilter] = useState<
    'week' | 'month' | 'year'
  >('week');
  return (
    <Stack>
      <SchedulingDashboard
        onClickCandidates={{
          onClick: () => router.push(`${pageRoutes.SCHEDULING}?tab=candidates`),
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
        slotFirstGrid={
          <YourScheduleMeetings
            meetings={dummyMeeting}
            onClickViewSchedules={() =>
              router.push(`${pageRoutes.SCHEDULING}?tab=myschedules`)
            }
          />
        }
        slotGridInterviewDetail={
          <>
            <InterviewMeetingAnalytic
              meetingData={dummyMeetingAnalyticsDetails}
            />
            <LeaderBoardWidget
              interviewers={InterviewAnalytics}
              filter={leaderBoardFilter}
              setFilter={(x) => {
                setLeaderBoardFilter(x);
              }}
            />
          </>
        }
        slotInterviewStatic={
          <>
            {analyticsData.map((item, index) => (
              <InterviewStatic
                key={index}
                textDesc={item.description}
                textHeader={item.header}
                textNumber={item.ratio}
                textSmallNumber={item.ratioOutOf}
              />
            ))}
          </>
        }
        slotInterviewModuleStats={
          <InterviewModuleStats
            onClickViewAllModules={{
              onClick: () =>
                router.push(`${pageRoutes.SCHEDULING}?tab=interviewtypes`),
            }}
            slotInterviewModuleStatsCard={
              <>
                {modulesAnalytics.map((item, index) => (
                  <InterviewModuleStatsCard
                    key={index}
                    textInterviewModule={item.name}
                    textQualifiedMember={item.qualified}
                    textTraineeShadow={item.trainee.shadow}
                    textTraineeReverse={item.trainee.reverseShadow}
                  />
                ))}
              </>
            }
          />
        }
      />
    </Stack>
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
    meetingName: 'Phase 1: AI Engineer',
    candidate: {
      name: 'bilal saeed',
      image:
        'https://static.toiimg.com/thumb/msid-94814723,width-400,resizemode-4/94814723.jpg',
    },
    meetingClient: {
      name: 'google',
      icon: 'https://www.brandeis.edu/its/_files/google-meet-logo.png',
    },

    time: {
      start: '2024-04-16T10:00:00+05:30',
      end: '2024-04-16T10:30:00+05:30',
    },
  },
  {
    meetingName: 'Phase 3: UI/UX',
    candidate: {
      name: 'yashal shahid',
      image:
        'https://img.wynk.in/unsafe/200x200/filters:no_upscale():strip_exif():format(jpg)/http://s3.ap-south-1.amazonaws.com/discovery-prod-zion/zion/1670397991178-yashal_shahid.jpg',
    },
    meetingClient: {
      name: 'google',
      icon: 'https://www.brandeis.edu/its/_files/google-meet-logo.png',
    },
    time: {
      start: '2024-04-18T12:00:00+05:30',
      end: '2024-04-18T13:30:00+05:30',
    },
  },
  {
    meetingName: 'Debriefing: Project STK',
    candidate: {
      name: 'Arijit Singh',
      image:
        'https://img.wynk.in/unsafe/200x200/filters:no_upscale():strip_exif():format(jpg)/http://s3.ap-south-1.amazonaws.com/discovery-prod-zion/zion/1696452544852-Arijit_Singh.png',
    },
    meetingClient: {
      name: 'zoom',
      icon: 'https://dashboard.snapcraft.io/site_media/appmedia/2020/03/icon.png',
    },
    time: {
      start: '2024-04-20T18:00:00+05:30',
      end: '2024-04-16T19:00:00+05:30',
    },
  },
];

const InterviewAnalytics = [
  {
    id: 'sadasdsad',
    name: 'Dhanush',
    photo:
      'https://www.indiancinemagallery.net/wp-content/uploads/2017/12/Dhanush.jpg',
    title: 'Team Lead (AIML)',
    hours: 15.5,
    interviews: 20,
  },
  {
    id: 'sadasdsad',
    name: 'Hamza Abbasi',
    photo:
      'https://i.tribune.com.pk/media/images/hamza-2-01593509071-0/hamza-2-01593509071-0.jpg',
    title: 'Full Stack Developer',
    hours: 8.5,
    interviews: 7,
  },
  {
    id: 'sadasdasd',
    name: 'Mawra Hocane',
    photo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjcvb7tQ1G0aNagksojF8ZwF1gUOpMUPez2q_7YJASw&s',
    title: 'STK (FL)',
    hours: 7,
    interviews: 5,
  },
];

const analyticsData = [
  {
    header: 'Something',
    description: 'this is some description.',
    ratio: 4.5,
    ratioOutOf: 'out of 5',
  },
  {
    header: 'Something',
    description: 'this is some description.',
    ratio: 4.5,
    ratioOutOf: 'out of 5',
  },
  {
    header: 'Something',
    description: 'this is some description.',
    ratio: 4.5,
    ratioOutOf: 'out of 5',
  },
];

const modulesAnalytics = [
  {
    name: ' AI ML',
    qualified: 5,
    trainee: {
      shadow: 2,
      reverseShadow: 1,
    },
  },
  {
    name: 'UI/UX',
    qualified: 10,
    trainee: {
      shadow: 5,
      reverseShadow: 3,
    },
  },
  {
    name: 'STK',
    qualified: 4,
    trainee: {
      shadow: 1,
      reverseShadow: 2,
    },
  },
];
