import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';

import { type useEnableDisableTraining } from '../../../hooks/useEnableDisableTraining';

function DisableTrainingDialog(
  props: ReturnType<typeof useEnableDisableTraining>,
) {
  const {
    disableOpen,
    setDisableOpen,
    isBannerLoading,
    enableDiabaleTraining,
  } = props;
  return (
    <UIDialog
      title='Disable Training'
      open={disableOpen}
      onClose={() => setDisableOpen(false)}
      slotButtons={
        <>
          <UIButton
            variant='outline'
            size='sm'
            onClick={() => setDisableOpen(false)}
          >
            Cancel
          </UIButton>

          <UIButton
            variant='destructive'
            size='sm'
            isLoading={isBannerLoading}
            disabled={isBannerLoading}
            onClick={() => enableDiabaleTraining({ type: 'disable' })}
          >
            Disable Training
          </UIButton>
        </>
      }
    >
      <>
        <UITypography>Are you sure you want to disable training?</UITypography>
        <div>
          <ol>
            <li>Stop tracking trainee progress</li>
            <li>Remove access to trainee interviewer features</li>
          </ol>
        </div>
      </>
    </UIDialog>
  );
}

export default DisableTrainingDialog;
