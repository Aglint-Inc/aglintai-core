import { onInsertCandidateRequestAvailability } from './trigger-funcs/onInsertCandidateRequestAvailability';
import { onInsertInterviewFilterJson } from './trigger-funcs/onInsertInterviewFilterJson';
import { onInsertInterviewSessionCancel } from './trigger-funcs/onInsertInterviewSessionCancel';
import { onInsertRequest } from './trigger-funcs/onInsertRequest';
import { onInsertWorkflowActionLogs } from './trigger-funcs/onInsertWorkflowActionLogs';
import { onUpdateCandidateRequestAvailability } from './trigger-funcs/onUpdateCandidateRequestAvailability';
import { onUpdateInterviewFilterJson } from './trigger-funcs/onUpdateInterviewFilterJson';
import { onUpdateInterviewMeeting } from './trigger-funcs/onUpdateInterviewMeeting';
import { onUpdateInterviewModuleRelation } from './trigger-funcs/onUpdateInterviewModuleRelation';
import { onUpdateInterviewTrainingProgress } from './trigger-funcs/onUpdateInterviewTrainingProgress';
import { onUpdateRequest } from './trigger-funcs/onUpdateRequest';

type DBEvents = 'UPDATE' | 'INSERT' | 'DELETE';
export const db_event_triggers: Record<`${DBEvents}_${string}`, any> = {
  UPDATE_interview_meeting: onUpdateInterviewMeeting,
  UPDATE_request: onUpdateRequest,
  INSERT_interview_filter_json: onInsertInterviewFilterJson,
  UPDATE_interview_filter_json: onUpdateInterviewFilterJson,
  INSERT_candidate_request_availability: onInsertCandidateRequestAvailability,
  UPDATE_candidate_request_availability: onUpdateCandidateRequestAvailability,
  UPDATE_interview_module_relation: onUpdateInterviewModuleRelation,
  UPDATE_interview_training_progress: onUpdateInterviewTrainingProgress,
  INSERT_workflow_action_logs: onInsertWorkflowActionLogs,
  INSERT_interview_session_cancel: onInsertInterviewSessionCancel,
  INSERT_request: onInsertRequest,
};
