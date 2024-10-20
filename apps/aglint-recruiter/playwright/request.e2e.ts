import { expect } from '@playwright/test';
import { test } from './lib/fixtures';

enum ScheduleRequestTypeEnum {
  'SCHEDULE_REQUEST' = 'Schedule Request',
  'RESCHEDULE_REQUEST' = 'Reschedule Request',
  'DECLINE_REQUEST' = 'decline request',
  'CANCEL_SCHEDULE_REQUEST' = 'Cancel Schedule Request',
}

enum ScheduleRequestStatusEnum {
  'TO_DO' = 'To do',
  'IN_PROGRESS' = 'In Progress',
  'COMPLETED' = 'Completed',
}

test('Candidate Availability Request', async ({
  loginPage,
  requestDetailsPage,
  page,
}) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await requestDetailsPage.goto(
    'http://localhost:3000/requests/475e38ea-1f5d-4a08-acad-9fbfa847dc65',
  );
  const requestType = await requestDetailsPage.getRequestType();
  if (!requestType) {
    throw new Error('Request type is not found');
  }
  if (
    requestType.toLowerCase() ===
      ScheduleRequestTypeEnum.SCHEDULE_REQUEST.toLowerCase() ||
    requestType.toLowerCase() ===
      ScheduleRequestTypeEnum.RESCHEDULE_REQUEST.toLowerCase()
  ) {
    await requestDetailsPage.openCandidateAvailabilityDailog();
    await requestDetailsPage.sendCandidateAvailability();
  } else {
    throw new Error(`Request type ${requestType} is invalid`);
  }
});
