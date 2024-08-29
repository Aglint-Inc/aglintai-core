/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { EventNodeType } from '@aglint/shared-types/src/workflow';
import { Stack } from '@mui/material';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';

import CheckCircleFilled from '../CheckCircleFilled';
import { ProgressTenseType, RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';
import { getProgressColor } from '../utils/getProgressColor';
import { progressActionMap } from '../utils/ProgressActionMap';
import { progressStatusToTense } from '../utils/progressStatusToTense';

const EventNode = ({
  eventNode,
  reqProgressMap,
}: {
  eventNode: EventNodeType;
  reqProgressMap: RequestProgressMapType;
}) => {
  const eventProg = reqProgressMap[eventNode];
  let tense: ProgressTenseType = 'future';
  let CustomComp;
  let headingEvent: DatabaseTable['request_progress'];
  if (eventProg) {
    headingEvent = eventProg.find((prg) => prg.is_progress_step === false);
    tense = progressStatusToTense(headingEvent.status);
    CustomComp =
      progressActionMap[`${headingEvent.event_type}_${headingEvent.status}`];
  }
  const eventSubProgress = (eventProg ?? []).filter(
    (prg) => prg.is_progress_step === true,
  );

  return (
    <>
      <TextWithIcon
        textContent={workflowCopy[eventNode][tense]}
        iconSize={3}
        fontSize={1}
        color={getProgressColor(tense)}
        iconName={
          tense === 'past' ? (
            <CheckCircleFilled />
          ) : tense === 'future' ? (
            'circle'
          ) : (
            <LottieAnimations animation='loading_spinner' size={1.2} />
          )
        }
      />
      {(eventSubProgress.length > 0 || CustomComp) && (
        <Stack ml={1}>
          {/* {CustomComp && <CustomComp {...(headingEvent ?? {})} />} */}
          {eventProg
            .filter((prg) => prg.is_progress_step === true)
            .map((prg) => {
              if (progressActionMap[`${prg.event_type}_${prg.status}`]) {
                let key = `${prg.event_type}_${prg.status}`;
                let Comp = progressActionMap[key];
                return <>{<Comp {...prg} />}</>;
              }
              return (
                <>
                  <TextWithIcon
                    iconName='check'
                    textContent={prg.log}
                    fontSize={1}
                    color={'grey'}
                  />
                </>
              );
            })}
        </Stack>
      )}
    </>
  );
};

export default EventNode;
