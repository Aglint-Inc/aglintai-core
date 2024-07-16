import { Dialog } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CloseJobModal } from '@/devlink/CloseJobModal';
import UITextField from '@/src/components/Common/UITextField';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { QueryKeysInteviewModules } from '../../../queries/type';
import { setIsArchiveDialogOpen, useModulesStore } from '../../../store';
import { ModuleType } from '../../../types';

function ArchiveModuleDialog({ editModule }: { editModule: ModuleType }) {
  const isArchiveDialogOpen = useModulesStore(
    (state) => state.isArchiveDialogOpen,
  );
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const archiveModule = async () => {
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
          const { error } = await supabase
            .from('interview_module')
            .update({
              is_archived: true,
            })
            .eq('id', editModule.id);
          if (!error) {
            const updatedEditModule = {
              ...editModule,
              is_archived: true,
            } as ModuleType;
            queryClient.setQueryData<ModuleType>(
              QueryKeysInteviewModules.USERS_BY_MODULE_ID({
                moduleId: editModule.id,
              }),
              {
                ...updatedEditModule,
              },
            );
            toast.success('Interview type archived successfully.');
          } else {
            throw new Error();
          }
        } else {
          toast.warning(
            'Cannot archive interview type; active schedules are present for this type.',
          );
        }
      } catch {
        toast.error('Error archiving interview type.');
      } finally {
        setLoading(false);
        setIsArchiveDialogOpen(false);
      }
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  };

  const moduleName = (editModule?.name ?? '').trim();
  const moduleDescription = (editModule?.description ?? '').trim();

  const onClose = useCallback(() => {
    if (!loading) {
      setIsArchiveDialogOpen(false);
      setTimeout(() => setValue(''), 400);
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  }, [loading]);

  return (
    <Dialog open={isArchiveDialogOpen} onClose={onClose}>
      <CloseJobModal
        textPopupTitle={`Archive`}
        textWarning={`By clicking archive the interview type will not be available to select in interview plans while scheduling.`}
        textButton={'Archive'}
        textJobTitle={moduleName}
        onClickCloseJob={{ onClick: onClose }}
        slotButton={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{ onClick: () => onClose() }}
            />
            <ButtonSolid
              textButton='Archive'
              size={2}
              onClickButton={{
                onClick: () => {
                  if (editModule.id) archiveModule();
                },
              }}
              isDisabled={loading || moduleName !== value.trim()}
            />
          </>
        }
        textLocation={moduleDescription}
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

export default ArchiveModuleDialog;
