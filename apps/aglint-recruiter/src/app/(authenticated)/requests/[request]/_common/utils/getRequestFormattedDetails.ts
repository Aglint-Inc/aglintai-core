import { type DatabaseTable } from '@aglint/shared-types';
import {
  GroupReqProgress,
  RequesProgressMetaType,
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '@request/components/RequestProgress/types';
import { getSchedulFlow } from '@request/components/RequestProgress/utils/getScheduleFlow';
import { cloneDeep } from 'lodash';

import {
  type getRequestProgress,
  type getRequestWorkflow,
} from '@/queries/requests';

type RequestFormattedDetailsParams = {
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>;
  request_workflow: Awaited<ReturnType<typeof getRequestWorkflow>>;
  is_slack_enabled: boolean;
  is_workflow_enabled: boolean;
};

export const getRequestFormattedDetails = ({
  request_progress,
  request_workflow,
  is_slack_enabled,
  is_workflow_enabled,
}: RequestFormattedDetailsParams) => {
  const requestProgressMeta = getInitialReqData();
  const eventTargetMap: TriggerActionMapType = {};
  request_workflow.forEach((trigger_act) => {
    eventTargetMap[trigger_act.trigger] = [...trigger_act.workflow_action];
  });
  const requestTargetMp: RequestProgressMapType = {};
  const grouped_progress: GroupReqProgress[] =
    groupReqProgress(request_progress);

  request_progress.forEach((row) => {
    const key = row.event_type;
    if (!requestTargetMp[key]) {
      requestTargetMp[key] = [];
    }
    requestTargetMp[key].push({ ...row });
  });
  request_progress.forEach((row) => {
    const key = row.event_type;
    if (!requestTargetMp[key]) {
      requestTargetMp[key] = [];
    }
    requestTargetMp[key].push({ ...row });
  });

  requestProgressMeta.meta.scheduleFlow = getSchedulFlow({
    eventTargetMap,
    requestTargetMp,
  });

  if (
    requestTargetMp['INTERVIEW_SCHEDULED'] &&
    requestTargetMp['INTERVIEW_SCHEDULED'][0].status == 'completed'
  ) {
    requestProgressMeta.meta.isScheduled = true;
  }
  if (
    requestTargetMp['CAND_AVAIL_REC'] &&
    requestTargetMp['CAND_AVAIL_REC'][0].status == 'completed'
  ) {
    requestProgressMeta.meta.isCandidateAvailabilityReceived = true;
  }

  requestProgressMeta.meta.isManualActionNeeded =
    isAnyEventsFailed(request_progress);
  requestProgressMeta.scheduleProgressNodes = getScheduleNodes({
    reqParams: {
      request_progress,
      request_workflow,
      is_slack_enabled,
      is_workflow_enabled,
    },
    scheduleFlow: requestProgressMeta.meta.scheduleFlow,
    requestTargetMp,
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
  };

  return cloneDeep(progressMeta);
};

const isAnyEventsFailed = (
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>,
) => {
  const failingEvent: DatabaseTable['request_progress']['event_type'][] = [
    'SELF_SCHEDULE_LINK',
    'REQ_CAND_AVAIL_EMAIL_LINK',
    'SCHEDULE_INTERVIEW_SLOT_FROM_CANDIDATE_AVAILABILITY',
  ];
  const failedEvents = request_progress.filter(
    (e) =>
      e.is_progress_step === false &&
      e.status === 'failed' &&
      failingEvent.includes(e.event_type),
  );

  return failedEvents.length > 0;
};

type NodesParamsType = {
  reqParams: RequestFormattedDetailsParams;
  scheduleFlow: ReturnType<typeof getSchedulFlow>;
  requestTargetMp: RequestProgressMapType;
  grouped_progress: GroupReqProgress[];
};

const getScheduleNodes = ({
  reqParams,
  requestTargetMp,
  scheduleFlow,
  grouped_progress,
}: NodesParamsType) => {
  const scheduleProgressNodes: RequesProgressMetaType['scheduleProgressNodes'] =
    [];
  const selfScheduleFlow: RequesProgressMetaType['scheduleProgressNodes'][0] = {
    type: 'SELECT_SCHEDULE',
    status: 'not_started',
    grouped_progress: [],
    workflows: [],
    banners: [],
  };
  let idx = 0;
  const headingProgEvents = reqParams.request_progress.filter(
    (p) => p.is_progress_step === false,
  );
  while (idx < headingProgEvents.length) {
    const progress = headingProgEvents[idx];
    if (
      progress.event_type === 'INTERVIEW_SCHEDULED' ||
      progress.event_type === 'CAND_AVAIL_REC'
    ) {
      selfScheduleFlow.status = 'completed';
      break;
    }
    const grouProgress = grouped_progress.find(
      (g) => g.group_id === progress.grouped_progress_id,
    );
    if (grouProgress) {
      selfScheduleFlow.grouped_progress.push(grouProgress);
    }
    if (selfScheduleFlow.grouped_progress.length === 0) {
      console.error('Error in grouping progress');
    }
    idx++;
  }
  scheduleProgressNodes.push(selfScheduleFlow);

  return scheduleProgressNodes;
};

const groupReqProgress = (progress: DatabaseTable['request_progress'][]) => {
  const grouped_progress: GroupReqProgress[] = [];

  if (progress.length === 0) {
    return grouped_progress;
  }
  grouped_progress.push({
    group_id: progress[0].grouped_progress_id,
    heading_progress: progress[0],
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
