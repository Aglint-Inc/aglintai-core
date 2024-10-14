import { onInsertPublicJobs } from './trigger-funcs/onInsertPublicJobs';
import { onInsertRequestProgress } from './trigger-funcs/onInsertRequestProgress';
import { onUpdateCandidateRequestAvailability } from './trigger-funcs/onUpdateCandidateRequestAvailability';
import { onUpdateInterviewFilterJson } from './trigger-funcs/onUpdateInterviewFilterJson';
import { onUpdateInterviewMeeting } from './trigger-funcs/onUpdateInterviewMeeting';
import { onUpdateInterviewModuleRelation } from './trigger-funcs/onUpdateInterviewModuleRelation';
import { onUpdateInterviewTrainingProgress } from './trigger-funcs/onUpdateInterviewTrainingProgress';
import { onUpdateIntSesnCancel } from './trigger-funcs/onUpdateIntSesnCancel';
import { onUpdateRequestProgress } from './trigger-funcs/onUpdateRequestProgress';

type DBEvents = 'UPDATE' | 'INSERT' | 'DELETE';
export const db_event_triggers: Record<`${DBEvents}_${string}`, any> = {
  UPDATE_interview_meeting: onUpdateInterviewMeeting,
  UPDATE_interview_filter_json: onUpdateInterviewFilterJson,
  UPDATE_request_progress: onUpdateRequestProgress,
  UPDATE_candidate_request_availability: onUpdateCandidateRequestAvailability,
  UPDATE_interview_module_relation: onUpdateInterviewModuleRelation,
  UPDATE_interview_training_progress: onUpdateInterviewTrainingProgress,
  UPDATE_interview_session_cancel: onUpdateIntSesnCancel,
  //insert
  INSERT_request_progress: onInsertRequestProgress,
  INSERT_public_jobs: onInsertPublicJobs,
};
