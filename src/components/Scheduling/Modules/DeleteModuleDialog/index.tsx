import { Dialog } from '@mui/material';
import { useRouter } from 'next/router';

import { DeletePopup } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setEditModule,
  setInterviewModules,
  setIsDeleteModuleDialogOpen,
  useSchedulingStore
} from '../store';

function DeleteModuleDialog() {
  const router = useRouter();
  const { isDeleteModuleDialogOpen, editModule, interviewModules } =
    useSchedulingStore();

  const deleteModule = async () => {
    try {
      const { error } = await supabase
        .from('interview_module')
        .delete()
        .eq('id', editModule.id);
      if (!error) {
        setInterviewModules(
          interviewModules.filter((module) => module.id !== editModule.id)
        );
        router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
        setEditModule(null);
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
