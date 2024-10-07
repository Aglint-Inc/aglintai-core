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
import type { Dispatch, SetStateAction } from 'react';

import { useTenantOfficeLocations } from '@/company/hooks';
import { manageOfficeLocation } from '@/context/AuthContext/utils';

function DeleteLocationDialog({
  dialog,
  setDialog,
}: {
  dialog: {
    open: boolean;
    id: number | null;
  };
  setDialog: Dispatch<
    SetStateAction<{
      open: boolean;
      id: number | null;
    }>
  >;
}) {
  const { refetch: refetchLocations } = useTenantOfficeLocations();
  const handleDeleteLocation = async (id: number) => {
    await manageOfficeLocation({ type: 'delete', data: id });
    refetchLocations();
  };

  return (
    <AlertDialog
      open={dialog.open}
      onOpenChange={(open) => setDialog({ open, id: open ? dialog.id : null })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Office Location</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this office location? This action is
            permanent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setDialog({ open: false, id: null })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (dialog.id) {
                handleDeleteLocation(dialog.id);
              }
              setDialog({ open: false, id: null });
            }}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteLocationDialog;
