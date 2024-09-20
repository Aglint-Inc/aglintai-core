// route.ts content
// route.ts content
import { dayjsLocal, getFullName, supabaseWrap } from '@aglint/shared-utils';
import type { TargetApiPayloadType } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getUserIdByEmail } from '../../../../utils/slack/utils';
import { meetingPlatform } from '../../../../utils/slack/platform';
import { googleCalenderLogo } from '../../../../utils/slack/assests';

const func = async (
  payload: TargetApiPayloadType<'interviewStart_slack_interviewers'>,
) => {
  const { session_id, recruiter_user_id, application_id } = payload;

  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  const [session_details] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .eq('session_id', session_id),
  );

  const [interviewer] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('session_id', session_id)
      .eq('user_id', recruiter_user_id),
  );
  const [application] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('candidates(*),public_jobs(job_title)')
      .eq('id', application_id),
  );

  const candidate = application.candidates;

  const userId = await getUserIdByEmail(interviewer.email);

  await slackWeb.chat.postMessage({
    channel: userId,
    // text: message,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Interview 🧑‍💻 Reminder*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `* ${session_details.session_name} sheduled with candidate :*\n*<${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/view?meeting_id=${interviewer.meeting_id}&tab=candidate_details|${getFullName(candidate.first_name, candidate.last_name)} - ${application.public_jobs.job_title}>*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Meeting Place :* ${meetingPlatform(session_details.schedule_type)}\n*Meeting Time :* ${dayjsLocal(session_details.start_time).format('MMMM DD hh:mm A')} - ${dayjsLocal(session_details.end_time).format('hh:mm A')} IST\n *Duration :* ${session_details.session_duration} Minutes\n`,
        },
        accessory: {
          type: 'image',
          image_url: googleCalenderLogo,
          alt_text: 'google calender',
        },
      },
    ],
  });
  return 'ok';
};

export const POST = createPostRoute(
  TargetApiSchema.interviewStart_slack_interviewers,
  func,
);
