import type { z } from 'zod';
import type { PlanCombinationRespType } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import {
  getPlanDetailsBlock,
  getUserIdByEmail,
} from '../../../../utils/slack/utils';
import { getSlotsCache } from '../../../../../redis-kv/redisKv';
import type { SlackMetaSlotSuggestionType } from '../../../../types/slack.types';
import { googleCalenderLogo } from '../../../../utils/slack/assests';

const func = async ({
  plans,
  cand_avail_req_id,
}: z.infer<typeof TargetApiSchema.onReceivingAvailReq_slack_suggestSlots>) => {
  const slackWeb = getSlackWeb();
  const supabaseAdmin = getSupabaseServer();
  const cand_request_details = (
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        '*, request!inner(*, recruiter_user!request_assignee_id_fkey!inner(*) , applications!inner(*,candidates(*)))',
      )
      .eq('id', cand_avail_req_id)
      .single()
      .throwOnError()
  ).data;

  const request_details = cand_request_details.request;
  const organizer = request_details.recruiter_user;
  const cand_slots: PlanCombinationRespType[] = plans;
  const request_link = `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/requests/${request_details.id}`;

  const slack_slot_suggestion = cand_slots
    .slice(0, 5)
    .map((plan) =>
      getPlanDetailsBlock(plan, cand_request_details.user_timezone),
    );

  const meta_data: SlackMetaSlotSuggestionType = {
    request_id: request_details.id,
    candidate_tz: cand_request_details.user_timezone,
    availability_req_id: cand_request_details.id,
  };

  const slack_user_id = await getUserIdByEmail(organizer.email);

  // for retriving when interviewer selects one of them
  const slots_cache = getSlotsCache();
  await slots_cache.set(
    `${request_details.id}_${cand_avail_req_id}`,
    cand_slots.slice(0, 5),
  );
  await slackWeb.chat.postMessage({
    channel: slack_user_id,
    metadata: {
      event_type: 'onReceivingAvailReq_slack_suggestSlots',
      event_payload: {
        ...meta_data,
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
          image_url: googleCalenderLogo,
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
          text: `*<${request_link}|View more slots>*`,
        },
      },
    ],
  });

  return { message: 'Suggested slots sent to the organizer' };
};

export const POST = createPostRoute(
  TargetApiSchema.onReceivingAvailReq_slack_suggestSlots,
  func,
);
