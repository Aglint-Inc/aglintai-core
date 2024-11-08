import { type Page } from '@playwright/test';

export const createLogoutFixture = (page: Page) => {
  return {
    isReady: async () => {
      return await page.waitForSelector('[data-testid="profile-dropdown"]');
    },
    logout: async () => {
      await page.click('[data-testid="profile-dropdown"]');
      await page.click('[data-testid="logout-btn"]');
    },
  };
};
