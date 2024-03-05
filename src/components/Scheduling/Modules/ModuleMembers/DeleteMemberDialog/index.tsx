import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setEditModule,
  setIsDeleteMemberDialogOpen,
  useSchedulingStore
} from '../../store';

function DeleteMemberDialog() {
  const { isDeleteMemberDialogOpen, editModule, selUser } =
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
        setEditModule({
          ...editModule,
          relations: editModule.relations.filter(
            (rel) => rel.user_id !== selUser.user_id
          )
        });
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error deleting user');
    } finally {
      setIsDeleteMemberDialogOpen(false);
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
