import { type DatabaseTable } from '@aglint/shared-types';
import {
  type GroupReqProgress,
  type RequesProgressMetaType,
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '@request/components/RequestProgress/types';
import { getSchedulFlow } from '@request/components/RequestProgress/utils/getScheduleFlow';
import { cloneDeep } from 'lodash';

import {
  type getRequestProgress,
  type getRequestWorkflow,
} from '@/queries/requests';

import { getScheduleNodes } from './formattedProg/schedule';

type RequestFormattedDetailsParams = {
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>;
  request_workflow: Awaited<ReturnType<typeof getRequestWorkflow>>;
  is_slack_enabled: boolean;
  is_workflow_enabled: boolean;
  requestDetails: DatabaseTable['request'];
};

export const getRequestFormattedDetails = ({
  request_progress,
  request_workflow,
  is_slack_enabled,
  is_workflow_enabled,
  requestDetails,
}: RequestFormattedDetailsParams) => {
  const requestProgressMeta = getInitialReqData();
  const progWfMp = getProgWfMaps({ request_progress, request_workflow });
  const grouped_progress: GroupReqProgress[] =
    groupReqProgress(request_progress);

  requestProgressMeta.meta = getProgressMeta({
    reqProgressMp: progWfMp.requestProgMp,
    triggerActionMp: progWfMp.eventTargetMap,
  });

  requestProgressMeta.scheduleProgressNodes = getScheduleNodes({
    grouped_progress,
    reqParams: {
      is_slack_enabled,
      is_workflow_enabled,
      request_progress,
      request_workflow,
      requestDetails,
    },
    requestprogMp: progWfMp.requestProgMp,
    requestTargetMp: progWfMp.eventTargetMap,
    scheduleFlow: requestProgressMeta.meta.scheduleFlow,
  });

  requestProgressMeta.nextStep = getReqNextStep({
    requestprogMp: progWfMp.requestProgMp,
    requestTargetMp: progWfMp.eventTargetMap,
    scheduleFlow: requestProgressMeta.meta.scheduleFlow,
    reqParams: {
      is_slack_enabled,
      is_workflow_enabled,
      request_progress,
      request_workflow,
      requestDetails,
    },
    grouped_progress,
  });

  return requestProgressMeta;
};

const getInitialReqData = () => {
  const progressMeta: RequesProgressMetaType = {
    meta: {
      scheduleFlow: null,
      isScheduled: false,
      isCandidateAvailabilityReceived: false,
      isManualActionNeeded: true,
    },
    scheduleProgressNodes: [],
    nextStep: null,
  };

  return cloneDeep(progressMeta);
};

const getProgWfMaps = ({
  request_progress,
  request_workflow,
}: Pick<
  RequestFormattedDetailsParams,
  'request_progress' | 'request_workflow'
>) => {
  const requestProgMp: RequestProgressMapType = {};
  const eventTargetMap: TriggerActionMapType = {};
  request_progress.forEach((row) => {
    const key = row.event_type;
    if (!requestProgMp[key]) {
      requestProgMp[key] = [];
    }
    requestProgMp[key].push({ ...row });
  });

  request_workflow.forEach((trigger_act) => {
    const trigger = trigger_act.trigger;
    eventTargetMap[trigger] = {
      trigger_details: trigger_act,
      actions: trigger_act.workflow_action ?? [],
    };
  });

  return {
    requestProgMp,
    eventTargetMap,
  };
};

const getProgressMeta = ({
  reqProgressMp,
  triggerActionMp,
}: {
  reqProgressMp: RequestProgressMapType;
  triggerActionMp: TriggerActionMapType;
}) => {
  const meta: RequesProgressMetaType['meta'] = {
    scheduleFlow: null,
    isScheduled: false,
    isCandidateAvailabilityReceived: false,
    isManualActionNeeded: false,
  };

  if (
    (reqProgressMp['CAND_CONFIRM_SLOT'] &&
      reqProgressMp['CAND_CONFIRM_SLOT'][0].status == 'completed') ||
    (reqProgressMp['RECRUITER_SCHEDULED'] &&
      reqProgressMp['RECRUITER_SCHEDULED'][0].status == 'completed')
  ) {
    meta.isScheduled = true;
  }
  if (
    reqProgressMp['CAND_AVAIL_REC'] &&
    reqProgressMp['CAND_AVAIL_REC'][0].status == 'completed'
  ) {
    meta.isCandidateAvailabilityReceived = true;
  }
  meta.scheduleFlow = getSchedulFlow({
    eventTargetMap: triggerActionMp,
    requestProgMp: reqProgressMp,
  });
  return meta;
};

// inlint utils
const groupReqProgress = (progress: DatabaseTable['request_progress'][]) => {
  const grouped_progress: GroupReqProgress[] = [];

  if (progress.length === 0) {
    return grouped_progress;
  }
  grouped_progress.push({
    group_id: progress[0].grouped_progress_id,
    heading_progress: progress[0], // should be heading arr
    detail_progress: [],
  });

  for (let i = 1; i < progress.length; i++) {
    const row = progress[i];
    if (
      grouped_progress[grouped_progress.length - 1].group_id ===
        row.grouped_progress_id &&
      row.is_progress_step === true
    ) {
      grouped_progress[grouped_progress.length - 1].detail_progress.push({
        ...row,
      });
    } else if (
      grouped_progress[grouped_progress.length - 1].group_id !==
        row.grouped_progress_id &&
      row.is_progress_step === false
    ) {
      grouped_progress.push({
        group_id: row.grouped_progress_id,
        heading_progress: { ...row },
        detail_progress: [],
      });
    } else {
      console.error('Error in grouping progress');
    }
  }

  return grouped_progress;
};

export type ReqNodesParamsType = {
  reqParams: RequestFormattedDetailsParams;
  scheduleFlow: ReturnType<typeof getSchedulFlow>;
  requestprogMp: RequestProgressMapType;
  requestTargetMp: TriggerActionMapType;
  grouped_progress: GroupReqProgress[];
};

const getReqNextStep = ({
  requestTargetMp,
  scheduleFlow,
  reqParams,
  grouped_progress,
  requestprogMp,
}: Pick<
  ReqNodesParamsType,
  | 'requestprogMp'
  | 'scheduleFlow'
  | 'requestTargetMp'
  | 'reqParams'
  | 'grouped_progress'
>) => {
  let nextStep: RequesProgressMetaType['nextStep'] = null;
  if (scheduleFlow === null) {
    nextStep = 'CHOOSE_SCHEDULE_MODE';
  }
  const lastProgressEvent =
    grouped_progress.length === 0
      ? null
      : grouped_progress[grouped_progress.length - 1].heading_progress;

  if (lastProgressEvent) {
    if (lastProgressEvent.event_type === 'CAND_AVAIL_REC') {
      if (!requestTargetMp['onReceivingAvailReq']) {
        nextStep = 'CAND_AVAIL_RECIEVED';
      }
    } else if (
      lastProgressEvent.event_type === 'SELF_SCHEDULE_LINK' &&
      lastProgressEvent.status === 'failed'
    ) {
      if (requestprogMp['CAND_AVAIL_REC']) {
        nextStep = 'CAND_AVAIL_RECIEVED';
      } else {
        nextStep = 'CHOOSE_SCHEDULE_MODE';
      }
    } else if (
      lastProgressEvent.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK' &&
      lastProgressEvent.status === 'failed'
    ) {
      nextStep = 'CHOOSE_SCHEDULE_MODE';
    }
  } else if (
    reqParams.requestDetails.status === 'to_do' &&
    requestTargetMp['onRequestSchedule'] &&
    requestTargetMp['onRequestSchedule'].actions.length > 0
  ) {
    nextStep = 'REQUEST_PROCEED';
  }

  if (
    reqParams.requestDetails.type === 'decline_request' &&
    reqParams.requestDetails.status === 'to_do'
  ) {
    nextStep = 'SCHEDULE_DEBRIEF';
  }

  return nextStep;
};
