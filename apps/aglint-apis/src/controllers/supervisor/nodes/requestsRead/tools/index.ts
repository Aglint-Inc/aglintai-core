import {CallBack, DatabaseTable} from '@aglint/shared-types';
import {fetchRequestsUser} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchUserRequestsTool = ({
  user_id,
  callback,
}: {
  user_id: string;
  callback: (x: CallBack<'fetch_user_requests'>) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_user_requests',
    description:
      'Fetch requests for a user . It can be filtered by priority and status',
    schema: z.object({
      priority: z.enum(['urgent', 'standard', 'all']).default('all'),
      status: z
        .enum(['to_do', 'blocked', 'in_progress', 'completed', 'all'])
        .default('all'),
    }),
    func: async ({priority, status}) => {
      const reqs = await fetchRequestsUser({
        user_id,
        supabase: supabaseAdmin,
        priority,
        status,
      });
      if (reqs.length === 0) {
        return `No requests found for user ${user_id}`;
      }
      callback({
        function_name: 'fetch_user_requests',
        payload: reqs,
        called_at: new Date().toISOString(),
      });
      const resp = reqs.map(s => {
        return {
          title: s.title,
          priority: s.priority,
          status: s.status,
        };
      });
      return JSON.stringify(resp);
    },
  });
};
