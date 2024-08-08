import {CallBack} from '@aglint/shared-types';
import {fetchInterviewTypes} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchInterviewTypesTool = ({
  recruiter_id,
  callback,
}: {
  recruiter_id: string;
  callback: (x: CallBack<'fetch_interview_types'>) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_interview_types',
    description: 'Fetch all interview types.',
    schema: z.object({}),
    func: async () => {
      const mods = await fetchInterviewTypes({
        supabase: supabaseAdmin,
        recruiter_id,
      });

      if (mods.length === 0) {
        return 'No interview types found';
      }

      callback({
        function_name: 'fetch_interview_types',
        payload: mods,
        called_at: new Date().toISOString(),
        links: mods.map(mod => ({
          replace: mod.name,
          with: `${process.env.CLIENT_APP_URL}/scheduling/interview-types/${mod.id}`,
        })),
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
