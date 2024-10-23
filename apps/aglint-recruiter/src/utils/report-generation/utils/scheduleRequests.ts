/* eslint-disable no-console */
import { dayjsLocal } from '@aglint/shared-utils';

import { type getJobScheduleRequests } from './getJobScheduleRequests';
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
  for (let idx = 0; idx < allRequests.length; idx++) {
    const req = allRequests[idx];
    const random_num = Math.floor(Math.random() * 7);
    try {
      console.log('scheduling request', `${(idx + 1) / allRequests.length}`);
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
      console.log('scheduled');
    } catch (error) {
      console.error(req.title);
      console.error('Failed to schedule request', req.id);
    }
  }
};
