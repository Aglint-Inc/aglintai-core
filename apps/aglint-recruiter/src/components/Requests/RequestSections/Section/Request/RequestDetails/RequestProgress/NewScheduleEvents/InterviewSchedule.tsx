/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import React from 'react';

import { ScheduleProgress } from '@/devlink2/ScheduleProgress';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';
import { useRequest } from '@/src/context/RequestContext';

import CheckCircleFilled from '../CheckCircleFilled';
import { ProgressTenseType } from '../types';
import { workflowCopy } from '../utils/copy';
import { getProgressColor } from '../utils/getProgressColor';
import { apiTargetToEvents } from '../utils/progressMaps';
import { progressStatusToTense } from '../utils/progressStatusToTense';
import { useNewScheduleRequestPr } from '.';
import { RequestProgress } from '@/devlink2';
type TenseType = 'past' | 'present' | 'future' | 'error';

const InterviewSchedule = () => {
  const { reqProgressMap, reqTriggerActionsMap: triggerActionMp } =
    useNewScheduleRequestPr();
  const { request_progress } = useRequest();
  const eventWActions = triggerActionMp['candidateBook'] ?? [];

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
    <RequestProgress
      circleIndicator={tense === 'past' ? 'success' : 'neutral'}
      textRequestProgress={'On Inteview is Scheduled'}
      slotProgress={
        <>
          <Stack ml={4}>
            {eventWActions
              .map((eA) => {
                return apiTargetToEvents[eA.target_api];
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
        </>
      }
    />
  );
};

export default InterviewSchedule;
