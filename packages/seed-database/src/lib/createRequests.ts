import { DatabaseFunctions, DatabaseTable } from '@aglint/shared-types';
import { SeedJobType } from '../data/jobs';
import { createInterviewPlan } from './createInterviewPlan';
import { InterviewModuleName } from '../data/interview_module';
import { getSupabaseServer } from '../supabaseAdmin';
import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { getRequestScheduleDateRange } from '../seedScheduleRequestParams';

export const createRequests = async ({
  job_details,
  applications,
  interview_stages,
  job,
}: {
  job_details: DatabaseTable['public_jobs'];
  applications: DatabaseTable['applications'][];
  interview_stages: Awaited<ReturnType<typeof createInterviewPlan>>;
  job: SeedJobType;
}) => {
  const assignee_id =
    job_details.recruiting_coordinator ?? job_details.recruiter_id;
  if (!assignee_id) {
    throw new Error('Recruiting coordinator or recruiter id is not set');
  }
  const supabaseAdmin = getSupabaseServer();
  const job_sessions = interview_stages.stages_details
    .flatMap((stage) => stage.stages_details)
    .map((session) => session.session_details);
  const req_applications = applications.slice(
    0,
    job.create_req_params.req_application_cnt
  );
  const req_sessions = job_sessions.filter((session) =>
    job.create_req_params.sessions.includes(session.name as InterviewModuleName)
  );

  const sessions = formatSessions(
    req_sessions.map((session, i) => session.name ?? `Session ${i + 1}`)
  );
  const requests: DatabaseFunctions['move_to_interview']['Args']['requests'] =
    req_applications.map(({ id: application_id }, idx) => {
      const { start_date, end_date } = getRequestScheduleDateRange(
        idx,
        req_applications.length
      );
      return {
        application_id: application_id!,
        title: `Schedule ${sessions} for candidate`,
        status: 'to_do',
        assigner_id: assignee_id,
        assignee_id: assignee_id,
        note: '',
        priority: 'standard',
        schedule_start_date: start_date,
        schedule_end_date: end_date,
        type: 'schedule_request',
      };
    });

  supabaseWrap(
    await supabaseAdmin.rpc('move_to_interview', {
      applications: req_applications.map(({ id }) => id),
      sessions: req_sessions.map(({ id }) => id),
      requests,
    })
  );

  console.log(`Created ${requests.length} requests`);
};

export function formatSessions(sessions: string[]) {
  if (sessions.length === 0) {
    return '';
  } else if (sessions.length === 1) {
    return sessions[0];
  } else {
    return (
      sessions.slice(0, -1).join(', ') + ' and ' + sessions[sessions.length - 1]
    );
  }
}
