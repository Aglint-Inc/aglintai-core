import type { Dispatch, SetStateAction } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { manageOfficeLocation } from '@/context/AuthContext/utils';
import { useAllOfficeLocations } from '@/queries/officeLocations';

function DeleteLocationDialog({
  dialog,
  setDialog,
}: {
  dialog: {
    open: boolean;
    id: number;
  };
  setDialog: Dispatch<
    SetStateAction<{
      open: boolean;
      id: number;
    }>
  >;
}) {
  const { refetch: refetchLocations } = useAllOfficeLocations();
  const handleDeleteLocation = async (id: number) => {
    await manageOfficeLocation({ type: 'delete', data: id });
    refetchLocations();
  };

  return (
    <UIDialog
      open={dialog.open}
      onClose={() => {
        setDialog({ open: false, id: null });
      }}
      title='Delete Office Location'
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            size='sm'
            onClick={() => {
              setDialog({ open: false, id: null });
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            variant='destructive'
            size='sm'
            onClick={() => {
              handleDeleteLocation(dialog.id);
              setDialog({ open: false, id: null });
            }}
          >
            Delete
          </UIButton>
        </>
      }
    >
      <p>
        Are you sure you want to delete this office location? This action is
        permanent.
      </p>
    </UIDialog>
  );
}

export default DeleteLocationDialog;
