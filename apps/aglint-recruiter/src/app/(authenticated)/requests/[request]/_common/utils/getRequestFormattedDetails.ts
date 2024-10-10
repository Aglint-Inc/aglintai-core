import { type DatabaseTable } from '@aglint/shared-types';
import {
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '@request/components/RequestProgress/types';
import { getSchedulFlow } from '@request/components/RequestProgress/utils/getScheduleFlow';
import { cloneDeep } from 'lodash';

import {
  type getRequestProgress,
  type getRequestWorkflow,
} from '@/queries/requests';

export type RequesProgressMetaType = {
  meta: {
    scheduleFlow: ReturnType<typeof getSchedulFlow>;
    isScheduled: boolean;
    isCandidateAvailabilityReceived: boolean;
    isManualActionNeeded: boolean;
  };
};

export const getRequestFormattedDetails = (
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>,
  request_workflow: Awaited<ReturnType<typeof getRequestWorkflow>>,
) => {
  const requestProgressMeta = getInitialReqData();
  const eventTargetMap: TriggerActionMapType = {};
  request_workflow.forEach((trigger_act) => {
    eventTargetMap[trigger_act.trigger] = [...trigger_act.workflow_action];
  });
  const requestTargetMp: RequestProgressMapType = {};
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
