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
    }),
    func: async payload => {
      const matchedCandidates = supabaseWrap(
        await supabaseAdmin
          .from('candidate_applications_view')
          .select()
          .textSearch('full_text_search', payload.candidate_name)
      );
      return matchedCandidates.toString();
    },
  });
};
