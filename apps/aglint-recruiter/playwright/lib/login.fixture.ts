import { type Page } from '@playwright/test';

export const createLoginFixture = (page: Page) => {
  const app_url = process.env.NEXT_PUBLIC_HOST_NAME;
  return {
    isReady: async () => {
      return await page.waitForSelector('[data-testid="login-btn"]');
    },
    goto: async () => {
      await page.bringToFront();
      await page.goto(app_url + '/login', {
        waitUntil: 'networkidle', // Wait until network is idle
      });
    },
    login: async (email: string, password: string) => {
      await page.fill('input#email', email);
      await page.fill('input#password', password);
      await page.click('button[type="submit"]');
      await page.waitForResponse((req) => {
        return req.url().includes('/auth/v1/token') && req.status() === 200;
      });
    },
  };
};
