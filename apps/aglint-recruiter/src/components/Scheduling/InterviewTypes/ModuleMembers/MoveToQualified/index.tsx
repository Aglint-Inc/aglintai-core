import { Dialog } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { QueryKeysInteviewModules } from '../../queries/type';
import { setIsMovedToQualifiedDialogOpen, useModulesStore } from '../../store';
import { ModuleType } from '../../types';

function MoveToQualifiedDialog({ editModule }: { editModule: ModuleType }) {
  const { members } = useSchedulingContext();
  const isMovedToQualifiedDialogOpen = useModulesStore(
    (state) => state.isMovedToQualifiedDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);
  const queryClient = useQueryClient();

  const moveToQualified = async () => {
    try {
      const { error } = await supabase
        .from('interview_module_relation')
        .update({ training_status: 'qualified' })
        .eq('id', selUser.id);
      if (error) throw new Error(error.message);

      const { error: errorSelRel } = await supabase
        .from('interview_session_relation')
        .update({ interviewer_type: 'qualified' })
        .eq('interview_module_relation_id', selUser.id)
        .eq('is_confirmed', false)
        .select();
      if (errorSelRel) throw new Error(error.message);

      const updatedEditModule = {
        ...editModule,
        relations: editModule.relations.map((rel) => {
          if (rel.user_id === selUser.user_id) {
            return { ...rel, training_status: 'qualified' };
          }
          return rel;
        }),
      } as ModuleType;

      queryClient.setQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({
          moduleId: editModule.id,
        }),
        {
          ...updatedEditModule,
        },
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsMovedToQualifiedDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isMovedToQualifiedDialogOpen}
      onClose={() => {
        setIsMovedToQualifiedDialogOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Move to Qualified Members'}
        textPopupDescription={`Are you sure you want to move ${members.find((user) => user.user_id == selUser.user_id)?.first_name} to qualified members?`}
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsMovedToQualifiedDialogOpen(false);
          },
        }}
        onClickAction={{
          onClick: moveToQualified,
        }}
        textPopupButton={'Move'}
      />
    </Dialog>
  );
}

export default MoveToQualifiedDialog;
