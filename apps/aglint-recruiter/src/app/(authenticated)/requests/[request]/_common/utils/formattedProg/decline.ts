import { type DatabaseTable } from '@aglint/shared-types';
import {
  type GroupReqProgress,
  type ProgressNodeParams,
  type RequestDeclineProgressMetaType,
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '@request/components/RequestProgress/types';
import { cloneDeep } from 'lodash';

import { type RequestDeclineFormattedDetailsParams } from '../types';
import { type ReqNodesParamsType } from './schedule';
import { getProgWfMaps, groupReqProgress } from './utils';

export const getDeclineRequestFormattedDetails = ({
  request_progress,
  request_workflow,
}: RequestDeclineFormattedDetailsParams) => {
  const requestDeclineProgressMeta = getInitialReqData();
  const progWfMp = getProgWfMaps({ request_progress, request_workflow });
  const grouped_progress: GroupReqProgress[] =
    groupReqProgress(request_progress);

  const meta = getProgressMeta({
    reqProgressMp: progWfMp.requestProgMp,
    triggerActionMp: progWfMp.eventTargetMap,
    request_progress,
  });

  requestDeclineProgressMeta.meta = meta.meta;
  requestDeclineProgressMeta.nextStep = meta.nextStep;
  requestDeclineProgressMeta.progressNodes = getNodes({
    grouped_progress,
    requestprogMp: progWfMp.requestProgMp,
    requestTargetMp: progWfMp.eventTargetMap,
  });
  return requestDeclineProgressMeta;
};

const getNodes = ({
  grouped_progress,
  requestprogMp,
  requestTargetMp,
}: Pick<
  ReqNodesParamsType,
  'grouped_progress' | 'requestTargetMp' | 'requestprogMp'
>) => {
  const progressNodes: RequestDeclineProgressMetaType['progressNodes'] = [];
  const node: ProgressNodeParams = {
    type: 'INTERVIEWER_DECLINE',
    banners: [],
    grouped_progress: grouped_progress,
    status: 'not_started',
    workflows: [],
  };
  progressNodes.push(node);
  if (grouped_progress.length > 0) {
    node.status = grouped_progress[0].heading_progress.status;
  }

  if (node.status == 'completed') {
    return progressNodes;
  }
  if (!requestprogMp['REPLACE_ALTERNATIVE_INTERVIEWER']) {
    if (
      requestTargetMp['onRequestInterviewerDecline'] &&
      requestTargetMp['onRequestInterviewerDecline'].actions.length > 0
    ) {
      node.workflows.push({
        ...requestTargetMp['onRequestInterviewerDecline'],
      });
    } else {
      node.banners.push('INTERVIEWER_DECLINE');
    }
  }
  return progressNodes;
};

const getInitialReqData = () => {
  const progressMeta: RequestDeclineProgressMetaType = {
    meta: {
      isInterviewerChangeFailed: false,
    },
    progressNodes: [],
    nextStep: null,
  };

  return cloneDeep(progressMeta);
};

const getProgressMeta = ({
  triggerActionMp,
  request_progress,
}: {
  reqProgressMp: RequestProgressMapType;
  request_progress: DatabaseTable['request_progress'][];
  triggerActionMp: TriggerActionMapType;
}) => {
  const meta: RequestDeclineProgressMetaType['meta'] = {
    isInterviewerChangeFailed: false,
  };
  let nextStep: RequestDeclineProgressMetaType['nextStep'] = null;

  if (
    triggerActionMp['onRequestInterviewerDecline'] &&
    triggerActionMp['onRequestInterviewerDecline'].actions.length > 0
  ) {
    nextStep = 'REQUEST_PROCEED';
  } else {
    nextStep = 'MANUAL';
  }
  const heading = request_progress.find(
    (p) =>
      !p.is_progress_step && p.event_type === 'REPLACE_ALTERNATIVE_INTERVIEWER',
  );
  if (heading) {
    meta.isInterviewerChangeFailed = heading.status === 'failed';
    nextStep = 'MANUAL';
  }
  return { meta, nextStep };
};
