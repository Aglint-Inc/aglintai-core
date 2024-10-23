/* eslint-disable no-console */
import { createRequestProgressLogger } from '@aglint/shared-utils';

import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/candidateSelfSchedule/bookCandidateSelectedOption';
import { fetchDBScheduleDetails } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';
import { createFilterJson } from '@/utils/scheduling/createFilterJson';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type getJobScheduleRequests } from './getJobScheduleRequests';
const supabaseAdmin = getSupabaseServer();
const candidate_tz = 'Asia/Kolkata';
export const scheduleSingleRequest = async ({
  request,
  dateRange,
  company_id,
}: {
  request: Awaited<ReturnType<typeof getJobScheduleRequests>>['allRequests'][0];
  dateRange: {
    start_date: string;
    end_date: string;
  };
  company_id: string;
}) => {
  const session_ids = request.request_relation.map((reln) => reln.session_id!);
  const filter_json = await createFilterJson({
    application_id: request.application_id,
    supabase: supabaseAdmin,
    dateRange: {
      start_date: dateRange.start_date,
      end_date: dateRange.end_date,
    },
    organizer_name: '',
    sessions_ids: request.request_relation.map((reln) => reln.session_id!),
    request_id: request.id,
    rec_user_id: request.assignee_id,
  });
  const fetchedDetails = await fetchDBScheduleDetails(filter_json.id);

  const reqProgressLogger = createRequestProgressLogger({
    supabaseAdmin,
    request_id: request.id,
    event_type: 'SELF_SCHEDULE_LINK',
  });

  await reqProgressLogger({
    status: 'completed',
    is_progress_step: false,
  });
  await reqProgressLogger({
    status: 'completed',
    is_progress_step: true,
    meta: {
      filter_json_id: filter_json.id,
    },
  });
  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      out_of_office: true,
      out_of_working_hrs: true,
      show_soft_conflicts: true,
      day_passed: true,
    },
    cand_start_time: 0,
    cand_end_time: 24,
  });
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: candidate_tz,
      end_date_str: dateRange.end_date,
      company_id: company_id,
      session_ids: session_ids,
      start_date_str: dateRange.start_date,
    },
  });
  if (!cand_schedule.db_details) {
    throw new Error('No db details found');
  }

  const multiday_plans = cand_schedule.findCandSlotForTheDay();
  // TODO: do this for multiple days
  if (multiday_plans[0].plans.length === 0) {
    throw new Error('No plans found');
  }
  await bookCandidateSelectedOption(
    {
      cand_tz: candidate_tz,
      filter_id: filter_json.id,
    },
    cand_schedule.db_details,
    multiday_plans[0].plans[0],
    fetchedDetails,
  );
  console.log('booked request', request.title);
};
