import { test } from './lib/fixtures';
import { getCandidateSelfSchedulingLink } from './utils/dbfetch';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

test.describe('Test Self Scheduling Flow', () => {
  test('Login and Send Self Scheduling link', async ({
    loginPage,
    requestDetailsPage,
    candidateSelfBookingPage,
  }) => {
    await test.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login(
        process.env.E2E_TEST_EMAIL,
        process.env.E2E_TEST_PASSWORD,
      );
    });
    const { singleDayRequests } = await getRequestForAvailabilityE2e();
    const request_id = singleDayRequests[0].id;
    await test.step('Navigate to request details', async () => {
      await requestDetailsPage.goto(request_id);
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
    });
    await test.step('Go to Self Booking Page', async () => {
      const selfScheduleLink = await getCandidateSelfSchedulingLink(request_id);
      await candidateSelfBookingPage.goto(selfScheduleLink);
    });
    await test.step('Test select slot and book', async () => {
      await candidateSelfBookingPage.singleDayBook();
    });
  });
  //
});
