import { type Page } from '@playwright/test';

export const createJobsListPageFixture = (page: Page) => {
  const dashboard_url = process.env.NEXT_PUBLIC_HOST_NAME + '/jobs';
  const jobsListBody = page.getByTestId('jobs-list-body');
  return {
    goto: async () => {
      await page.goto(dashboard_url, {
        waitUntil: 'networkidle', // Wait until network is idle
      });
    },
    isReady: async () => {
      return jobsListBody.isVisible();
    },
    getAllJobs: async () => {
      const jobs = await page.getByTestId('job-row');
      const allJobRows = await jobs.all();
      return allJobRows;
    },
  };
};
