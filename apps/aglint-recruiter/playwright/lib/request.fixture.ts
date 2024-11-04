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

      const response = await page2.waitForResponse(async (response) => {
        return (
          response
            .url()
            .includes('/api/scheduling/v1/cand_req_available_slots') &&
          response.status() === 200
        );
      });

      expect(response.status()).toBe(200);

      await page2.waitForTimeout(2000);

      await pickSlots({ selector: 'button.availability-dates', page: page2 });
      await pickSlots({ selector: 'button.time-slot', page: page2 });
      await pickSlots({ selector: 'button.time-slot-week-end', page: page2 });

      await page2.waitForTimeout(4000);
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
  const selectedSlots = selectRandomElements({ array: slots });

  for (let i = 1; i < selectedSlots.length; i++) {
    await selectedSlots[i].scrollIntoViewIfNeeded();
    await selectedSlots[i].click();
    await page.waitForTimeout(100);
  }
};

function selectRandomElements({ array }: { array: Locator[] }) {
  if (array.length <= 3) return array;

  const shuffledArray = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // const min = 3;
  // const max = array.length;
  // const count = Math.max(Math.floor(Math.random() * (max - min + 1)) + min, 3);

  return shuffledArray.slice(0, array.length / 2);
}

// const daysPick = async () => {
//   const days = await page2.locator('button.availability-dates').all();
//   const selectedDays = selectRandomElements({ array: days });
//   for (let i = 1; i <= selectedDays.length - 1; i++) {
//     await selectedDays[i].scrollIntoViewIfNeeded();
//     await selectedDays[i].click();
//     await page2.waitForTimeout(100);
//   }
// };

// const weekDayPick = async () => {
//   const weekDaySlots = await page2.locator('button.time-slot').all();
//   const selectedWeekDaySlots = selectRandomElements({
//     array: weekDaySlots,
//   });
//   for (let i = 1; i <= selectedWeekDaySlots.length - 1; i++) {
//     await selectedWeekDaySlots[i].scrollIntoViewIfNeeded();
//     await selectedWeekDaySlots[i].click();
//     await page2.waitForTimeout(100);
//   }
// };

// const weekEndPick = async () => {
//   const weekEndDaySlots = await page2
//     .locator('button.time-slot-week-end')
//     .all();
//   const selectedWeekEndDaySlots = selectRandomElements({
//     array: weekEndDaySlots,
//   });

//   for (let i = 1; i <= selectedWeekEndDaySlots.length - 1; i++) {
//     await selectedWeekEndDaySlots[i].scrollIntoViewIfNeeded();
//     await selectedWeekEndDaySlots[i].click();
//     await page2.waitForTimeout(100);
//   }
// };
