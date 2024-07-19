import {slackWeb} from 'src/services/slack/slackWeb';
import {WebAPICallResult} from '@slack/web-api';

export async function getUserIdByEmail(email: string) {
  email = 'chandra@aglinthq.com';
  try {
    const {user} = await slackWeb.users.lookupByEmail({email});
    return user?.id;
  } catch (error) {
    console.error(`Error fetching user by email (${email}):`, error);
    throw error;
  }
}

export async function getChannelIdByName(
  channelName: string
): Promise<string | null> {
  try {
    const response = (await slackWeb.conversations.list(
      {}
    )) as ConversationsListResponse;
    if (response.ok && response.channels) {
      const channel = response.channels.find(ch => ch.name === channelName);
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
