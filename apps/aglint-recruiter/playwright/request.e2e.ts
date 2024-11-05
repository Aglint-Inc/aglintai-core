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
  await requestDetailsPage.goto(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/requests/${request_id}`,
  );
  const requestType = await requestDetailsPage.getRequestType();
  if (!requestType) {
    throw new Error('Request type is not found');
  }
  await requestDetailsPage.openCandidateAvailabilityDailog();
  await requestDetailsPage.sendCandidateAvailability();
});
