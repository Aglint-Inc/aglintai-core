import {
  InterviewerSessionRelation,
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewSession,
  RecruiterUserType,
} from '@/src/types/data.types';

export type PauseJson = {
  start_date: string;
  end_date: string;
  isManual: boolean;
};

export type SessionInterviewerType = Pick<
  RecruiterUserType,
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'profile_image'
  | 'schedule_auth'
  | 'scheduling_settings'
  | 'user_id'
> &
  Pick<
    InterviewerSessionRelation,
    | 'training_type'
    | 'session_id'
    | 'interviewer_type'
    | 'interview_module_relation_id'
  > & {
    pause_json: PauseJson;
  };

export type InterviewSessionApiType = {
  session_id: InterviewSession['id'];
  module_id: InterviewSession['module_id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  location: InterviewSession['location'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  qualifiedIntervs: SessionInterviewerType[];
  trainingIntervs: SessionInterviewerType[];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  module_name: InterviewModuleType['name'];
};

export type PlanCombinationType = {
  plan_comb_id: string;
  sessions: SessionCombinationType[];
};

export type SessionCombinationType = InterviewSessionApiType & {
  start_time: string;
  end_time: string;
};

// planCombination reponse types

export type PlanCombinationRespType = {
  plan_comb_id: string;
  sessions: SessionCombinationRespType[];
};

export type SessionCombinationRespType = InterviewSessionApiRespType & {
  start_time: string;
  end_time: string;
};

export type SessionInterviewerApiRespType = Pick<
  RecruiterUserType,
  'first_name' | 'last_name' | 'email' | 'profile_image'
> &
  Pick<
    InterviewerSessionRelation,
    'training_type' | 'interviewer_type' | 'interview_module_relation_id'
  >;

export type InterviewSessionApiRespType = {
  session_id: InterviewSession['id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  qualifiedIntervs: SessionInterviewerApiRespType[];
  trainingIntervs: SessionInterviewerApiRespType[];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  module_name: InterviewModuleType['name'];
};

export type SessionsCombType = {
  slot_comb_id: string;
  slot_cnt: number;
  sessions: SessionSlotType[];
};

export type SessionSlotType = SessionSlotApiRespType & {
  start_time: string;
  end_time: string;
};

export type SessionSlotApiRespType = {
  session_id: InterviewSession['id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  location: InterviewSession['location'];
  module_name: InterviewModuleType['name'];
};

export type InterviewerMeetingScheduled = {
  meeting_start_time: InterviewMeetingTypeDb['start_time'];
  meeting_id: InterviewMeetingTypeDb['id'];
  int_session_id: InterviewSession['id'];
  meeting_duration: InterviewSession['session_duration'];
  interv_user_id: string;
};
