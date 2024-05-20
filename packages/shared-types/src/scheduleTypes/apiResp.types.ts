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

export type InterviewSessionApiRespType = {
  session_id: InterviewSession['id'];
  meeting_id: InterviewSession['meeting_id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  qualifiedIntervs: SessionInterviewerApiRespType[];
  trainingIntervs: SessionInterviewerApiRespType[];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  location: InterviewSession['location'];
  module_name: InterviewModuleType['name'];
};

export type SessionCombinationRespType = InterviewSessionApiRespType & {
  start_time: string;
  end_time: string;
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
