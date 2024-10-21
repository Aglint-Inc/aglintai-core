import { getFullName } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { useState } from 'react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';

import {
  setIsMovedToQualifiedDialogOpen,
  useModulesStore,
} from '../../stores/store';

function MoveToQualifiedDialog() {
  const { toast } = useToast();
  const { recruiter_user } = useTenant();
  const { data: members } = useMemberList(false, true);
  const isMovedToQualifiedDialogOpen = useModulesStore(
    (state) => state.isMovedToQualifiedDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);
  const [isSaving, setIsSaving] = useState(false);

  const moveToQualified = async () => {
    if (!selUser) return null;
    try {
      setIsSaving(true);
      await supabase
        .from('interview_module_relation')
        .update({
          training_status: 'qualified',
          training_approver: recruiter_user.user_id,
        })
        .eq('id', selUser.id)
        .throwOnError();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as Error).message,
      });
    } finally {
      setIsSaving(false);
      setIsMovedToQualifiedDialogOpen(false);
    }
  };

  const user = members?.find((user) => user?.user_id == selUser?.user_id);

  return (
    <AlertDialog
      open={isMovedToQualifiedDialogOpen}
      onOpenChange={setIsMovedToQualifiedDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Move to Qualified</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to move{' '}
            {getFullName(user?.first_name ?? '', user?.last_name ?? '')} to
            qualified?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsMovedToQualifiedDialogOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={moveToQualified} disabled={isSaving}>
            {isSaving ? 'Moving...' : 'Move'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MoveToQualifiedDialog;
