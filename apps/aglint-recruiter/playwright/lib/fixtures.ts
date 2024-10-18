import { test as base } from '@playwright/test';

import { createJobsListPageFixture } from './jobsListPage.fixture';
import { createLoginFixture } from './login.fixture.';

type Fixtures = {
  loginPage: ReturnType<typeof createLoginFixture>;
  jobsListPage: ReturnType<typeof createJobsListPageFixture>;
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
});
