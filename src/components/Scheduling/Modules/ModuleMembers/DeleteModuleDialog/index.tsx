import { Dialog } from '@mui/material';
import { useRouter } from 'next/router';

import { DeletePopup } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import {
  deleteModuleSchedulingStore,
  setIsDeleteModuleDialogOpen,
  useSchedulingStore
} from '../../store';
import { deleteModuleById } from '../../utils';

function DeleteModuleDialog() {
  const router = useRouter();
  const isDeleteModuleDialogOpen = useSchedulingStore(
    (state) => state.isDeleteModuleDialogOpen
  );
  const editModule = useSchedulingStore((state) => state.editModule);

  const deleteModule = async () => {
    try {
      const isdeleted = await deleteModuleById(editModule.id);
      if (isdeleted) {
        deleteModuleSchedulingStore(editModule.id);
        router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error deleting user');
    } finally {
      setIsDeleteModuleDialogOpen(false);
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
      open={isDeleteModuleDialogOpen}
      onClose={() => {
        setIsDeleteModuleDialogOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Remove Module'}
        textDescription={
          'By clicking remove the module will be permanently removed'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsDeleteModuleDialogOpen(false);
          }
        }}
        onClickDelete={{
          onClick: () => {
            if (editModule.id) deleteModule();
          }
        }}
        buttonText={'Delete'}
      />
    </Dialog>
  );
}

export default DeleteModuleDialog;
