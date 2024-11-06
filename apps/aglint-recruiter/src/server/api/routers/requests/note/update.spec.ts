import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';
import { getNoteId, getRequestId } from '../test.utils';

test('test case 1: Upsert request note', async () => {
    const caller1 = await caller();
    const randomRequestId = await getRequestId();
  const note = await caller1.requests.note.updateNote({
    request_id: randomRequestId,
    note: 'This is a test note',
  });
  expect(!!note).toBeTruthy();
  // eslint-disable-next-line no-console
  console.log(note);
});

test('test case 2: Update request note', async () => {
  const caller1 = await caller();
  const randomRequestId = await getRequestId();
  const noteId = await getNoteId(randomRequestId);

  const note = await caller1.requests.note.updateNote({
    id: noteId,
    request_id: randomRequestId,
    note: 'This is a updated test note',
  });
  expect(!!note).toBeTruthy();
  // eslint-disable-next-line no-console
  console.log(note);
});
