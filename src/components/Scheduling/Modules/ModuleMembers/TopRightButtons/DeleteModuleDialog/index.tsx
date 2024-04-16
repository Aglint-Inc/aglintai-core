import { Dialog } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { CloseJobModal } from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
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
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const deleteModule = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const { data } = await supabase
          .from('interview_meeting')
          .select('*,interview_session!inner(*)')
          .eq('interview_session.module_id', editModule.id);

        const isActiveMeeting = data.some(
          (meet) => meet.start_time > new Date().toISOString(),
        );

        if (!isActiveMeeting) {
          const isdeleted = await deleteModuleById(editModule.id);
          if (isdeleted) {
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewtypes`);
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
        setLoading(false);
        setIsDeleteModuleDialogOpen(false);
      }
    } else {
      toast.warning('Please wait, till the ongoing process is complete');
    }
  };

  const moduleName = (editModule?.name ?? '').trim();
  const moduleDescription = (editModule?.description ?? '').trim();

  const onClose = useCallback(() => {
    if (!loading) {
      setIsDeleteModuleDialogOpen(false);
      setTimeout(() => setValue(''), 400);
    } else {
      toast.warning('Please wait, till the ongoing process is complete');
    }
  }, [loading]);

  return (
    <Dialog open={isDeleteModuleDialogOpen} onClose={onClose}>
      <CloseJobModal
        textPopupTitle={`Remove Module`}
        textWarning={`By clicking remove the module will be permanently removed`}
        textButton={'Delete'}
        textJobTitle={moduleName}
        onClickCancel={{
          onClick: () => onClose(),
        }}
        onClickCloseJob={{
          onClick: () => {
            if (editModule.id) deleteModule();
          },
        }}
        textLocation={moduleDescription}
        isDisabled={loading || moduleName !== value.trim()}
        slotInput={
          <UITextField
            disabled={loading}
            placeholder={moduleName}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        }
      />
    </Dialog>
  );
}

export default DeleteModuleDialog;
