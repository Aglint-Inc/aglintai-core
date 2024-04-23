import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3';

import { useDeleteRelationHandler } from '../../queries/hooks';
import { setIsDeleteMemberDialogOpen, useModulesStore } from '../../store';

function DeleteMemberDialog() {
  const isDeleteMemberDialogOpen = useModulesStore(
    (state) => state.isDeleteMemberDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);

  const { deleteRelationByUserId } = useDeleteRelationHandler();

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={isDeleteMemberDialogOpen}
      onClose={() => {
        setIsDeleteMemberDialogOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Remove Member'}
        textDescription={
          'By clicking remove the member will be permanently removed from this interview'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsDeleteMemberDialogOpen(false);
          },
        }}
        onClickDelete={{
          onClick: async () => {
            if (selUser.id) {
              await deleteRelationByUserId({
                module_id: selUser.module_id,
                user_id: selUser.user_id,
              });
              setIsDeleteMemberDialogOpen(false);
            }
          },
        }}
        buttonText={'Remove'}
      />
    </Dialog>
  );
}

export default DeleteMemberDialog;
