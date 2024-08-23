/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

import type { Request as RequestType } from '@/src/queries/requests/types';

import { getPastProgressToTrigActions } from './getPastProgressToTrigActions';
import { apiTargetToEvents, nextPossibleTrigger } from './progressMaps';
import { RequestLogsActionType } from './types';

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
  eventActions,
}: {
  request_progress: DatabaseTable['request_progress'][];
  request_type: DatabaseTable['request']['type'];
  eventActions: TriggerActionsType[];
}) => {
  const pastProgress = getPastProgressToTrigActions(request_progress);
  const futureProgress = getFutureProgress({
    sorted_request_progress: request_progress,
    request_type,
    eventActions,
  });
  return [...pastProgress, ...futureProgress];
};

export const getFutureProgress = ({
  sorted_request_progress,
  request_type,
  eventActions,
}: {
  sorted_request_progress: DatabaseTable['request_progress'][];
  request_type: DatabaseTable['request']['type'];
  eventActions: TriggerActionsType[];
}) => {
  const triggerMap: TriggerActionsMapType = {};
  eventActions.forEach((event_act) => {
    triggerMap[event_act.trigger] = event_act.workflow_action.map(
      (act) => act.target_api,
    );
  });

  //
  const getSchedulingUpcomingTriggers = (
    currTrigger: DatabaseEnums['workflow_trigger'],
  ): RequestLogsActionType[] => {
    let currTrigActions: RequestLogsActionType[] = [];
    const [schedule_flow] = triggerMap['onRequestSchedule'];
    const currTrigReqWorkflowApis = triggerMap[currTrigger];
    if (!currTrigReqWorkflowApis) {
      // manual
      return [];
    }
    let nextTriggers: DatabaseEnums['workflow_trigger'][] = [];
    if (currTrigger === 'onRequestSchedule') {
      if (!schedule_flow) {
        //manual
      }
      if (
        schedule_flow === 'onRequestSchedule_emailLink_getCandidateAvailability'
      ) {
        const t = apiTargetToEvents[schedule_flow];
        currTrigActions = t.map((l) => ({
          type: l,
          action: null,
          progress: [],
          status: 'not_started',
        }));
      }
      let nextTriggs = ['sendAvailReqReminder', 'onReceivingAvailReq'];
      nextTriggers = (nextPossibleTrigger[currTrigger] ?? []).filter((trig) =>
        nextTriggs.includes(trig),
      );
    } else if (currTrigger === 'onReceivingAvailReq') {
      currTrigActions = currTrigReqWorkflowApis
        .map((api) => {
          return apiTargetToEvents[api];
        })
        .flat()
        .map((l) => ({
          type: l,
          action: null,
          progress: [],
          status: 'not_started',
        }));
      nextTriggers = (nextPossibleTrigger[currTrigger] ?? []).filter(
        (trig) => triggerMap[trig],
      );
    } else if (currTrigger === 'candidateBook') {
      currTrigActions.push({
        type: 'CAND_CONFIRM_SLOT',
        action: null,
        progress: [],
        status: 'not_started',
      });
      let apiActionEvents: RequestLogsActionType[] = currTrigReqWorkflowApis
        .map((api) => {
          return apiTargetToEvents[api];
        })
        .flat()
        .map((l) => ({
          type: l,
          action: null,
          progress: [],
          status: 'not_started',
        }));
      currTrigActions = [...currTrigActions];
      currTrigActions = [
        {
          type: 'CAND_CONFIRM_SLOT',
          action: null,
          progress: [],
          status: 'not_started',
        },
        ...apiActionEvents,
      ];
    }

    for (let trig of nextTriggers) {
      const trigActions = getSchedulingUpcomingTriggers(trig);
      currTrigActions = [...currTrigActions, ...trigActions];
    }
    return currTrigActions;
  };
  let prog: RequestLogsActionType[] = [];

  if (sorted_request_progress.length === 0) {
    if (request_type === 'schedule_request') {
      prog = getSchedulingUpcomingTriggers('onRequestSchedule');
    }
  }
  return prog;
};
