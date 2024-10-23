import { dayjsLocal } from '@aglint/shared-utils';

import { getJobScheduleRequests } from './getJobScheduleRequests';
import { scheduleSingleRequest } from './scheduleSingleRequest';

export const generateReportForJob = async (job_id: string) => {
  const { allRequests, job_details } = await getJobScheduleRequests(job_id);
  await scheduleRequests({
    allRequests,
    company_id: job_details.recruiter_id,
  });
};

const scheduleRequests = async ({
  allRequests,
  company_id,
}: {
  allRequests: Awaited<
    ReturnType<typeof getJobScheduleRequests>
  >['allRequests'];
  company_id: string;
}) => {
  const promises = allRequests.slice(0, 1).map(async (req) => {
    const random_num = Math.floor(Math.random() * 7);
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
  await Promise.all(promises);
};
