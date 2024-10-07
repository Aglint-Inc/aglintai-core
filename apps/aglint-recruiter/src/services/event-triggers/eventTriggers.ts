import { onInsertInterviewSessionCancel } from './trigger-funcs/onInsertInterviewSessionCancel';
import { onInsertPublicJobs } from './trigger-funcs/onInsertPublicJobs';
import { onInsertRequest } from './trigger-funcs/onInsertRequest';
import { onInsertRequestProgress } from './trigger-funcs/onInsertRequestProgress';
import { onInsertWorkflowActionLogs } from './trigger-funcs/onInsertWorkflowActionLogs';
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
  INSERT_workflow_action_logs: onInsertWorkflowActionLogs,
  INSERT_interview_session_cancel: onInsertInterviewSessionCancel,
  INSERT_request: onInsertRequest,
  UPDATE_interview_session_cancel: onUpdateIntSesnCancel,
  INSERT_request_progress: onInsertRequestProgress,
  INSERT_public_jobs: onInsertPublicJobs,
};
