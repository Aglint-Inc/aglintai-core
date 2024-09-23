import { DialogDescription } from '@components/ui/dialog';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';

export const DeleteReasonDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete,
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
