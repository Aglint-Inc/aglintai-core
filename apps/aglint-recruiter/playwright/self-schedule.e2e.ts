import { test } from './lib/fixtures';

test('Test self schedule flow', async ({ loginPage, jobsListPage }) => {
  test.slow();
  await loginPage.goto();
  await loginPage.login(
    process.env.E2E_TEST_EMAIL,
    process.env.E2E_TEST_PASSWORD,
  );
  await jobsListPage.goto();
  await jobsListPage.getAllJobs();
});
