import { expect } from '@playwright/test';
import { getApplicationIds } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get applicant meetings',
  async ({ api, log, db, recruiter_id }) => {
    const application_id = await getApplicationIds({
      db,
      count: 1,
      recruiter_id,
    });
    if (application_id) {
      log('fetching meetings');
      const meetings = await api.candidate_availability.getScheduledMeetings({
        application_id: application_id[0],
      });
      log(meetings?.id, application_id[0]);

      expect(meetings?.id).toBe(application_id[0]);
      log('meetings fetched');
    }
  },
);
