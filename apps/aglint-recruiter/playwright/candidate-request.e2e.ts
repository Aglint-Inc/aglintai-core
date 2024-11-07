import { expect } from '@playwright/test';

import { test } from './lib/fixtures';
import { getBookedAvailability } from './utils/getCandidateAvailability';

/**
 * E2E test for candidate availability
 */
// test.describe('Candidate reschedule request', () => {

// });

const REQUEST_INDEX = 0; //request inde
test('Reschedule request ', async ({
  loginPage,
  candidateAvailabilityPage,
}) => {
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

  // Step 2: Navigate to availability page details
  let availability_id = '';
  await test.step('Navigate availability page details', async () => {
    const bookedAvailability = await getBookedAvailability();
    expect(bookedAvailability.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
    availability_id = bookedAvailability[REQUEST_INDEX];
    await candidateAvailabilityPage.goto({ availability_id });
  });

  //  Step 3: Open Candidate Availability
  await test.step('Open reschedule dialog', async () => {
    await candidateAvailabilityPage.openRescheudleInterviewDialog();
  });
  //  Step 4: Form fill and submit
  await test.step('Reschedule form fill and submit', async () => {
    await candidateAvailabilityPage.requestReschedule();
  });
});
test('Cancel Request ', async ({ loginPage, candidateAvailabilityPage }) => {
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

  // Step 2: Navigate to availability page details
  let availability_id = '';
  await test.step('Navigate availability page details', async () => {
    const bookedAvailability = await getBookedAvailability();
    expect(bookedAvailability.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
    availability_id = bookedAvailability[REQUEST_INDEX];
    await candidateAvailabilityPage.goto({ availability_id });
  });

  //  Step 3: Open Candidate Availability
  await test.step('Open cancel dialog', async () => {
    await candidateAvailabilityPage.openCancelInterviewDialog();
  });
  //  Step 4: Open Candidate Availability
  await test.step('Reschedule form fill and submit', async () => {
    await candidateAvailabilityPage.requestCancel();
  });
});
