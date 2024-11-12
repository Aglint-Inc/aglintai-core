import { type PrivateTestProcedure } from 'playwright/utils/trpc';
export const getRequestId = async ({
  db,
  user_id,
}: Pick<PrivateTestProcedure, 'db' | 'user_id'>) => {
  const { data: scheduleRequests } = await db
    .from('request')
    .select('*, request_relation!inner(*, interview_session!inner(*))')
    .eq('type', 'schedule_request')
    .eq('status', 'to_do')
    .eq('assignee_id', user_id);
  // console.log(scheduleRequests.length, '❤️');
  if (scheduleRequests === null) {
    // eslint-disable-next-line no-console
    console.info('Something went wrong');
  }
  if (scheduleRequests && scheduleRequests.length === 0) {
    // eslint-disable-next-line no-console
    console.info('Requests is not found for this user');
  }
  const randomRequestId =
    scheduleRequests &&
    scheduleRequests.length > 0 &&
    scheduleRequests[Math.floor(Math.random() * scheduleRequests.length)]?.id;

  // const randomRequestId = scheduleRequests[0].id;

  return randomRequestId || '';
};

export const getNoteId = async ({
  db,
  request_id,
}: Pick<PrivateTestProcedure, 'db'> & {
  request_id: string;
}) => {
  const { data: note } = await db
    .from('request_note')
    .select('id,request_id')
    .eq('request_id', request_id)
    .single();

  if (!note) {
    // eslint-disable-next-line no-console
    console.info('No request notes found');
  }
  const randomNoteId = note?.id || '';
  return randomNoteId;
};

export const getApplicationIds = async ({
  db,
  recruiter_id,
  count = 2,
}: Pick<PrivateTestProcedure, 'db' | 'recruiter_id'> & {
  count?: number;
}) => {
  const { data: jobs } = await db
    .from('public_jobs')
    .select(
      '*, applications!inner(*), interview_plan!inner(*, interview_session!inner(*))',
    )
    .eq('recruiter_id', recruiter_id);

  const randomJobId =
    jobs && (jobs[Math.floor(Math.random() * jobs.length)].id as string);

  const job = jobs && jobs.find((job) => job.id === randomJobId);
  const applications = job && job.applications;

  const randomApplicationIds = applications
    ? applications
        .map((application) => application.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
    : [];

  return randomApplicationIds;
};

export const getSessionsIds = async ({
  db,
  recruiter_id,
}: Pick<PrivateTestProcedure, 'db' | 'recruiter_id'>) => {
  const { data: jobs } = await db
    .from('public_jobs')
    .select(
      '*, applications!inner(*), interview_plan!inner(*, interview_session!inner(*))',
    )
    .eq('recruiter_id', recruiter_id);
  if (!jobs) {
    // eslint-disable-next-line no-console
    console.info('Not able to fetch jobs');
  }
  //   console.log(jobs[0], '✅');
  const randomJobId = jobs
    ? jobs[Math.floor(Math.random() * jobs.length)].id
    : '';

  const job = jobs?.find((job) => job.id === randomJobId);

  const sessionIds =
    job &&
    job.interview_plan[0].interview_session
      .filter((ele) => ele.session_type !== 'debrief')
      .map((session) => session.id);

  return sessionIds;
};
