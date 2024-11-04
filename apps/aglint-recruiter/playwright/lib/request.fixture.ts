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
          await page.getByTestId('request-details-status').isVisible(),
        ).toBeTruthy();
      }).toPass({
        timeout: 20000,
      });
    },
    isReady: async () => {
      return requestDetailsPage.isVisible();
    },
    getRequestType: async () => {
      return await page.getByTestId('request-details-type').textContent();
    },
    getRequestStatus: async () => {
      return await page.getByTestId('request-details-status').textContent();
    },
    openCandidateAvailabilityDailog: async () => {
      const getAvailabilityBtn = await page.getByTestId('get-availability-btn');
      expect(await getAvailabilityBtn.isVisible()).toBeTruthy();
      await getAvailabilityBtn.click();
      await page.waitForResponse((req) => {
        return (
          req
            .url()
            .includes('/api/mail/sendAvailabilityRequest_email_applicant') &&
          req.status() === 200
        );
      });
    },
    sendCandidateAvailability: async () => {
      const sendAvailBtn = page.getByTestId(
        'candidate-availability-submit-btn',
      );
      expect(await sendAvailBtn.isVisible()).toBeTruthy();
      await sendAvailBtn.click();
      const response = await page.waitForResponse((req) => {
        return req
          .url()
          .includes('/api/mail/sendAvailabilityRequest_email_applicant');
      });
      expect(response.status()).toBe(200);
    },
    openSelfSchedulingDialog: async () => {
      const selfSchedulingBtn = await page.getByTestId('self-schedule-btn');
      await selfSchedulingBtn.click();
      await page.waitForResponse((req) => {
        return (
          req.url().includes('/api/scheduling/v1/find_availability') &&
          req.status() === 200
        );
      });
    },
  };
};
