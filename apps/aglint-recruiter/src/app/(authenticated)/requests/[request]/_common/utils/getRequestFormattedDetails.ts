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
    },
    requestprogMp: progWfMp.requestProgMp,
    requestTargetMp: progWfMp.eventTargetMap,
    scheduleFlow: requestProgressMeta.meta.scheduleFlow,
  });

  return requestProgressMeta;
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

type NodesParamsType = {
  reqParams: RequestFormattedDetailsParams;
  scheduleFlow: ReturnType<typeof getSchedulFlow>;
  requestprogMp: RequestProgressMapType;
  requestTargetMp: TriggerActionMapType;
  grouped_progress: GroupReqProgress[];
};

const getScheduleNodes = ({
  reqParams,
  scheduleFlow,
  grouped_progress,
  requestTargetMp,
}: NodesParamsType) => {
  const scheduleProgressNodes: RequesProgressMetaType['scheduleProgressNodes'] =
    [];

  const getSelectScheduleFlow = () => {
    const selectScheduleFlow: RequesProgressMetaType['scheduleProgressNodes'][0] =
      {
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
        selectScheduleFlow.status = 'completed';
        break;
      }
      const grouProgress = grouped_progress.find(
        (g) => g.group_id === progress.grouped_progress_id,
      );
      if (grouProgress) {
        selectScheduleFlow.grouped_progress.push(grouProgress);
      }
      if (selectScheduleFlow.grouped_progress.length === 0) {
        console.error('Error in grouping progress');
      }
      idx++;
    }

    if (scheduleFlow === null && reqParams.is_workflow_enabled) {
      selectScheduleFlow.banners.push('CHOOSE_SCHEDULE_FLOW');
    }

    if (
      requestTargetMp['onRequestSchedule'] &&
      requestTargetMp['onRequestSchedule'].actions.length > 0
    ) {
      selectScheduleFlow.workflows.push({
        ...requestTargetMp['onRequestSchedule'],
      });
    }

    if (scheduleFlow === 'selfSchedule') {
      if (
        requestTargetMp['selfScheduleReminder'] &&
        requestTargetMp['selfScheduleReminder'].actions.length > 0
      ) {
        selectScheduleFlow.workflows.push({
          ...requestTargetMp['selfScheduleReminder'],
        });
      } else {
        selectScheduleFlow.banners.push('SELFSCHEDULE_REMINDER');
      }
    } else if (scheduleFlow === 'availability') {
      if (
        requestTargetMp['sendAvailReqReminder'] &&
        requestTargetMp['sendAvailReqReminder'].actions.length > 0
      ) {
        selectScheduleFlow.workflows.push({
          ...requestTargetMp['sendAvailReqReminder'],
        });
      } else {
        selectScheduleFlow.banners.push('AVAILABILITY_REMINDER');
      }
    }

    return selectScheduleFlow;
  };

  scheduleProgressNodes.push(getSelectScheduleFlow());

  return scheduleProgressNodes;
};

// inlint utils
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
    reqProgressMp['INTERVIEW_SCHEDULED'] &&
    reqProgressMp['INTERVIEW_SCHEDULED'][0].status == 'completed'
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
