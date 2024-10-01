import type {
  DatabaseTable,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import { CApiError, type ProgressLoggerType } from '@aglint/shared-utils';

import { type ScheduleApiDetails } from '../CandidateScheduleV2/types';
import { bookRecruiterSelectedOption } from '../CandidateScheduleV2/utils/bookingUtils/bookRecruiterSelectedOption';
import { fetchCandAvailForBooking } from '../CandidateScheduleV2/utils/bookingUtils/dbFetch/fetchCandidateAvailability';

export const confirmSlotFromCandidateAvailability = async ({
  avail_plans,
  cand_avail_rec,
  cand_schedule_db,
  reqProgressLogger,
  request_id,
}: {
  avail_plans: PlanCombinationRespType[];
  cand_avail_rec: DatabaseTable['candidate_request_availability'];
  cand_schedule_db: ScheduleApiDetails;
  reqProgressLogger: ProgressLoggerType;
  request_id: string;
}) => {
  if (!cand_avail_rec.user_timezone) {
    throw new CApiError('CLIENT', 'User timezone is not available');
  }
  if (avail_plans.every((plan) => plan.no_slot_reasons.length > 0)) {
    const no_slot_reasons = avail_plans
      .map((plan) => plan.no_slot_reasons.map((reason) => reason.reason))
      .flat();

    throw new CApiError(
      'CLIENT',
      'Found following conflicts from candidate availability, ' +
        no_slot_reasons.join(', '),
    );
  }

  const no_conflict_plans = avail_plans.filter(
    (plan) =>
      plan.no_slot_reasons.length === 0 &&
      plan.sessions.every((sesn) => sesn.ints_conflicts.length === 0),
  );

  if (no_conflict_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      'No plans were found without conflicts from candidate availability',
    );
  }

  const plan = no_conflict_plans[0];

  const fetched_cand_details = await fetchCandAvailForBooking({
    availability_req_id: cand_avail_rec.id,
    selectedOption: plan,
    user_tz: cand_avail_rec.user_timezone,
    request_id,
  });
  await bookRecruiterSelectedOption(
    {
      availability_req_id: cand_avail_rec.id,
      selectedOption: plan,
      user_tz: cand_avail_rec.user_timezone,
      request_id,
    },
    cand_schedule_db,
    plan,
    fetched_cand_details,
  );

  await reqProgressLogger({
    log: 'Successfully booked slot from candidate availability',
    status: 'completed',
    is_progress_step: true,
  });
};
