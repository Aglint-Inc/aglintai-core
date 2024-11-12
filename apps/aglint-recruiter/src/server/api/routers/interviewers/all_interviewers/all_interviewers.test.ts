import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get all interviewers',
  async ({ api, log, recruiter_id }) => {
    log('Fetching interviewers');
    const interviews = await api.interviewers.get_all_interviewers({
      recruiter_id: recruiter_id,
    });
    expect(Array.isArray(interviews)).toBe(true);
    log('Interviewers fetched');
  },
);
