import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { ReactNode } from 'react';
import { RequestLogsActionType } from './types';
import ScheduleFlows from '@/src/components/Requests/RequestSections/Section/Request/RequestDetails/RequestProgress/Actions/Schedule';

type TriggerActionsType =
  RequestType['applications']['public_jobs']['workflow_job_relation'][0]['workflow'][];
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
  event_actions: TriggerActionsType;
}) => {
  console.log(request_progress);
  const trigger_map: TriggerActionsMapType = {};
  event_actions.forEach((event_act) => {
    trigger_map[event_act.trigger] = event_act.workflow_action.map(
      (act) => act.target_api,
    );
  });
  let requestLogActions: RequestLogsActionType[] = [];
  if (request_type === 'schedule_request') {
    if (request_progress.length === 0) {
      if (event_actions.length > 0) {
        const onScheduleAction = trigger_map['onRequestSchedule'][0];
        if (
          onScheduleAction ===
          'onRequestSchedule_emailLink_getCandidateAvailability'
        ) {
          requestLogActions.push({
            type: 'REQ_CAND_AVAIL_EMAIL_LINK',
            status: 'not_started',
            progress: [],
            action: null,
          });
          requestLogActions.push({
            type: 'CAND_AVAIL_REC',
            status: 'not_started',
            progress: [],
            action: null,
          });
        }
      } else {
        requestLogActions.push({
          type: 'INIT_SCHEDULE',
          status: 'not_started',
          progress: [],
          action: ScheduleFlows,
        });
      }
    }
  }
  return requestLogActions;
};
