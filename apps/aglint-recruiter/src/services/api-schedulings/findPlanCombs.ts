import { APIOptions } from '@aglint/shared-types';

import { filterSchedulingOptionsArray } from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/BodyDrawer/StepScheduleFilter/utils';

import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';
import { ProgressLoggerType } from './utils';

export const findPlanCombs = async ({
  date_range,
  recruiter_id,
  session_ids,
  api_options,
  reqProgressLogger,
}: {
  recruiter_id: string;
  date_range: { start_date_str: string; end_date_str: string };
  session_ids: string[];
  api_options: APIOptions;
  reqProgressLogger: ProgressLoggerType;
}) => {
  api_options.return_empty_slots_err = true;
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    company_id: recruiter_id,
    start_date_str: date_range.start_date_str,
    end_date_str: date_range.end_date_str,
    req_user_tz: 'Asia/Calcutta', //TODO:
    session_ids: session_ids,
  });
  const slots = cand_schedule.findAvailabilitySlotsDateRange();

  const filtered_slot_info = filterSchedulingOptionsArray({
    schedulingOptions: slots,
    filters: {
      isHardConflicts: false,
      isNoConflicts: true,
      isOutSideWorkHours:
        api_options.include_conflicting_slots.out_of_working_hrs,
      isSoftConflicts:
        api_options.include_conflicting_slots.show_soft_conflicts,
      isWorkLoad: true,
      preferredDateRanges: [],
      preferredInterviewers: [],
    },
  });
  const plans = filtered_slot_info.combs.flatMap((c) => c.plans);
  let schedule_dates = cand_schedule.db_details.schedule_dates;
  await reqProgressLogger({
    event_type: 'FIND_CURR_AVAIL_SLOTS',
    log: `Found ${plans.length} slots within ${schedule_dates.user_start_date_js.format('DD, MMMM')} - ${schedule_dates.user_end_date_js.format('DD, MMMM YYYY')}`,
    status: 'completed',
    is_progress_step: true,
  });
  return plans;
};
