import { test } from './lib/fixtures';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

test('Send Self Schedule', async ({ loginPage, requestDetailsPage }) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  const scheduleRequests = await getRequestForAvailabilityE2e();
  await requestDetailsPage.goto(scheduleRequests[0].id);
  await requestDetailsPage.openSelfSchedulingDialog();
});
