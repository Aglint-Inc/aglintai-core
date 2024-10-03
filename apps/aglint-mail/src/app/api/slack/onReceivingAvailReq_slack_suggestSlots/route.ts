import type { z } from 'zod';
import type { PlanCombinationRespType } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import {
  DAYJS_FORMATS,
  dayjsLocal,
  getBreakLabel,
  getFullName,
} from '@aglint/shared-utils';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { getUserIdByEmail } from '../../../../utils/slack/utils';

const func = async ({
  plans,
  request_id,
}: z.infer<typeof TargetApiSchema.onReceivingAvailReq_slack_suggestSlots>) => {
  const slackWeb = getSlackWeb();
  const supabaseAdmin = getSupabaseServer();

  const request_details = (
    await supabaseAdmin
      .from('request')
      .select(
        '*, recruiter_user!request_assignee_id_fkey!inner(*) , applications!inner(*,candidates(*))',
      )
      .eq('id', request_id)
      .single()
      .throwOnError()
  ).data;

  const organizer = request_details.recruiter_user;
  const cand_slots: PlanCombinationRespType[] = plans;
  const request_link = `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/requests/${request_id}`;

  const slack_slot_suggestion = cand_slots.slice(0, 5).map((plan) => {
    let plan_text = '';
    plan.sessions.forEach((session) => {
      const start_time = dayjsLocal(session.start_time)
        .tz(organizer.scheduling_settings.timeZone.tzCode)
        .format(DAYJS_FORMATS.STAR_TIME_FORMAT);
      const end_time = dayjsLocal(session.end_time)
        .tz(organizer.scheduling_settings.timeZone.tzCode)
        .format(DAYJS_FORMATS.END_TIME_FORMAT);
      const session_time = `${start_time} - ${end_time}`;
      const qualified_ints = session.qualifiedIntervs.map((int) =>
        getFullName(int.first_name, int.last_name),
      );
      const trainee_ints = session.trainingIntervs.map((int) =>
        getFullName(int.first_name, int.last_name),
      );
      plan_text += `*${session.session_name} - ${session_time} *\n\n *Interviewer${qualified_ints.length > 1 ? 's' : ''}* : ${qualified_ints.join('.')}`;
      if (trainee_ints.length > 0) {
        plan_text += `\n\n *Trainee interviewer${trainee_ints.length > 1 ? 's' : ''}* : ${trainee_ints.join('.')}`;
      }
      if (session.break_duration !== 0) {
        plan_text += `\n\n *Break* : ${getBreakLabel(session.break_duration)} minutes`;
      }
      plan_text += '\n\n';
    });
    const plan_section = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: plan_text,
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Choose',
        },
        value: plan.plan_comb_id,
      },
    };
    return {
      plan_section,
      divider: {
        type: 'divider',
      },
    };
  });

  const slack_user_id = await getUserIdByEmail(organizer.email);

  await slackWeb.chat.postMessage({
    channel: slack_user_id,
    metadata: {
      event_type: 'onReceivingAvailReq_slack_suggestSlots',
      event_payload: {
        full_interview_plans: plans,
        request_id,
      },
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*<${request_link}|${request_details.title}>*\n\n *Schedule Priority* : ${request_details.priority}`,
        },
        accessory: {
          type: 'image',
          image_url:
            'https://api.slack.com/img/blocks/bkb_template_images/notifications.png',
          alt_text: 'calendar thumbnail',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Hii! availability recieved from the candidate ${getFullName(request_details.applications.candidates.first_name, request_details.applications.candidates.last_name)}*\n\n`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Please Select one of the slots to Schedule an interview .*',
        },
      },
      ...slack_slot_suggestion.flatMap((p) => [p.plan_section, p.divider]),
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*<fakelink.ToMoreTimes.com|Show more times>*',
        },
      },
    ],
  });
  //
  return { message: 'Suggested slots sent to the organizer' };
};

export const POST = createPostRoute(
  TargetApiSchema.onReceivingAvailReq_slack_suggestSlots,
  func,
);
