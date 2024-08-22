import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { RequestLogsActionType } from './types';
import ScheduleFlows from '@/src/components/Requests/RequestSections/Section/Request/RequestDetails/RequestProgress/Actions/Schedule';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { progressActionMap } from './ProgressActionMap';

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
  const trigger_map: TriggerActionsMapType = {};
  event_actions.forEach((event_act) => {
    trigger_map[event_act.trigger] = event_act.workflow_action.map(
      (act) => act.target_api,
    );
  });
  const pastProgress = getPastProgressToTrigActions(request_progress);

  return pastProgress;
};

const getPastProgressToTrigActions = (
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
