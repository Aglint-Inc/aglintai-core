import {DynamicStructuredTool} from 'langchain/tools';
import {CallBackPayload} from 'src/controllers/supervisor/main';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchInterviewTypes = ({
  recruiter_id,
  callback,
}: {
  recruiter_id: string;
  callback: (x: CallBackPayload) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_interview_types',
    description: 'Fetch all interview types.',
    schema: z.object({}),
    func: async () => {
      const {data: mods} = await supabaseAdmin
        .from('interview_module')
        .select('id,name')
        .eq('recruiter_id', recruiter_id);

      if (mods.length === 0) {
        return 'No interview types found';
      }

      callback({
        function_name: 'fetch_interview_types',
        payload: mods,
      });

      const resp = mods.map(s => {
        return {
          name: s.name,
        };
      });

      return JSON.stringify(resp);
    },
  });
};
