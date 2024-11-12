import { getApplicationIds } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: All completed requests',
  async ({ api, log }) => {
    log('Start requests.read.completedRequest');
    await api.requests.read.completedRequest({});
    log('End requests.read.completedRequest');
  },
);
privateTestProcedure(
  'test case 1: Completed request filter with applications',
  async ({ api, db, recruiter_id, log }) => {
    const application_ids = await getApplicationIds({
      count: 2,
      db,
      recruiter_id,
    });
    log('Start requests.read.completedRequest');
    await api.requests.read.completedRequest({
      applications: application_ids,
    });
    log('End requests.read.completedRequest');
  },
);

privateTestProcedure(
  'test case 2: Completed request filter with request types',
  async ({ api, log }) => {
    log('Start requests.read.completedRequest');
    await api.requests.read.completedRequest({
      type: ['schedule_request'],
    });
    log('End requests.read.completedRequest');
  },
);
