/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';

import { createCandidateAvailabilityFixture } from './candidateAvailability.fixture';
import { createCandidateSelfBookingFixture } from './candidateSelfBooking.fixture';
import { createJobDetailsPageFixture } from './jobDetails.fixture';
import { createJobsListPageFixture } from './jobsListPage.fixture';
import { createLoginFixture } from './login.fixture';
import { createRequestDetailsFixture } from './requestDetails.fixture';
import { createRequestListFixture } from './requestsList.fixture';

type Fixtures = {
  loginPage: ReturnType<typeof createLoginFixture>;
  jobsListPage: ReturnType<typeof createJobsListPageFixture>;
  requestDetailsPage: ReturnType<typeof createRequestDetailsFixture>;
  candidateAvailabilityPage: ReturnType<
    typeof createCandidateAvailabilityFixture
  >;
  candidateSelfBookingPage: ReturnType<
    typeof createCandidateSelfBookingFixture
  >;
  jobDetailsPage: ReturnType<typeof createJobDetailsPageFixture>;
  requestListPage: ReturnType<typeof createRequestListFixture>;
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
  requestListPage: async ({ page }, use) => {
    const requestListPageFixture = createRequestListFixture(page);
    await use(requestListPageFixture);
  },
  candidateAvailabilityPage: async ({ context }, use) => {
    const page = await context.newPage();

    const candidateAvailabilityFixture =
      createCandidateAvailabilityFixture(page);
    await use(candidateAvailabilityFixture);
  },
  candidateSelfBookingPage: async ({ page }, use) => {
    const candidateSelfBookingFixture = createCandidateSelfBookingFixture(page);
    await use(candidateSelfBookingFixture);
  },
});
