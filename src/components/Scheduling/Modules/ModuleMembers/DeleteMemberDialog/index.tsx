import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3';
import toast from '@/src/utils/toast';

import {
  deleteMemberSchedulingStore,
  setIsDeleteMemberDialogOpen,
  useSchedulingStore
} from '../../store';
import { deleteRelationByUserId } from '../../utils';

function DeleteMemberDialog() {
  const isDeleteMemberDialogOpen = useSchedulingStore(
    (state) => state.isDeleteMemberDialogOpen
  );
  const editModule = useSchedulingStore((state) => state.editModule);
  const selUser = useSchedulingStore((state) => state.selUser);

  const deleteRelation = async () => {
    try {
      const isDeleted = await deleteRelationByUserId({
        module_id: editModule.id,
        user_id: selUser.user_id
      });
      if (isDeleted) {
        deleteMemberSchedulingStore(selUser.user_id);
      } else {
        throw new Error();
      }
    } catch (e) {
      setIsDeleteMemberDialogOpen(false);
      toast.error('Error deleting user');
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px'
        }
      }}
      open={isDeleteMemberDialogOpen}
      onClose={() => {
        setIsDeleteMemberDialogOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Remove Member'}
        textDescription={
          'By clicking remove the member will be permanently removed from this interview module'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsDeleteMemberDialogOpen(false);
          }
        }}
        onClickDelete={{
          onClick: () => {
            if (selUser.id) deleteRelation();
          }
        }}
        buttonText={'Delete'}
      />
    </Dialog>
  );
}

export default DeleteMemberDialog;
