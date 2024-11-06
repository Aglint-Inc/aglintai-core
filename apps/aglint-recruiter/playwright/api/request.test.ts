import { CreateRequest } from '@/routers/requests/create/create_request';
import { expect } from '@playwright/test';
import { test } from 'playwright/lib/fixtures';
import { caller } from 'playwright/utils/createCaller';
import { getRequestForAvailabilityE2e } from 'playwright/utils/getRequest';
import { testData } from 'playwright/utils/testData/request';

test.describe('Read requests', async () => {
  test('Get applicant requests', async () => {
    const scheduleRequests = await getRequestForAvailabilityE2e();
    const randomRequestId =
      scheduleRequests[Math.floor(Math.random() * scheduleRequests.length)].id;
    const caller1 = await caller();

    const requests = await caller1.requests.read.applicantRequest({
      request_id: randomRequestId,
    });

    // eslint-disable-next-line no-console
    console.log(requests);
  });

  test('Get completed requests', async () => {
    const caller1 = await caller();
    const requests = await caller1.requests.read.completedRequest({});
    // eslint-disable-next-line no-console
    console.log(requests);
  });

  test('Get request count', async () => {
    const caller1 = await caller();
    const requests = await caller1.requests.read.requestCount();
    // eslint-disable-next-line no-console
    console.log(requests);
  });
});

test.describe('Modify requests ', async () => {
  // TODO: Add more test cases
  test('Add new request', async () => {
    const caller1 = await caller();
    const { create_request } = await testData();

    const requests = await caller1.requests.create.create_request({
      ...create_request,
    });

    expect(requests satisfies CreateRequest['output']).toBeTruthy();
  });
});
