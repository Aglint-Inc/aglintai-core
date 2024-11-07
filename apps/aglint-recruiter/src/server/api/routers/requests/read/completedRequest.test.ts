import { expect } from '@playwright/test';
import { getApplicationIds } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('test case 1: All completed requests', async ({ api }) => {
  const requests = await api.requests.read.completedRequest({});
  expect(!!requests).toBeTruthy();
  // eslint-disable-next-line no-console
  console.log(requests);
});
privateTestProcedure(
  'test case 1: Completed request filter with applications',
  async ({ api, db, recruiter_id }) => {
    const application_ids = await getApplicationIds({
      count: 2,
      db,
      recruiter_id,
    });
    const requests = await api.requests.read.completedRequest({
      applications: application_ids,
    });
    // eslint-disable-next-line no-console
    console.log(requests, application_ids, '✅');
    expect(!!requests).toBeTruthy();
  },
);

privateTestProcedure(
  'test case 2: Completed request filter with request types',
  async ({ api }) => {
    const requests = await api.requests.read.completedRequest({
      type: ['schedule_request'],
    });
    expect(!!requests).toBeTruthy();
    // eslint-disable-next-line no-console
    console.log(requests);
  },
);
