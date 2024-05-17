import {WebClient} from '@slack/web-api';
import {envConfig} from '../../config';
const token = envConfig.SLACK_BOT_TOKEN;
export const slackWeb = new WebClient(token);
