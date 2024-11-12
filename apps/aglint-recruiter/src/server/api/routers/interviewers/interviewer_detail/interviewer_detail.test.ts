import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get all interviewers', async ({ api, log, user_id }) => {
  log('Fetching interviewers');
  const interviews = await api.interviewers.get_user_details({
    user_id: user_id,
  });
  expect(interviews.user_id).toBe(user_id);
  log('Interviewers fetched');
});
