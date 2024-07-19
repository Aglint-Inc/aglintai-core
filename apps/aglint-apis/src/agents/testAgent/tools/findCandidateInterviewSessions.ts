import {InterviewSession} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const findCandidateInterviewSessions = () => {
  return new DynamicStructuredTool({
    name: 'find-candidate-interview-sessions',
    description: 'returns array of sessions ',
    schema: z.object({
      candidate_name: z.string(),
      job_role: z.string(),
    }),
    func: async payload => {
      try {
        const [matched_candidate] = supabaseWrap(
          await supabaseAdmin
            .from('candidate_applications_view')
            .select()
            .textSearch(
              'full_text_search',
              payload.candidate_name.split(' ').join('<->')
            )
        );

        let cand_sessions: Pick<
          InterviewSession,
          'name' | 'break_duration' | 'session_type' | 'session_order'
        >[] = supabaseWrap(
          await supabaseAdmin
            .from('meeting_details')
            .select()
            .eq('status', 'not_scheduled')
            .eq('application_id', matched_candidate.application_id),
          false
        ).map(s => ({
          name: s.session_name,
          break_duration: s.break_duration,
          session_type: s.session_type,
          session_order: s.session_order,
        }));

        if (cand_sessions.length === 0) {
          const [int_plan] = supabaseWrap(
            await supabaseAdmin
              .from('interview_plan')
              .select()
              .eq('job_id', matched_candidate.job_id)
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

        return JSON.stringify(cand_sessions);
      } catch (error) {
        return 'Failed';
      }
    },
  });
};
