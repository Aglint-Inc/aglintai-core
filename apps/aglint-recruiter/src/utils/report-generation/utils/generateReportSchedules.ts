/* eslint-disable no-console */

import { getJobScheduleRequests } from './getJobScheduleRequests';
import { scheduleRequests } from './scheduleRequests';
import { sessnRelnAccept } from './UpdateinterAttendStatus';

export const generateReportSchedules = async (job_id: string) => {
  const { allRequests, job_details } = await getJobScheduleRequests(
    job_id,
    'schedule_request',
  );
  const to_do_requests = allRequests.filter((app) => app.status === 'to_do');
  await scheduleRequests({
    allRequests: to_do_requests,
    company_id: job_details.recruiter_id,
  });

  await sessnRelnAccept();
  return 'ok';
};
