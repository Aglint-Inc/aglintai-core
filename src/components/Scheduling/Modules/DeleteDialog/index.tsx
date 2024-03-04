import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setIsDeleteDialogOpen,
  setSelectedUsers,
  useSchedulingStore
} from '../store';

function DeleteMemberDialog() {
  const { isDeleteDialogOpen, editModule, selectedUsers, selUser } =
    useSchedulingStore();

  const deleteRelation = async () => {
    try {
      const { error } = await supabase
        .from('interview_module_relation')
        .delete()
        .match({
          user_id: selUser.user_id,
          module_id: editModule.id
        });
      if (!error) {
        setSelectedUsers(
          selectedUsers.filter((us) => us.user_id !== selUser.user_id)
        );
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error deleting user');
    } finally {
      setIsDeleteDialogOpen(false);
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
      open={isDeleteDialogOpen}
      onClose={() => {
        setIsDeleteDialogOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Remove Member'}
        textDescription={
          'By Clicking remove the member will be permenently removed from this interview module'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsDeleteDialogOpen(false);
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
