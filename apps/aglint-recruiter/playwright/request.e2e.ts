import { chromium, expect } from '@playwright/test';
import { test } from './lib/fixtures';
import { getRequestForAvailabilityE2e } from './utils/getRequest';
import { getCandidateAvailability } from './utils/getCandidateAvailability';

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
  const scheduleRequests = await getRequestForAvailabilityE2e();
  console.log('scheduleRequests', scheduleRequests);
  await requestDetailsPage.goto(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/requests/${scheduleRequests[2].id}`,
  );
  const requestType = await requestDetailsPage.getRequestType();
  if (!requestType) {
    throw new Error('Request type is not found');
  }

  const request_id = scheduleRequests[2].id;
  if (
    requestType.toLowerCase() ===
      ScheduleRequestTypeEnum.SCHEDULE_REQUEST.toLowerCase() ||
    requestType.toLowerCase() ===
      ScheduleRequestTypeEnum.RESCHEDULE_REQUEST.toLowerCase()
  ) {
    await requestDetailsPage.openCandidateAvailabilityDailog();
    await requestDetailsPage.sendCandidateAvailability();
    await requestDetailsPage.submitCandidateAvailability(request_id);
  } else {
    throw new Error(`Request type ${requestType} is invalid`);
  }
});

// await requestDetailsPage.submitCandidateAvailability(
//   'f5bba9e6-d452-496a-8554-49dc58b6ff7e',
// );
