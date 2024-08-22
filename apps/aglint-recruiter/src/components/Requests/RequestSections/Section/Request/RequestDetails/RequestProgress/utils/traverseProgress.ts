import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { getPastProgressToTrigActions } from './getPastProgressToTrigActions';

type TriggerActionsType =
  RequestType['applications']['public_jobs']['workflow_job_relation'][0]['workflow'];
type TriggerActionsMapType = Partial<
  Record<
    DatabaseEnums['workflow_trigger'],
    DatabaseEnums['email_slack_types'][]
  >
>;
export const traverseProgress = ({
  request_progress,
  request_type,
  event_actions,
}: {
  request_progress: DatabaseTable['request_progress'][];
  request_type: DatabaseTable['request']['type'];
  event_actions: TriggerActionsType[];
}) => {
  const trigger_map: TriggerActionsMapType = {};
  event_actions.forEach((event_act) => {
    trigger_map[event_act.trigger] = event_act.workflow_action.map(
      (act) => act.target_api,
    );
  });
  const pastProgress = getPastProgressToTrigActions(request_progress);
  return pastProgress;
};

// const orderedTriggersForScheduling = [
// 'onRequestSchedule',
// 'selfScheduleReminder'
// 'sendAvailReqReminder',
// 'onReceivingAvailReq',
// 'candidateBook',
// ];

// problem

// when workflow is there
// show one happy flow

const getNextTriggerActionsInSchedule = (
  trigger_map: TriggerActionsMapType,
  curr_action?: DatabaseEnums['email_slack_types'],
): DatabaseEnums['workflow_trigger'][] => {
  if (!curr_action) {
    return ['onRequestSchedule'];
  }
  if (
    curr_action === 'onRequestSchedule_emailLink_getCandidateAvailability' ||
    curr_action === 'sendAvailReqReminder_email_applicant'
  ) {
    return ['sendAvailReqReminder', 'onReceivingAvailReq'];
  }
  if (curr_action === 'selfScheduleReminder_email_applicant') {
    return ['candidateBook'];
  }
};
