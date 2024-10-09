/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { useRequest } from '@request/hooks';
import { Bell } from 'lucide-react';
import { useMemo } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { RequestProgressTracker } from '../RequestProgressTracker';
import { type RequestProgressMapType } from '../types';
import {
  apiTargetToEvents,
  groupedTriggerEventMap,
} from '../utils/progressMaps';
import EventNode from './EventNode';
import SuggestionCard from './SuggestionCard';
const CandidateAvailReceive = () => {
  const { request_progress } = useRequest();
  let lastEvent: DatabaseTable['request_progress']['event_type'] | null = null;
  const { availRecivedProgEvents, isScheduled } = useMemo(() => {
    let isScheduled = false;
    const availRecivedProgEvents: DatabaseTable['request_progress'][][] = [];
    if (request_progress.data.length === 0) {
      return { availRecivedProgEvents, isScheduled };
    }
    const filteredProg = request_progress.data
      .filter(
        (prg) =>
          groupedTriggerEventMap['availReceived'] &&
          groupedTriggerEventMap['availReceived'].includes(prg.event_type),
      )
      .sort(
        (a, b) =>
          dayjsLocal(a.created_at).unix() - dayjsLocal(b.created_at).unix(),
      );
    let idx = -1;
    filteredProg.forEach((prg) => {
      if (
        prg.is_progress_step === false &&
        prg.event_type === 'CAND_AVAIL_REC'
      ) {
        availRecivedProgEvents.push([{ ...prg }]);
        idx += 1;
      } else if (idx !== -1 && availRecivedProgEvents[idx].length > 0) {
        availRecivedProgEvents[idx].push({
          ...prg,
        });
      }
    });
    if (
      request_progress.data.find(
        (prg) => prg.event_type === 'INTERVIEW_SCHEDULED',
      )
    ) {
      isScheduled = true;
    }
    return { availRecivedProgEvents, isScheduled };
  }, [request_progress.data]);
  if (request_progress.data.length > 0) {
    lastEvent =
      request_progress.data[request_progress.data.length - 1].event_type;
  }
  return (
    <div className='gap-1'>
      <ShowCode.When isTrue={availRecivedProgEvents.length === 0}>
        <WActionMenu />
      </ShowCode.When>
      {availRecivedProgEvents.map((eventPgs, idx) => {
        return (
          <RequestEvents
            currProgress={eventPgs}
            key={idx}
            isScheduled={isScheduled}
          />
        );
      })}
      <ShowCode.When
        isTrue={Boolean(
          lastEvent && lastEvent === 'CANDIDATE_AVAILABILITY_RE_REQUESTED',
        )}
      >
        <WActionMenu />
      </ShowCode.When>
    </div>
  );
};

export default CandidateAvailReceive;

const RequestEvents = ({
  currProgress,
}: {
  currProgress: DatabaseTable['request_progress'][];
  isScheduled: boolean;
}) => {
  const { reqTriggerActionsMap } = useRequestProgressProvider();
  const { reqProgresMp } = useMemo(() => {
    const mp: RequestProgressMapType = {};

    currProgress.forEach((row) => {
      const key = row.event_type;
      if (!mp[key]) {
        mp[key] = [];
      }
      mp[key].push({ ...row });
    });
    return {
      reqProgresMp: mp,
    };
  }, [currProgress]);

  let isManual = true;
  if (
    reqTriggerActionsMap['onReceivingAvailReq'] &&
    reqTriggerActionsMap['onReceivingAvailReq'].length > 0
  ) {
    isManual = false;
  }

  return (
    <>
      <RequestProgressTracker
        circleIndicator={'success'}
        textRequestProgress={`When candidate submits availability`}
        slotProgress={
          <>
            <ShowCode.When isTrue={isManual}>
              {currProgress
                .filter((pg) => pg.is_progress_step === false)
                .map((av) => {
                  return (
                    <EventNode
                      currEventTrigger='onReceivingAvailReq'
                      eventType={av.event_type}
                      reqProgresMap={reqProgresMp}
                      key={av.id}
                    />
                  );
                })}
            </ShowCode.When>
            <ShowCode.When
              isTrue={Boolean(reqTriggerActionsMap['onReceivingAvailReq'])}
            >
              <>
                {reqTriggerActionsMap['onReceivingAvailReq'] &&
                  reqTriggerActionsMap['onReceivingAvailReq'].map((action) => {
                    const eventAction = apiTargetToEvents[action.target_api];
                    return (
                      <EventNode
                        currEventTrigger='onReceivingAvailReq'
                        eventType={eventAction}
                        reqProgresMap={reqProgresMp}
                        key={eventAction}
                        currWAction={action}
                      />
                    );
                  })}
              </>
            </ShowCode.When>
          </>
        }
      />
    </>
  );
};

const WActionMenu = () => {
  const { setTriggerDetails, setShowEditDialog, reqTriggerActionsMap } =
    useRequestProgressProvider();
  let wActionAfterAvailRecive: DatabaseTable['workflow_action'][] = [];
  if (
    reqTriggerActionsMap['onReceivingAvailReq'] &&
    reqTriggerActionsMap['onReceivingAvailReq'].length > 0
  ) {
    wActionAfterAvailRecive = [...reqTriggerActionsMap['onReceivingAvailReq']];
    if (
      reqTriggerActionsMap['onReceivingAvailReq'][0].target_api ===
      'onReceivingAvailReq_agent_sendSelfScheduleRequest'
    ) {
      wActionAfterAvailRecive = [
        ...wActionAfterAvailRecive,
        ...(reqTriggerActionsMap['selfScheduleReminder'] ?? []),
      ];
    }
  }
  return (
    <RequestProgressTracker
      circleIndicator='neutral'
      textRequestProgress='When candidate submits availability'
      slotProgress={
        <div>
          <ShowCode.When isTrue={wActionAfterAvailRecive.length === 0}>
            <SuggestionCard
              heading='Suggestion'
              description='Automate booking when availability is received'
              buttonSlot={
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setTriggerDetails({
                      interval: 0,
                      trigger: 'onReceivingAvailReq',
                    });
                    setShowEditDialog(true);
                  }}
                >
                  Add Automation
                </Button>
              }
            />
          </ShowCode.When>
          {wActionAfterAvailRecive.map((action) => {
            const eventAction = apiTargetToEvents[action.target_api];

            if (
              action.target_api ===
              'onReceivingAvailReq_agent_sendSelfScheduleRequest'
            ) {
              let isSelfScheduleReminderSet = false;
              if (
                reqTriggerActionsMap['selfScheduleReminder'] &&
                reqTriggerActionsMap['selfScheduleReminder'].length > 0
              ) {
                isSelfScheduleReminderSet = true;
              }

              return (
                <>
                  <EventNode
                    key={action.id}
                    currEventTrigger='onReceivingAvailReq'
                    eventType={eventAction}
                    reqProgresMap={{}}
                    currWAction={action}
                  />
                  {!isSelfScheduleReminderSet && (
                    <SuggestionCard
                      heading='Add automation'
                      description='The Slack RSVP for the interviewers attendance will be sent.'
                      buttonSlot={
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setTriggerDetails({
                              trigger: 'selfScheduleReminder',
                              interval: 24 * 60,
                            });
                            setShowEditDialog(true);
                          }}
                        >
                          <Bell className='mr-2 h-4 w-4' />
                          Schedule Reminder
                        </Button>
                      }
                    />
                  )}
                </>
              );
            }

            return (
              <EventNode
                key={action.id}
                currEventTrigger='onReceivingAvailReq'
                eventType={eventAction}
                reqProgresMap={{}}
                currWAction={action}
              />
            );
          })}
        </div>
      }
    />
  );
};
