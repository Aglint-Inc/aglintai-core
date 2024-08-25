/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';

import type { Request as RequestType } from '@/src/queries/requests/types';

import { getPastProgressToTrigActions } from './getPastProgressToTrigActions';
import { progressActionMap } from './ProgressActionMap';
import { apiTargetToEvents, nextPossibleTrigger } from './progressMaps';
import { RequestLogsActionType } from './types';

type TriggerActionsType =
  RequestType['applications']['public_jobs']['workflow_job_relation'][0]['workflow'];
type TriggerActionsMapType = Map<
  DatabaseEnums['workflow_trigger'],
  DatabaseEnums['email_slack_types'][]
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
  const sorted_request_progress = request_progress.sort((p1, p2) => {
    return dayjsLocal(p1.created_at).unix() - dayjsLocal(p2.created_at).unix();
  });
  const pastProgress = getPastProgressToTrigActions(request_progress);
  const futureProgress = getFutureProgress({
    sorted_request_progress,
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
  const getSchedulingUpcomingTriggers = (
    currTrigger: DatabaseEnums['workflow_trigger'],
    triggerMap: TriggerActionsMapType,
  ): RequestLogsActionType[] => {
    let eventActions: RequestLogsActionType[] = [];
    let nextTriggers: DatabaseEnums['workflow_trigger'][] = [];
    if (
      currTrigger === 'onRequestSchedule' &&
      !triggerMap['onRequestSchedule']
    ) {
      eventActions.push({
        type: 'CHOOSE_SCHEDULE_FLOW',
        action: progressActionMap['CHOOSE_SCHEDULE_FLOW_not_started'],
        progress: [],
        status: 'not_started',
      });
      if (!Object.keys(triggerMap).includes('candidateBook')) {
        nextTriggers = ['candidateBook'];
      }
    }

    if (currTrigger === 'onRequestSchedule') {
      const [scheduleFlow] = triggerMap.get(currTrigger) ?? [];
      if (
        scheduleFlow === 'onRequestSchedule_emailLink_getCandidateAvailability'
      ) {
        if (!Object.keys(triggerMap).includes('onReceivingAvailReq')) {
          nextTriggers.push('onReceivingAvailReq');
        }
      }
    }
    if (currTrigger === 'onReceivingAvailReq') {
      eventActions.push({
        type: 'CAND_AVAIL_REC',
        status: 'not_started',
        action: null,
        progress: [],
      });
      if (!triggerMap[currTrigger]) {
        eventActions.push({
          type: 'CHOOSE_SCHEDULE_FLOW',
          action: progressActionMap['CHOOSE_SCHEDULE_FLOW_not_started'],
          progress: [],
          status: 'not_started',
        });
      }
      if (
        triggerMap[currTrigger] &&
        triggerMap[currTrigger].includes(
          'onReceivingAvailReq_agent_sendSelfScheduleRequest',
        )
      ) {
        nextTriggers.push('candidateBook');
      }
    }
    if (currTrigger === 'candidateBook') {
      eventActions.push({
        type: 'CAND_CONFIRM_SLOT',
        action: null,
        progress: [],
        status: 'not_started',
      });
    }

    const endPoints = triggerMap[currTrigger];
    if (endPoints) {
      const currApiEvActions: RequestLogsActionType[] = endPoints
        .map((ev) => apiTargetToEvents[ev])
        .flat()
        .map((ev) => ({
          status: 'not_started',
          type: ev,
          action: null,
          progress: [],
        }));
      eventActions = [...eventActions, ...currApiEvActions];
    }

    nextTriggers = [
      ...nextTriggers,
      ...nextPossibleTrigger[currTrigger].filter((t) => triggerMap[t]),
    ];
    console.log(nextTriggers);

    for (let trig of nextTriggers) {
      const trigEventActions = getSchedulingUpcomingTriggers(trig, triggerMap);
      eventActions = [...eventActions, ...trigEventActions];
    }
    return eventActions;
  };
  let prog: RequestLogsActionType[] = [];
  const triggerMap: TriggerActionsMapType = new Map();
  eventActions.forEach((event_act) => {
    triggerMap[event_act.trigger] = event_act.workflow_action.map(
      (act) => act.target_api,
    );
  });
  let nextTrigger: DatabaseEnums['workflow_trigger'];
  if (request_type === 'schedule_request') {
    nextTrigger = getNextTriggerNewSchedule(sorted_request_progress);
  }
  prog = getSchedulingUpcomingTriggers(nextTrigger, triggerMap);

  return prog;
};

export const getNextTriggerNewSchedule = (
  request_progress: DatabaseTable['request_progress'][],
): DatabaseEnums['workflow_trigger'] => {
  let nextTrigger: DatabaseEnums['workflow_trigger'];
  if (request_progress.length === 0) {
    return 'onRequestSchedule';
  }
  const lastEvent = request_progress[request_progress.length - 1].event_type;
  let target_api: DatabaseEnums['email_slack_types'];
  Object.keys(apiTargetToEvents).forEach((key) => {
    if (apiTargetToEvents[key].includes(lastEvent)) {
      target_api = key as any;
    }
  });
  if (target_api.startsWith('onRequestSchedule')) {
    if (target_api === 'onRequestSchedule_emailLink_getCandidateAvailability') {
      nextTrigger = 'onReceivingAvailReq';
    }
  }
  return nextTrigger;
};
