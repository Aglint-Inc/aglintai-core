import {
  type DatabaseTable,
  type SessionInterviewerType,
} from '@aglint/shared-types';
import { CApiError, getFullName } from '@aglint/shared-utils';
import { type ProgressLoggerType } from '@aglint/shared-utils/src/request-workflow/utils';

import { CandidatesScheduling } from '../../CandidateSchedule/CandidatesScheduling';
import { extractPreferredInterviewers } from '../textTransforms/extractPreferredInterviewers';
import { selfScheduleLinkInstruction } from '../textTransforms/selfScheduleLinkInstruction';
import { filterPlanCombsWithAgentResp } from './filterPlanCombsWithAgentResp';

export const findCandSelectedSlots = async ({
  cand_avail,
  time_zone,
  agent_instruction,
  date_range,
  company_id,
  session_ids,
}: {
  cand_avail: DatabaseTable['candidate_request_availability']['slots'];
  reqProgressLogger: ProgressLoggerType;
  time_zone: string;
  agent_instruction: string;
  date_range: { start_date_str: string; end_date_str: string };
  company_id: string;
  session_ids: string[];
}) => {
  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      show_soft_conflicts: true,
      out_of_working_hrs: true,
      out_of_office: false,
    },
    return_empty_slots_err: true,
  });
  await cand_schedule.fetchDetails({
    params: {
      session_ids,
      start_date_str: date_range.start_date_str,
      end_date_str: date_range.end_date_str,
      company_id: company_id,
      req_user_tz: time_zone,
    },
  });
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }
  const cand_picked_slots = cand_schedule.getCandidateSelectedSlots(cand_avail);

  if (cand_picked_slots.length === 0) {
    throw new CApiError(
      'CLIENT',
      'No Matching Slots Found from candidate availability.',
    );
  }
  if (cand_picked_slots.length > 1) {
    throw new CApiError(
      'CLIENT',
      'Automation does not support multi day plans for now. Please use the app to schedule the interview.',
    );
  }
  const single_round_flattended_plans =
    cand_picked_slots[0].selected_dates.flatMap((date) => date.plans);

  const all_inters: (Pick<SessionInterviewerType, 'user_id'> & {
    full_name: string;
  })[] = cand_schedule.db_details.all_inters.map((int) => ({
    user_id: int.user_id,
    full_name: getFullName(int.first_name, int.last_name),
  }));
  const formatted_ai_reponse = await selfScheduleLinkInstruction({
    instruction: agent_instruction,
    user_tz: time_zone,
    default_preferred_dates: {
      startDate: date_range.start_date_str,
      endDate: date_range.end_date_str,
    },
  });

  const preferred_interviewers = await extractPreferredInterviewers({
    agent_instruction: agent_instruction,
    interviewer: {
      interviewers: all_inters,
    },
  });

  const selected_slots = filterPlanCombsWithAgentResp({
    ai_response: formatted_ai_reponse,
    flattened_plans: single_round_flattended_plans,
    preferred_interviewers,
    time_zone: time_zone,
  });

  return selected_slots;
};
