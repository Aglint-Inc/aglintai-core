import { type SessionInterviewerType } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import type { ProgressLoggerType } from '@aglint/shared-utils/src/request-workflow/utils';
import { filterSchedulingOptionsArray } from '@request/components/SelfSchedulingDrawer/_common/components/BodyDrawer/ScheduleFilter/utils';
import { type SelfSchedulingFlow } from '@request/components/SelfSchedulingDrawer/_common/store/store';

// import { filterSchedulingOptionsArray } from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/_common/components/BodyDrawer/ScheduleFilter/utils';
import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';
import { extractPreferredInterviewers } from './textTransforms/extractPreferredInterviewers';

export const findPlanCombs = async ({
  date_range,
  recruiter_id,
  session_ids,
  reqProgressLogger,
  time_zone,
  schedule_filters,
  agent_instruction,
}: {
  recruiter_id: string;
  date_range: { start_date_str: string; end_date_str: string };
  session_ids: string[];
  reqProgressLogger: ProgressLoggerType;
  time_zone: string;
  schedule_filters: SelfSchedulingFlow['filters'];
  agent_instruction: string;
}) => {
  const cand_schedule = new CandidatesSchedulingV2({
    include_conflicting_slots: {
      out_of_office: false,
      out_of_working_hrs: true,
      show_soft_conflicts: schedule_filters.isSoftConflicts,
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
  const all_inters: (Pick<SessionInterviewerType, 'user_id'> & {
    full_name: string;
  })[] = cand_schedule.db_details.all_inters.map((int) => ({
    user_id: int.user_id,
    full_name: getFullName(int.first_name, int.last_name),
  }));

  const preferredInterviewers = await extractPreferredInterviewers({
    agent_instruction: agent_instruction,
    interviewer: {
      interviewers: all_inters,
    },
  });

  const slots = cand_schedule.findAvailabilitySlotsDateRange();
  const filtered_slot_info = filterSchedulingOptionsArray({
    schedulingOptions: slots,
    filters: {
      isNoConflicts: true,
      isSoftConflicts: true,
      isHardConflicts: true,
      isOutSideWorkHours: schedule_filters.isOutSideWorkHours,
      preferredInterviewers: preferredInterviewers.interviewers.map((i) => ({
        user_id: i.user_id,
      })),
      preferredTimeRanges: [
        {
          startTime: schedule_filters.preferredTimeRanges[0].startTime,
          endTime: schedule_filters.preferredTimeRanges[0].endTime,
        },
      ],
      isWorkLoad: true,
    },
    user_tz: time_zone,
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
    const unique_conflicts = [...new Set(conflicts)];
    await reqProgressLogger({
      log: `No slots found within ${schedule_dates.user_start_date_js.format('DD, MMMM')} - ${schedule_dates.user_end_date_js.format('DD, MMMM YYYY')} due to ${unique_conflicts.join(', ')}`,
      status: 'completed',
      is_progress_step: true,
    });
    return [];
  }

  return plans;
};
