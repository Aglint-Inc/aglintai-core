import { expect } from '@playwright/test';
import { getNoteId, getRequestId } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: Upsert request note',
  async ({ db, user_id, api }) => {
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });

    if (randomRequestId) {
      const note = await api.requests.note.updateNote({
        request_id: randomRequestId,
        note: 'This is a test note',
      });
      expect(!!note).toBeTruthy();
    }
  },
);

privateTestProcedure(
  'test case 2: Update request note',
  async ({ api, db, user_id }) => {
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
        note: 'This is a updated test note',
      });

      expect(!!note).toBeTruthy();
    }
  },
);
