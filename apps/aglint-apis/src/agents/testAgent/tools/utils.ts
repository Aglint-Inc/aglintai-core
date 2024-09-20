import {InterviewSession} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export const getCandidateSessions = async (
  application_id: string,
  job_id: string
) => {
  let cand_sessions: Pick<
    InterviewSession,
    'name' | 'break_duration' | 'session_type' | 'session_order'
  >[] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .eq('status', 'not_scheduled')
      .eq('application_id', application_id),
    false
  ).map(s => ({
    name: s.session_name,
    break_duration: s.break_duration,
    session_type: s.session_type,
    session_order: s.session_order,
  }));

  if (cand_sessions.length === 0) {
    const [int_plan] = supabaseWrap(
      await supabaseAdmin.from('interview_plan').select().eq('job_id', job_id)
    );
    cand_sessions = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select()
        .eq('interview_plan_id', int_plan.id)
    ).map(s => ({
      name: s.name,
      break_duration: s.break_duration,
      session_type: s.session_type,
      session_order: s.session_order,
    }));
  }

  return cand_sessions;
};
