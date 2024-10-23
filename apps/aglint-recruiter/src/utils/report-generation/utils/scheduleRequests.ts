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
  for (const req of allRequests) {
    const random_num = Math.floor(Math.random() * 7);
    try {
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
    } catch (error) {
      console.error(req.title);
      console.error('Failed to schedule request', req.id);
    }
  }
};
