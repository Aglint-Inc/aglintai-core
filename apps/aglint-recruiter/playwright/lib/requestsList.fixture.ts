import { expect, type Locator, type Page } from '@playwright/test';

export const createRequestListFixture = (page: Page) => {
  const dashboard_url = process.env.NEXT_PUBLIC_HOST_NAME + '/requests';
  const reqListBody = page.getByTestId('schedule_request-list-section');
  return {
    goto: async () => {
      await page.goto(dashboard_url, {
        waitUntil: 'networkidle', // Wait until network is idle
      });
    },
    isReady: async () => {
      return await reqListBody.isVisible();
    },
    getScheduleRequests: async () => {
      const scheduleReqSection = await page.getByTestId(
        'schedule_request-list-section',
      );
      const scheduleReqs = await scheduleReqSection.getByTestId('request-card');
      return await scheduleReqs.all();
    },
    openRequestCard: async (requestCard: Locator) => {
      await requestCard.click();
      expect(async () => {
        const reqTableHeader = await page.getByTestId('application-header');
        expect(await reqTableHeader.isVisible()).toBeTruthy();
      }).toPass({
        intervals: [2000, 4000],
      });
    },
  };
};
