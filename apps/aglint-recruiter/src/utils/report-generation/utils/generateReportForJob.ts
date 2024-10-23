import { getJobScheduleRequests } from './getJobScheduleRequests';
import { scheduleSingleRequest } from './scheduleSingleRequest';

export const generateReportForJob = async (job_id: string) => {
  const { allRequests } = await getJobScheduleRequests(job_id);
  await scheduleRequests({
    allRequests,
  });
};

const scheduleRequests = async ({
  allRequests,
}: {
  allRequests: Awaited<
    ReturnType<typeof getJobScheduleRequests>
  >['allRequests'];
}) => {
  const promises = allRequests.map(
    async (req) => await scheduleSingleRequest(req),
  );
  await Promise.all(promises);
};
