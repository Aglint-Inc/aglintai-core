import { test as base } from '@playwright/test';

import { createJobDetailsPageFixture } from './jobDetails.fixture';
import { createJobsListPageFixture } from './jobsListPage.fixture';
import { createLoginFixture } from './login.fixture';
import { createRequestDetailsFixture } from './request.fixture';

type Fixtures = {
  loginPage: ReturnType<typeof createLoginFixture>;
  jobsListPage: ReturnType<typeof createJobsListPageFixture>;
  requestDetailsPage: ReturnType<typeof createRequestDetailsFixture>;
};
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginFixture = createLoginFixture(page);
    await use(loginFixture);
  },
  jobsListPage: async ({ page }, use) => {
    const jobsListPageFixture = createJobsListPageFixture(page);
    await use(jobsListPageFixture);
  },
  jobDetailsPage: async ({ page }, use) => {
    const jobDetailsPageFixture = createJobDetailsPageFixture(page);
    await use(jobDetailsPageFixture);
  },
  requestDetailsPage: async ({ page }, use) => {
    const requestDetailsPageFixture = createRequestDetailsFixture(page);
    await use(requestDetailsPageFixture);
  },
});
