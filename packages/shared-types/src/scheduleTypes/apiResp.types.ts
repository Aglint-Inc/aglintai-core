/**
 * @abstract These types cand  be used to consume in the client side
 *@author Dileep BC
 */

import { InterviewerSessionRelation, RecruiterUserType } from '../data.types';
import { InterviewSessionApiType, SessionInterviewerType } from './types';

export type CalConflictType =
  | 'soft'
  | 'ooo'
  | 'out_of_working_hours'
  | 'week_load_reached'
  | 'day_load_reached'
  | 'day_passed'
  | 'holiday'
  | 'day_off'
  | 'free_time'
  | 'recruiting_blocks'
  | 'cal_event';
export type ConflictReason = {
  conflict_type:
    | CalConflictType
    | 'calender_diconnected'
    | 'interviewer_paused';
  conflict_event: string | null;
  start_time: string | null;
  end_time: string | null;
};
export type InterviwerConflicts = {
  interviewer: Pick<SessionInterviewerApiRespType, 'user_id'>;
  conflict_reasons: ConflictReason[];
};

export type InterviewSessionApiRespType = Pick<
  InterviewSessionApiType,
  | 'session_id'
  | 'meeting_id'
  | 'session_name'
  | 'duration'
  | 'schedule_type'
  | 'break_duration'
  | 'session_type'
  | 'session_order'
  | 'interviewer_cnt'
  | 'location'
  | 'module_name'
> & {
  qualifiedIntervs: SessionInterviewerApiRespType[];
  trainingIntervs: SessionInterviewerApiRespType[];
  week_load_den: number;
  day_load_den: number;
};

export type SessionCombinationRespType = InterviewSessionApiRespType & {
  start_time: string;
  end_time: string;
  ints_conflicts: InterviwerConflicts[];
  is_conflict: boolean;
  conflict_types: ConflictReason['conflict_type'][];
};

export type SessionInterviewerApiRespType = Pick<
  SessionInterviewerType,
  | 'user_id'
  | 'position'
  | 'training_type'
  | 'first_name'
  | 'email'
  | 'int_tz'
  | 'last_name'
  | 'profile_image'
  | 'interviewer_module_relation_id'
>;

// planCombination reponse types
export type PlanCombinationRespType = {
  plan_comb_id: string;
  sessions: SessionCombinationRespType[];
  no_slot_reasons: {
    reason: string;
  }[];
};

export type DateRangePlansType = {
  interview_start_day: string;
  interview_rounds: {
    curr_date: string;
    plans: PlanCombinationRespType[];
  }[];
};

export type CandReqSlotsType = {
  current_round: number;
  selected_dates: {
    curr_date: string;
    plans: PlanCombinationRespType[];
  }[];
};

export type MultiDayPlanType = {
  date_range: string[]; // [july 9, july 10]
  plans: PlanCombinationRespType[];
};
