/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    WF_SITE: string;
    WF_AUTH: string;
    WF_ROOT: string;
    OPENAI_KEY: string;
    SENDGRID_API_KEY: string;
    NEXT_PUBLIC_HOST_NAME: string;
    NEXT_PUBLIC_WEBSITE: string;
    ENCRYPTION_KEY: string;
    JD_JSON_URL: string;
    ASHBY_SYNC_URL: string;
    LEVER_TASK_URL: string;
    THE_COMPANIES_API: string;
    APPOLO_API: string;
    NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_ID: string;
    NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_NAME: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_SCHEDULE_CLIENT_ID: string;
    GOOGLE_SCHEDULE_CLIENT_SECRET: string;
    OUTLOOK_CLIENT_ID: string;
    OUTLOOK_CLIENT_SECRET: string;
    NEXT_PUBLIC_ZOOM_CLIENT_ID: string;
    ZOOM_CLIENT_SECRET: string;
    LOCAL_CAND_EMAIL: string;
    EDGE_CONFIG: string;
    NEXT_PUBLIC_MAIL_HOST: string;
    NEXT_PUBLIC_AGENT_API: string;
    GOOGLE_REDIRECT_URI?: string;
    GOOGLE_SCHEDULE_REDIRECT_URI?: string;
    DATABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_JWT_SECRET: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    // e2e
    CI: string;
    PLAYWRIGHT_HEADLESS: string;
    E2E_TEST_EMAIL: string;
    E2E_TEST_PASSWORD: string;
    TRPC_TEST_P1_EMAIL: string;
    TRPC_TEST_P1_PASSWORD: string;
    TRPC_TEST_P2_EMAIL: string;
    TRPC_TEST_P2_PASSWORD: string;
    TEST_WORKERS: number;
    SEED_DATABASE_APP_URL: string;
    DEV_DB_SECRETS: string;
  }
}
