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
  const promises = allRequests.slice(0, 1).map(
    async (req) =>
      await scheduleSingleRequest({
        request: req,
        dateRange: {
          start_date: '23/10/2024',
          end_date: '23/10/2024',
        },
        company_id,
      }),
  );
  await Promise.all(promises);
};
