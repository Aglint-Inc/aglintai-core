import { type Page } from '@playwright/test';

export const createJobsListPageFixture = (page: Page) => {
  const dashboard_url = process.env.NEXT_PUBLIC_HOST_NAME + '/jobs';
  const jobsListBody = page.getByTestId('jobs-list-body');
  return {
    goto: async () => {
      await page.goto(dashboard_url, {
        timeout: 5000, // Increase timeout to 30 seconds
        waitUntil: 'networkidle', // Wait until network is idle
      });
    },
    isReady: async () => {
      return jobsListBody.isVisible();
    },
    getAllJobs: async () => {
      const jobs = await page.getByTestId('job-row');
      const allJobRows = await jobs.all();
      if (allJobRows.length === 0) {
        throw new Error('No jobs found');
      }
      const jobRow = allJobRows[0];
      await jobRow.click();
      await new Promise((resolve) => setTimeout(resolve, 10000));
    },
  };
};
