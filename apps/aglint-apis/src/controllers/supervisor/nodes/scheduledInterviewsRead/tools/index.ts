import {CallBack, fetchScheduledInterviews} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchScheduledInterviewsTool = ({
  recruiter_id,
  callback,
}: {
  recruiter_id: string;
  callback: (x: CallBack<'fetch_scheduled_interviews'>) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_scheduled_interviews',
    description: 'Fetch scheduled interviews.',
    schema: z.object({
      time: z.enum(['today', 'week']).default('today'),
      type: z.enum(['upcoming', 'unconfirmed']).default('upcoming'),
    }),
    func: async ({time, type}) => {
      const sch = await fetchScheduledInterviews({
        recruiter_id,
        supabase: supabaseAdmin,
        time,
        type,
      });

      if (sch.length === 0) {
        return `No scheduled interviews found ${time === 'today' ? 'today' : 'this week'}`;
      }

      callback({
        function_name: 'fetch_scheduled_interviews',
        payload: sch,
        called_at: new Date().toISOString(),
      });

      const resp = sch.map(s => {
        return {
          name: s.session_name,
          start_time: s.start_time,
          end_time: s.end_time,
        };
      });

      return JSON.stringify(resp);
    },
  });
};
