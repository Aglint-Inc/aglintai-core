/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  setCandidateAvailabilityDrawerOpen,
  setCandidateAvailabilityIdForReRequest,
  setReRequestAvailability,
} from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { useRequestAvailabilityDetails } from '@/src/components/Requests/ViewRequestDetails/ConfirmAvailability';
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
  useConfirmAvailabilitySchedulingFlowStore,
} from '@/src/components/Requests/ViewRequestDetails/ConfirmAvailability/store';
import { useRequest } from '@/src/context/RequestContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { EventTargetMapType, RequestProgressMapType } from '../types';
import { getProgressColor } from '../utils/getProgressColor';
import {
  apiTargetToEvents,
  groupedTriggerEventMap,
} from '../utils/progressMaps';
import EventNode from './EventNode';

const CandidateAvailReceive = ({
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
}) => {
  const { request_progress } = useRequest();

  let lastEvent: DatabaseTable['request_progress']['event_type'];
  let { availRecivedProgEvents, isScheduled } = useMemo(() => {
    let isScheduled = false;
    let availRecivedProgEvents: DatabaseTable['request_progress'][][] = [];
    if (request_progress.data.length === 0) {
      return { availRecivedProgEvents, isScheduled };
    }
    const filteredProg = request_progress.data.filter((prg) =>
      groupedTriggerEventMap['availReceived'].includes(prg.event_type),
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
        (prg) => prg.event_type === 'CAND_CONFIRM_SLOT',
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
    <Stack rowGap={2}>
      <ShowCode.When isTrue={availRecivedProgEvents.length === 0}>
        <TextWithIcon
          iconName='expand_circle_right'
          textContent={`Candidate submits Availability`}
          iconSize={4}
          fontSize={1}
          color={getProgressColor('future')}
        />
      </ShowCode.When>
      {availRecivedProgEvents.map((eventPgs, idx) => {
        return (
          <RequestEvents
            currProgress={eventPgs}
            eventTargetMap={eventTargetMap}
            key={idx}
            isScheduled={isScheduled}
          />
        );
      })}
      <ShowCode.When
        isTrue={lastEvent === 'CANDIDATE_AVAILABILITY_RE_REQUESTED'}
      >
        <TextWithIcon
          iconName='expand_circle_right'
          textContent={`Candidate submits Availability`}
          iconSize={4}
          fontSize={1}
          color={getProgressColor('future')}
        />
      </ShowCode.When>
    </Stack>
  );
};

export default CandidateAvailReceive;

const RequestEvents = ({
  currProgress,
  eventTargetMap,
  isScheduled,
}: {
  currProgress: DatabaseTable['request_progress'][];
  eventTargetMap: EventTargetMapType;
  isScheduled: boolean;
}) => {
  const { candidateAvailabilityId } =
    useConfirmAvailabilitySchedulingFlowStore();
  const { isFetched } = useRequestAvailabilityDetails({
    request_id: candidateAvailabilityId,
  });
  const { reqProgresMp } = useMemo(() => {
    let mp: RequestProgressMapType = {};

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

  let isManual = true;
  if (eventTargetMap['onReceivingAvailReq']) {
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
    <Stack>
      <TextWithIcon
        iconName='expand_circle_right'
        textContent={`Candidate submits Availability`}
        iconSize={4}
        fontSize={1}
        color={getProgressColor('past')}
      />
      <Stack ml={4}>
        <ShowCode.When isTrue={isManual}>
          {currProgress
            .filter((pg) => pg.is_progress_step === false)
            .map((av) => {
              return (
                <>
                  <EventNode
                    eventNode={av.event_type}
                    reqProgressMap={reqProgresMp}
                  />
                </>
              );
            })}
        </ShowCode.When>
        <ShowCode.When isTrue={Boolean(eventTargetMap['onReceivingAvailReq'])}>
          <>
            {eventTargetMap['onReceivingAvailReq'] &&
              eventTargetMap['onReceivingAvailReq']
                .map((target_api) => {
                  return apiTargetToEvents[target_api];
                })
                .flat()
                .map((ev) => {
                  return (
                    <>
                      <EventNode eventNode={ev} reqProgressMap={reqProgresMp} />
                    </>
                  );
                })}
          </>
        </ShowCode.When>
      </Stack>
      <ShowCode.When
        isTrue={
          !isScheduled && lastEvent && lastEvent.event_type === 'CAND_AVAIL_REC'
        }
      >
        <Stack direction={'row'} gap={1}>
          <ButtonSoft
            size={1}
            color={'accent'}
            textButton='Schedule Interview'
            onClickButton={{
              onClick: () => {
                handleConfirmSlot(lastEvent.request_id);
              },
            }}
            isLoading={!isFetched}
          />
          <ButtonSoft
            size={1}
            color='accent'
            onClickButton={{
              onClick: () => {
                handleReReq(lastEvent.request_id);
              },
            }}
            textButton='Re Request Availability'
          />
        </Stack>
      </ShowCode.When>
    </Stack>
  );
};
