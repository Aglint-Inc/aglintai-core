import { Dialog } from '@mui/material';
import { useRouter } from 'next/router';

import { DeletePopup } from '@/devlink3';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setIsDeleteModuleDialogOpen, useSchedulingStore } from '../../store';
import { deleteModuleById } from '../../utils';

function DeleteModuleDialog() {
  const router = useRouter();
  const { allModules, setAllModules } = useSchedulingContext();
  const isDeleteModuleDialogOpen = useSchedulingStore(
    (state) => state.isDeleteModuleDialogOpen
  );
  const editModule = useSchedulingStore((state) => state.editModule);

  const deleteModule = async () => {
    try {
      const { data } = await supabase
        .from('interview_meeting')
        .select('*,interview_schedule!inner(*)')
        .eq('module_id', editModule.id);

      const isActiveMeeting = data.some(
        (meet) => meet.start_time > new Date().toISOString()
      );

      if (!isActiveMeeting) {
        const isdeleted = await deleteModuleById(editModule.id);
        if (isdeleted) {
          const updatedModules = allModules.filter(
            (mod) => mod.interview_modules.id !== editModule.id
          );
          setAllModules([...updatedModules]);
          router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
        } else {
          throw new Error();
        }
      } else {
        toast.error(
          'Cannot delete module, active schedules are present for this module'
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
