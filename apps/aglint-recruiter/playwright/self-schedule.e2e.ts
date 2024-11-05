import { test } from './lib/fixtures';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

test.describe('Test Self Scheduling Flow', () => {
  test('Login and Send Self Scheduling link', async ({
    loginPage,
    requestDetailsPage,
  }) => {
    await test.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login(
        process.env.E2E_TEST_EMAIL,
        process.env.E2E_TEST_PASSWORD,
      );
    });
    await test.step('Navigate to request details', async () => {
      const scheduleRequests = await getRequestForAvailabilityE2e();
      await requestDetailsPage.goto(scheduleRequests[0].id);
    });

    await test.step('Open Self Scheduling Dialog', async () => {
      await requestDetailsPage.openSelfSchedulingDialog();
    });

    await test.step('Test Self Scheduling Mail Preview', async () => {
      await requestDetailsPage.selectSelfScheduleDaySlots();
      await requestDetailsPage.checkSelfScheduleMailPreview();
    });
    await test.step('Send Self Scheduling Link to Candidate', async () => {
      await requestDetailsPage.sendSelfSchedulingRequestLinkToCandidate();
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Fake sleep for 2 seconds
    });
    await test.step('Test Copy Link', async () => {
      await requestDetailsPage.copySelfSchedulingLink();
    });
  });
});
