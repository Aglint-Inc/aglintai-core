/* eslint-disable no-console */
import { dayjsLocal } from '@aglint/shared-utils';

import { type getJobScheduleRequests } from './getJobScheduleRequests';
import { runPromisesInBatches } from './runPromisesInBatches';
import { scheduleSingleRequest } from './scheduleSingleRequest';

export const scheduleRequests = async ({
  allRequests,
  company_id,
}: {
  allRequests: Awaited<
    ReturnType<typeof getJobScheduleRequests>
  >['allRequests'];
  company_id: string;
}) => {
  const promises = allRequests.map(async (req) => {
    const random_num = Math.floor(Math.random());
    await scheduleSingleRequest({
      request: req,
      dateRange: {
        start_date: dayjsLocal(req.schedule_start_date).format('DD/MM/YYYY'),
        end_date: dayjsLocal(req.schedule_start_date)
          .add(random_num, 'day')
          .format('DD/MM/YYYY'),
      },
      company_id,
    });
  });
  await runPromisesInBatches(promises, 3);
};
