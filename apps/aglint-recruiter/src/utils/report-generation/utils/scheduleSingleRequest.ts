/* eslint-disable no-console */
import { type PlanCombinationRespType } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  supabaseWrap,
} from '@aglint/shared-utils';

import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/candidateSelfSchedule/bookCandidateSelectedOption';
import { fetchDBScheduleDetails } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';
import { createFilterJson } from '@/utils/scheduling/createFilterJson';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { report_seed_candidate_tz } from '../constant';
import { type getJobScheduleRequests } from './getJobScheduleRequests';
const supabaseAdmin = getSupabaseServer();
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

  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      out_of_office: true,
      out_of_working_hrs: true,
      show_soft_conflicts: true,
      day_passed: true,
      show_conflicts_events: true,
      day_off: true,
      holiday: true,
    },
    cand_start_time: 0,
    cand_end_time: 24,
  });
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: report_seed_candidate_tz,
      end_date_str: dateRange.end_date,
      company_id: company_id,
      session_ids: session_ids,
      start_date_str: dateRange.start_date,
    },
  });
  if (!cand_schedule.db_details) {
    throw new Error('No db details found');
  }
  console.log('finding plans for the request', request.title);
  const multiday_plans = cand_schedule.findCandSlotForTheDay();
  if (multiday_plans.length === 0) {
    console.error('No Slots Found for scheduling');
  }
  // TODO: do this for multiple days
  if (multiday_plans[0].plans.length === 0) {
    throw new Error('No plans found');
  }
  if (multiday_plans.length > 1) {
    console.error('Multiple days found for the request', request.title);
    return;
  }

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
  await updatePlansInFilterJson({
    filter_json_id: filter_json.id,
    plans: multiday_plans[0].plans,
  });
  console.log('booking request', request.title);

  await bookCandidateSelectedOption(
    {
      cand_tz: report_seed_candidate_tz,
      filter_id: filter_json.id,
    },
    cand_schedule.db_details,
    multiday_plans[0].plans[0],
    fetchedDetails,
  );
  console.log('booked request', request.title);
};

const updatePlansInFilterJson = async ({
  filter_json_id,
  plans,
}: {
  filter_json_id: string;
  plans: PlanCombinationRespType[];
}) => {
  supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .update({
        selected_options: plans,
      })
      .eq('id', filter_json_id),
  );
};
