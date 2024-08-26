/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import LottieAnimations from '@/src/components/Common/Lotties/LottieIcons';
import { useRequest } from '@/src/context/RequestContext';

import CheckCircleFilled from '../CheckCircleFilled';
import {
  EventTargetMapType,
  ProgressTenseType,
  RequestProgressMapType,
} from '../types';
import { workflowCopy } from '../utils/copy';
import { getProgressColor } from '../utils/getProgressColor';
import { apiTargetToEvents, eventToTrigger } from '../utils/progressMaps';
import { progressStatusToTense } from '../utils/progressStatusToTense';
type TenseType = 'past' | 'present' | 'future' | 'error';

const CandidateAvailReceived = ({
  eventTargetMap,
  reqProgressMap,
}: {
  eventTargetMap: EventTargetMapType;
  reqProgressMap: RequestProgressMapType;
}) => {
  const { request_progress } = useRequest();

  return (
    <Stack rowGap={1.5}>
      <TextWithIcon
        textContent={<>EVENT : On Inteview is Scheduled</>}
        iconSize={3}
        fontSize={1}
        // color={getProgressColor(tense)}
      />
    </Stack>
  );
};

export default CandidateAvailReceived;
