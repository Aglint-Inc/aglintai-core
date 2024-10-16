// quote.service.mock.test.ts
import { describe, expect, it, vi } from 'vitest';

import { fetchAndVerifyDb } from '../../src/services/CandidateSchedule/utils/dbFetches/fetchAndVerifyDb';

vi.mock(
  '../../src/services/CandidateSchedule/utils/dbFetches/fetchAndVerifyDb',
);

describe('fetchQuote', () => {
  it('should return a valid quote', async () => {
    vi.mocked(fetchAndVerifyDb).mockResolvedValue({
      comp_schedule_setting: null,
      company_cred_hash_str: '',
      int_meetings: [],
      int_modules_data: [],
      inter_data: [],
      interview_sessions: [],
    });
    const d = await fetchAndVerifyDb(
      {
        company_id: '',
        end_date_str: '',
        req_user_tz: '',
        session_ids: [],
        start_date_str: '',
      },
      null,
    );
    console.log('log this mock', d);
  });
});
