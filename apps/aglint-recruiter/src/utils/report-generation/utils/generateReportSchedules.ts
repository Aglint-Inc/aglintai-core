/* eslint-disable no-console */

import { report_gen_Params } from '../constant';
import { getJobScheduleRequests } from './getJobScheduleRequests';
import { scheduleRequests } from './scheduleRequests';
import { sessnRelnAccept } from './UpdateinterAttendStatus';

export const generateReportSchedules = async (job_id: string) => {
  const { allRequests, job_details } = await getJobScheduleRequests(
    job_id,
    'schedule_request',
  );
  const to_do_requests = allRequests
    .filter((app) => app.status === 'to_do')
    .slice(0, report_gen_Params.max_job_req);
  await scheduleRequests({
    allRequests: to_do_requests,
    company_id: job_details.recruiter_id,
  });

  await sessnRelnAccept();
  return 'ok';
};
