// quote.service.mock.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchAndVerifyDb } from '@/services/CandidateSchedule/utils/dataFetch/fetchAndVerifyDb';

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

describe('Test the single interviewer single session cases', () => {
  describe('on a working day', () => {
    it('total slots should be', () => {
      //
    });
    it('calender events cross check with slots', () => {
      //
    });
    it('interviewer is paused', () => {
      //
    });
    it('when time zone is different', () => {
      //
    });
    it('when calender is not connected', () => {
      //
    });
    it('optional trainee', () => {
      //
    });
  });
  describe('on holiday', () => {
    it('all slots should of conflict type holiday', () => {
      //
    });
  });

  describe('on dayoff', () => {
    it('all slots should of conflict type dayoff', () => {
      //
    });
  });

  describe('interviewer is in holiday candidate is not', () => {
    //
  });

  describe('interviewer is in dayoff candidate is not', () => {
    //
  });
});

describe('multi session and multi interviewer cases', () => {
  it('verify total slots', () => {
    //
  });
  it('break duration is correct', () => {
    //
  });
  it('whether all interviewers are included', () => {
    //
  });
  it('optional trainee', () => {
    //
  });
});
