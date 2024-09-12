import { useCallback } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useJobInterviewPlan } from '@/job/interview-plan/hooks';

export type InterviewDeletePopupType = {
  open: boolean;
  popup: { id: string; name: string; break: boolean };
  handleClose: () => void;
  handleDelete: () => void;
};

const InterviewDeletePopup = ({
  open,
  popup,
  handleClose,
  handleDelete,
}: InterviewDeletePopupType) => {
  const { handleUpdateSession } = useJobInterviewPlan();
  const onDelete = useCallback(async () => {
    if (popup.break) {
      handleClose();
      handleUpdateSession({
        session_id: popup.id,
        session: { break_duration: 0 },
      });
    } else {
      handleClose();
      handleDelete();
    }
  }, [popup]);
  return (
    <>
      {popup && (
        <UIDialog
          open={open}
          onClose={handleClose}
          title={`Delete ${popup.break ? 'Break for' : ''} ${popup.name}`}
          slotButtons={
            <>
              <UIButton size='md' variant='secondary' onClick={handleClose}>
                Cancel
              </UIButton>
              <UIButton size='md' onClick={onDelete}>
                Delete
              </UIButton>
            </>
          }
        >
          {`By clicking "Delete", ${
            popup.break ? 'Break for' : ''
          } ${popup.name} will be deleted from the interview plan.`}
        </UIDialog>
      )}
    </>
  );
};

export default InterviewDeletePopup;
