import { expect, type Locator, type Page } from '@playwright/test';

export const createRequestDetailsFixture = (page: Page) => {
  const requestDetailsPage = page.getByTestId('request-details-page');

  const CONFIRM_SLOT = 0;
  return {
    goto: async (req_id: string) => {
      await page.bringToFront();
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

    openCandidateAvailabilityDailog: async () => {
      await page.waitForSelector('[data-testid="get-availability-btn"]');
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

    cancelSchedule: async () => {
      await page.waitForSelector('[data-testid="cancel-schedule-btn"]');
      const cancelSchedulingBtn = await page.getByTestId('cancel-schedule-btn');
      await cancelSchedulingBtn.click();
      await page.waitForSelector(
        '[data-testid="request-details-status-completed"]',
      );
    },
    reSchedule: async () => {
      await page.waitForSelector('[data-testid="cancel-schedule-btn"]');
      const cancelSchedulingBtn = await page.getByTestId('cancel-schedule-btn');
      await cancelSchedulingBtn.click();
      await page.waitForSelector(
        '[data-testid="request-details-status-completed"]',
      );
    },
    sendCandidateAvailability: async () => {
      await page.waitForSelector(
        '[data-testid="candidate-availability-submit-btn"]',
      );
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
      const slotCheckboxes = await page.getByTestId('slot-checkbox');
      expect(await slotCheckboxes.count()).toBeGreaterThan(0);
      for (const slot of (await slotCheckboxes.all()).slice(0, 10)) {
        await slot.click();
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
    singleDaybookSchedule: async () => {
      await page.reload();
      await page.waitForSelector('[data-testid="sched-cand-avail-btn"]');
      const schedulInterviewBtn = page.getByTestId('sched-cand-avail-btn');
      expect(await schedulInterviewBtn.isVisible()).toBeTruthy();
      await schedulInterviewBtn.click();

      await page.waitForSelector('[data-testid="comfirm-availability-radio"]');
      const sendAvailBtn = await page
        .getByTestId('comfirm-availability-radio')
        .all();
      await sendAvailBtn[CONFIRM_SLOT].click();

      const continueBtn = await page.getByTestId('continue-availability-btn');
      expect(await continueBtn.isVisible()).toBeTruthy();
      await continueBtn.click();

      const comfirmBtn = await page.getByTestId('comfirm-availability-btn');
      expect(await comfirmBtn.isVisible()).toBeTruthy();
      await comfirmBtn.click();

      const mail_response = await page.waitForResponse(async (response) => {
        return (
          response
            .url()
            .includes('/api/mail/confirmInterview_email_applicant') &&
          response.status() === 200
        );
      });
      expect(mail_response.status()).toBe(200);

      await page.waitForSelector('[data-testid="view-schedule-btn"]');

      page.close();
    },

    multiDaybookSchedule: async () => {
      await page.reload();
      await page.waitForSelector('[data-testid="sched-cand-avail-btn"]');
      const schedulInterviewBtn = page.getByTestId('sched-cand-avail-btn');
      expect(await schedulInterviewBtn.isVisible()).toBeTruthy();
      await schedulInterviewBtn.click();

      let continueBtn: Locator | null = null;
      do {
        await page.waitForSelector(
          '[data-testid="comfirm-availability-radio"]',
        );
        const sendAvailBtn = await page
          .getByTestId('comfirm-availability-radio')
          .all();
        await sendAvailBtn[CONFIRM_SLOT].click();

        continueBtn = await page.getByTestId('continue-availability-btn');
        expect(await schedulInterviewBtn.isVisible()).toBeTruthy();
        await continueBtn.click();
      } while (await continueBtn.isVisible());

      const comfirmBtn = await page.getByTestId('comfirm-availability-btn');
      expect(await schedulInterviewBtn.isVisible()).toBeTruthy();
      await comfirmBtn.click();

      const mail_response = await page.waitForResponse(async (response) => {
        return (
          response
            .url()
            .includes('/api/mail/confirmInterview_email_applicant') &&
          response.status() === 200
        );
      });
      expect(mail_response.status()).toBe(200);

      await page.waitForSelector('[data-testid="view-schedule-btn"]');

      page.close();
    },
  };
};
