import test from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('update portal detail', async () => {
  const { candidatePortal } = await caller();
  await candidatePortal.update_portal_detail({
    about: 'test - About update portal detail',
    greetings: 'test - Greetings update portal detail',
  });
});
