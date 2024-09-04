import { Dialog } from '@mui/material';

import { useToast } from '@/components/hooks/use-toast';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';

import { setIsMovedToQualifiedDialogOpen, useModulesStore } from '../../store';

function MoveToQualifiedDialog({ refetch }: { refetch: () => void }) {
  const { toast } = useToast();
  const { recruiterUser } = useAuthDetails();
  const { members } = useSchedulingContext();
  const isMovedToQualifiedDialogOpen = useModulesStore(
    (state) => state.isMovedToQualifiedDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);

  const moveToQualified = async () => {
    try {
      await supabase
        .from('interview_module_relation')
        .update({
          training_status: 'qualified',
          training_approver: recruiterUser.user_id,
        })
        .eq('id', selUser.id)
        .throwOnError();
      refetch();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
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
      <DcPopup
        popupName={'Move to Qualified'}
        slotBody={`Are you sure you want to move ${members.find((user) => user.user_id == selUser.user_id)?.first_name} to qualified?`}
        onClickClosePopup={{
          onClick: () => {
            setIsMovedToQualifiedDialogOpen(false);
          },
        }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setIsMovedToQualifiedDialogOpen(false);
                },
              }}
            />
            <ButtonSolid
              size={2}
              textButton={'Move'}
              onClickButton={{ onClick: moveToQualified }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default MoveToQualifiedDialog;
