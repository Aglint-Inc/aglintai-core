import {fetchRequestsUser} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {CallBackPayload} from 'src/controllers/supervisor/types';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchUserRequestsTool = ({
  user_id,
  callback,
}: {
  user_id: string;
  callback: (x: CallBackPayload) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_user_requests',
    description: 'Fetch all requests for a user',
    schema: z.object({
      priority: z.enum(['urgent', 'standard', 'all']).default('all'),
    }),
    func: async ({priority}) => {
      const reqs = await fetchRequestsUser({
        user_id,
        supabase: supabaseAdmin,
        priority,
      });
      if (reqs.length === 0) {
        return `No requests found for user ${user_id}`;
      }
      callback({
        function_name: 'fetch_user_request',
        payload: reqs,
      });
      const resp = reqs.map(s => {
        return {
          title: s.title,
          priority: s.priority,
        };
      });
      return JSON.stringify(resp);
    },
  });
};
