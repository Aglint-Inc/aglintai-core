import type {
  APIConfirmRecruiterSelectedOption,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import axios from 'axios';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSlotsCache } from '../../../../redis-kv/redisKv';
import type { SlackMetaSlotSuggestionType } from '../../../types/slack.types';
import { getSlackWeb } from '../../../slack/slackWeb';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';
import { getPlanScheduleBlock } from '../utils';
import { googleCalenderLogo } from '../assests';

export const handleConfirmSlot = async ({
  interaction_data,
  action_value,
}: {
  interaction_data: any;
  action_value: string;
}) => {
  try {
    const slots_cache = getSlotsCache();
    const metadata = interaction_data.message.metadata
      .event_payload as SlackMetaSlotSuggestionType;
    const { request_details } = await fetchRequestDetails(metadata.request_id);
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
    const { meeting_details } = await getMeetingDetails(metadata.request_id);
    const request_link = `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/requests/${metadata.request_id}`;
    const slackWeb = getSlackWeb();
    const plan_block = getPlanScheduleBlock(
      selected_plan,
      user_tz,
      meeting_details.map((meeting) => ({
        meeting_id: meeting.id,
        meeting_link: meeting.meeting_link,
      })),
    );
    await slackWeb.chat.update({
      channel: interaction_data.channel.id,
      ts: interaction_data.message.ts,
      text: 'Slot confirmed',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Interview Scheduled : *<${request_link}|${request_details.title}>*`,
          },
          accessory: {
            type: 'image',
            image_url: googleCalenderLogo,
            alt_text: 'google_calender_logo',
          },
        },
        plan_block.plan_section,
        plan_block.divider,
      ],
    });
  } catch (error: any) {
    console.error('Error in handleConfirmSlot', error);
  }
};

const getMeetingDetails = async (request_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .eq('schedule_request_id', request_id),
  );
  return { meeting_details };
};

const fetchRequestDetails = async (request_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  const request_details = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,applications!inner(*, candidates!inner(*))')
      .eq('id', request_id)
      .single(),
  );
  return { request_details };
};
