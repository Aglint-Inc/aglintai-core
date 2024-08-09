import {CallBack} from '@aglint/shared-types';
import {fetchScheduledInterviews} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchScheduledInterviewsTool = ({
  recruiter_id,
  callback,
  user_id,
}: {
  recruiter_id: string;
  callback: (x: CallBack<'fetch_scheduled_interviews'>) => void;
  user_id: string;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_scheduled_interviews',
    description:
      'Fetch scheduled interviews or upcoming interviews or unconfirmed interviews',
    schema: z.object({
      time: z.enum(['today', 'week']).default('week'),
      type: z.enum(['upcoming', 'unconfirmed']).default('upcoming'),
    }),
    func: async ({time, type}) => {
      const sch = await fetchScheduledInterviews({
        recruiter_id,
        supabase: supabaseAdmin,
        time,
        type,
        user_id,
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
          name: s.interview_session[0].name,
          start_time: dayjs(s.start_time).format('YYYY-MM-DD HH:mm'),
          end_time: dayjs(s.end_time).format('YYYY-MM-DD HH:mm'),
          schedule_type: s.interview_session[0].schedule_type,
        };
      });

      return JSON.stringify({
        message: `Here are scheduled interview ${time === 'week' ? 'for this week' : 'today'}`,
        schedules: resp,
      });
    },
  });
};
