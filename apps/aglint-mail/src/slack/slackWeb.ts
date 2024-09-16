import { WebClient } from '@slack/web-api';

export const getSlackWeb = () => {
  const token = process.env.SLACK_BOT_TOKEN;
  const slackWeb = new WebClient(token);
  return slackWeb;
};
