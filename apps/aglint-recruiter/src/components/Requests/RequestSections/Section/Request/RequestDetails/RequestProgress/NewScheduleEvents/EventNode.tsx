/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React from 'react';

import { ScheduleProgress } from '@/devlink2/ScheduleProgress';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';

import { ProgressTenseType, RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';
import { progressActionMap } from '../utils/ProgressActionMap';
import { progressStatusToTense } from '../utils/progressStatusToTense';
import { IconButtonSoft } from '@/devlink';
import { useNewScheduleRequestPr } from '.';

const EventNode = ({
  eventType,
  currEventMap,
  currEventTrigger,
}: {
  eventType: DatabaseTable['request_progress']['event_type'];
  currEventMap: RequestProgressMapType;
  currEventTrigger: DatabaseTable['workflow']['trigger'];
}) => {
  const { setEditTrigger, setShowEditDialog } = useNewScheduleRequestPr();
  const [onHover, setOnHover] = React.useState(false);
  const eventProg = currEventMap[eventType];
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
      <Stack
        onMouseEnter={() => {
          setOnHover(true);
        }}
        onMouseLeave={() => {
          setOnHover(false);
        }}
      >
        <ScheduleProgress
          status={
            tense === 'past' ? 'completed' : tense === 'future' ? 'circle' : ''
          }
          textProgress={workflowCopy[eventType][tense]}
          slotLeftIcon={<>mfkewmnewkjn</>}
          slotRightIcon={
            <Stack
              direction={'row'}
              columnGap={1}
              sx={{
                opacity: onHover ? 1 : 0,
              }}
            >
              <IconButtonSoft
                iconName={'sync'}
                size={1}
                color={'neutral'}
                onClickButton={{
                  onClick: () => {
                    setEditTrigger(currEventTrigger);
                    setShowEditDialog(true);
                  },
                }}
              />
              <IconButtonSoft
                iconName={'delete'}
                size={1}
                color={'error'}
                onClickButton={() => {
                  // setEditTrigger('')
                  // setShowEditDialog()
                }}
              />
            </Stack>
          }
          slotLoader={
            tense === 'present' ? (
              <LottieAnimations animation='loading_spinner' size={1.5} />
            ) : undefined
          }
        />
      </Stack>

      {(eventSubProgress.length > 0 || CustomComp) && (
        <Stack ml={1}>
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
