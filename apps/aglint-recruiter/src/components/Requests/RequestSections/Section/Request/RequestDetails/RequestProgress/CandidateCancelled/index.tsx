/* eslint-disable security/detect-possible-timing-attacks */
import { DatabaseEnums } from '@aglint/shared-types';
import { useState } from 'react';

import { useRequest } from '@/src/context/RequestContext';

import { apiTargetToEvents } from '../utils/progressMaps';
import RequestProgressWrapper from './Components/RequestProgressWrapper';
import { ProgressDataItem } from './types';
import { handleClick, useEventTargetMap, useReqProgressMap } from './utils';

function CandidateCancelled() {
  const { requestDetails, request_progress, request_workflow } = useRequest();
  const [manualEvents] = useState<DatabaseEnums['email_slack_types'][]>([
    'onRequestCancel_agent_cancelEvents',
    'onRequestCancel_slack_interviewersOrganizer',
  ]);

  const isManualFlow = request_workflow.data.length === 0;
  const eventTargetMap = useEventTargetMap(request_workflow.data);
  const reqProgressMap = useReqProgressMap(request_progress.data);

  const events = isManualFlow ? manualEvents : eventTargetMap.onRequestCancel;
  const EventProgress = events.map((api) => {
    const eventType = apiTargetToEvents[api][0];
    const requestProgress = reqProgressMap[eventType]?.find(
      (row) => !row.is_progress_step,
    );

    return {
      eventType,
      api,
      requestProgress,
      isManualFlow,
      handleClick: () => handleClick(api, requestDetails),
    };
  });

  const requestProgressData = [
    {
      id: 'cancel_request',
      isDividerVisible: false,
      textRequestProgress: 'Cancel request received from the candidate',
      indicator: 'error',
      circleIndicator: 'error',
      slotIndicator: null,
      eventProgress: EventProgress,
      addActionButton: false,
    },
  ] as ProgressDataItem[];

  return (
    <RequestProgressWrapper
      progressData={requestProgressData}
      EventProgress={EventProgress}
    />
  );
}

export default CandidateCancelled;
