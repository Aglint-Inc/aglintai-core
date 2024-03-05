import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3';

import { setIsCancelOpen, useInterviewSchedulingStore } from '../store';

function DeleteScheduleDialog({
  onClickCancel
}: {
  onClickCancel: () => void;
}) {
  const isCancelOpen = useInterviewSchedulingStore(
    (state) => state.isCancelOpen
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
      open={isCancelOpen}
      onClose={() => {
        setIsCancelOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Cancel Schedule'}
        textDescription={
          'Are you sure you want to delete this schedule? This action cannot be undone.'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsCancelOpen(false);
          }
        }}
        onClickDelete={{
          onClick: () => {
            onClickCancel();
          }
        }}
        buttonText={'Cancel Schedule'}
      />
    </Dialog>
  );
}

export default DeleteScheduleDialog;
