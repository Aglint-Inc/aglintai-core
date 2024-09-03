import { type DB,SupabaseType } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiResponseInterviewSessionTask =
  | {
      data: Awaited<ReturnType<typeof fetchInterviewSessionTask>>;
      error: null;
    }
  | {
      data: null;
      error: string | null;
    };

export type ApiRequestInterviewSessionTask = {
  job_id: string;
  application_id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { job_id, application_id } =
        req.body as ApiRequestInterviewSessionTask;
      if (job_id && application_id) {
        const resIntSesTask = await fetchInterviewSessionTask({
          job_id,
          application_id,
          supabase,
        });
        return res.send({
          data: resIntSesTask,
          error: null,
        } as ApiResponseInterviewSessionTask);
      } else {
        return res.send({
          data: null,
          error: 'missing requierd fields',
        } as ApiResponseInterviewSessionTask);
      }
    }
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
  } catch (e) {
    return res.send({
      data: null,
      error: e,
    });
  }
}

export const fetchInterviewSessionTask = async ({
  job_id,
  application_id,
  supabase,
}: {
  job_id: string;
  application_id: string;
  supabase: SupabaseType;
}) => {
  // used for fetching the sessions for the task
  try {
    const { data: schedule, error } = await supabase
      .from('interview_schedule')
      .select('*')
      .eq('application_id', application_id);

    if (error) throw new Error(error.message);

    if (schedule.length == 0) {
      const { data: interviewSession, error: interviewSessionError } =
        await supabase
          .from('interview_session')
          .select(
            '*,interview_module(*),interview_plan!inner(*),interview_session_relation(id)',
          )
          .eq('interview_plan.job_id', job_id)
          .neq('session_type', 'debrief');

      if (interviewSessionError) throw new Error(interviewSessionError.message);
      const sessions = interviewSession
        .filter((ses) => ses.interview_session_relation.length > 0)
        .map((meet) => ({
          break_duration: meet.break_duration,
          created_at: meet.created_at,
          id: meet.id,
          interview_plan_id: meet.interview_plan_id,
          interviewer_cnt: meet.interviewer_cnt,
          location: meet.location,
          module_id: meet.module_id,
          name: meet.name,
          schedule_type: meet.schedule_type,
          session_duration: meet.session_duration,
          session_order: meet.session_order,
          session_type: meet.session_type,
        }));

      return sessions.sort(
        (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
      );
    } else {
      const { data: interviewSessions, error: interviewSessionError } =
        await supabase
          .from('interview_session')
          .select(
            '*,interview_meeting!inner(*,interview_schedule(*)),interview_session_relation(id)',
          )
          .eq('interview_meeting.interview_schedule_id', schedule[0].id)
          .neq('session_type', 'debrief')
          .eq('interview_meeting.status', 'not_scheduled');

      if (interviewSessionError) throw new Error(interviewSessionError.message);

      return interviewSessions
        .filter((ses) => ses.interview_session_relation.length > 0)
        .sort(
          (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
        );
    }
  } catch (e) {
    //
  }
};
