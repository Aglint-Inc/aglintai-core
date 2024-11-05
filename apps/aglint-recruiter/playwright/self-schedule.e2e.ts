import { expect } from '@playwright/test';

import { test } from './lib/fixtures';

test('Send Self Schedule', async ({
  loginPage,
  requestListPage,
  requestDetailsPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await requestListPage.goto();
  expect(await requestListPage.isReady()).toBeTruthy();
  const scheduleRequests = await requestListPage.getScheduleRequests();
  await requestListPage.openRequestCard(scheduleRequests[0]);
  await requestDetailsPage.openSelfSchedulingDialog();
});
