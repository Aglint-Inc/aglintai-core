import type { z } from 'zod';
import { TargetApiSchema } from '@aglint/shared-types';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { getUserIdByEmail } from '../../../../utils/slack/utils';

const func = async ({
  plans,
  request_assignee_id,
}: z.infer<typeof TargetApiSchema.onReceivingAvailReq_slack_suggestSlots>) => {
  const slackWeb = getSlackWeb();
  const supabaseAdmin = getSupabaseServer();

  const organizer = (
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('user_id', request_assignee_id)
      .single()
      .throwOnError()
  ).data;

  const slack_user_id = await getUserIdByEmail(organizer.email);
  await slackWeb.chat.postMessage({
    channel: slack_user_id,
    metadata: {
      event_type: 'onReceivingAvailReq_slack_suggestSlots',
      event_payload: {
        // name: 'shadow_complete_trainee_confirmation',
        // session_relation_id: trainee.session_relation_id,
      },
    },

    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Available Slots Suggestion',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*<fakeLink.toUserProfiles.com|Chandra / HR Screening>*\n Tuesday, January 21 4:00-4:30pm\n Google Meet',
        },
        accessory: {
          type: 'image',
          image_url:
            'https://api.slack.com/img/blocks/bkb_template_images/notifications.png',
          alt_text: 'calendar thumbnail',
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url:
              'https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png',
            alt_text: 'notifications warning icon',
          },
          {
            type: 'mrkdwn',
            text: '*Conflicts with Team Huddle: 4:15-4:30pm*',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Propose a new time:*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Today - 4:30-5pm*\nEveryone is available: @iris, @zelda',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Choose',
          },
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Tomorrow - 4-4:30pm*\nEveryone is available: @iris, @zelda',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Choose',
          },
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: "*Tomorrow - 6-6:30pm*\nSome people aren't available: @iris, ~@zelda~",
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Choose',
          },
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*<fakelink.ToMoreTimes.com|Show more times>*',
        },
      },
    ],
  });
};

export const POST = createPostRoute(
  TargetApiSchema.onReceivingAvailReq_slack_suggestSlots,
  func,
);
