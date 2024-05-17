import {envConfig} from '@/config';
import {WebClient} from '@slack/web-api';
const token = envConfig.SLACK_BOT_TOKEN;
export const slackWeb = new WebClient(token);
