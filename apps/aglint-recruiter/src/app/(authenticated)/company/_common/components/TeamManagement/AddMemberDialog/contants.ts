import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';

export const defaultSchedulingSettings: CustomSchedulingSettingsUser = {
  timeZone: {
    utc: '-08:00',
    name: '(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle',
    label: 'America/Los_Angeles (GMT-08:00)',
    tzCode: 'America/Los_Angeles',
  },
  break_hour: {
    end_time: '10:39',
    start_time: '09:38',
  },
  totalDaysOff: [
    {
      date: '16 Jan 2024',
      event_name: 'Martin Luther King Jr. Day',
    },
    {
      date: '19 Feb 2024',
      event_name: 'Presidents Day',
    },
    {
      date: '04 Oct 2024',
      locations: ['San fransisco, California, United States'],
      event_name: 'today',
    },
  ],
  workingHours: [
    {
      day: 'sunday',
      isWorkDay: false,
      timeRange: {
        endTime: '17:00',
        startTime: '07:00',
      },
    },
    {
      day: 'monday',
      isWorkDay: true,
      timeRange: {
        endTime: '17:00',
        startTime: '05:00',
      },
    },
    {
      day: 'tuesday',
      isWorkDay: true,
      timeRange: {
        endTime: '17:00',
        startTime: '08:00',
      },
    },
    {
      day: 'wednesday',
      isWorkDay: true,
      timeRange: {
        endTime: '17:00',
        startTime: '09:00',
      },
    },
    {
      day: 'thursday',
      isWorkDay: true,
      timeRange: {
        endTime: '17:00',
        startTime: '09:00',
      },
    },
    {
      day: 'friday',
      isWorkDay: true,
      timeRange: {
        endTime: '17:00',
        startTime: '09:00',
      },
    },
    {
      day: 'saturday',
      isWorkDay: false,
      timeRange: {
        endTime: '17:00',
        startTime: '09:00',
      },
    },
  ],
  interviewLoad: {
    dailyLimit: {
      type: 'Hours',
      value: 8,
    },
    weeklyLimit: {
      type: 'Interviews',
      value: 20,
    },
  },
  schedulingKeyWords: {
    free: ['Break'],
    outOfOffice: ['Vacation', 'Out of Office'],
    SoftConflicts: [
      'Daily Standup',
      'Project Review',
      'Sprint Planning',
      'Strategy Session',
    ],
    recruitingBlocks: ['Recruiting Block'],
  },
};
