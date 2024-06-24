const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  // path: path.resolve(__dirname, `.env.${String(process.env.NODE_ENV).trim()}`),
});

export const envConfig = {
  NODE_ENV: String(process.env.NODE_ENV).trim() as
    | 'development.local'
    | 'production'
    | 'development'
    | 'staging',
  OPENAI_APIKEY: process.env.OPENAI_APIKEY ?? '',
  RETELL_API_KEY: process.env.RETELL_API_KEY ?? '',
  NGROK_IP_ADDRESS: process.env.NGROK_IP_ADDRESS ?? '',
  SUPABASE_URL: process.env.SUPABASE_URL ?? '',
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ?? '',
  MAPS_API_KEY: process.env.MAPS_API_KEY ?? '',
  CLIENT_APP_URL: process.env.CLIENT_APP_URL ?? '',
  GOOGLE_AI: process.env.GOOGLE_AI ?? '',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID ?? '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ?? '',
  PORT: process.env.PORT ?? '',
  TWILIO_NUMBER: process.env.TWILIO_NUMBER ?? '',
  RETELL_AGENT_ID: process.env.RETELL_AGENT_ID ?? '',
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  LOCAL_AGENT_EMAIL: process.env.LOCAL_AGENT_EMAIL,
  REDIS_URL: process.env.REDIS_URL,
};
