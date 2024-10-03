import type {
  APIConfirmRecruiterSelectedOption,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import axios from 'axios';
import { getSlotsCache } from '../../../../redis-kv/redisKv';
import type { SlackMetaSlotSuggestionType } from '../../../types/slack.types';
import { getSlackWeb } from '../../../slack/slackWeb';

export const handleConfirmSlot = async ({
  interaction_data,
  action_value,
}: {
  interaction_data: any;
  action_value: string;
}) => {
  const slots_cache = getSlotsCache();
  const metadata = interaction_data.message.metadata
    .event_payload as SlackMetaSlotSuggestionType;
  const suggested_slots = await slots_cache.get<PlanCombinationRespType[]>(
    `${metadata.request_id}_${metadata.availability_req_id}`,
  );
  const selected_plan = suggested_slots.find((plan) => {
    return plan.plan_comb_id === action_value;
  });
  const user_tz = metadata.candidate_tz;
  const api_payload: APIConfirmRecruiterSelectedOption = {
    availability_req_id: metadata.availability_req_id,
    request_id: metadata.request_id,
    user_tz,
    selectedOption: selected_plan,
  };
  await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/api/scheduling/v1/booking/confirm-recruiter-selected-option`,
    api_payload,
  );
  const slackWeb = getSlackWeb();
  await slackWeb.chat.update({
    channel: interaction_data.channel.id,
    ts: interaction_data.message.ts,
    text: 'Slot confirmed',
    blocks: [],
  });
};
