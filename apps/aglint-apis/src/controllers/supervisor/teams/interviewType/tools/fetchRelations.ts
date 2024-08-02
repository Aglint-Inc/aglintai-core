import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchInterviewTypesRelations = ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_interview_types_users',
    description:
      'Fetch all users or interviewers inside an interview type . Given name of interview type',
    schema: z.object({
      name: z.string(),
    }),
    func: async ({name}) => {
      const {data: rel} = await supabaseAdmin
        .from('module_relations_view')
        .select('*,interview_module(recruiter_id)')
        .eq('interview_module.recruiter_id', recruiter_id)
        .ilike('module_name', `%${name}%`);

      const relations = rel.map(s => {
        return {
          name: s.first_name,
        };
      });
      return JSON.stringify(relations);
    },
  });
};
