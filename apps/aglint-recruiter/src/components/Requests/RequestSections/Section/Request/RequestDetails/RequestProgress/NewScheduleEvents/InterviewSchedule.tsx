/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import CheckCircleFilled from '../CheckCircleFilled';
import {
  EventTargetMapType,
  ProgressTenseType,
  RequestProgressMapType,
} from '../types';
import { workflowCopy } from '../utils/copy';
import { getProgressColor } from '../utils/getProgressColor';
import { apiTargetToEvents } from '../utils/progressMaps';
import { progressStatusToTense } from '../utils/progressStatusToTense';
type TenseType = 'past' | 'present' | 'future' | 'error';

const InterviewSchedule = ({
  eventTargetMap,
  reqProgressMap,
}: {
  eventTargetMap: EventTargetMapType;
  reqProgressMap: RequestProgressMapType;
}) => {
  const { request_progress } = useRequest();
  const eventWActions = eventTargetMap['candidateBook'] ?? [];

  const event_status = request_progress.data.find(
    (d) => d.event_type === 'CAND_CONFIRM_SLOT',
  );

  let tense: TenseType = 'past';
  if (event_status && event_status.status === 'completed') {
    tense = 'past';
  } else {
    tense = 'future';
  }
  return (
    <Stack rowGap={1.5}>
      <TextWithIcon
        textContent={<>EVENT : On Inteview is Scheduled</>}
        iconSize={3}
        fontSize={1}
        color={getProgressColor(tense)}
      />
      <ShowCode.When isTrue={1}>
        <></>
      </ShowCode.When>
      <Stack></Stack>
      <Stack ml={4}>
        {eventWActions
          .map((eA) => {
            return apiTargetToEvents[eA];
          })
          .flat()
          .map((ev) => {
            const eventProg = reqProgressMap[ev];
            let tense: ProgressTenseType = 'future';

            if (eventProg) {
              tense = progressStatusToTense(eventProg[0].status);
            }

            return (
              <p key={ev}>
                <TextWithIcon
                  textContent={workflowCopy[ev][tense]}
                  iconSize={3}
                  fontSize={1}
                  color={getProgressColor(tense)}
                  iconName={
                    tense === 'past' ? (
                      <CheckCircleFilled />
                    ) : tense === 'future' ? (
                      'circle'
                    ) : (
                      <LottieAnimations
                        animation='loading_spinner'
                        size={1.2}
                      />
                    )
                  }
                />
              </p>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default InterviewSchedule;
