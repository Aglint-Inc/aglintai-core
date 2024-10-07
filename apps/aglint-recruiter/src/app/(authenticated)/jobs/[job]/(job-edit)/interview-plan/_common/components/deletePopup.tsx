import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { useCallback } from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { useJobInterviewPlan } from '../hooks';

export type InterviewDeletePopupType = {
  open: boolean;
  popup: { id: string; name: string; break: boolean } | null;
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
    if (popup?.break) {
      handleClose();
      handleUpdateSession({
        session_id: (popup?.id ?? null)!,
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
        <AlertDialog open={open} onOpenChange={handleClose}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{`Delete ${popup.break ? 'Break for' : ''} ${popup.name}`}</AlertDialogTitle>
              <AlertDialogDescription>
                {`By clicking "Delete", ${
                  popup.break ? 'Break for' : ''
                } ${popup.name} will be deleted from the interview plan.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <UIButton size='md' variant='secondary'>
                  Cancel
                </UIButton>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <UIButton size='md' onClick={onDelete}>
                  Delete
                </UIButton>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default InterviewDeletePopup;
