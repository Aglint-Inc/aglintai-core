import {
  type InterviewSessionApiRespType,
  type SessionInterviewerApiRespType,
} from '@aglint/shared-types';

export const sample_interviewer: SessionInterviewerApiRespType = {
  email: 'interviewer@example.com',
  first_name: 'John',
  last_name: 'Doe',
  interview_module_relation_id: 'some_relation_id',
  interviewer_type: 'qualified',
  profile_image: 'https://example.com/profile.jpg',
  training_type: null,
  user_id: 'user_123',
  position: 'Senior Developer',
  int_tz: 'America/New_York',
};

export const sample_session: InterviewSessionApiRespType = {
  break_duration: 30,
  duration: 60,
  interviewer_cnt: 1,
  location: 'some location',
  meeting_id: 'some meeting id',
  module_name: 'some module name',
  session_id: 'some session id',
  session_name: 'some session name',
  session_order: 1,
  day_load_den: 0,
  qualifiedIntervs: [],
  schedule_type: 'phone_call',
  session_type: 'individual',
  trainingIntervs: [],
  week_load_den: 0,
};
