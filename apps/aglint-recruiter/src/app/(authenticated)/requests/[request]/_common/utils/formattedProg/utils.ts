import { type DatabaseTable } from '@aglint/shared-types';
import {
  type GroupReqProgress,
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '@request/components/RequestProgress/types';

import { type RequestFormattedDetailsParams } from '../types';

// inlint utils
export const getProgWfMaps = ({
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

export const groupReqProgress = (
  progress: DatabaseTable['request_progress'][],
) => {
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
