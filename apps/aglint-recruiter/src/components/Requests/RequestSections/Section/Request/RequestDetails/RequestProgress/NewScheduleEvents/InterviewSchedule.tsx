/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';
import { useRequest } from '@/src/context/RequestContext';

import CheckCircleFilled from '../CheckCircleFilled';
import { EventTargetMapType, RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';
import { getProgressColor } from '../utils/getProgressColor';
import { apiTargetToEvents, eventToTrigger } from '../utils/progressMaps';
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
  const candScheduleIdx = request_progress.data.findIndex(
    (prog) => prog.event_type === 'CAND_CONFIRM_SLOT',
  );
  let interviewScheduleProgress: typeof request_progress.data = [];
  if (candScheduleIdx !== -1) {
    interviewScheduleProgress = request_progress.data.slice(candScheduleIdx);
  }

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
    <Stack rowGap={1}>
      <TextWithIcon
        textContent={<>EVENT : On Inteview is Scheduled</>}
        iconSize={3}
        fontSize={1}
        color={getProgressColor(tense)}
      />
      <Stack ml={4}>
        <p>Actions : </p>
        {eventWActions
          .map((eA) => {
            return apiTargetToEvents[eA];
          })
          .flat()
          .map((ev) => {
            const eventProg = reqProgressMap[ev];
            let tense: TenseType;
            if (!eventProg) {
              tense = 'future';
            } else if (eventProg[0].status === 'completed') {
              tense = 'past';
            } else if (eventProg[0].status === 'not_started') {
              tense = 'future';
            } else if (eventProg[0].status === 'in_progress') {
              tense = 'present';
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
