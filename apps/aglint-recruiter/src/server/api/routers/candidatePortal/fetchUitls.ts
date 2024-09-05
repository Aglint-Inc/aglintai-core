import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

//get_interviews ----------------------------------------
export const getMeetings = async (application_id) => {
  const interviews = (
    await supabaseAdmin
      .from('meeting_details')
      .select(
        'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id',
      )
      .eq('application_id', application_id)
      .throwOnError()
  ).data;

  if (interviews.length) {
    return await Promise.all(
      interviews.map(async (interview) => {
        const interviewers = (
          await supabaseAdmin
            .from('meeting_interviewers')
            .select('first_name,last_name,profile_image,position')
            .eq('session_id', interview.session_id)
            .throwOnError()
        ).data;
        return {
          ...interview,
          interviewers: interviewers,
        };
      }),
    );
  }
  return [];
};
