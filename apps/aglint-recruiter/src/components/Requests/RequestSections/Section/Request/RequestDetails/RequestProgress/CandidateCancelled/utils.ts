import { workflowCopy } from '../utils/copy';

export function getWorkflowText({ status, workflow }:{ status: string; workflow: typeof workflowCopy['CANDIDATE_AVAILABILITY_RE_REQUESTED'] }) {
  return status === `completed`
    ? workflow.past
    : status === `in_progress`
      ? workflow.present
      : workflow.future;
}

