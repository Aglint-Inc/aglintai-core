import type { CustomAgentInstructionPayload } from '@aglint/shared-types';
import type { ProgressLoggerType } from '@aglint/shared-utils/src/request-workflow/utils';
import { filterSchedulingOptionsArray } from '@request/components/SelfSchedulingDrawer/_common/components/BodyDrawer/ScheduleFilter/utils';

// import { filterSchedulingOptionsArray } from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/_common/components/BodyDrawer/ScheduleFilter/utils';
import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';

export const findPlanCombs = async ({
  date_range,
  recruiter_id,
  session_ids,
  reqProgressLogger,
  time_zone,
  agent_payload,
}: {
  recruiter_id: string;
  date_range: { start_date_str: string; end_date_str: string };
  session_ids: string[];
  reqProgressLogger: ProgressLoggerType;
  time_zone: string;
  agent_payload: CustomAgentInstructionPayload['agent']['ai_response'];
}) => {
  const cand_schedule = new CandidatesSchedulingV2({
    include_conflicting_slots: {
      out_of_office: true,
      out_of_working_hrs: true,
      show_soft_conflicts: true,
    },
    return_empty_slots_err: true,
  });
  await cand_schedule.fetchDetails({
    params: {
      company_id: recruiter_id,
      start_date_str: date_range.start_date_str,
      end_date_str: date_range.end_date_str,
      req_user_tz: time_zone,
      session_ids: session_ids,
    },
  });
  const slots = cand_schedule.findAvailabilitySlotsDateRange();

  const filtered_slot_info = filterSchedulingOptionsArray({
    schedulingOptions: slots,
    filters: {
      isHardConflicts: false,
      isNoConflicts: true,
      isOutSideWorkHours: true,
      isSoftConflicts: agent_payload.includeAllSoftConflictSlots,
      isWorkLoad: true,
      preferredDateRanges: [],
      preferredInterviewers: [],
    },
  });
  const plans = filtered_slot_info.combs
    .flatMap((c) => c.plans)
    .filter((p) => p.no_slot_reasons.length === 0);
  const schedule_dates = cand_schedule.db_details.schedule_dates;
  if (plans.length === 0) {
    const conflicts = filtered_slot_info.combs
      .flatMap((c) => c.plans)
      .map((p) => p.no_slot_reasons)
      .map((p) => p.map((r) => r.reason))
      .flat();
    await reqProgressLogger({
      log: `No slots found within ${schedule_dates.user_start_date_js.format('DD, MMMM')} - ${schedule_dates.user_end_date_js.format('DD, MMMM YYYY')} due to ${conflicts.join(', ')}`,
      status: 'completed',
      is_progress_step: true,
    });
    return [];
  }

  return plans;
};
