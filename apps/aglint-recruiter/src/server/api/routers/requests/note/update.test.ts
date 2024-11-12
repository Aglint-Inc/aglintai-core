import { expect } from '@playwright/test';
import { getNoteId, getRequestId } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: Upsert request note',
  async ({ db, user_id, api,log }) => {
    log('Start requests.note.updateNote');
    const noteToUpdate = 'This is a test note';
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });

    if (randomRequestId) {
      const note = await api.requests.note.updateNote({
        request_id: randomRequestId,
        note: noteToUpdate,
      });
      if (note) expect(note.note).toBe(noteToUpdate);
    }
    log('End requests.note.updateNote');
  },
);

privateTestProcedure(
  'test case 2: Update request note',
  async ({ api, db, user_id, log }) => {
    log('Start requests.note.updateNote');
    const noteToUpdate = 'This is a updated test note';
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });

    const noteId = await getNoteId({
      db,
      request_id: randomRequestId,
    });

    if (randomRequestId && noteId) {
      const note = await api.requests.note.updateNote({
        id: noteId,
        request_id: randomRequestId,
        note: noteToUpdate,
      });
      if (note) expect(note.note).toBe(noteToUpdate);
      log('End requests.note.updateNote');
    }
  },
);
