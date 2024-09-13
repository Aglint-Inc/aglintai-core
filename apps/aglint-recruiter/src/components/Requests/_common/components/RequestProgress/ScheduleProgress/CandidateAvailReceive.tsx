/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Bell, Lightbulb, WandSparkles } from 'lucide-react';
import { useMemo } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';
import {
  setCandidateAvailabilityDrawerOpen,
  setCandidateAvailabilityIdForReRequest,
  setReRequestAvailability,
} from '@/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
  useConfirmAvailabilitySchedulingFlowStore,
} from '@/components/Requests/ViewRequestDetails/ConfirmAvailability/store';
import { useRequest } from '@/context/RequestContext';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { useRequestAvailabilityDetails } from '../../../hooks';
import { useRequestProgressProvider } from '../progressCtx';
import { RequestProgressTracker } from '../RequestProgressTracker';
import { type RequestProgressMapType } from '../types';
import {
  apiTargetToEvents,
  groupedTriggerEventMap,
} from '../utils/progressMaps';
import EventNode from './EventNode';

const CandidateAvailReceive = () => {
  const { request_progress } = useRequest();
  let lastEvent: DatabaseTable['request_progress']['event_type'];
  const { availRecivedProgEvents, isScheduled } = useMemo(() => {
    let isScheduled = false;
    const availRecivedProgEvents: DatabaseTable['request_progress'][][] = [];
    if (request_progress.data.length === 0) {
      return { availRecivedProgEvents, isScheduled };
    }
    const filteredProg = request_progress.data
      .filter((prg) =>
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
        (prg) =>
          prg.event_type === 'CAND_CONFIRM_SLOT' ||
          prg.event_type === 'SCHEDULE_INTERVIEW_SLOT',
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
        isTrue={lastEvent === 'CANDIDATE_AVAILABILITY_RE_REQUESTED'}
      >
        <WActionMenu />
      </ShowCode.When>
    </div>
  );
};

export default CandidateAvailReceive;

const RequestEvents = ({
  currProgress,
  isScheduled,
}: {
  currProgress: DatabaseTable['request_progress'][];
  isScheduled: boolean;
}) => {
  const { candidateAvailabilityId } =
    useConfirmAvailabilitySchedulingFlowStore();
  const { isFetching } = useRequestAvailabilityDetails({
    availability_id: candidateAvailabilityId,
  });

  const { reqTriggerActionsMap } = useRequestProgressProvider();
  const { reqProgresMp } = useMemo(() => {
    const mp: RequestProgressMapType = {};

    currProgress.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return {
      reqProgresMp: mp,
    };
  }, [currProgress]);

  let lastEvent: DatabaseTable['request_progress'];

  let isManual = false;
  if (
    reqTriggerActionsMap['onReceivingAvailReq'] &&
    reqTriggerActionsMap['onReceivingAvailReq'].length > 0
  ) {
    isManual = false;
  }
  if (currProgress.length > 0) {
    lastEvent = currProgress[currProgress.length - 1];
  }
  const handleConfirmSlot = async (request_id: string) => {
    try {
      const [candReq] = supabaseWrap(
        await supabase
          .from('candidate_request_availability')
          .select()
          .eq('request_id', request_id),
      );
      setCandidateAvailabilityId(candReq.id);
      setApplicationIdForConfirmAvailability(candReq.application_id);
    } catch (err) {
      toast.error('Some thing went wrong');
    }
  };

  const handleReReq = async (request_id: string) => {
    const [avail_req] = supabaseWrap(
      await supabase
        .from('candidate_request_availability')
        .select()
        .eq('request_id', request_id),
    );
    setCandidateAvailabilityDrawerOpen(true);
    setReRequestAvailability(true);
    setCandidateAvailabilityIdForReRequest(avail_req.id);
  };

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
            <ShowCode.When
              isTrue={
                !isScheduled &&
                lastEvent &&
                lastEvent.event_type === 'CAND_AVAIL_REC'
              }
            >
              <div className='gap-1'>
                <UIButton
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    handleConfirmSlot(lastEvent.request_id);
                  }}
                  isLoading={isFetching}
                >
                  Schedule Interview
                </UIButton>
                <UIButton
                  variant='default'
                  size='sm'
                  onClick={() => {
                    handleReReq(lastEvent.request_id);
                  }}
                >
                  Re Request Availability
                </UIButton>
              </div>
            </ShowCode.When>
          </>
        }
      />
    </>
  );
};

const WActionMenu = () => {
  const { setEditTrigger, setShowEditDialog, reqTriggerActionsMap } =
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
      circleIndicator='default'
      textRequestProgress='When candidate submits availability'
      slotProgress={
        <div>
          <ShowCode.When isTrue={wActionAfterAvailRecive.length === 0}>
            <Alert
              variant='default'
              className='bg-purple-100 border-purple-200 mb-4'
            >
              <Lightbulb className='h-4 w-4 text-purple-500' />
              <AlertDescription className='flex flex-col items-end'>
                <p className='mb-4 w-full'>
                  Automate booking when availability is received
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setEditTrigger('onReceivingAvailReq');
                    setShowEditDialog(true);
                  }}
                >
                  <WandSparkles className='mr-2 h-4 w-4' />
                  Add Automation
                </Button>
              </AlertDescription>
            </Alert>
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
                    <div>
                      <Alert
                        variant='default'
                        className='bg-purple-100 border-purple-200 mb-4'
                      >
                        <Lightbulb className='h-4 w-4 text-purple-500' />
                        <AlertDescription className='flex flex-col items-start'>
                          <p className='mb-4 w-full'>
                            Add Riminders to candidate for follow up.
                          </p>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setEditTrigger('selfScheduleReminder');
                              setShowEditDialog(true);
                            }}
                          >
                            <Bell className='mr-2 h-4 w-4' />
                            Schedule Reminder
                          </Button>
                        </AlertDescription>
                      </Alert>
                    </div>
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
