import { useToast } from '@components/hooks/use-toast';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/utils/supabase/client';

import {
  setIsMovedToQualifiedDialogOpen,
  useModulesStore,
} from '../../../../../../../components/Scheduling/InterviewTypes/store';

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
    <UIDialog
      open={isMovedToQualifiedDialogOpen}
      onClose={() => {
        setIsMovedToQualifiedDialogOpen(false);
      }}
      title={'Move to Qualified'}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            onClick={() => {
              setIsMovedToQualifiedDialogOpen(false);
            }}
          ></UIButton>
          <UIButton variant='default' onClick={moveToQualified}>
            Move
          </UIButton>
        </>
      }
    >
      {`Are you sure you want to move ${members.find((user) => user.user_id == selUser.user_id)?.first_name} to qualified?`}
    </UIDialog>
  );
}

export default MoveToQualifiedDialog;
