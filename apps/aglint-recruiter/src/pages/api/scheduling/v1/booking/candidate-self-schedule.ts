/* eslint-disable security/detect-object-injection */
import {
  type PlanCombinationRespType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { SchemaCandidateDirectBooking } from '@aglint/shared-types/src/aglintApi/zodSchemas/candidate-self-schedule';
import { ScheduleUtils } from '@aglint/shared-utils';
import { CApiError } from '@aglint/shared-utils/src/customApiError';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/bookCandidateSelectedOption';
import { fetchDBScheduleDetails } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';
import { verifyRecruiterSelectedSlots } from '@/services/CandidateSchedule/utils/bookingUtils/verifyRecruiterSelctedOptions';
import { compareTimesByMinutesPrec } from '@/services/CandidateSchedule/utils/time_range_utils';

const candidateSelfSchedule = async (
  parsed: z.infer<typeof SchemaCandidateDirectBooking>,
) => {
  const fetchedDetails = await fetchDBScheduleDetails(parsed.filter_id);
  const { verified_slots, cand_schedule } = await verifyRecruiterSelectedSlots({
    candidate_tz: parsed.cand_tz,
    company_id: fetchedDetails.company.id,
    selected_options: fetchedDetails.selected_plans,
    session_ids: fetchedDetails.session_ids,
  });

  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }
  const filtered_plans = filterCandidateSelectedSlotFomVerifiedPlans({
    cand_selected_plan: parsed.selected_plan,
    verified_plans: verified_slots,
    candidate_tz: parsed.cand_tz,
  });
  if (filtered_plans.length === 0) {
    throw new CApiError('CLIENT', 'Invalid Slot');
  }
  await bookCandidateSelectedOption(
    parsed,
    cand_schedule.db_details,
    filtered_plans[0],
    fetchedDetails,
  );
};

export default createPageApiPostRoute(
  SchemaCandidateDirectBooking,
  candidateSelfSchedule,
);

const filterCandidateSelectedSlotFomVerifiedPlans = ({
  cand_selected_plan,
  candidate_tz,
  verified_plans,
}: {
  cand_selected_plan: z.infer<
    typeof SchemaCandidateDirectBooking
  >['selected_plan'];
  verified_plans: PlanCombinationRespType[]; // flatterned multipday plans
  candidate_tz: string;
}) => {
  const filtered_plans = verified_plans.filter((plan) => {
    const rounds = ScheduleUtils.getSessionRounds(
      plan.sessions.map((s) => ({
        ...s,
        break_duration: s.break_duration,
        session_duration: s.duration,
        session_order: s.session_order,
      })),
    ) as unknown as SessionCombinationRespType[][];
    const are_all_rounds_same = rounds.every((round, idx) => {
      const start_time_diff = compareTimesByMinutesPrec(
        round[0].start_time,
        cand_selected_plan[idx].start_time,
        candidate_tz,
      );
      const end_time_diff = compareTimesByMinutesPrec(
        round[round.length - 1].end_time,
        cand_selected_plan[idx].end_time,
        candidate_tz,
      );
      return start_time_diff === 0 && end_time_diff === 0;
    });

    return are_all_rounds_same;
  });

  return filtered_plans;
};
