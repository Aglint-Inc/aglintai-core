import { expect } from '@playwright/test';

import { test } from './lib/fixtures';

test('Test self schedule flow', async ({ loginPage, requestListPage }) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await requestListPage.goto();
  expect(await requestListPage.isReady()).toBeTruthy();
  const scheduleRequests = await requestListPage.getScheduleRequests();
  await new Promise((resolve) => setTimeout(resolve, 10000));
});
