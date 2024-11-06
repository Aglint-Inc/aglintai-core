import { expect, type Page } from '@playwright/test';

export const createCandidateAvailabilityFixture = (page: Page) => {
  const availability_url =
    process.env.NEXT_PUBLIC_HOST_NAME + '/request-availability/';
  const reqListBody = page.getByTestId('schedule_request-list-section');

  // Constants
  const SLOTS_PER_DAY = 3; //select slot per day
  const SELECT_DATES = 3; //select date count

  const RESCHEDULE_REASONS = 2;

  return {
    goto: async ({ availability_id }: { availability_id: string }) => {
      await page.bringToFront();
      await page.goto(availability_url + availability_id, {
        waitUntil: 'load',
      });
      // const slot_response = await page.waitForResponse(async (response) => {
      //   return (
      //     response
      //       .url()
      //       .includes('/api/scheduling/v1/cand_req_available_slots') &&
      //     response.status() === 200
      //   );
      // });

      // expect(slot_response.status()).toBe(200);
    },
    isReady: async () => {
      return await reqListBody.isVisible();
    },
    selectSingleDaySlots: async () => {
      await page.waitForSelector('[data-testid="availability-dates"]');
      const dates = await page.getByTestId('availability-dates').all();

      expect(dates.length).toBeGreaterThanOrEqual(SELECT_DATES);
      for (let i = 1; i < SELECT_DATES + 1; i++) {
        await dates[i].scrollIntoViewIfNeeded();
        await dates[i].click();
      }

      const slotsContainer = await page.getByTestId('slots-container').all();
      page.waitForSelector('[data-testid="slots-container"]', {
        timeout: 2000,
      });

      for (let i = 0; i < slotsContainer.length; i++) {
        const slots = await slotsContainer[i].getByTestId('time-slot').all();

        expect(slots.length).toBeGreaterThanOrEqual(SLOTS_PER_DAY);

        for (let i = 0; i < SLOTS_PER_DAY; i++) {
          await slots[i].scrollIntoViewIfNeeded();
          await slots[i].click();
        }
      }
    },
    selectMultiDaySlots: async () => {
      const nextBtn = await page.getByTestId('next-day-btn');

      let u = 1;
      async function selectDateAndSlot() {
        await page.waitForSelector('[data-testid="availability-dates"]');
        const dates = await page.getByTestId('availability-dates').all();

        expect(dates.length).toBeGreaterThanOrEqual(SELECT_DATES);
        for (let i = 0 + u; i < SELECT_DATES + u; i++) {
          await dates[i].scrollIntoViewIfNeeded();
          await dates[i].click();
        }

        const slotsContainer = await page.getByTestId('slots-container').all();
        page.waitForSelector('[data-testid="slots-container"]', {
          timeout: 2000,
        });

        for (let i = 0; i < slotsContainer.length; i++) {
          const slots = await slotsContainer[i].getByTestId('time-slot').all();

          expect(slots.length).toBeGreaterThanOrEqual(SLOTS_PER_DAY);

          for (let i = 0; i < SLOTS_PER_DAY; i++) {
            await slots[i].scrollIntoViewIfNeeded();
            await slots[i].click();
          }
        }

        if (await nextBtn.isVisible()) {
          await nextBtn.click();
          u += 2;
          selectDateAndSlot();
        }
      }

      await selectDateAndSlot();
    },
    submitAvailability: async () => {
      const submitAvailBtn = page.locator('button.submit-availability-btn');
      expect(await submitAvailBtn.isVisible()).toBeTruthy();
      await submitAvailBtn.click();

      const submit_response = await page.waitForResponse(async (response) => {
        return (
          response.url().includes('/api/trpc/candidate_availability.update') &&
          response.status() === 200
        );
      });

      expect(submit_response.status()).toBe(200);
      await page.waitForSelector(
        '[data-testid="availability-badge-submitted"]',
      );

      await page.close();
    },
    openRescheudleInterviewDialog: async () => {
      await page.waitForSelector('[data-testid="reschedule-interview-btn"]');
      const rescheduleBtn = page.getByTestId('reschedule-interview-btn');
      expect(await rescheduleBtn.isVisible()).toBeTruthy();
      await rescheduleBtn.click();
    },
    openCancelInterviewDialog: async () => {
      await page.waitForSelector('[data-testid="cancel-interview-btn"]');
      const cancelBtn = page.getByTestId('cancel-interview-btn');
      expect(await cancelBtn.isVisible()).toBeTruthy();
      await cancelBtn.click();
    },
    requestReschedule: async () => {
      const reasonBtns = await page
        .getByTestId('reschedule-reason-radio')
        .all();

      expect((await reasonBtns).length).toBeGreaterThanOrEqual(
        RESCHEDULE_REASONS + 1,
      );

      await reasonBtns[RESCHEDULE_REASONS].click();

      await page
        .getByTestId('reschedule-reason-text')
        .fill('reschedule reason');

      const requestRescheduleBtn = await page.getByTestId(
        'request-reschedule-btn',
      );
      await requestRescheduleBtn.click();

      const slot_response = await page.waitForResponse(async (response) => {
        return (
          response.url().includes('/api/request/candidate-request') &&
          response.status() === 200
        );
      });

      expect(slot_response.status()).toBe(200);

      await page.waitForTimeout(2000);
    },
  };
};
