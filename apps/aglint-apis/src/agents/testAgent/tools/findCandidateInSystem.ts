import {supabaseWrap} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const findCandidateInSystem = ({company_id}: {company_id: string}) => {
  return new DynamicStructuredTool({
    name: 'find-candidate-in-system',
    description:
      "returns array of candidate's details like candidate name, email, job_role that matches the given candidate name.",
    schema: z.object({
      candidate_name: z.string().describe('either first name or full name'),
    }),
    func: async payload => {
      try {
        const matchedCandidates = supabaseWrap(
          await supabaseAdmin
            .from('candidate_applications_view')
            .select('candidate_name,email,job_role,candidate_email')
            .eq('company_id', company_id)
            .textSearch(
              'full_text_search',
              payload.candidate_name.split(' ').join('<->')
            ),
          false
        );
        if (matchedCandidates.length === 0) {
          return 'NO candidates found with that name';
        }
        return JSON.stringify(matchedCandidates);
      } catch (error) {
        console.error(error);
        return 'TOOL Fail';
      }
    },
  });
};
