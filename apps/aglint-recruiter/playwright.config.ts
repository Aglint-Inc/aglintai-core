import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from '@playwright/test';
import dotEnv from 'dotenv';
import type { BaseDependencies } from 'playwright/utils/trpc';
dotEnv.config({ path: '.env' });

const WEBAPP_URL = process.env.NEXT_PUBLIC_HOST_NAME;
const DEFAULT_NAVIGATION_TIMEOUT = process.env.CI === 'true' ? 30000 : 120000;
const DEFAULT_EXPECT_TIMEOUT = process.env.CI === 'true' ? 30000 : 120000;

const headless = Boolean(process.env.PLAYWRIGHT_HEADLESS === 'true');
const DEFAULT_TEST_TIMEOUT = process.env.CI === 'true' ? 120000 : 240000;

const DEFAULT_CHROMIUM: NonNullable<
  PlaywrightTestConfig['projects']
>[number]['use'] = {
  ...devices['Desktop Chrome'],
  // timezoneId: 'Europe/London',
  // storageState: {
  //   cookies: [
  //     {
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore TS definitions for USE are wrong.
  //       url: WEBAPP_URL,
  //       name: 'calcom-timezone-dialog',
  //       expires: -1,
  //       value: '1',
  //     },
  //   ],
  // },
  locale: 'en-US',
  /** If navigation takes more than this, then something's wrong, let's fail fast. */
  navigationTimeout: DEFAULT_NAVIGATION_TIMEOUT,
  // chromium-specific permissions - Chromium seems to be the only browser type that requires perms
  contextOptions: {
    permissions: ['clipboard-read', 'clipboard-write'],
  },
};

export default defineConfig<BaseDependencies>({
  testDir: './playwright',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI === 'true' ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: Number(process.env.TEST_WORKERS ?? 1),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: WEBAPP_URL,
    locale: 'en-US',
    trace: 'retain-on-failure',
    headless,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: '@aglint/aglint-web',
      testDir: './playwright',
      testMatch: /.*(playwright).*.(e2e|test)\.(js|jsx|ts|tsx)$/,
      use: DEFAULT_CHROMIUM,
      timeout: DEFAULT_TEST_TIMEOUT,
      expect: {
        timeout: DEFAULT_EXPECT_TIMEOUT,
      },
    },
    {
      name: '@aglint/aglint-apis',
      testDir: './src/server/api/routers',
      testMatch: /.*.(spec)\.(js|jsx|ts|tsx)$/,
      use: DEFAULT_CHROMIUM,
      timeout: DEFAULT_TEST_TIMEOUT,
      expect: {
        timeout: DEFAULT_EXPECT_TIMEOUT,
      },
    },
    {
      name: '@aglint/aglint-trpc-p1',
      testDir: './src/server/api/routers',
      testMatch: /.*.(test)\.(js|jsx|ts|tsx)$/,
      use: {
        ...DEFAULT_CHROMIUM,
        email: process.env.TRPC_TEST_P1_EMAIL,
        password: process.env.TRPC_TEST_P1_PASSWORD,
      },
      timeout: DEFAULT_TEST_TIMEOUT,
      expect: {
        timeout: DEFAULT_EXPECT_TIMEOUT,
      },
    },
    {
      name: '@aglint/aglint-trpc-p2',
      testDir: './src/server/api/routers',
      testMatch: /.*.(test)\.(js|jsx|ts|tsx)$/,
      use: {
        ...DEFAULT_CHROMIUM,
        email: process.env.TRPC_TEST_P2_EMAIL,
        password: process.env.TRPC_TEST_P2_PASSWORD,
      },
      timeout: DEFAULT_TEST_TIMEOUT,
      expect: {
        timeout: DEFAULT_EXPECT_TIMEOUT,
      },
    },
  ],
});
