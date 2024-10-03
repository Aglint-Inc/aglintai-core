import type { WebAPICallResult } from '@slack/web-api';
import type { PlanCombinationRespType } from '@aglint/shared-types';
import {
  dayjsLocal,
  DAYJS_FORMATS,
  getFullName,
  getBreakLabel,
  SCHEDULE_TYPE_LABELS,
} from '@aglint/shared-utils';
import { getSlackWeb } from '../../slack/slackWeb';

export async function getUserIdByEmail(email: string) {
  try {
    const slackWeb = getSlackWeb();
    const { user } = await slackWeb.users.lookupByEmail({ email });
    return user?.id;
  } catch (error) {
    console.error(`Error fetching user by email (${email}):`, error);
    throw error;
  }
}

export async function getChannelIdByName(
  channelName: string,
): Promise<string | null> {
  try {
    const slackWeb = getSlackWeb();
    const response = (await slackWeb.conversations.list(
      {},
    )) as ConversationsListResponse;
    if (response.ok && response.channels) {
      const channel = response.channels.find((ch) => ch.name === channelName);
      return channel ? channel.id : null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching channel by name (${channelName}):`, error);
    throw error;
  }
}

interface ConversationsListResponse extends WebAPICallResult {
  channels?: {
    id: string;
    name: string;
  }[];
}

export function numberToOrdinal(number: number): string {
  const j = number % 10;
  const k = number % 100;

  if (j === 1 && k !== 11) {
    return `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
}

export const getPlanDetailsBlock = (
  plan: PlanCombinationRespType,
  time_zone: string,
) => {
  let plan_text = '';
  plan.sessions.forEach((session) => {
    const start_time = dayjsLocal(session.start_time)
      .tz(time_zone)
      .format(DAYJS_FORMATS.STAR_TIME_FORMAT);
    const end_time = dayjsLocal(session.end_time)
      .tz(time_zone)
      .format(DAYJS_FORMATS.END_TIME_FORMAT);
    const session_time = `${start_time} - ${end_time}`;
    const qualified_ints = session.qualifiedIntervs.map((int) =>
      getFullName(int.first_name, int.last_name),
    );
    const trainee_ints = session.trainingIntervs.map((int) =>
      getFullName(int.first_name, int.last_name),
    );
    const app_meeting_url = `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/interviews/view?meeting_id=${session.meeting_id}&tab=job_details`;
    plan_text += `*<${app_meeting_url}|${session.session_name} - ${session_time} >*\n *Interviewer${qualified_ints.length > 1 ? 's' : ''}* : ${qualified_ints.join(', ')}`;
    if (trainee_ints.length > 0) {
      plan_text += `\n\n *Trainee interviewer${trainee_ints.length > 1 ? 's' : ''}* : ${trainee_ints.join(', ')}`;
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
        text: 'Schedule',
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
};

export const getPlanScheduleBlock = (
  plan: PlanCombinationRespType,
  time_zone: string,
  meetings_details: { meeting_id: string; meeting_link: string }[],
) => {
  let plan_text = '';

  plan.sessions.forEach((session) => {
    const start_time = dayjsLocal(session.start_time)
      .tz(time_zone)
      .format(DAYJS_FORMATS.STAR_TIME_FORMAT);
    const end_time = dayjsLocal(session.end_time)
      .tz(time_zone)
      .format(DAYJS_FORMATS.END_TIME_FORMAT);
    const session_time = `${start_time} - ${end_time}`;
    const qualified_ints = session.qualifiedIntervs.map((int) =>
      getFullName(int.first_name, int.last_name),
    );
    const trainee_ints = session.trainingIntervs.map((int) =>
      getFullName(int.first_name, int.last_name),
    );
    const app_meeting_url = `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/interviews/view?meeting_id=${session.meeting_id}&tab=job_details`;
    const meeting_url =
      meetings_details.find((m) => m.meeting_id === session.meeting_id)
        ?.meeting_link ?? '';
    plan_text += `*<${app_meeting_url}|${session.session_name} - ${session_time} >*\n *Interviewer${qualified_ints.length > 1 ? 's' : ''}* : ${qualified_ints.join(', ')}`;
    plan_text += `\n\n*Meeting location*: <${meeting_url}|${SCHEDULE_TYPE_LABELS[session.schedule_type]}>`;
    if (trainee_ints.length > 0) {
      plan_text += `\n\n *Trainee interviewer${trainee_ints.length > 1 ? 's' : ''}* : ${trainee_ints.join(', ')}`;
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
  };
  return {
    plan_section,
    divider: {
      type: 'divider',
    },
  };
};
