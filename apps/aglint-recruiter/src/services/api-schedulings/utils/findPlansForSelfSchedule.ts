import {
  type PlanCombinationRespType,
  type SessionInterviewerType,
} from '@aglint/shared-types';
import { CApiError, getFullName } from '@aglint/shared-utils';

import { CandidatesScheduling } from '../../CandidateSchedule/CandidatesScheduling';
import { extractPreferredInterviewers } from '../textTransforms/extractPreferredInterviewers';
import { selfScheduleLinkInstruction } from '../textTransforms/selfScheduleLinkInstruction';
import { filterPlanCombsWithAgentResp } from './filterPlanCombsWithAgentResp';

export const findPlansForSelfSchedule = async ({
  date_range,
  recruiter_id,
  session_ids,
  time_zone,
  agent_instruction,
}: {
  recruiter_id: string;
  date_range: { start_date_str: string; end_date_str: string };
  session_ids: string[];
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
      show_soft_conflicts: true,
    },
    return_empty_slots_err: false,
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

  const date_range_slots = cand_schedule.findAvailabilitySlotsDateRange();
  if (date_range_slots.length === 0) {
    throw new CApiError(
      'CLIENT',
      'unable to find slots , Please Schedule manually .',
    );
  }
  if (date_range_slots[0].interview_rounds.length > 1) {
    throw new CApiError(
      'CLIENT',
      'Automation does not support multi day plans for now. Please use the app to schedule the interview.',
    );
  }
  const flattened_plans = date_range_slots
    .map((curr_date) => {
      return curr_date.interview_rounds[0].plans;
    })
    .flat();

  const agent_instruction_slots = filterPlanCombsWithAgentResp({
    ai_response: formatted_ai_reponse,
    flattened_plans: flattened_plans,
    preferred_interviewers: preferredInterviewers,
    time_zone: time_zone,
  });

  return agent_instruction_slots;
};
