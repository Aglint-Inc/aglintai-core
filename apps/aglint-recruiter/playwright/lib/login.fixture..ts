import { expect, type Page } from '@playwright/test';

export const createLoginFixture = (page: Page) => {
  const app_url = process.env.NEXT_PUBLIC_HOST_NAME;
  return {
    goto: async () => {
      await page.goto(app_url + '/login', {
        waitUntil: 'networkidle', // Wait until network is idle
      });
    },
    login: async (email: string, password: string) => {
      await page.fill('input#email', email);
      await page.fill('input#password', password);

      await expect(async () => {
        await page.click('button[type="submit"]');
        await page.waitForSelector('div[data-testid="jobs-list-body"]', {
          state: 'visible',
          timeout: 20000,
        });
      }).toPass({
        intervals: [1_000, 2_000, 10_000],
        timeout: 60_000,
      });
    },
  };
};
