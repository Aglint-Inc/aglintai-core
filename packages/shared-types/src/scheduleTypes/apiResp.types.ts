/**
 * @abstract These types cand  be used to consume in the client side
 *@author Dileep BC
 */

import {
  InterviewerSessionRelation,
  InterviewModuleType,
  InterviewSession,
  RecruiterUserType,
} from '../data.types';
import { InterviewSessionApiType } from './types';

export type ConflictReason = 'interviewer_paused' | 'out_of_office';
export type InterviwerConflicts = {
  interviewer: Pick<SessionInterviewerApiRespType, 'user_id'>;
  conflict_reasons: ConflictReason[];
};

export type SlotConflictType = {
  is_conflict_free: boolean;
  ints_conflicts: InterviwerConflicts[];
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
  slot_conflict_info: SlotConflictType;
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
