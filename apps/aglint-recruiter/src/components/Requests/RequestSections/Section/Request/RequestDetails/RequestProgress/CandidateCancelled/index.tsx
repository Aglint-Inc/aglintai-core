import { useMemo } from 'react';

import { RequestProgress } from '@/devlink2/RequestProgress';
import { ScheduleProgress } from '@/devlink2/ScheduleProgress';
import { useRequest } from '@/src/context/RequestContext';

import { SlackIcon } from '../../Components/SlackIcon';
import { EventTargetMapType, RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';
import { apiTargetToEvents } from '../utils/progressMaps';
import { getWorkflowText } from './utils';

function CandidateCancelled() {
  const { request_progress, request_workflow } = useRequest();
  const eventTargetMap = useMemo(() => {
    let mp: EventTargetMapType = {};
    const workFlow = request_workflow.data;
    workFlow.forEach((eA) => {
      mp[eA.trigger] = eA.workflow_action.map((wA) => {
        return wA.target_api;
      });
    });
    return mp;
  }, [request_workflow.data]);

  const reqProgressMap: RequestProgressMapType = useMemo(() => {
    let mp: RequestProgressMapType = {};

    request_progress.data.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [request_progress]);

  const EventProgress = eventTargetMap.onRequestCancel
    .map((api) => {
      return { api: api, eventType: apiTargetToEvents[api][0] };
    })
    .flat()
    .map(({ eventType, api }) => {
      const requestProgress =
        reqProgressMap[eventType] &&
        reqProgressMap[eventType].find((row) => {
          return !row.is_progress_step;
        });
      const workflow = workflowCopy[eventType];
      return {
        eventType: eventType,
        slotInput: '', // ai instructions
        slotRequestIcon:
          api === 'onRequestCancel_slack_interviewersOrganizer' ? (
            <SlackIcon />
          ) : (
            ''
          ), // left icon
        slotHoverIcon: '', //right icon
        status: requestProgress?.status ?? null, // status
        textProgress: getWorkflowText({
          workflow,
          status: requestProgress?.status,
        }),
        slotButton: null,
      };
    })
    .flat();

  const requestProgressData = [
    {
      id: 'cancel_request',
      isDividerVisible: false,
      textRequestProgress: 'Cancel request received from the candidate',
      indicator: 'error',
      circleIndicator: 'error',
      slotIndicator: null,
      eventProgress: [...EventProgress],
      addActionButton: null,
    },
  ];

  return (
    <>
      {requestProgressData.map(
        (
          {
            circleIndicator,
            indicator,
            slotIndicator,
            textRequestProgress,
            eventProgress,
            addActionButton,
            isDividerVisible,
          },
          index,
        ) => (
          <RequestProgress
            key={index}
            isDividerVisible={isDividerVisible}
            indicator={indicator}
            circleIndicator={circleIndicator}
            slotIndicator={slotIndicator}
            textRequestProgress={textRequestProgress}
            slotProgress={
              <>
                {eventProgress.map(
                  (
                    {
                      slotHoverIcon,
                      slotInput,
                      slotRequestIcon,
                      status,
                      textProgress,
                      slotButton,
                    },
                    i,
                  ) => {
                    return (
                      <ScheduleProgress
                        key={i}
                        slotInput={slotInput}
                        slotRequestIcon={slotRequestIcon} // left icon
                        slotHoverIcon={slotHoverIcon} // right icon
                        status={status}
                        textProgress={textProgress}
                        slotButton={slotButton}
                      />
                    );
                  },
                )}
                {addActionButton}
              </>
            }
          />
        ),
      )}
    </>
  );
}

export default CandidateCancelled;
