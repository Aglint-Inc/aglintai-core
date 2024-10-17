import {
  type DatabaseTable,
  type InterDetailsType,
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
    calender_events: InterDetailsType['all_events'];
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
    calender_events: [
      {
        end: {
          dateTime: '2024-10-17T00:45:00+05:30',
          timeZone: 'America/Los_Angeles',
        },
        id: '3uat0941m62st0j66kov40frnh',
        start: {
          dateTime: '2024-10-17T00:00:00+05:30',
          timeZone: 'America/Los_Angeles',
        },
        summary: 'Reconnect: Alex Soto / Aglint (Ravi/Raj)',
      },
      {
        end: {
          dateTime: '2024-10-17T10:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'vjuns7cpc7f06afe2oulob1iap_20241017T040000Z',
        start: {
          dateTime: '2024-10-17T09:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Ravi <=> Raj Sync',
      },
      {
        end: {
          dateTime: '2024-10-17T13:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'rgh0t75kqcebn5hflgten6aplc',
        start: {
          dateTime: '2024-10-17T13:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'H R Interview : Priya Bose for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-18T11:30:00+05:30',
          timeZone: 'America/New_York',
        },
        id: 'sca9etn22mdgjjkqmrgcb97seo',
        start: {
          dateTime: '2024-10-18T11:00:00+05:30',
          timeZone: 'America/New_York',
        },
        summary:
          'System Design and architecture : Mark St.Mary for Senior FP&A Managers',
      },
      {
        end: {
          dateTime: '2024-10-18T12:00:00+05:30',
          timeZone: 'America/New_York',
        },
        id: 'jg18qpp5ivsfadku52lql95v9k',
        start: {
          dateTime: '2024-10-18T11:30:00+05:30',
          timeZone: 'America/New_York',
        },
        summary: 'Initial Screening : Mark St.Mary for Senior FP&A Managers',
      },
      {
        end: {
          dateTime: '2024-10-18T20:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '7q9vatpk9hkdj0mpsjbgmeq6sn_20241018T140000Z',
        start: {
          dateTime: '2024-10-18T19:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Demo Day',
      },
      {
        end: {
          dateTime: '2024-10-20T09:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'nculf3066eak25v5ffaimcaiug',
        start: {
          dateTime: '2024-10-20T09:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'H R Interview : Andrea K. McKenzie for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-21T10:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '588rk05mu51eat3n7g0i9me5fg',
        start: {
          dateTime: '2024-10-21T09:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'null : Krisztina Burjan for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-21T10:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'u2cu6o7co8hqbgarbi9gi70boo',
        start: {
          dateTime: '2024-10-21T09:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'null : Krisztina Burjan for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-21T10:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'q71ktihc5rb3hq8mnto7i4m8i8',
        start: {
          dateTime: '2024-10-21T10:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'H R Interview : Mayuri Jagtap for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-21T11:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '2ue3k25grt25i0ipchmvedl728',
        start: {
          dateTime: '2024-10-21T11:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'H R Interview : Svetlana Romanova for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-21T12:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '03gqc0m5s0nmstgq4q2ep7rrng',
        start: {
          dateTime: '2024-10-21T12:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'H R Interview : Priya Bose for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-21T20:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'oq5upcu00pugsk1n6mjh4cdvsf_20241021T140000Z',
        start: {
          dateTime: '2024-10-21T19:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Business Sync (Ravi / Raj)',
      },
      {
        end: {
          dateTime: '2024-10-23T11:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '5953p8255usd0t5b3k1d1lkh94_20241023T050000Z',
        start: {
          dateTime: '2024-10-23T10:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Demo Day',
      },
      {
        end: {
          dateTime: '2024-10-23T12:00:00+05:30',
          timeZone: 'America/New_York',
        },
        id: 'khfpaoih42nf68o6ehreg5h3nc',
        start: {
          dateTime: '2024-10-23T11:30:00+05:30',
          timeZone: 'America/New_York',
        },
        summary:
          'System Design and architecture : Khurram for Senior FP&A Managers',
      },
      {
        end: {
          dateTime: '2024-10-23T12:30:00+05:30',
          timeZone: 'America/New_York',
        },
        id: '9r0cmfse6maorthmqf9k67o6f8',
        start: {
          dateTime: '2024-10-23T12:00:00+05:30',
          timeZone: 'America/New_York',
        },
        summary: 'Initial Screening : Khurram for Senior FP&A Managers',
      },
      {
        end: {
          dateTime: '2024-10-23T17:00:00+05:30',
          timeZone: 'America/Adak',
        },
        id: 'd6it8rif9cpnifc358on6hmgn0',
        start: {
          dateTime: '2024-10-23T16:30:00+05:30',
          timeZone: 'America/Adak',
        },
        summary:
          'H R Interview : Georgios Bamparoutsis for Senior FP&A Managers',
      },
      {
        end: {
          dateTime: '2024-10-24T10:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'vjuns7cpc7f06afe2oulob1iap_20241024T040000Z',
        start: {
          dateTime: '2024-10-24T09:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Ravi <=> Raj Sync',
      },
      {
        end: {
          dateTime: '2024-10-25T15:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '7u761qc4bvc4quv96js1i0pml4',
        start: {
          dateTime: '2024-10-25T14:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary:
          'H R Interview : Andrea K. McKenzie for Principal Customer Success Manager [ multiple session without day break ]',
      },
      {
        end: {
          dateTime: '2024-10-25T20:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '7q9vatpk9hkdj0mpsjbgmeq6sn_20241025T140000Z',
        start: {
          dateTime: '2024-10-25T19:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Demo Day',
      },
      {
        end: {
          dateTime: '2024-10-28T20:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'oq5upcu00pugsk1n6mjh4cdvsf_20241028T140000Z',
        start: {
          dateTime: '2024-10-28T19:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Business Sync (Ravi / Raj)',
      },
      {
        end: {
          dateTime: '2024-10-30T11:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: '5953p8255usd0t5b3k1d1lkh94_20241030T050000Z',
        start: {
          dateTime: '2024-10-30T10:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Demo Day',
      },
      {
        end: {
          dateTime: '2024-10-31T10:00:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        id: 'vjuns7cpc7f06afe2oulob1iap_20241031T040000Z',
        start: {
          dateTime: '2024-10-31T09:30:00+05:30',
          timeZone: 'Asia/Kolkata',
        },
        summary: 'Ravi <=> Raj Sync',
      },
    ],
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
    calender_events: [
      {
        end: {
          dateTime: '2024-10-17T10:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'fmoejc3smm2dr1v0ca5o2iljjc',
        start: {
          dateTime: '2024-10-17T09:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
      {
        end: {
          dateTime: '2024-10-17T13:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'gu3of33h5sit1e4jslnbv8uu6c',
        start: {
          dateTime: '2024-10-17T12:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-17T17:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'jff4spql5jvgoeg4g1locsiddo',
        start: {
          dateTime: '2024-10-17T16:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'H R Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-18T11:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'e37vtdi1ht0bhgupnrcrrevj40',
        start: {
          dateTime: '2024-10-18T10:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Recruiting Block',
      },
      {
        end: {
          dateTime: '2024-10-18T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'pui734ng5b5ourggk9i4pqg6p8',
        start: {
          dateTime: '2024-10-18T11:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Techinical Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-18T16:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '1ok7ei0ob4hoeraoc1pbqi5s5s',
        start: {
          dateTime: '2024-10-18T14:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Sprint Planning',
      },
      {
        end: {
          dateTime: '2024-10-18T18:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'nokbmeo4k18kn36kok3cqh5li4',
        start: {
          dateTime: '2024-10-18T16:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Out of Office',
      },
      {
        end: {
          dateTime: '2024-10-21T10:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 's1es4jv1un92h029c4ro7f2k5k',
        start: {
          dateTime: '2024-10-21T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Out of Office',
      },
      {
        end: {
          dateTime: '2024-10-21T11:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'qgcc58h5rv3c5i4npql29snvgs',
        start: {
          dateTime: '2024-10-21T10:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Recruiting Block',
      },
      {
        end: {
          dateTime: '2024-10-21T13:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'qq2cc191peobbno43i20q2uei0',
        start: {
          dateTime: '2024-10-21T11:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Vacation',
      },
      {
        end: {
          dateTime: '2024-10-21T14:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '1rjtvuaqoerpt97fkbca5ub6l0',
        start: {
          dateTime: '2024-10-21T13:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Recruiting Block',
      },
      {
        end: {
          dateTime: '2024-10-21T16:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '0ol3d4anqsa8fo61omi3vpphgs',
        start: {
          dateTime: '2024-10-21T15:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'H R Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-21T18:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '90euji7luj4hc81doq3vjl099k',
        start: {
          dateTime: '2024-10-21T16:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Initial Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-22T11:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '9185oude6migcs71j4k6oc7fa4',
        start: {
          dateTime: '2024-10-22T10:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Out of Office',
      },
      {
        end: {
          dateTime: '2024-10-22T12:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'qas76q1p95nsmbqlvr3tiva7do',
        start: {
          dateTime: '2024-10-22T11:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Project Review',
      },
      {
        end: {
          dateTime: '2024-10-22T13:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'osamlu72jpihqolkn5vpulh5jc',
        start: {
          dateTime: '2024-10-22T12:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-22T13:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '482qmhvb9puu8cgu6lbhdlcbog',
        start: {
          dateTime: '2024-10-22T13:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Recruiting Block',
      },
      {
        end: {
          dateTime: '2024-10-22T14:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'o1b2c8dj8mf6im1q6idh3hi1sc',
        start: {
          dateTime: '2024-10-22T13:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Recruiting Block',
      },
      {
        end: {
          dateTime: '2024-10-22T15:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'ae35vaj4n7lg9o8q8hig9lpmt4',
        start: {
          dateTime: '2024-10-22T14:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'H R Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-22T16:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'pg5svmu14q2rm3e65l7i68mgkc',
        start: {
          dateTime: '2024-10-22T15:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-22T18:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'af179mnbgnkte8k6hgklhgc3rs',
        start: {
          dateTime: '2024-10-22T16:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-23T09:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'pgp87e3bce9jueh5r5rh65prvk',
        start: {
          dateTime: '2024-10-23T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-23T12:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'r0bhbfh6lrijp3vg86kqr8srqo',
        start: {
          dateTime: '2024-10-23T11:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-23T13:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'l44v7o12qldqsg8dvehua0qkdg',
        start: {
          dateTime: '2024-10-23T12:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Daily Standup',
      },
      {
        end: {
          dateTime: '2024-10-23T13:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '17nejcj7k4uv3nghfq1mlro088',
        start: {
          dateTime: '2024-10-23T13:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-23T14:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'pl2s4gddna1ilp6ncpa4lq994o',
        start: {
          dateTime: '2024-10-23T13:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-23T15:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'gjb2gphic5q7v7o6502jgiafcs',
        start: {
          dateTime: '2024-10-23T14:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
      {
        end: {
          dateTime: '2024-10-23T16:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'dlhee2dh143fhqgo0jequ3t6jg',
        start: {
          dateTime: '2024-10-23T15:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Project Review',
      },
      {
        end: {
          dateTime: '2024-10-23T18:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'u26v743eo00vqmlgviv8ii76sk',
        start: {
          dateTime: '2024-10-23T16:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
      {
        end: {
          dateTime: '2024-10-24T10:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'j7rd1bpfhn68igsutbgi9b22u8',
        start: {
          dateTime: '2024-10-24T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'H R Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-24T11:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'jsj4c28a9q1lqvencm30r36jio',
        start: {
          dateTime: '2024-10-24T10:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Technical Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-24T12:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'cfq27vhg5uo5bl3nvu0v08hfos',
        start: {
          dateTime: '2024-10-24T11:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-24T14:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '53jva4b80e51qt2cfdduk9c554',
        start: {
          dateTime: '2024-10-24T12:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Vacation',
      },
      {
        end: {
          dateTime: '2024-10-24T15:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'd18jnff0lmq14hnm8b7soe434g',
        start: {
          dateTime: '2024-10-24T14:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-24T16:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '7gia3cnadhfoplfm0ttha9df9c',
        start: {
          dateTime: '2024-10-24T15:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Daily Standup',
      },
      {
        end: {
          dateTime: '2024-10-24T18:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '9p907767s0lc5k1qt3sr7mf5f8',
        start: {
          dateTime: '2024-10-24T16:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Technical Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-25T10:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'imanoi7cr2e28h204etjlmen9s',
        start: {
          dateTime: '2024-10-25T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Initial Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-25T12:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '6ucvekqle3pa4tvtrcl47j6ibo',
        start: {
          dateTime: '2024-10-25T10:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-25T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'pag0gefmqpkse080jevtboonb4',
        start: {
          dateTime: '2024-10-25T12:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-25T14:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'droffqhrv4aiujpe4uuor7olps',
        start: {
          dateTime: '2024-10-25T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Out of Office',
      },
      {
        end: {
          dateTime: '2024-10-25T15:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'jtkhqcd1o5uo1m78jqbe6komf0',
        start: {
          dateTime: '2024-10-25T14:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary:
          'System Design and architecture with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-25T17:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'al0hqbhf4koqfc0uknk1rbonqo',
        start: {
          dateTime: '2024-10-25T15:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-28T10:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '6fteh8oefusndh4pnd3e2p54ak',
        start: {
          dateTime: '2024-10-28T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary:
          'System Design and architecture with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-28T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'f8a3pk8eipsbklh2a92h1lop58',
        start: {
          dateTime: '2024-10-28T12:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Technical Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-28T14:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'vgd028ab2nqqrk4tb66eblchg4',
        start: {
          dateTime: '2024-10-28T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Techinical Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-28T15:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'e4fc289nh1i12ld35gjs9vmt1s',
        start: {
          dateTime: '2024-10-28T14:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Sprint Planning',
      },
      {
        end: {
          dateTime: '2024-10-28T17:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'mctb61e4efj7l85618866ah2oc',
        start: {
          dateTime: '2024-10-28T15:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-29T12:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'tdln7r1i6kn6dtn8l9qqap0pls',
        start: {
          dateTime: '2024-10-29T10:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Out of Office',
      },
      {
        end: {
          dateTime: '2024-10-29T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '4ueva14v17jqbc6rfc8usnkq9g',
        start: {
          dateTime: '2024-10-29T12:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Initial Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-29T15:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'ta2nt4a4j3jjm4ouerq9d7v3b8',
        start: {
          dateTime: '2024-10-29T14:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
      {
        end: {
          dateTime: '2024-10-30T10:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '0ec4bndo0ig4duihiov08nclhk',
        start: {
          dateTime: '2024-10-30T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-30T10:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '61a09acjoki0ia2jk2t439ophk',
        start: {
          dateTime: '2024-10-30T10:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Vacation',
      },
      {
        end: {
          dateTime: '2024-10-30T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'oqq1d0kv3ipngklgivv88306vs',
        start: {
          dateTime: '2024-10-30T11:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Recruiting Block',
      },
      {
        end: {
          dateTime: '2024-10-30T13:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '8ls367lj88jjqh80opa5rbe7kc',
        start: {
          dateTime: '2024-10-30T12:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Vacation',
      },
      {
        end: {
          dateTime: '2024-10-30T14:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '14egvvlam7se9sksrht8s223pk',
        start: {
          dateTime: '2024-10-30T13:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'H R Interview with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-30T15:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'ph3eqtduj2178bel0679ka98n4',
        start: {
          dateTime: '2024-10-30T14:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Initial Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-30T15:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'p60d95rorp3dhjhp19jrouikl0',
        start: {
          dateTime: '2024-10-30T15:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
      {
        end: {
          dateTime: '2024-10-30T16:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '00p7gfm4ttggfnfmt466beqoa4',
        start: {
          dateTime: '2024-10-30T15:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
      {
        end: {
          dateTime: '2024-10-30T17:10:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'tjne7r2emt771a9ppuc0krendk',
        start: {
          dateTime: '2024-10-30T16:20:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Business Meeting',
      },
      {
        end: {
          dateTime: '2024-10-31T10:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'k0sdrk1u743egg9jrnpmmv23ko',
        start: {
          dateTime: '2024-10-31T09:00:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Technical Screening with candidate scheldon cooper',
      },
      {
        end: {
          dateTime: '2024-10-31T12:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'bgkkfk1gjh7gkh3ul5sppsibck',
        start: {
          dateTime: '2024-10-31T10:50:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Out of Office',
      },
      {
        end: {
          dateTime: '2024-10-31T14:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'fvmdai3t510h9qlgdb6p9uvta8',
        start: {
          dateTime: '2024-10-31T12:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Vacation',
      },
      {
        end: {
          dateTime: '2024-10-31T15:40:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: '815hsi3463qljbidbg1bj01up4',
        start: {
          dateTime: '2024-10-31T14:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Project Review',
      },
      {
        end: {
          dateTime: '2024-10-31T17:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        id: 'n8u24ha7skcv5uegbiab4kc968',
        start: {
          dateTime: '2024-10-31T16:30:00+05:30',
          timeZone: 'Asia/Colombo',
        },
        summary: 'Break',
      },
    ],
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
