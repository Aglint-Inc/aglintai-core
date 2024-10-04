import { DialogDescription } from '@components/ui/dialog';
import type { Dispatch, SetStateAction } from 'react';

import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';

export const DeleteReasonDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete,
}: {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  confirmDelete: () => void;
}) => {
  return (
    <UIDialog
      title={'Confirm Deletion'}
      open={isDeleteDialogOpen}
      onClose={() => setIsDeleteDialogOpen(false)}
      slotButtons={
        <>
          <UIButton
            variant='outline'
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </UIButton>
          <UIButton variant='destructive' onClick={confirmDelete}>
            Delete
          </UIButton>
        </>
      }
    >
      <DialogDescription>
        Are you sure you want to delete this reason?
      </DialogDescription>
    </UIDialog>
  );
};
