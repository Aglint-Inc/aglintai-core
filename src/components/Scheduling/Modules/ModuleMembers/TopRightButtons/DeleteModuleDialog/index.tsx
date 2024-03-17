import { Dialog } from '@mui/material';
import { useRouter } from 'next/router';

import { DeletePopup } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setIsDeleteModuleDialogOpen, useModulesStore } from '../../../store';
import { ModuleType } from '../../../types';
import { deleteModuleById } from '../../../utils';

function DeleteModuleDialog({ editModule }: { editModule: ModuleType }) {
  const router = useRouter();
  const isDeleteModuleDialogOpen = useModulesStore(
    (state) => state.isDeleteModuleDialogOpen,
  );

  const deleteModule = async () => {
    try {
      const { data } = await supabase
        .from('interview_meeting')
        .select('*,interview_schedule!inner(*)')
        .eq('module_id', editModule.id);

      const isActiveMeeting = data.some(
        (meet) => meet.start_time > new Date().toISOString(),
      );

      if (!isActiveMeeting) {
        const isdeleted = await deleteModuleById(editModule.id);
        if (isdeleted) {
          router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
          toast.success('Module deleted successfully');
        } else {
          throw new Error();
        }
      } else {
        toast.error(
          'Cannot delete module, active schedules are present for this module',
        );
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
          borderRadius: '10px',
        },
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
          },
        }}
        onClickDelete={{
          onClick: () => {
            if (editModule.id) deleteModule();
          },
        }}
        buttonText={'Delete'}
      />
    </Dialog>
  );
}

export default DeleteModuleDialog;
