import { expect } from '@playwright/test';

import { test } from './lib/fixtures';

test('verify login page', async ({ loginPage, jobsListPage }) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  const isReady = await jobsListPage.isReady();
  expect(isReady).toBeTruthy();
});
