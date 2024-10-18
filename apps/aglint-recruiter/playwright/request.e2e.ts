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
}) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await requestDetailsPage.goto(
    'http://localhost:3000/requests/bb7bcbb5-8331-4853-9f8e-15f1760142ab',
  );
  const requestType = await requestDetailsPage.getRequestStatus();
  if (requestType?.toLocaleLowerCase() === ScheduleRequestStatusEnum.TO_DO) {
    await requestDetailsPage.openCandidateAvailabilityDailog();
  }
});
