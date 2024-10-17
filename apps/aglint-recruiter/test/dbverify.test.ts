// quote.service.mock.test.ts
import { type CalConflictType } from '@aglint/shared-types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchAndVerifyDb } from '@/services/CandidateSchedule/utils/dataFetch/fetchAndVerifyDb';
import { getCalEventType } from '@/services/CandidateSchedule/utils/getCalEventType';

import { sample_scheduling_setting } from './constant/companyScheduleSettings';

vi.mock('@/services/CandidateSchedule/utils/dataFetch/fetchAndVerifyDb');

describe('mock fetchAndVerifyDb', () => {
  const mockData = {
    comp_schedule_setting: null,
    company_cred_hash_str: '',
    int_meetings: [],
    int_modules_data: [],
    inter_data: [],
    interview_sessions: [],
  };
  beforeEach(() => {
    vi.mocked(fetchAndVerifyDb).mockResolvedValue(mockData);
  });
  it('should return mock data', async () => {
    const data = await fetchAndVerifyDb(
      {
        company_cred_hash_str: '',
        company_id: '',
        end_date_str: '',
        req_user_tz: '',
        session_ids: [],
        start_date_str: '',
      },
      null,
    );
    expect(data).toEqual(mockData);
  });
});

describe('identifies correct calender event type', () => {
  const summaries: { summary: string; expected_type: CalConflictType }[] = [
    {
      summary: 'Daily Standup at 09:00 AM',
      expected_type: 'soft',
    },
    {
      summary: 'Maternity Leave till some days',
      expected_type: 'ooo',
    },
    {
      summary: 'this is a Recruiting Blocks',
      expected_type: 'recruiting_blocks',
    },

    {
      summary: 'Team Lunch at 12:00 PM',
      expected_type: 'free_time',
    },
    {
      summary: 'Project Meeting at 12:00 PM',
      expected_type: 'cal_event',
    },
    {
      summary: 'Vacation',
      expected_type: 'ooo',
    },
    {
      summary: 'Dedicated Recruiting',
      expected_type: 'recruiting_blocks',
    },
    {
      summary: 'Sprint Planning',
      expected_type: 'soft',
    },
    {
      summary: 'Client Call at 12:00 PM',
      expected_type: 'cal_event',
    },
  ];

  it('should identify suitable conflict type', () => {
    summaries.forEach(({ summary, expected_type }) => {
      const type = getCalEventType(summary, sample_scheduling_setting);
      expect(type).toEqual(expected_type);
    });
  });
});

describe('given  a list of interviewer details events and scheduling settings', () => {
  it('should return correct free time', () => {
    //
  });
  it('should return correct working hours', () => {
    //
  });
  it('should return correct holidays', () => {
    //
  });
  it('should return correct dayoff', () => {
    //
  });
});
