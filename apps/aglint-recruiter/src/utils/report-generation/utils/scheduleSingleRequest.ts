import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/candidateSelfSchedule/bookCandidateSelectedOption';
import { fetchDBScheduleDetails } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';
import { createFilterJson } from '@/utils/scheduling/createFilterJson';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type getJobScheduleRequests } from './getJobScheduleRequests';
const supabaseAdmin = getSupabaseServer();

export const scheduleSingleRequest = async (
  request: Awaited<ReturnType<typeof getJobScheduleRequests>>['allRequests'][0],
) => {
  const filter_json = await createFilterJson({
    application_id: request.application_id,
    supabase: supabaseAdmin,
    dateRange: {
      start_date: '',
      end_date: '',
    },
    organizer_name: '',
    sessions_ids: request.request_relation.map((reln) => reln.session_id!),
    request_id: request.id,
    rec_user_id: request.assignee_id,
  });
  const fetchedDetails = await fetchDBScheduleDetails(filter_json.id);

  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      out_of_office: true,
      out_of_working_hrs: true,
      show_soft_conflicts: true,
    },
    cand_start_time: 0,
    cand_end_time: 24,
  });
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: candidate_tz,
      end_date_str: end_date_str,
      company_id: company_id,
      session_ids: session_ids,
      start_date_str: start_date_str,
    },
  });

  await bookCandidateSelectedOption(
    {
      cand_tz: request.applications.candidate_tz,
      filter_id: filter_json.id,
      selected_plan: [],
    },
    cand_schedule.db_details,
    [],
    fetchedDetails,
  );
};
