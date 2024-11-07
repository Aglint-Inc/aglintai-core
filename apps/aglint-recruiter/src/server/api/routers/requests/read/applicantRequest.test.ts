import { getRequestId } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: Select first request applicant',
  async ({ api, db, user_id }) => {
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });
    if (randomRequestId) {
      const requests = await api.requests.read.applicantRequest({
        request_id: randomRequestId,
      });
      // eslint-disable-next-line no-console
      console.log(requests);
    }
  },
);
