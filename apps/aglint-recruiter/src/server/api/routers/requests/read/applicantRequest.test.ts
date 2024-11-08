import { getRequestId } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: Select first request applicant',
  async ({ api, db, user_id, log }) => {
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });
    if (randomRequestId) {
      log('Start requests.read.applicantRequest');
      await api.requests.read.applicantRequest({
        request_id: randomRequestId,
      });
      log('End requests.read.applicantRequest');
    }
  },
);
