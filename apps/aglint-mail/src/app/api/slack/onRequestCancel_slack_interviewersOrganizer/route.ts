import type { ProgressLoggerType } from '@aglint/shared-utils';
import {
  createRequestProgressLogger,
  DAYJS_FORMATS,
  dayjsLocal,
  executeWorkflowAction,
  getFullName,
  getShortTimeZone,
  supabaseWrap,
} from '@aglint/shared-utils';
import type { TargetApiPayloadType } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getUserIdByEmail } from '../../../../utils/slack/utils';

const func = async (
  payload: TargetApiPayloadType<'onRequestCancel_slack_interviewersOrganizer'>,
) => {
  const { session_ids, request_id, event_run_id } = payload;
  const supabaseAdmin = getSupabaseServer();

  const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id,
    supabaseAdmin,
    event_type: 'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER',
    event_run_id,
  });
  const action = async () => {
    const slackWeb = getSlackWeb();

    const meeting_details = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .in('session_id', session_ids),
    );

    const promises = meeting_details.map(async (meeting_detail) => {
      const [cand_application] = supabaseWrap(
        await supabaseAdmin
          .from('applications')
          .select('*,candidates(*)')
          .eq('id', meeting_detail.application_id),
      );
      const meeting_ints = supabaseWrap(
        await supabaseAdmin
          .from('meeting_interviewers')
          .select()
          .eq('meeting_id', meeting_detail.id),
      );
      const [organizer] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select()
          .eq('user_id', meeting_detail.organizer_id),
      );
      const emails = Array.from(
        new Set([
          ...meeting_ints.map((int) => int.email),
          organizer.email,
          'dileep@aglinthq.com',
        ]),
      );
      const userIds = await Promise.all(
        emails.map(async (email: string) => {
          try {
            return await getUserIdByEmail(email);
          } catch (err) {
            console.error(err);
            return null;
          }
        }),
      );

      const response = await slackWeb.conversations.open({
        users: userIds.filter((u) => Boolean(u)).join(','),
      });

      if (response.ok && response.channel?.id) {
        await slackWeb.chat.postMessage({
          channel: response.channel.id,

          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '🚨 *Interview Cancelled* 🚨',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Hi team,\n\nThe interview with *${getFullName(cand_application.candidates.first_name, cand_application.candidates.last_name)}* scheduled for *${dayjsLocal(meeting_detail.start_time).tz('Asia/Colombo').format(DAYJS_FORMATS.DATE_FORMAT)} at ${dayjsLocal(meeting_detail.start_time).tz('Asia/Colombo').format(DAYJS_FORMATS.STAR_TIME_FORMAT)} ${getShortTimeZone('Asia/Colombo')}* has been cancelled.\n\n*<${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/interviews/view?meeting_id=${meeting_detail.id}&tab=candidate_details|View Meeting Details>*`,
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png', // Google Calendar SVG
                alt_text: 'Google Calendar',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '🗓️ This event has been cancelled and removed from your Google Calendar.',
              },
            },
          ],
        });
      }
    });

    await Promise.all(promises);

    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', request_id)
        .select(),
    );
  };
  await executeWorkflowAction(action, {}, reqProgressLogger);
  return 'ok';
};

export const POST = createPostRoute(
  TargetApiSchema.onRequestCancel_slack_interviewersOrganizer,

  func,
);
