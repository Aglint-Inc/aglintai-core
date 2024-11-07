import { expect } from '@playwright/test';

import { test } from './lib/fixtures';
import { getCandidateAvailability } from './utils/getCandidateAvailability';
import {
  getRequestForCancelE2e,
  getRequestForRescheduleE2e,
  getRequestForScheduleE2e,
} from './utils/getRequest';

const REQUEST_INDEX = 0;

test.describe('Schedule request', () => {
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
      const { singleDayRequests } = await getRequestForScheduleE2e();
      expect(singleDayRequests.length).toBeGreaterThanOrEqual(
        REQUEST_INDEX + 1,
      );
      request_id = singleDayRequests[REQUEST_INDEX].id;

      request_id = singleDayRequests[REQUEST_INDEX].id;
      await requestDetailsPage.goto(request_id);
    });

    // Step 3: Open Candidate Availability
    await test.step('Open Candidate Availability', async () => {
      await requestDetailsPage.openCandidateAvailabilityDailog();
    });

    // Step 4: Send candidates Availability
    await test.step('Send candidates Availability', async () => {
      await requestDetailsPage.sendCandidateAvailability();
    });

    // Step 5: Open candidate availability page
    await test.step('Open candidate availability page', async () => {
      const { id: availability_id } =
        await getCandidateAvailability(request_id);

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
      await requestDetailsPage.singleDaybookSchedule();
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
    await test.step(' Navigate to request details', async () => {
      const { multiDayRequests } = await getRequestForScheduleE2e();
      expect(multiDayRequests.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
      request_id = multiDayRequests[REQUEST_INDEX].id;

      request_id = multiDayRequests[REQUEST_INDEX].id;
      await requestDetailsPage.goto(request_id);
    });

    // Step 3: Open Candidate Availability
    await test.step('Open Candidate Availability', async () => {
      await requestDetailsPage.openCandidateAvailabilityDailog();
    });

    // Step 4: Send candidates Availability
    await test.step('Send candidates Availability', async () => {
      await requestDetailsPage.sendCandidateAvailability();
    });

    // Step 5: Open candidate availability page
    await test.step('Open candidate availability page', async () => {
      const { id: availability_id } =
        await getCandidateAvailability(request_id);

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
      await requestDetailsPage.multiDaybookSchedule();
    });
  });
});

test.describe('Reschedule request', () => {
  test('Single day', async ({
    loginPage,
    requestDetailsPage,
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

    // Step 2: Navigate to request details and pick random request
    let request_id = '';
    await test.step('Select job from list', async () => {
      const { singleDayRequests } = await getRequestForRescheduleE2e();
      // expect(singleDayRequests.length).toBeGreaterThanOrEqual(
      //   REQUEST_INDEX + 1,
      // );

      request_id = singleDayRequests[REQUEST_INDEX].id;

      request_id = singleDayRequests[REQUEST_INDEX].id;
      await requestDetailsPage.goto(request_id);
    });

    // Step 3: Open Candidate Availability
    await test.step('Open Candidate Availability', async () => {
      await requestDetailsPage.openCandidateAvailabilityDailog();
    });

    // Step 4: Send candidates Availability
    await test.step('Send candidates Availability', async () => {
      await requestDetailsPage.sendCandidateAvailability();
    });

    // Step 5: Open candidate availability page
    await test.step('Open candidate availability page', async () => {
      const { id: availability_id } =
        await getCandidateAvailability(request_id);

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
      await requestDetailsPage.singleDaybookSchedule();
    });
  });
  test('Multi day', async ({
    loginPage,
    requestDetailsPage,
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

    // Step 2: Navigate to request details and pick random request
    let request_id = '';
    await test.step(' Navigate to request details', async () => {
      const { multiDayRequests } = await getRequestForRescheduleE2e();

      expect(multiDayRequests.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
      request_id = multiDayRequests[REQUEST_INDEX].id;

      request_id = multiDayRequests[REQUEST_INDEX].id;
      await requestDetailsPage.goto(request_id);
    });

    // Step 3: Open Candidate Availability
    await test.step('Open Candidate Availability', async () => {
      await requestDetailsPage.openCandidateAvailabilityDailog();
    });

    // Step 4: Send candidates Availability
    await test.step('Send candidates Availability', async () => {
      await requestDetailsPage.sendCandidateAvailability();
    });

    // Step 5: Open candidate availability page
    await test.step('Open candidate availability page', async () => {
      const { id: availability_id } =
        await getCandidateAvailability(request_id);

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
      await requestDetailsPage.multiDaybookSchedule();
    });
  });
});

test('Cancel request ', async ({ loginPage, requestDetailsPage }) => {
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

  // Step 2 : Navigate to request details
  await test.step('Navigate to request details', async () => {
    const cancelRequests = await getRequestForCancelE2e();
    expect(cancelRequests.length).toBeGreaterThanOrEqual(REQUEST_INDEX + 1);
    const request_id = cancelRequests[REQUEST_INDEX].id;
    await requestDetailsPage.goto(request_id);
  });
  // Step 3 : confirm cancel schedule
  await test.step('Confirm cancel schedule', async () => {
    await requestDetailsPage.cancelSchedule();
  });
});
