import { expect, type Page } from '@playwright/test';

export const createRequestDetailsFixture = (page: Page) => {
  const requestDetailsPage = page.getByTestId('request-details-page');
  return {
    goto: async (url: string) => {
      expect(async () => {
        await page.goto(url, {
          timeout: 10000, // Increase timeout to 30 seconds
          waitUntil: 'networkidle', // Wait until network is idle
        });
        expect(
          page.getByTestId('request-details-status').isVisible(),
        ).toBeTruthy();
      }).toPass({
        timeout: 20000,
      });
    },
    isReady: async () => {
      return requestDetailsPage.isVisible();
    },
    getRequestType: () => {
      return page.getByAltText('request-details-type').textContent();
    },
    getRequestStatus: async () => {
      return await page.getByTestId('request-details-status').textContent();
    },
    openCandidateAvailabilityDailog: async () => {
      const getAvailabilityBtn = page.getByTestId('get-availability-btn');
      expect(getAvailabilityBtn.isVisible()).toBeTruthy();
      await getAvailabilityBtn.click();
      await page.waitForSelector(
        '[data-testid="candidate-availability-submit-btn"]',
      );
    },
    assertTemplatePreview: async () => {
      //
    },
    sendCandidateAvailability: async () =>
      // start_date: string,
      // end_date: string,
      // min_days: number,
      // num_slots: number,
      {
        //
      },
  };
};
