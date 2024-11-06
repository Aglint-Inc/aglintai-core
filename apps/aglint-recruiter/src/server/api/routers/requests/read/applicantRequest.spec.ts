import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
import { supabaseWrap } from '@aglint/shared-utils';
import test from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';
import { getCompanyDetails } from 'playwright/utils/dbfetch';
import { getRequestForAvailabilityE2e } from 'playwright/utils/getRequest';

test('test case 1', async () => {
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

  const randomRequestId = scheduleRequests && scheduleRequests[0].id;
  const caller1 = await caller();

  const requests = await caller1.requests.read.applicantRequest({
    request_id: randomRequestId,
  });

  // eslint-disable-next-line no-console
  console.log(requests);
});
test('test case 2', async () => {
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
