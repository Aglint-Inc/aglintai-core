import {supabaseWrap} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const verifyCandidate = () => {
  return new DynamicStructuredTool({
    name: 'verify-the-candidate-for-scheduling',
    description:
      "Take the candidate's first name and last name, and verify whether the candidate can be scheduled for an interview.",
    schema: z.object({
      first_name: z.string().optional().describe('candidate First name'),
      last_name: z.string().optional().describe('candidate Last name'),
    }),
    func: async payload => {
      try {
        if (!payload.first_name || !payload.last_name) {
          return 'Atleast candidates first_name or last_name is required';
        }
        const [candidate] = supabaseWrap(
          await supabaseAdmin
            .from('candidates')
            .select()
            .eq('first_name', payload.last_name)
        );
        if (!candidate) {
          return 'did not find any candidate with that name';
        }

        const [application] = supabaseWrap(
          await supabaseAdmin
            .from('applications')
            .select()
            .eq('candidate_id', candidate.id)
        );

        const cand_int_plans = supabaseWrap(
          await supabaseAdmin
            .from('interview_schedule')
            .select('interview_meeting(*)')
            .eq('application_id', application.id)
        );
        const schedulable_sessions = cand_int_plans
          .map(i => i.interview_meeting)
          .flat()
          .map(i => i.status === 'not_scheduled');
        const job_int_plans = supabaseWrap(
          await supabaseAdmin
            .from('interview_plan')
            .select()
            .eq('job_id', application.job_id)
        );

        if (
          (schedulable_sessions.length === 0 && job_int_plans.length > 0) ||
          schedulable_sessions.length > 0
        ) {
          return 'candidate can be scheduled';
        }

        return 'candidate is not schedulable';
      } catch (error: any) {
        return 'Failed to perform the action';
      }
    },
  });
};
