import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';

import type { CreateRequest } from '@/routers/requests/create/create_request';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getCompanyDetails } from '../dbfetch';

export const testData = async () => {
  const { id: recruiter_id } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();

  const jobs = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select(
        '*, applications!inner(*), interview_plan!inner(*, interview_session!inner(*))',
      )
      .eq('recruiter_id', recruiter_id),
    false,
  );

  //   console.log(jobs[0], '✅');
  const randomJobId = jobs[Math.floor(Math.random() * jobs.length)]
    .id as string;

  const job = jobs.find((job) => job.id === randomJobId);
  const applications = job && job.applications;

  const randomApplicationId =
    applications &&
    applications[Math.floor(Math.random() * applications.length)].id;

  const sessionIds =
    job &&
    job.interview_plan[0].interview_session
      .filter((ele) => ele.session_type !== 'debrief')
      .map((session) => session.id);

  const assignees = supabaseWrap(
    await supabaseAdmin
      .from('all_interviewers')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .eq('is_calendar_connected', true),
    false,
  );

  //   console.log(assignees, '✅');
  const randomAssigneeId =
    assignees[Math.floor(Math.random() * assignees.length)].user_id;

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
