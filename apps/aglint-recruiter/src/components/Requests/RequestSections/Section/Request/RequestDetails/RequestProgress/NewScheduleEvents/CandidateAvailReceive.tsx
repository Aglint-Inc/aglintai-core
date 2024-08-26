/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { useMemo } from 'react';

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
  const { availRecivedProgress, reqProgresMp } = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    let mp: RequestProgressMapType = {};

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
    });

    progres.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return { availRecivedProgress: progres, reqProgresMp: mp };
  }, [request_progress.data]);
  if (availRecivedProgress.length > 0) {
    lastEvent = availRecivedProgress[availRecivedProgress.length - 1];
  }

  return (
    <Stack rowGap={1.5}>
      <TextWithIcon
        textContent={<>EVENT : Candidate submits Availability</>}
        iconSize={3}
        fontSize={1}
        // color={getProgressColor('past')}
      />
      <ShowCode.When
        isTrue={
          lastEvent &&
          lastEvent.event_type === 'CAND_AVAIL_REC' &&
          Boolean(!eventTargetMap['onReceivingAvailReq'])
        }
      >
        <>manual flow</>
      </ShowCode.When>
      {/* <ShowCode.When isTrue={Boolean(eventTargetMap['onReceivingAvailReq'])}> */}
      {/* <Stack ml={4}>
          {eventTargetMap['onReceivingAvailReq']
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
        </Stack> */}
      {/* </ShowCode.When> */}
    </Stack>
  );
};

export default CandidateAvailReceive;
