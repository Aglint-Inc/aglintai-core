import { ScheduleUtils, supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getCompanyDetails } from './dbfetch';

export const getRequestForScheduleE2e = async () => {
  return await fetchSchedule('schedule_request');
};

export const getRequestForRescheduleE2e = async () => {
  return await fetchSchedule('reschedule_request');
};

const fetchSchedule = async (
  type: 'schedule_request' | 'reschedule_request',
) => {
  const { recruiter_user } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();
  const scheduleRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*, request_relation!inner(*, interview_session!inner(*))')
      .eq('type', type)
      .eq('status', 'to_do')
      .eq('assigner_id', recruiter_user.user_id),
    // .gte('schedule_start_date', new Date().toISOString())
    // .gte('schedule_end_date', new Date().toISOString()),
    false,
  );
  if (scheduleRequests.length === 0) {
    throw new Error('No schedule requests found');
  }

  const singleDayRequests = scheduleRequests.filter((req) => {
    const reqSessDetails = req.request_relation.map(
      (reln) => reln.interview_session,
    );
    const SessionRounds = ScheduleUtils.getSessionRounds(reqSessDetails);
    return SessionRounds.length === 1;
  });
  const multiDayRequests = scheduleRequests.filter((req) => {
    const reqSessDetails = req.request_relation.map(
      (reln) => reln.interview_session,
    );
    const SessionRounds = ScheduleUtils.getSessionRounds(reqSessDetails);
    return SessionRounds.length > 1;
  });

  return { singleDayRequests, multiDayRequests };
};

export const getRequestForCancelE2e = async () => {
  const { recruiter_user } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();
  const cancelRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*')
      .eq('type', 'cancel_schedule_request')
      .eq('status', 'to_do')
      .eq('assigner_id', recruiter_user.user_id),
    false,
  );
  if (cancelRequests.length === 0) {
    throw new Error('No cancel requests found');
  }

  return cancelRequests;
};
