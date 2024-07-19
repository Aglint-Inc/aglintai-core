import {InterviewSession} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const findCandidateInSystem = () => {
  return new DynamicStructuredTool({
    name: 'find-candidate-in-system',
    description:
      "returns array of candidate's details like candidate name, email, job_role that matches the given candidate name.",
    schema: z.object({
      candidate_name: z.string(),
      job_role: z.string(),
    }),
    func: async payload => {
      const [matched_candidate] = supabaseWrap(
        await supabaseAdmin
          .from('candidate_applications_view')
          .select()
          .eq('job_role', payload.job_role)
          .textSearch('full_text_search', payload.candidate_name)
      );

      const plan_id = supabaseWrap(
        await supabaseAdmin
          .from('interview_plan')
          .select()
          .eq('job_id', matched_candidate.job_id)
      );
      const cand_sessions: Pick<
        InterviewSession,
        'name' | 'break_duration' | 'session_type'
      > = supabaseWrap(
        await supabaseAdmin
          .from('meeting_details')
          .select()
          .eq('application_id', matched_candidate.application_id)
      ).map(s => ({
        name: s.session_name,
        break_duration: s.break_duration,
        session_type: s.schedule_type,
      }));
    },
  });
};

// let cand_sessions: Pick<
//   InterviewSession,
//   'name' | 'break_duration' | 'session_type'
// > = supabaseWrap(
//   await supabaseAdmin
//     .from('interview_session')
//     .select()
//     .eq('interview_plan_id', plan_id)
// ).map(s => ({}));
