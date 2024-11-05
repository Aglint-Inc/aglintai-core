import { test } from './lib/fixtures';

test('Test self schedule flow', async ({
  loginPage,
  jobsListPage,
  jobDetailsPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await jobsListPage.goto();
  const jobRows = await jobsListPage.getAllJobs();
  await jobDetailsPage.openJobDetails(jobRows[0]);
  const applications = await jobDetailsPage.getAllApplicationRows();
  await jobDetailsPage.moveApplicationsToInterview(applications.slice(0, 2));
  await new Promise((resolve) => setTimeout(resolve, 10000)); // Fake await
});
