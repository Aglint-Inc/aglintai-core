import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
import { supabaseWrap } from '@aglint/shared-utils';
import test from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';
import { getCompanyDetails } from 'playwright/utils/dbfetch';
import { getRequestId } from '../test.utils';

test('test case 1: Select first request applicant', async () => {
  const randomRequestId = await getRequestId();
  const caller1 = await caller();

  const requests = await caller1.requests.read.applicantRequest({
    request_id: randomRequestId,
  });

  // eslint-disable-next-line no-console
  console.log(requests);
});

test('test case 2: Select random request applicant', async () => {
  const { recruiter_user } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();
  const scheduleRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*, request_relation!inner(*, interview_session!inner(*))')
      .eq('type', 'schedule_request')
      .eq('status', 'to_do')
      .eq('assigner_id', recruiter_user.user_id),
    false,
  );

  const randomRequestId =
    scheduleRequests &&
    scheduleRequests[Math.floor(Math.random() * scheduleRequests.length)].id;
  const caller1 = await caller();

  const requests = await caller1.requests.read.applicantRequest({
    request_id: randomRequestId,
  });

  // eslint-disable-next-line no-console
  console.log(requests);
});
