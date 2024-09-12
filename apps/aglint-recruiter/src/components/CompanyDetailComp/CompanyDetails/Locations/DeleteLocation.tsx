
import type { Dispatch, SetStateAction } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { manageOfficeLocation } from '@/context/AuthContext/utils';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import type { DialogState } from '../types';

function DeleteLocation({
  dialog,
  setDialog,
}: {
  dialog: DialogState;
  setDialog: Dispatch<SetStateAction<DialogState>>;
}) {
  const { refetch: refetchLocations } = useAllOfficeLocations();
  const handleDeleteLocation = async (id: number) => {
    await manageOfficeLocation({ type: 'delete', data: id });
    refetchLocations();
  };

  return (
    <UIDialog
      open={dialog.deletelocation.open}
      onClose={() => {
        setDialog({
          ...dialog,
          deletelocation: { open: false, edit: -1 },
        });
      }}
      title="Delete Office Location"
      slotButtons={
        <>
          <UIButton
            variant="secondary"
            size="sm"
            onClick={() => {
              setDialog({
                ...dialog,
                deletelocation: { open: false, edit: -1 },
              });
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            variant="destructive"
            size="sm"
            onClick={() => {
              handleDeleteLocation(dialog.deletelocation.edit);
              setDialog({
                ...dialog,
                deletelocation: { open: false, edit: -1 },
              });
            }}
          >
            Delete
          </UIButton>
        </>
      }
    >
      <p>Are you sure you want to delete this office location? This action is permanent.</p>
    </UIDialog>
  );
}

export default DeleteLocation;
