import { expect } from '@playwright/test';

import { test } from './lib/fixtures';

test('login and verify does it redirect to jobs page', async ({
  page,
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await page.goto(process.env.NEXT_PUBLIC_HOST_NAME + '/jobs');
  const isReady = await page.getByTestId('jobs-list-body').isVisible();
  expect(isReady).toBeTruthy();
});
