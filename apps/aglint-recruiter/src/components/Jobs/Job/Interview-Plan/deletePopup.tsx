import { useCallback } from 'react';

import { DeletePopup } from '@/devlink3/DeletePopup';
import MuiPopup from '@/src/components/Common/MuiPopup';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';

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
    <MuiPopup props={{ open, onClose: handleClose }}>
      {popup && (
        <DeletePopup
          onClickCancel={{ onClick: handleClose }}
          buttonText={'Delete'}
          onClickDelete={{ onClick: onDelete }}
          textTitle={`Delete ${popup.break ? 'Break for' : ''} ${popup.name}`}
          textDescription={`By clicking "Delete", ${
            popup.break ? 'Break for' : ''
          } ${popup.name} will be deleted from the interview plan.`}
        />
      )}
    </MuiPopup>
  );
};

export default InterviewDeletePopup;
