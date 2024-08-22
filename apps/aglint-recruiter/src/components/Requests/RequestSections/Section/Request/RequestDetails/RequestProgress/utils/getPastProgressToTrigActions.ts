import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { progressActionMap } from './ProgressActionMap';
import { RequestLogsActionType } from './types';

export const getPastProgressToTrigActions = (
  request_progress: DatabaseTable['request_progress'][],
) => {
  const sorted_progress = request_progress.sort(
    (p1, p2) =>
      dayjsLocal(p1.created_at).unix() - dayjsLocal(p2.created_at).unix(),
  );
  let pastProg: RequestLogsActionType[] = [];
  let pIdx = -1;
  let currIdx = 0;
  while (currIdx < sorted_progress.length) {
    if (pIdx === -1) {
      pastProg.push({
        type: sorted_progress[currIdx].event_type,
        progress: [],
        status: sorted_progress[currIdx].status,
        action:
          progressActionMap[
            `${sorted_progress[currIdx].event_type}_${sorted_progress[currIdx].status}`
          ],
      });
      pIdx++;
    }
    if (pastProg[pIdx].type === sorted_progress[currIdx].event_type) {
      pastProg[pIdx].status = sorted_progress[currIdx].status;
      pastProg[pIdx].progress.push({
        ...sorted_progress[currIdx],
      });
    } else {
      pastProg.push({
        type: sorted_progress[currIdx].event_type,
        action:
          progressActionMap[
            `${sorted_progress[currIdx].event_type}_${sorted_progress[currIdx].status}`
          ],
        progress: [],
        status: sorted_progress[currIdx].status,
      });
    }
    currIdx++;
  }
  return pastProg;
};
