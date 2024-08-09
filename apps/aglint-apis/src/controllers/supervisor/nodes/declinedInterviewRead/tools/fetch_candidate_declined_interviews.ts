import {CallBack} from '@aglint/shared-types';
import {
  fetchCandidateDeclinedInterviews,
  getFullName,
} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import z from 'zod';

export const fetchDeclinedCandidateInterviewsTool = ({
  recruiter_id,
  callback,
  user_id,
}: {
  recruiter_id: string;
  callback: (x: CallBack<'fetch_candidate_declined_interviews'>) => void;
  user_id: string;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_candidate_declined_interviews',
    description: 'Fetch interviews that have been declined by the candidate',
    schema: z.object({}),
    func: async () => {
      const sch = await fetchCandidateDeclinedInterviews({
        recruiter_id,
        supabase: supabaseAdmin,
        user_id,
      });

      if (sch.length === 0) {
        return 'No declined interviews found';
      }

      callback({
        function_name: 'fetch_candidate_declined_interviews',
        payload: sch,
        called_at: new Date().toISOString(),
      });

      const resp = sch.map(s => {
        return {
          candidate_name: getFullName(
            s.interview_schedule.applications.candidates.first_name,
            s.interview_schedule.applications.candidates.last_name
          ),
          session_name: s.interview_session.name,
          start_time: dayjsLocal(
            s.interview_session.interview_meeting.start_time
          ).format('YYYY-MM-DD HH:mm'),
          end_time: dayjsLocal(
            s.interview_session.interview_meeting.end_time
          ).format('YYYY-MM-DD HH:mm'),
          schedule_type: s.interview_session.schedule_type,
        };
      });

      return JSON.stringify({
        message: 'Here are declined interviews',
        schedules: resp,
      });
    },
  });
};
