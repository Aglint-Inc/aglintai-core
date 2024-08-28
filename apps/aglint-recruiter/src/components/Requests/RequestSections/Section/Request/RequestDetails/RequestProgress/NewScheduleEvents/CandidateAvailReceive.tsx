/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { EventTargetMapType, RequestProgressMapType } from '../types';
import { getProgressColor } from '../utils/getProgressColor';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

const CandidateAvailReceive = ({
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
}) => {
  const { request_progress } = useRequest();
  let lastEvent: DatabaseTable['request_progress'];
  const {
    availRecivedProgress: availReceivedProgress,
    reqProgresMp,
    isSlotConfirmed,
  } = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    let mp: RequestProgressMapType = {};
    let isSlotConfirmed = false;

    if (request_progress.data.length === 0) {
      return { availRecivedProgress: progres, reqProgresMp: mp };
    }
    request_progress.data.forEach((prog) => {
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

  return (
    <Stack rowGap={1.5}>
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
    </Stack>
  );
};

export default CandidateAvailReceive;
