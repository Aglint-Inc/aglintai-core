import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';

import { progressActionMap } from './utils/ProgressActionMap';
type TenseType = 'past' | 'present' | 'future' | 'error';

const EventRow = ({ sorted_progress }) => {
  let tense: TenseType = 'future';

  return (
    <>
      <CheckCircleFilled />
      <TextWithIcon
        // textContent={<>{workflowCopy[requestLog.type][tense]}</>}
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
      <progressActionMap.CHOOSE_SCHEDULE_FLOW_not_started />
    </>
  );
};

export default EventRow;

function CheckCircleFilled() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16px'
      viewBox='0 -960 960 960'
      width='16px'
      fill='#29A383'
    >
      <path d='m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z' />
    </svg>
  );
}

function getProgressColor(tense: TenseType) {
  if (tense === 'error') {
    return 'error';
  } else if (tense === 'future') {
    return 'neutral';
  } else if (tense === 'past') {
    return 'success';
  } else {
    return 'info';
  }
}
