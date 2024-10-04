import { useToast } from '@components/hooks/use-toast';
import { useEffect } from 'react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { api } from '@/trpc/client';

import MembersAutoComplete from '../../../../../../_common/components/MembersTextField';
import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import {
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  setTrainingStatus,
  useModulesStore,
} from '../../stores/store';

function AddMemberDialog() {
  const { toast } = useToast();
  const { data: members } = useMemberList(false, true);
  const isAddMemberDialogOpen = useModulesStore(
    (state) => state.isAddMemberDialogOpen,
  );
  const selectedUsers = useModulesStore((state) => state.selectedUsers);
  const trainingStatus = useModulesStore((state) => state.trainingStatus);
  const initalOpen = useModulesStore((state) => state.initalOpen);
  const { data: editModule } = useModuleAndUsers();

  const { mutateAsync, isPending } = api.interview_pool.add_users.useMutation();

  const relations = editModule?.relations.filter((rel) => !rel.is_archived);

  const allMembers = members.filter(
    (user) =>
      relations?.findIndex((rel) => rel.user_id === user.user_id) === -1,
  );

  const onClickAddMember = async () => {
    if (!editModule || selectedUsers.length === 0) return;
    try {
      await mutateAsync({
        selectedUsers: selectedUsers,
        trainingStatus: trainingStatus,
        relations: editModule.relations,
        pool: {
          id: editModule.id,
          noReverseShadow: editModule.settings.noReverseShadow,
          noShadow: editModule.settings.noShadow,
        },
      });
      setIsAddMemberDialogOpen(false);
      setSelectedUsers([]);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error adding member.',
      });
    }
  };

  //add member button directly open dialog to add member
  useEffect(() => {
    if (initalOpen) {
      setIsAddMemberDialogOpen(Boolean(initalOpen));
      setTrainingStatus(initalOpen);
    }
  }, []);

  return (
    <UIDialog
      title={
        trainingStatus === 'qualified' ? 'Add Interviewers' : 'Add Trainee'
      }
      open={isAddMemberDialogOpen}
      onClose={() => {
        setIsAddMemberDialogOpen(false);
        setSelectedUsers([]);
      }}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            onClick={() => {
              setIsAddMemberDialogOpen(false);
              setSelectedUsers([]);
            }}
          >
            Cancel
          </UIButton>

          <UIButton
            variant='default'
            isLoading={isPending}
            disabled={selectedUsers.length === 0}
            onClick={() => {
              if (!isPending) onClickAddMember();
            }}
          >
            Add
          </UIButton>
        </>
      }
    >
      <div className='flex w-full flex-col'>
        <p className='mb-1'>Choose members from your team.</p>
        <MembersAutoComplete
          maxWidth={'460px'}
          pillColor='bg-neutral-200'
          renderUsers={allMembers}
          selectedUsers={selectedUsers}
          setSelectedUsers={(users) => {
            const updateUsers = users.map((user) => ({
              ...user,
              role: null,
            })); // role is not used in the code
            setSelectedUsers(updateUsers);
          }}
        />
      </div>
    </UIDialog>
  );
}

export default AddMemberDialog;
