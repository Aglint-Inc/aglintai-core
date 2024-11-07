import { expect } from '@playwright/test';

import { test } from './lib/fixtures';
import { getCandidateAvailability } from './utils/getCandidateAvailability';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

/**
 * E2E test for candidate availability
 */
const REQUEST_INDEX = 0; //request inde

test('Single day', async ({
  loginPage,
  requestDetailsPage,
  candidateAvailabilityPage,
}) => {
  // Constants

  // Step 1: Login
  await test.step('Authenticate user', async () => {
    await loginPage.goto();

    const email = process.env.E2E_TEST_EMAIL;
    const password = process.env.E2E_TEST_PASSWORD;

    if (!email || !password) {
      throw new Error('Required environment variables are not set');
    }

    await loginPage.login(email, password);
  });

  // Step 2: Navigate to request details and pick random request
  let request_id = '';
  await test.step('Select job from list', async () => {
    const { singleDayRequests } = await getRequestForAvailabilityE2e();
    expect(singleDayRequests.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
    request_id = singleDayRequests[REQUEST_INDEX].id;

    request_id = singleDayRequests[REQUEST_INDEX].id;
    await requestDetailsPage.goto(request_id);
  });

  // // Step 3: Open Candidate Availability
  await test.step('Open Candidate Availability', async () => {
    await requestDetailsPage.openCandidateAvailabilityDailog();
  });

  // // Step 4: Send candidates Availability
  await test.step('Send candidates Availability', async () => {
    await requestDetailsPage.sendCandidateAvailability();
  });

  // Step 5: Open candidate availability page
  await test.step('Open candidate availability page', async () => {
    const { id: availability_id } = await getCandidateAvailability(request_id);

    await candidateAvailabilityPage.goto({ availability_id });
  });

  // Step 5: Select dates and slots
  await test.step('Select dates and slots', async () => {
    await candidateAvailabilityPage.selectSingleDaySlots();
  });

  // Step 5: Submit availability
  await test.step('Submit availability', async () => {
    await candidateAvailabilityPage.submitAvailability();
  });

  await test.step('book Interview', async () => {
    await requestDetailsPage.bookSchedule();
  });
});
test('Multi day', async ({
  loginPage,
  requestDetailsPage,
  candidateAvailabilityPage,
}) => {
  // Constants

  // Step 1: Login
  await test.step('Authenticate user', async () => {
    await loginPage.goto();

    const email = process.env.E2E_TEST_EMAIL;
    const password = process.env.E2E_TEST_PASSWORD;

    if (!email || !password) {
      throw new Error('Required environment variables are not set');
    }

    await loginPage.login(email, password);
  });

  // Step 2: Navigate to request details and pick random request
  let request_id = '';
  await test.step('Select job from list', async () => {
    const { multiDayRequests } = await getRequestForAvailabilityE2e();
    expect(multiDayRequests.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
    request_id = multiDayRequests[REQUEST_INDEX].id;

    request_id = multiDayRequests[REQUEST_INDEX].id;
    await requestDetailsPage.goto(request_id);
  });

  // // Step 3: Open Candidate Availability
  await test.step('Open Candidate Availability', async () => {
    await requestDetailsPage.openCandidateAvailabilityDailog();
  });

  // // Step 4: Send candidates Availability
  await test.step('Send candidates Availability', async () => {
    await requestDetailsPage.sendCandidateAvailability();
  });

  // Step 5: Open candidate availability page
  await test.step('Open candidate availability page', async () => {
    const { id: availability_id } = await getCandidateAvailability(request_id);

    await candidateAvailabilityPage.goto({ availability_id });
  });

  // Step 5: Select dates and slots
  await test.step('Select dates and slots', async () => {
    await candidateAvailabilityPage.selectMultiDaySlots();
  });

  // Step 5: Submit availability
  await test.step('Submit availability', async () => {
    await candidateAvailabilityPage.submitAvailability();
  });

  await test.step('book Interview', async () => {
    await requestDetailsPage.bookSchedule();
  });
});
