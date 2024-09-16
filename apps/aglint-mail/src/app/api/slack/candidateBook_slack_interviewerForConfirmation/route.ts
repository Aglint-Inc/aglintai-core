import { TargetApiSchema } from '@aglint/shared-types';
/* eslint-disable no-await-in-loop */
import type { ProgressLoggerType } from '@aglint/shared-utils';
import {
  createRequestProgressLogger,
  dayjsLocal,
  executeWorkflowAction,
  getFullName,
  supabaseWrap,
} from '@aglint/shared-utils';
import type { TargetApiPayloadType } from '@aglint/shared-types';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getUserIdByEmail } from '../../../../utils/slack/utils';
import { googleCalenderLogo } from '../../../../utils/slack/assests';
import { meetingPlatform } from '../../../../utils/slack/platform';

const func = async (
  payload: TargetApiPayloadType<'candidateBook_slack_interviewerForConfirmation'>,
) => {
  const supabaseAdmin = getSupabaseServer();

  const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: payload.request_id,
    supabaseAdmin,
    event_type: 'SEND_INTERVIEWER_ATTENDANCE_RSVP',
  });
  await executeWorkflowAction(
    notifyInts,
    {
      payload,
    },
    reqProgressLogger,
  );
  return 'OK';
};

const notifyInts = async ({
  payload,
}: {
  payload: TargetApiPayloadType<'candidateBook_slack_interviewerForConfirmation'>;
}) => {
  const { session_id, application_id } = payload;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  const [session_details] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .eq('session_id', session_id),
  );

  const meeting_interviewers = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('session_id', session_id)
      .eq('is_confirmed', true),
  );

  const [application] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('candidates(*),public_jobs(job_title)')
      .eq('id', application_id),
  );

  for (const interviewer of meeting_interviewers) {
    try {
      const userId = await getUserIdByEmail(interviewer.email);

      await slackWeb.chat.postMessage({
        channel: userId,
        // text: message,
        metadata: {
          event_type: 'candidate_confirm_slot',
          event_payload: {
            email: interviewer.email,
            session_relation_id: interviewer.session_relation_id,
          },
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `* ${session_details.session_name} sheduled with candidate :*\n*<${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/view?meeting_id=${interviewer.meeting_id}&tab=candidate_details|${getFullName(application.candidates.first_name, application.candidates.last_name)} - ${application.public_jobs.job_title}>*`,
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
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  emoji: true,
                  text: 'Available',
                },
                style: 'primary',
                value: 'available',
                action_id: 'accept',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  emoji: true,
                  text: 'Not Available',
                },
                style: 'danger',
                value: 'not_available',
                action_id: 'decline',
              },
            ],
          },
        ],
      });
    } catch (err: any) {
      console.error(err.data);
    }
  }
};

export const POST = createPostRoute(
  TargetApiSchema.candidateBook_slack_interviewerForConfirmation,
  func,
);
