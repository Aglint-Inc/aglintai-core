import { test } from './lib/fixtures';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

test('Test self schedule flow', async ({ loginPage, requestDetailsPage }) => {
  test.slow();
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  const scheduleRequests = await getRequestForAvailabilityE2e();
  await requestDetailsPage.goto(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/requests/${scheduleRequests[0].id}`,
  );
  await requestDetailsPage.openSelfSchedulingDialog();
  await new Promise((resolve) => setTimeout(resolve, 10000));
});
