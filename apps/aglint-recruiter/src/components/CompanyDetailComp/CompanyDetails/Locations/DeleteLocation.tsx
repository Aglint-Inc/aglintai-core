import { DeletePopup } from '@devlink3/DeletePopup';
import { Dispatch, SetStateAction } from 'react';

import MuiPopup from '@/components/Common/MuiPopup';
import { manageOfficeLocation } from '@/context/AuthContext/utils';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import { DialogState } from '../types';

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
    <MuiPopup
      props={{
        open: dialog.deletelocation.open,
        onClose: () => {
          setDialog({
            ...dialog,
            deletelocation: { open: false, edit: -1 },
          });
        },
      }}
    >
      <DeletePopup
        textDescription={
          'Are you sure you want to delete this office location? This action is permanent.'
        }
        textTitle={'Delete Office Location'}
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setDialog({
              ...dialog,
              deletelocation: { open: false, edit: -1 },
            });
          },
        }}
        onClickDelete={{
          onClick: () => {
            handleDeleteLocation(dialog.deletelocation.edit);
            setDialog({
              ...dialog,
              deletelocation: { open: false, edit: -1 },
            });
          },
        }}
      />
    </MuiPopup>
  );
}

export default DeleteLocation;
