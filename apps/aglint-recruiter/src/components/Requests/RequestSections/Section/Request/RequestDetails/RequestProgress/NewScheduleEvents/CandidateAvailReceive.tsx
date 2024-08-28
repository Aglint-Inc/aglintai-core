/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
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
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
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
  let availaRecivedProgEvents = useMemo(() => {
    let availRecivedProgEvents: DatabaseTable['request_progress'][][] = [];
    if (request_progress.data.length === 0) {
      return availRecivedProgEvents;
    }
    const filteredProg = request_progress.data.filter(
      (prg) =>
        prg.is_progress_step === false &&
        groupedTriggerEventMap['availReceived'].includes(prg.event_type),
    );
    let idx = -1;
    filteredProg.forEach((prg) => {
      if (idx >= 0 && availRecivedProgEvents[idx].length >= 1) {
        availRecivedProgEvents[idx].push({ ...prg });
      }

      if (prg.event_type === 'CAND_AVAIL_REC') {
        availRecivedProgEvents.push([{ ...prg }]);
        idx += 1;
      }
    });
    return availRecivedProgEvents;
  }, [request_progress.data]);

  return (
    <Stack rowGap={2}>
      {availaRecivedProgEvents.length === 0 && (
        <TextWithIcon
          iconName='expand_circle_right'
          textContent={`Candidate submits Availability`}
          iconSize={4}
          fontSize={1}
          color={getProgressColor('future')}
        />
      )}
      {availaRecivedProgEvents.map((eventPgs) => {
        return (
          <RequestEvents
            currProgress={eventPgs}
            eventTargetMap={eventTargetMap}
          />
        );
      })}
    </Stack>
  );
};

export default CandidateAvailReceive;

const RequestEvents = ({
  currProgress,
  eventTargetMap,
}: {
  currProgress: DatabaseTable['request_progress'][];
  eventTargetMap: EventTargetMapType;
}) => {
  const { request_progress } = useRequest();

  const {
    availRecivedProgress: availReceivedProgress,
    reqProgresMp,
    isSlotConfirmed,
  } = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    let mp: RequestProgressMapType = {};
    let isSlotConfirmed = false;

    if (currProgress.length === 0) {
      return { availRecivedProgress: progres, reqProgresMp: mp };
    }
    currProgress.forEach((prog) => {
      if (prog.event_type === 'CAND_AVAIL_REC') {
        progres.push({
          ...prog,
        });
      } else if (
        progres.length > 0 &&
        prog.event_type !== 'CAND_CONFIRM_SLOT'
      ) {
        progres.push({
          ...prog,
        });
      }
      if (prog.event_type == 'CAND_CONFIRM_SLOT') {
        isSlotConfirmed = true;
      }
    });

    progres.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return {
      availRecivedProgress: progres,
      reqProgresMp: mp,
      isSlotConfirmed,
    };
  }, [request_progress.data]);

  let lastEvent: DatabaseTable['request_progress'];

  if (availReceivedProgress.length > 0) {
    lastEvent = availReceivedProgress[availReceivedProgress.length - 1];
  }
  // eslint-disable-next-line no-unused-vars
  let isManual = true;
  if (
    eventTargetMap['onReceivingAvailReq'] &&
    eventTargetMap['onReceivingAvailReq'].length > 0
  ) {
    isManual = false;
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
          {availReceivedProgress
            .filter((pg) => pg.is_progress_step === false)
            .sort(
              (p1, p2) =>
                dayjsLocal(p1.created_at).unix() -
                dayjsLocal(p2.created_at).unix(),
            )
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
        <ShowCode.When
          isTrue={
            lastEvent &&
            !isSlotConfirmed &&
            lastEvent.event_type === 'CAND_AVAIL_REC' &&
            Boolean(!eventTargetMap['onReceivingAvailReq'])
          }
        >
          <Stack
            width={'100%'}
            direction={'row'}
            justifyContent={'flex-end'}
            gap={1}
          ></Stack>
        </ShowCode.When>
        <ShowCode.When isTrue={Boolean(eventTargetMap['onReceivingAvailReq'])}>
          {Boolean(eventTargetMap['onReceivingAvailReq']) &&
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
        </ShowCode.When>
      </Stack>
      <ShowCode.When
        isTrue={lastEvent && lastEvent.event_type === 'CAND_AVAIL_REC'}
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
