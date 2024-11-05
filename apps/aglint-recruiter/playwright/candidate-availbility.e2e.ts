import { chromium, expect } from '@playwright/test';

import { test } from './lib/fixtures';
import { getCandidateAvailability } from './utils/getCandidateAvailability';
import { getRequestForAvailabilityE2e } from './utils/getRequest';

/**
 * E2E test for login flow and create request flow from candidate list
 */
test.describe('Candidate Availability', () => {
  test('Request - Candidate Availability', async ({
    page,
    loginPage,
    requestDetailsPage,
  }) => {
    // Constants
    // const WAIT_TIME = {
    //   SHORT: 500,
    //   MEDIUM: 2000,
    //   LONG: 5000,
    // };

    // const CANDIDATE_INDICES = {
    //   FIRST: 0,
    //   SECOND: 1,
    //   THIRD: 2,
    // };
    // const JOB_INDEX = 2;

    // Step 1: Login
    await test.step('Authenticate user', async () => {
      await loginPage.goto();

      const email = process.env.E2E_TEST_EMAIL;
      const password = process.env.E2E_TEST_PASSWORD;

      if (!email || !password) {
        throw new Error('Required environment variables are not set');
      }

      await loginPage.login(email, password);
    });

    // Step 2: Navigate to request details and pick random request
    let request_id = '';
    await test.step('Select job from list', async () => {
      const scheduleRequests = await getRequestForAvailabilityE2e();

      request_id = scheduleRequests[0].id;
      await requestDetailsPage.goto(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/requests/${request_id}`,
      );
    });

    // Step 3: Open Candidate Availability
    await test.step('Open Candidate Availability', async () => {
      await page.waitForSelector('[data-testid="get-availability-btn"]');
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
    });

    // Step 4: Send candidates Availability
    await test.step('Send candidates Availability', async () => {
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
    });

    // Step 5: Open candidate availability page
    const headless = Boolean(process.env.PLAYWRIGHT_HEADLESS === 'true');

    const browser = await chromium.launch({
      headless,
    });
    const context = await browser.newContext();
    const page2 = await context.newPage();

    await test.step('Open candidate availability page', async () => {
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
    });

    // Step 5: Select dates and slots
    await test.step('Select dates and slots', async () => {
      const nextBtn = await page2.getByTestId('next-day-btn');

      let u = 1;
      async function a() {
        page2.waitForSelector('[data-testid="availability-dates"]');
        const dates = await page2.getByTestId('availability-dates').all();

        for (let i = 0 + u; i < 3 + u; i++) {
          await dates[i].scrollIntoViewIfNeeded();
          await dates[i].click();
        }

        const slotsContainer = await page2.getByTestId('slots-container').all();
        page2.waitForSelector('[data-testid="slots-container"]', {
          timeout: 2000,
        });

        for (let i = 0; i < slotsContainer.length; i++) {
          const slots = await slotsContainer[i].getByTestId('time-slot').all();

          for (let i = 0; i < 2; i++) {
            await slots[i].scrollIntoViewIfNeeded();
            await slots[i].click();
          }
        }

        if (await nextBtn.isVisible()) {
          await nextBtn.click();
          u += 2;
          a();
        }
      }

      await a();
    });

    // Step 5: Submit availability
    await test.step('Submit availability', async () => {
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
      await page2.waitForTimeout(2000);
      await page2.close();
    });

    await test.step('book Interview', async () => {
      await page.waitForSelector('[data-testid="sched-cand-avail-btn"]');
      const schedulInterviewBtn = page.getByTestId('sched-cand-avail-btn');
      expect(await schedulInterviewBtn.isVisible()).toBeTruthy();
      await schedulInterviewBtn.click();

      await page.waitForSelector('[data-testid="comfirm-availability-radio"]');
      const sendAvailBtn = await page
        .getByTestId('comfirm-availability-radio')
        .all();
      await sendAvailBtn[0].click();

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
      await comfirmBtn.click();
      await page.waitForSelector('[data-testid="view-schedule-btn"]');
      await page.waitForTimeout(7000);
      page.close();
    });
  });

  //   test.afterEach(async ({ page }) => {
  //     await page.close();
  //   });
});
