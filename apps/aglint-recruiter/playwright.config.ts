import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from '@playwright/test';
import dotEnv from 'dotenv';
import * as os from 'os';
dotEnv.config({ path: '.env' });

const WEBAPP_URL = process.env.NEXT_PUBLIC_HOST_NAME;
const DEFAULT_NAVIGATION_TIMEOUT = process.env.CI ? 30000 : 120000;
const DEFAULT_EXPECT_TIMEOUT = process.env.CI ? 30000 : 120000;
const headless = !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS;

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

export default defineConfig({
  testDir: './playwright',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: os.cpus().length,
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
      name: '@aglint/aglint-recriuter',
      testDir: './playwright',
      testMatch: /.*\.e2e\.tsx?/,
      expect: {
        timeout: DEFAULT_EXPECT_TIMEOUT,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      use: DEFAULT_CHROMIUM,
    },
  ],
});
