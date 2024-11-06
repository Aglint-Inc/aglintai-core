import { expect, type Locator, type Page } from '@playwright/test';

export const createCandidateSelfBookingFixture = (page: Page) => {
  return {
    goto: async (url: string) => {
      await page.goto(url);
      await page.waitForSelector('[data-testid="booking-page"]');
    },
    isSingleDayBooking: async () => {
      const isSingleDayBooking = await page.getByTestId('booking-button');
      return await isSingleDayBooking.isVisible();
    },
    singleDayBook: async () => {
      const bookingBtn = await page.getByTestId('booking-button');
      expect(await bookingBtn.isVisible()).toBeTruthy();
      const slots = await page.getByTestId('time-slot');
      const timeSlots = await slots.all();
      expect(timeSlots.length).toBeGreaterThan(0);
      await timeSlots[0].click();
      await bookingBtn.click();
      await page.waitForSelector(
        '[data-testid="self-scheduling-confirmed-page"]',
      );
    },
    multiDayBook: async () => {
      const continueBtn = await page.getByTestId('continue-button');
      expect(await continueBtn.isVisible()).toBeTruthy();

      let bookingBtn: Locator | null = null;
      do {
        const slots = await page.getByTestId('time-slot');
        const timeSlots = await slots.all();
        expect(timeSlots.length).toBeGreaterThan(0);
        await timeSlots[0].click();
        if (await continueBtn.isVisible()) {
          await continueBtn.click();
        }
        bookingBtn = await page.getByTestId('booking-button');
      } while (bookingBtn && (await bookingBtn.isDisabled()));
      await bookingBtn.click();
      await page.waitForSelector(
        '[data-testid="self-scheduling-confirmed-page"]',
      );
    },
  };
};
