import { dayjsLocal } from '@aglint/shared-utils';

import type { CreateRequest } from '@/routers/requests/create/create_request';

import { type PrivateTestProcedure } from '../trpc';

export const testData = async ({
  db,
  recruiter_id,
}: Pick<PrivateTestProcedure, 'recruiter_id' | 'db'>) => {
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
  const applications = job && job.applications;

  const randomApplicationId =
    applications &&
    applications[Math.floor(Math.random() * applications.length)].id;

  const sessionIds =
    job &&
    job.interview_plan[0].interview_session
      .filter((ele) => ele.session_type !== 'debrief')
      .map((session) => session.id);

  const { data: assignees } = await db
    .from('all_interviewers')
    .select('*')
    .eq('recruiter_id', recruiter_id)
    .eq('is_calendar_connected', true);

  if (!assignees) {
    // eslint-disable-next-line no-console
    console.info('Not able to fetch assignees');
  }
  //   console.log(assignees, '✅');
  const randomAssigneeId = assignees
    ? assignees[Math.floor(Math.random() * assignees.length)].user_id
    : '';

  return {
    create_request: {
      application: randomApplicationId,
      request: {
        assignee_id: randomAssigneeId,
        note: 'Hi, this is a test request',
        priority: 'standard',
        schedule_start_date: dayjsLocal().toISOString(),
        schedule_end_date: dayjsLocal().add(7, 'day').toISOString(),
        type: 'cancel_schedule_request',
      },
      sessions: sessionIds,
    } as CreateRequest['input'],
  };
};
