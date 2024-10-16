// quote.service.mock.test.ts
import { beforeEach, describe, it, vi } from 'vitest';

import { fetchAndVerifyDb } from '../src/services/CandidateSchedule/utils/dbFetches/fetchAndVerifyDb';

vi.mock(
  '../../src/services/CandidateSchedule/utils/dbFetches/fetchAndVerifyDb',
);

describe('fetchQuote', () => {
  beforeEach(() => {
    vi.mocked(fetchAndVerifyDb).mockResolvedValue({
      comp_schedule_setting: null,
      company_cred_hash_str: '',
      int_meetings: [],
      int_modules_data: [],
      inter_data: [],
      interview_sessions: [],
    });
  });
  it('should return a valid quote', async () => {
    //
  });
});
