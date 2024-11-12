import { expect } from '@playwright/test';
import { getSessionsIds } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get meetings',
  async ({ api, adminDb, log, recruiter_id }) => {
    const sessions_ids = await getSessionsIds({ db: adminDb, recruiter_id });
    log('fetching session meetings');
    if (sessions_ids) {
      const meetings = await api.candidate_availability.getMeetings({
        sessions_ids: sessions_ids,
      });
      expect(Array.isArray(meetings)).toBe(true);
      log('fetched session meetings');
    }
  },
);
