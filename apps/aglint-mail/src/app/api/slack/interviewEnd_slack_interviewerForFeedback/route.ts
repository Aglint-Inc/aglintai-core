import { dayjsLocal, getFullName, supabaseWrap } from '@aglint/shared-utils';
import type { TargetApiPayloadType } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { getUserIdByEmail } from '../../../../utils/slack/utils';

const func = async (
  payload: TargetApiPayloadType<'interviewEnd_email_interviewerForFeedback'>,
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
    metadata: {
      event_type: 'interviewer_feedback',
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
          text: `*${session_details.session_name}* with candidate :\n *${getFullName(candidate.first_name, candidate.last_name)}* - ${application.public_jobs.job_title}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Meeting Time :* ${dayjsLocal(session_details.start_time).format('MMMM DD hh:mm A')} - ${dayjsLocal(session_details.end_time).format('hh:mm A')} IST`,
        },
      },
      {
        type: 'section',
        block_id: 'rating_block',
        text: {
          type: 'mrkdwn',
          text: 'Rate your experience:',
        },
        accessory: {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Select a rating',
            emoji: true,
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: '1',
                emoji: true,
              },
              value: '1',
            },
            {
              text: {
                type: 'plain_text',
                text: '2',
                emoji: true,
              },
              value: '2',
            },
            {
              text: {
                type: 'plain_text',
                text: '3',
                emoji: true,
              },
              value: '3',
            },
            {
              text: {
                type: 'plain_text',
                text: '4',
                emoji: true,
              },
              value: '4',
            },
            {
              text: {
                type: 'plain_text',
                text: '5',
                emoji: true,
              },
              value: '5',
            },
            {
              text: {
                type: 'plain_text',
                text: '6',
                emoji: true,
              },
              value: '6',
            },
            {
              text: {
                type: 'plain_text',
                text: '7',
                emoji: true,
              },
              value: '7',
            },
            {
              text: {
                type: 'plain_text',
                text: '8',
                emoji: true,
              },
              value: '8',
            },
            {
              text: {
                type: 'plain_text',
                text: '9',
                emoji: true,
              },
              value: '9',
            },
            {
              text: {
                type: 'plain_text',
                text: '10',
                emoji: true,
              },
              value: '10',
            },
          ],
        },
      },
      {
        type: 'input',
        block_id: 'input_block',
        element: {
          type: 'plain_text_input',
          multiline: true,
          action_id: 'feedback_text',
        },
        label: {
          type: 'plain_text',
          text: 'Please put your feedback',
          emoji: true,
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
              text: 'Submit',
            },
            style: 'primary',
            value: 'feedBack_submit',
          },
        ],
      },
    ],
  });
  return 'ok';
};

export const POST = createPostRoute(
  TargetApiSchema.interviewEnd_email_interviewerForFeedback,
  func,
);
