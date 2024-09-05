/* eslint-disable no-unused-vars */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import React from 'react';

import MuiPopup from '@/components/Common/MuiPopup';
import { ShowCode } from '@/components/Common/ShowCode';
import { ACTION_TRIGGER_MAP } from '@/components/Workflow/constants';

import { useRequestProgressProvider } from '../progressCtx';
import { type TriggerActionMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import { SelectedActionsDetailsProvider } from './dialogCtx';
import InterviewScheduled from './InterviewScheduled';
import SelectScheduleFlow from './SelectScheduleFlow';
import WorkflowActionDialog from './WorkflowActionDialog';

const ScheduleProgress = () => {
  const {
    companyEmailTemplatesMp,
    editTrigger,
    reqProgressMap,
    reqTriggerActionsMap,
    setShowEditDialog,
    showEditDialog,
  } = useRequestProgressProvider();

  let scheduleFlow = getSchedulFlow({
    eventTargetMap: reqTriggerActionsMap,
    requestTargetMp: reqProgressMap,
  });

  return (
    <>
      <SelectScheduleFlow scheduleFlow={scheduleFlow} />
      <ShowCode.When isTrue={scheduleFlow === 'availability'}>
        <>
          <CandidateAvailReceived />
        </>
      </ShowCode.When>
      <InterviewScheduled />
    </>
  );
};

export default ScheduleProgress;
