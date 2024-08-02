import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchInterviewTypes = ({recruiter_id}: {recruiter_id: string}) => {
  return new DynamicStructuredTool({
    name: 'fetch_interview_types',
    description: 'Fetch all interview types.',
    schema: z.object({}),
    func: async () => {
      const {data: ses} = await supabaseAdmin
        .from('interview_module')
        .select('id,name')
        .eq('recruiter_id', recruiter_id);

      const resp = ses.map(s => {
        return {
          id: s.id,
          name: s.name,
        };
      });

      return JSON.stringify(resp);
    },
  });
};
