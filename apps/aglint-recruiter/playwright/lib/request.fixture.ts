import { chromium, expect, type Page } from '@playwright/test';
import { type Locator } from 'playwright';
import { getCandidateAvailability } from 'playwright/utils/getCandidateAvailability';

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
    getRequestType: async () => {
      return await page.getByTestId('request-details-type').textContent();
    },
    getRequestStatus: async () => {
      return await page.getByTestId('request-details-status').textContent();
    },
    openCandidateAvailabilityDailog: async () => {
      const getAvailabilityBtn = page.getByTestId('get-availability-btn');
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

    submitCandidateAvailability: async (request_id: string) => {
      const browser = await chromium.launch({
        headless: false,
      });
      const context = await browser.newContext();
      const page2 = await context.newPage();

      const { id: ava_id } = await getCandidateAvailability(request_id);

      await page2.goto(`/request-availability/${ava_id}`, {
        waitUntil: 'load',
      });

      const slot_response = await page2.waitForResponse(async (response) => {
        return (
          response
            .url()
            .includes('/api/scheduling/v1/cand_req_available_slots') &&
          response.status() === 200
        );
      });

      expect(slot_response.status()).toBe(200);

      await page2.waitForTimeout(2000);

      const selectors = [
        'button.availability-dates',
        'button.time-slot',
        'button.time-slot-week-end',
      ];

      for (const selector of selectors) {
        await pickSlots({ selector, page: page2 });
      }

      const submitAvailBtn = page2.locator('button.submit-availability-btn');
      expect(await submitAvailBtn.isVisible()).toBeTruthy();
      await submitAvailBtn.click();

      const submit_response = await page2.waitForResponse(async (response) => {
        return (
          response.url().includes('/api/trpc/candidate_availability.update') &&
          response.status() === 200
        );
      });

      expect(submit_response.status()).toBe(200);

      await page2.close();
    },
    bookInterview: async () => {
      await page.reload();
      await page.waitForTimeout(2000);
      const schedulInterviewBtn = page.getByTestId('sched-cand-avail-btn');
      expect(await schedulInterviewBtn.isVisible()).toBeTruthy();
      await schedulInterviewBtn.click();

      const submit_response = await page.waitForResponse(async (response) => {
        return (
          response.url().includes('candidate_availability.availableSlots') &&
          response.status() === 200
        );
      });

      expect(submit_response.status()).toBe(200);

      await page.waitForTimeout(2000);

      const sendAvailBtn = await page
        .getByTestId('comfirm-availability-radio')
        .all();

      await sendAvailBtn[0].click();

      const comfirmBtn = await page.getByTestId('comfirm-availability-btn');
      await comfirmBtn.click();

      await page.waitForTimeout(2000);
      await comfirmBtn.click();

      const recruiter_confirm_response = await page.waitForResponse(
        async (response) => {
          return (
            response
              .url()
              .includes(
                '/api/scheduling/v1/booking/confirm-recruiter-selected-option',
              ) && response.status() === 200
          );
        },
      );

      expect(recruiter_confirm_response.status()).toBe(200);
      await page.waitForTimeout(2000);
      page.close();
    },
  };
};

const pickSlots = async ({
  selector,
  page,
}: {
  selector: string;
  page: Page;
}) => {
  const slots = await page.locator(selector).all();
  const selectedSlots =
    selector === 'button.availability-dates'
      ? selectRandomElements(
          slots,
          selector === 'button.availability-dates' ? true : false,
        )
      : slots;

  for (let i = 0; i < selectedSlots.length; i++) {
    await selectedSlots[i].scrollIntoViewIfNeeded();
    await selectedSlots[i].click();
    await page.waitForTimeout(10);
  }
};

function selectRandomElements(array: Locator[], isShuffle = false) {
  if (array.length <= 3) return array;

  const shuffledArray = isShuffle
    ? array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    : array;

  return shuffledArray.slice(
    0,
    array.length > 10 ? array.length / 2 : array.length - 1,
  );
}
