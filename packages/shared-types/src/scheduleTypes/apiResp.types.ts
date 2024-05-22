/**
 * @abstract These types cand  be used to consume in the client side
 *@author Dileep BC
 */

import { InterviewerSessionRelation, RecruiterUserType } from '../data.types';
import { InterviewSessionApiType } from './types';

export type ConflictReason = {
  conflict_type:
    | 'soft'
    | 'hard'
    | 'ooo'
    | 'calender_diconnected'
    | 'interviewer_paused';
  conflict_event: string;
  start_time: string;
  end_time: string;
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
};

export type SessionCombinationRespType = InterviewSessionApiRespType & {
  start_time: string;
  end_time: string;
  ints_conflicts: InterviwerConflicts[];
  is_conflict_free: boolean;
};

export type SessionInterviewerApiRespType = Pick<
  RecruiterUserType,
  'first_name' | 'last_name' | 'email' | 'profile_image' | 'user_id'
> &
  Pick<
    InterviewerSessionRelation,
    'training_type' | 'interviewer_type' | 'interview_module_relation_id'
  >;
// planCombination reponse types
export type PlanCombinationRespType = {
  plan_comb_id: string;
  sessions: SessionCombinationRespType[];
};
