import { Dialog } from '@mui/material';
import React from 'react';

import { ConfirmationPopup } from '@/devlink3';

import { setIsRescheduleOpen, useInterviewSchedulingStore } from '../store';

function RescheduleDialog({ onClickReschedule }) {
  const isRescheduleOpen = useInterviewSchedulingStore(
    (state) => state.isRescheduleOpen
  );
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px'
        }
      }}
      open={isRescheduleOpen}
      onClose={() => {
        setIsRescheduleOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Confirm Reschedule'}
        textPopupDescription={
          'Old schedule will be deleted and new schedule will be created. Are you sure you want to reschedule?'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsRescheduleOpen(false);
          }
        }}
        onClickAction={{
          onClick: onClickReschedule
        }}
        textPopupButton={'Confirm'}
      />
    </Dialog>
  );
}

export default RescheduleDialog;
