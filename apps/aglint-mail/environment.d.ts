/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    EDGE_CONFIG: string;
    SENDGRID_API_KEY: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_CLIENT_APP_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    SUPABASE_JWT_SECRET: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    SLACK_BOT_TOKEN: string;
    SLACK_CLIENT_ID: string;
    SLACK_CLIENT_SECRET: string;
  }
}
