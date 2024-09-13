/* eslint-disable security/detect-possible-timing-attacks */
import { type DatabaseTable } from '@aglint/shared-types';

import { useRequestProgressProvider } from '../progressCtx';
import EventNode from '../ScheduleProgress/EventNode';
import { apiTargetToEvents } from '../utils/progressMaps';

function CandidateCancelled() {
  const { reqProgressMap, reqTriggerActionsMap } = useRequestProgressProvider();

  let workflowActions: DatabaseTable['workflow_action'][] = [];
  if (
    reqTriggerActionsMap['onRequestCancel'] &&
    reqTriggerActionsMap['onRequestCancel'].length > 0
  ) {
    workflowActions = [...reqTriggerActionsMap['onRequestCancel']];
  }

  return (
    <>
      {workflowActions.map((action) => {
        const event = apiTargetToEvents[action.target_api];
        return (
          <EventNode
            currEventTrigger='onRequestCancel'
            eventType={event}
            reqProgresMap={reqProgressMap}
            currWAction={action}
            key={action.id}
            showEditBtns={false}
          />
        );
      })}
      {workflowActions.length === 0 && <>No Actions Set</>}
    </>
  );
}

export default CandidateCancelled;
