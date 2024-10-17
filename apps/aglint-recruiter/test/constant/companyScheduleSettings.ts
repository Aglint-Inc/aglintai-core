import {
  type CalendarEvent,
  type DatabaseTable,
  type SchedulingSettingType,
  type SessionInterviewerApiRespType,
} from '@aglint/shared-types';

import { type fetchAndVerifyDb } from '@/services/CandidateSchedule/utils/dataFetch/fetchAndVerifyDb';

type ScheduleSettingTypes = 'default';
export const test_company_schedule_setting: Record<
  ScheduleSettingTypes,
  SchedulingSettingType
> = {
  default: {
    timeZone: {
      utc: '+05:30',
      name: '(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai',
      label: 'Asia/Calcutta (GMT+05:30)',
      tzCode: 'Asia/Calcutta',
    },
    break_hour: { end_time: '13:00', start_time: '12:00' },
    totalDaysOff: [
      { date: '01 Jan 2024', event_name: 'New Year Day' },
      { date: '16 Jan 2024', event_name: 'Martin Luther King Jr. Day' },
      { date: '19 Feb 2024', event_name: 'Presidents Day' },
      { date: '27 May 2024', event_name: 'Memorial Day' },
      { date: '19 Jun 2024', event_name: 'National Independence Day' },
      { date: '04 Jul 2024', event_name: 'Independence Day' },
      { date: '02 Sep 2024', event_name: 'Labor Day' },
      { date: '14 Oct 2024', event_name: 'Columbus Day' },
      { date: '11 Nov 2024', event_name: 'Veterans Day' },
      { date: '28 Nov 2024', event_name: 'Thanksgiving Day' },
      { date: '25 Dec 2024', event_name: 'Christmas Day' },
    ],
    workingHours: [
      {
        day: 'sunday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'monday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'tuesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'wednesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'thursday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'friday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'saturday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
    ],
    interviewLoad: {
      dailyLimit: { type: 'Interviews', value: 8 },
      weeklyLimit: { type: 'Interviews', value: 41 },
    },
    debrief_defaults: {
      sourcer: false,
      recruiter: false,
      hiring_manager: true,
      previous_interviewers: false,
      recruiting_coordinator: false,
    },
    schedulingKeyWords: {
      free: [
        'Personal Time',
        'Break',
        'Team Lunch',
        'Networking Event',
        'Office Hours',
        'Casual Meetup',
      ],
      outOfOffice: ['Maternity Leave', 'Vacation', 'PTO', 'Out of Office'],
      SoftConflicts: [
        'Daily Standup',
        'Project Review',
        'Sprint Planning',
        'Strategy Session',
        'Team Briefing',
      ],
      recruitingBlocks: ['Dedicated Recruiting', 'Recruiting Block'],
    },
  },
};

type InterviewerScheduleType = 'asia' | 'los_angeles' | 'adak';

export const intervier_scheduling_settings: Record<
  InterviewerScheduleType,
  DatabaseTable['recruiter_user']['scheduling_settings']
> = {
  los_angeles: {
    timeZone: {
      utc: '-08:00',
      name: '(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle',
      label: 'America/Los_Angeles (GMT-08:00)',
      tzCode: 'America/Los_Angeles',
    },
    break_hour: { end_time: '13:30', start_time: '13:00' },
    totalDaysOff: [
      { date: '01 Jan 2024', event_name: 'New Year Day' },
      { date: '16 Jan 2024', event_name: 'Martin Luther King Jr. Day' },
      { date: '19 Feb 2024', event_name: 'Presidents Day' },
      { date: '27 May 2024', event_name: 'Memorial Day' },
      {
        date: '19 Jun 2024',
        event_name: 'Juneteenth National Independence Day',
      },
      { date: '04 Jul 2024', event_name: 'Independence Day' },
      { date: '02 Sep 2024', event_name: 'Labor Day' },
      { date: '14 Oct 2024', event_name: 'Columbus Day' },
      { date: '11 Nov 2024', event_name: 'Veterans Day' },
      { date: '28 Nov 2024', event_name: 'Thanksgiving Day' },
      { date: '25 Dec 2024', event_name: 'Christmas Day' },
    ],
    workingHours: [
      {
        day: 'sunday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'monday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'tuesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'wednesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'thursday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'friday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'saturday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
    ],
    interviewLoad: {
      dailyLimit: { type: 'Hours', value: 4 },
      weeklyLimit: { type: 'Hours', value: 20 },
    },
    schedulingKeyWords: {
      free: [
        'Personal Time',
        'Break',
        'Team Lunch',
        'Networking Event',
        'Office Hours',
        'Casual Meetup',
      ],
      outOfOffice: [
        'Maternity leave',
        'vacation',
        'pto',
        'out of office',
        'ooo',
      ],
      SoftConflicts: [
        'Daily Standup',
        'Sync Up',
        'Project Review',
        'Sprint Planning',
        'Strategy Session',
        'Team Briefing',
      ],
      recruitingBlocks: ['dedicated recruiting', 'Recruiting Block'],
    },
  },
  asia: {
    timeZone: {
      utc: '+05:30',
      name: '(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai',
      label: 'Asia/Calcutta (GMT+05:30)',
      tzCode: 'Asia/Calcutta',
    },
    break_hour: { end_time: '13:00', start_time: '12:00' },
    totalDaysOff: [
      { date: '01 Jan 2024', event_name: 'New Year Day' },
      { date: '16 Jan 2024', event_name: 'Martin Luther King Jr. Day' },
      { date: '19 Feb 2024', event_name: 'Presidents Day' },
      { date: '27 May 2024', event_name: 'Memorial Day' },
      { date: '19 Jun 2024', event_name: 'National Independence Day' },
      { date: '04 Jul 2024', event_name: 'Independence Day' },
      { date: '02 Sep 2024', event_name: 'Labor Day' },
      { date: '14 Oct 2024', event_name: 'Columbus Day' },
      { date: '11 Nov 2024', event_name: 'Veterans Day' },
      { date: '28 Nov 2024', event_name: 'Thanksgiving Day' },
      { date: '25 Dec 2024', event_name: 'Christmas Day' },
    ],
    workingHours: [
      {
        day: 'sunday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'monday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'tuesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'wednesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'thursday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'friday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'saturday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
    ],
    interviewLoad: {
      dailyLimit: { type: 'Hours', value: 8 },
      weeklyLimit: { type: 'Hours', value: 40 },
    },

    schedulingKeyWords: {
      free: [
        'Personal Time',
        'Break',
        'Team Lunch',
        'Networking Event',
        'Office Hours',
        'Casual Meetup',
      ],
      outOfOffice: ['Maternity Leave', 'Vacation', 'PTO', 'Out of Office'],
      SoftConflicts: [
        'Daily Standup',
        'Project Review',
        'Sprint Planning',
        'Strategy Session',
        'Team Briefing',
      ],
      recruitingBlocks: ['Dedicated Recruiting', 'Recruiting Block'],
    },
  },
  adak: {
    timeZone: {
      utc: '-10:00',
      name: '(GMT-10:00) Adak',
      label: 'America/Adak (GMT-10:00)',
      tzCode: 'America/Adak',
    },
    break_hour: { end_time: '13:00', start_time: '12:00' },
    totalDaysOff: [
      { date: '01 Jan 2024', event_name: 'New Year Day' },
      { date: '16 Jan 2024', event_name: 'Martin Luther King Jr. Day' },
      { date: '19 Feb 2024', event_name: 'Presidents Day' },
      { date: '27 May 2024', event_name: 'Memorial Day' },
      { date: '19 Jun 2024', event_name: 'National Independence Day' },
      { date: '04 Jul 2024', event_name: 'Independence Day' },
      { date: '02 Sep 2024', event_name: 'Labor Day' },
      { date: '14 Oct 2024', event_name: 'Columbus Day' },
      { date: '11 Nov 2024', event_name: 'Veterans Day' },
      { date: '28 Nov 2024', event_name: 'Thanksgiving Day' },
      { date: '25 Dec 2024', event_name: 'Christmas Day' },
    ],
    workingHours: [
      {
        day: 'sunday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'monday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'tuesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'wednesday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'thursday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'friday',
        isWorkDay: true,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
      {
        day: 'saturday',
        isWorkDay: false,
        timeRange: { endTime: '17:00', startTime: '09:00' },
      },
    ],
    interviewLoad: {
      dailyLimit: { type: 'Hours', value: 8 },
      weeklyLimit: { type: 'Hours', value: 40 },
    },
    schedulingKeyWords: {
      free: [],
      outOfOffice: [],
      SoftConflicts: [],
      recruitingBlocks: [],
    },
  },
};

type InterviewerTypes = 'ravi' | 'dileep' | 'rajiv';
export const test_interviewer: Record<
  InterviewerTypes,
  {
    details: Pick<
      SessionInterviewerApiRespType,
      | 'email'
      | 'first_name'
      | 'interviewer_type'
      | 'last_name'
      | 'user_id'
      | 'profile_image'
      | 'position'
      | 'training_type'
    >;
    calender_events: CalendarEvent[];
  }
> = {
  ravi: {
    details: {
      email: 'ravi@aglinthq.com',
      user_id: 'b322a130-3449-43d6-8dc4-1dfea96f4520',
      position: 'CTO',
      last_name: 'K',
      first_name: 'Ravi',
      profile_image: null,
      training_type: 'qualified',
      interviewer_type: 'qualified',
    },
    calender_events: [],
  },
  dileep: {
    details: {
      email: 'dileep@aglinthq.com',
      user_id: 'ae5eceb7-24f3-4550-9784-b56c354e0978',
      position: 'Engineer',
      last_name: 'B C',
      first_name: 'Dileep',
      profile_image: null,
      training_type: 'qualified',
      interviewer_type: 'qualified',
    },
    calender_events: [],
  },
  rajiv: {
    details: {
      email: 'rajeev@aglinthq.com',
      user_id: 'e77092ce-a7b3-4be8-b702-bfe9800b6514',
      position: 'SDE I',
      last_name: 'Harikar',
      first_name: 'Rajeev',
      profile_image: null,
      training_type: 'qualified',
      interviewer_type: 'qualified',
    },
    calender_events: [],
  },
};

export const test_sessions: {
  module: Awaited<
    ReturnType<typeof fetchAndVerifyDb>
  >['int_modules_data'][0][0];
  session: Awaited<
    ReturnType<typeof fetchAndVerifyDb>
  >['interview_sessions'][0];
}[] = [
  {
    module: {
      id: '5f9053e4-0256-401e-8928-1c2f9cde54b0',
      name: 'Initial Screening',
      settings: {
        noShadow: 2,
        noReverseShadow: 2,
        require_training: true,
        reqruire_approval: false,
      },
      created_at: '2024-10-04T13:22:00.644286+00:00',
      created_by: '5fb53f5f-5b21-42b7-89e8-93718b104cdc',
      description: '',
      is_archived: false,
      instructions: null,
      recruiter_id: '1a12a488-c3f3-462b-8b3b-ea429e4f7fdc',
      department_id: null,
      duration_available: {
        activeDuration: 30,
        availabletimeSlots: [],
      },
    },
    session: {
      id: '5e07e686-f95a-498b-b7ff-e33bdcfa3de3',
      name: 'Initial screening',
      location: null,
      module_id: '5f9053e4-0256-401e-8928-1c2f9cde54b0',
      created_at: '2024-10-14T14:40:51.567387+00:00',
      meeting_id: '05d77a29-70b9-4d4d-b812-45904ddac074',
      members_meta: {
        sourcer: false,
        recruiter: false,
        hiring_manager: false,
        previous_interviewers: false,
        recruiting_coordinator: false,
      },
      recruiter_id: '1a12a488-c3f3-462b-8b3b-ea429e4f7fdc',
      session_type: 'panel',
      schedule_type: 'google_meet',
      session_order: 2,
      break_duration: 0,
      interviewer_cnt: 1,
      session_duration: 30,
      interview_plan_id: '0c634523-7d0b-4bcf-8fdd-e58f64c88d32',
      parent_session_id: '2220505a-7a02-4f59-9af1-29ee705ffb72',
    },
  },
  {
    module: {
      id: '0e088373-b483-4472-b10f-47fa2e815c8b',
      name: 'H R Interview',
      settings: {
        noShadow: 2,
        noReverseShadow: 2,
        require_training: false,
        reqruire_approval: false,
      },
      created_at: '2024-10-04T14:08:26.483308+00:00',
      created_by: '5fb53f5f-5b21-42b7-89e8-93718b104cdc',
      description: '',
      is_archived: false,
      instructions: null,
      recruiter_id: '1a12a488-c3f3-462b-8b3b-ea429e4f7fdc',
      department_id: null,
      duration_available: {
        activeDuration: 30,
        availabletimeSlots: [],
      },
    },
    session: {
      id: 'c8091703-c362-4535-a0fe-00e968c109e6',
      name: 'H R interview',
      location: null,
      module_id: '0e088373-b483-4472-b10f-47fa2e815c8b',
      created_at: '2024-10-14T14:40:51.567387+00:00',
      meeting_id: '08b72328-504c-4481-876a-e8cae45c6cb8',
      members_meta: {
        sourcer: false,
        recruiter: false,
        hiring_manager: false,
        previous_interviewers: false,
        recruiting_coordinator: false,
      },
      recruiter_id: '1a12a488-c3f3-462b-8b3b-ea429e4f7fdc',
      session_type: 'individual',
      schedule_type: 'google_meet',
      session_order: 1,
      break_duration: 0,
      interviewer_cnt: 1,
      session_duration: 30,
      interview_plan_id: '0c634523-7d0b-4bcf-8fdd-e58f64c88d32',
      parent_session_id: '10d015c4-9011-481c-9205-de0d7d835250',
    },
  },
];
