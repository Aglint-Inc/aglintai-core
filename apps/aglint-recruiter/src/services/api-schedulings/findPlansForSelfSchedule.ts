import {
  type PlanCombinationRespType,
  type SessionInterviewerType,
} from '@aglint/shared-types';
import { CApiError, dayjsLocal, getFullName } from '@aglint/shared-utils';
import type { ProgressLoggerType } from '@aglint/shared-utils/src/request-workflow/utils';
import { filterSchedulingOptionsArray } from '@request/components/SelfSchedulingDrawer/_common/components/BodyDrawer/ScheduleFilter/utils';

// import { filterSchedulingOptionsArray } from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/_common/components/BodyDrawer/ScheduleFilter/utils';
import { CandidatesScheduling } from '../CandidateSchedule/CandidatesScheduling';
import { extractPreferredInterviewers } from './textTransforms/extractPreferredInterviewers';
import { selfScheduleLinkInstruction } from './textTransforms/selfScheduleLinkInstruction';

export const findPlansForSelfSchedule = async ({
  date_range,
  recruiter_id,
  session_ids,
  reqProgressLogger,
  time_zone,
  agent_instruction,
}: {
  recruiter_id: string;
  date_range: { start_date_str: string; end_date_str: string };
  session_ids: string[];
  reqProgressLogger: ProgressLoggerType;
  time_zone: string;
  agent_instruction: string;
}): Promise<PlanCombinationRespType[]> => {
  const formatted_ai_reponse = await selfScheduleLinkInstruction({
    instruction: agent_instruction,
    user_tz: time_zone,
    default_preferred_dates: {
      startDate: date_range.start_date_str,
      endDate: date_range.end_date_str,
    },
  });
  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      out_of_office: false,
      out_of_working_hrs: true,
      show_soft_conflicts: formatted_ai_reponse.includeAllSoftConflictSlots,
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
  if (!cand_schedule.db_details) {
    throw new CApiError(
      'SERVER_ERROR',
      'No data found for the given session ids',
    );
  }
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
  const schedule_filters: Parameters<
    typeof filterSchedulingOptionsArray
  >[number]['filters'] = {
    isNoConflicts: true,
    isSoftConflicts: true,
    isHardConflicts: true,
    isOutSideWorkHours: formatted_ai_reponse.include_outside_working_hours,
    preferredTimeRanges: [
      {
        startTime:
          formatted_ai_reponse.candidateAvailability.prefferredTime.startTime,
        endTime:
          formatted_ai_reponse.candidateAvailability.prefferredTime.endTime,
      },
    ], //this is not date but time
    preferredInterviewers: preferredInterviewers.interviewers.map((i) => ({
      user_id: i.user_id,
    })),
    isWorkLoad: true,
  };

  const filtered_slot_info = filterSchedulingOptionsArray({
    schedulingOptions: slots,
    filters: schedule_filters,
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

  const date_filtered_slots = getPrefferredDateSlots(
    plans,
    {
      startDate:
        formatted_ai_reponse.candidateAvailability.preferredDates.startDate,
      endDate:
        formatted_ai_reponse.candidateAvailability.preferredDates.endDate,
    },
    time_zone,
  );
  if (date_filtered_slots.length === 0) {
    throw new CApiError('CLIENT', 'No plans matched for given preferred dates');
  }
  const candidate_slots = getNSlots(
    date_filtered_slots,
    formatted_ai_reponse.maxTotalSlots,
  );

  return candidate_slots;
};

const getNSlots = (
  slots: PlanCombinationRespType[],
  slot_cnt: number,
): PlanCombinationRespType[] => {
  const slot_time = new Set<string>();
  let added_slots_cnt = 0;
  const filtered_slots: PlanCombinationRespType[] = [];

  for (const curr_slot of slots) {
    if (added_slots_cnt >= slot_cnt) {
      break;
    }
    if (!slot_time.has(curr_slot.sessions[0].start_time)) {
      slot_time.add(curr_slot.sessions[0].start_time);
      filtered_slots.push(curr_slot);
      added_slots_cnt++;
    }
  }
  return filtered_slots;
};

// supports only single round
const getPrefferredDateSlots = (
  slots: PlanCombinationRespType[],
  preferred_dates: {
    startDate: string;
    endDate: string;
  },
  tz: string,
): PlanCombinationRespType[] => {
  const preferred_dates_dayjs = {
    startDate: dayjsLocal(preferred_dates.startDate).tz(tz),
    endDate: dayjsLocal(preferred_dates.endDate).tz(tz),
  };
  const filtered_slots: PlanCombinationRespType[] = slots.filter((slot) => {
    return (
      dayjsLocal(slot.sessions[0].start_time)
        .tz(tz)
        .isSameOrAfter(preferred_dates_dayjs.startDate, 'date') &&
      dayjsLocal(slot.sessions[0].start_time)
        .tz(tz)
        .isSameOrBefore(preferred_dates_dayjs.endDate, 'date')
    );
  });
  return filtered_slots;
};
