import { expect, type Page } from '@playwright/test';

export const createRequestDetailsFixture = (page: Page) => {
  const requestDetailsPage = page.getByTestId('request-details-page');
  return {
    goto: async (req_id: string) => {
      await page.goto(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/requests/${req_id}`,
        {
          waitUntil: 'networkidle', // Wait until network is idle
        },
      );
      await page.waitForSelector('[data-testid="request-details-page"]');
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
      //
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
    selectSelfScheduleDaySlots: async () => {
      await page.getByTestId('schedule-filter-btn').click();
      type AvailabilityType =
        | 'no_conflicts'
        | 'soft_conflicts'
        | 'hard_conflicts'
        | 'outside_work_hours';
      const availabilityTypes: AvailabilityType[] = [
        'no_conflicts',
        'outside_work_hours',
      ];

      for (const availabilityType of availabilityTypes) {
        await page.getByTestId(`schedule-filter-${availabilityType}`).click();
      }
      await page.getByTestId('schedule-filter-apply-btn').click();
      const dayCards = await page.getByTestId('day-card-checkbox');
      for (const dayCard of (await dayCards.all()).slice(0, 3)) {
        await dayCard.click();
      }
    },
    checkSelfScheduleMailPreview: async () => {
      const sendBtn = await page.getByTestId('self-scheduling-primary-btn');
      await sendBtn.click();
      const refreshBtn = await page.getByTestId(
        'self-scheduling-refresh-email-template-btn',
      );
      await refreshBtn.click();
      const response = await page.waitForResponse((req) => {
        return req
          .url()
          .includes('/api/mail/sendSelfScheduleRequest_email_applicant');
      });
      expect(response.status()).toBe(200);
    },
    sendSelfSchedulingRequestLinkToCandidate: async () => {
      const sendBtn = await page.getByTestId('self-scheduling-primary-btn');
      await sendBtn.click();
      const response = await page.waitForResponse((req) => {
        return req
          .url()
          .includes('/api/scheduling/application/sendselfschedule');
      });
      expect(response.status()).toBe(200);
    },
    copySelfSchedulingLink: async () => {
      await page.reload();
      expect(async () => {
        const copyBtn = await page.getByTestId('self-scheduling-copy-link-btn');
        expect(await copyBtn.isVisible()).toBeTruthy();
        await copyBtn.click();
      }).toPass({
        intervals: [2000, 3000, 5000],
      });
    },
  };
};
