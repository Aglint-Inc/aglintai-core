import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('update break', async ({ api, adminDb, log }) => {
  log('updating break');
  const res = (
    await adminDb
      .from('interview_session')
      .select('id')
      .neq('break_duration', 60)
      .throwOnError()
  ).data;
  if (!res || res?.length === 0) {
    log('No session found');
    return;
  }
  const session_id = res[0].id;
  const updated_duration = 60;
  const resBreak = await api.application.update_break({
    session_id: session_id,
    break_duration: updated_duration,
  });

  const checkDbDuration = (
    await adminDb
      .from('interview_session')
      .select('break_duration')
      .eq('id', session_id)
      .single()
      .throwOnError()
  )?.data?.break_duration;

  expect(resBreak && checkDbDuration === updated_duration).toBe(true);
  log('updated break');
});
