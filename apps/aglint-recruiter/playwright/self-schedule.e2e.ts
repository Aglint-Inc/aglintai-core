import { test } from './lib/fixtures';
import { getCandidateSelfSchedulingLink } from './utils/dbfetch';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

test.describe.parallel('Test Self Scheduling Flow ', () => {
  let singleDayRequestId: string;
  let multiDayRequestId: string;
  test.beforeAll(async () => {
    const { singleDayRequests, multiDayRequests } =
      await getRequestForAvailabilityE2e();
    singleDayRequestId = singleDayRequests[0].id;
    multiDayRequestId = multiDayRequests[0].id;
  });
  test('Single Day Self Scheduling', async ({
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
    await test.step('Navigate to request details', async () => {
      await requestDetailsPage.goto(singleDayRequestId);
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
      const selfScheduleLink =
        await getCandidateSelfSchedulingLink(singleDayRequestId);
      await candidateSelfBookingPage.goto(selfScheduleLink);
    });
    await test.step('Test select slot and book', async () => {
      await candidateSelfBookingPage.singleDayBook();
    });
  });
  test('Multi Day Self Scheduling', async ({
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
    await test.step('Navigate to request details', async () => {
      await requestDetailsPage.goto(multiDayRequestId);
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
      const selfScheduleLink =
        await getCandidateSelfSchedulingLink(multiDayRequestId);
      await candidateSelfBookingPage.goto(selfScheduleLink);
    });
    await test.step('Test select slot and book', async () => {
      await candidateSelfBookingPage.multiDayBook();
    });
  });
});
