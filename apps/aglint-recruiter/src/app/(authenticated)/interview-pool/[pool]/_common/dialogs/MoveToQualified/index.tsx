import { getFullName } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useMemberList } from '@/hooks/useMemberList';
import { supabase } from '@/utils/supabase/client';

import {
  setIsMovedToQualifiedDialogOpen,
  useModulesStore,
} from '../../stores/store';

function MoveToQualifiedDialog({ refetch }: { refetch: () => void }) {
  const { toast } = useToast();
  const { recruiterUser } = useAuthDetails();
  // const { members } = useSchedulingContext();
  const { data: members } = useMemberList();
  const isMovedToQualifiedDialogOpen = useModulesStore(
    (state) => state.isMovedToQualifiedDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);
  const [isSaving, setIsSaving] = useState(false);

  const moveToQualified = async () => {
    try {
      setIsSaving(true);
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
      setIsSaving(false);
      setIsMovedToQualifiedDialogOpen(false);
    }
  };

  const user = members?.find((user) => user?.user_id == selUser?.user_id);

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
          >
            Cancel
          </UIButton>
          <UIButton
            variant='default'
            isLoading={isSaving}
            onClick={moveToQualified}
          >
            Move
          </UIButton>
        </>
      }
    >
      {`Are you sure you want to move ${getFullName(user?.first_name, user?.last_name)} to qualified?`}
    </UIDialog>
  );
}

export default MoveToQualifiedDialog;
