// quote.service.mock.test.ts
import { beforeEach, describe, it, vi } from 'vitest';

// import { fetchAndVerifyDb } from '../src/services/CandidateSchedule/utils/dbFetches/fetchAndVerifyDb';

vi.mock(
  '../../src/services/CandidateSchedule/utils/dbFetches/fetchAndVerifyDb',
);

describe('fetchQuote', () => {
  beforeEach(() => {
    // vi.mocked(fetchAndVerifyDb).mockResolvedValue({
    //   comp_schedule_setting: null,
    //   company_cred_hash_str: '',
    //   int_meetings: [],
    //   int_modules_data: [],
    //   inter_data: [],
    //   interview_sessions: [],
    // });
  });
  it('should return a valid quote', async () => {
    //
  });
});

describe('identifies correct calender event type', () => {
  it('should identify soft conflict', () => {
    //
  });
  it('should identify ooo conflict', () => {
    //
  });
  it('should identify recruiting block', () => {
    //
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
