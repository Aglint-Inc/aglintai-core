import { useToast } from '@components/hooks/use-toast';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';
import { api } from '@/trpc/client';

import MembersAutoComplete from '../../../../../Common/MembersTextField';
import {
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  setTrainingStatus,
  useModulesStore,
} from '../../../../store';
import { useAddMemberHandler } from '../../hooks/useAddMemberHandler';
import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';

function AddMemberDialog() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { members } = useSchedulingContext();
  const [loading, setLoading] = useState(false);
  const isAddMemberDialogOpen = useModulesStore(
    (state) => state.isAddMemberDialogOpen,
  );
  const selectedUsers = useModulesStore((state) => state.selectedUsers);
  const trainingStatus = useModulesStore((state) => state.trainingStatus);
  const initalOpen = useModulesStore((state) => state.initalOpen);

  const { data: editModule } = useModuleAndUsers();

  const { addMemberHandler } = useAddMemberHandler({
    editModule,
  });

  const relations = editModule?.relations.filter((rel) => !rel.is_archived);

  const allMembers = members.filter(
    (user) =>
      relations?.findIndex((rel) => rel.user_id === user.user_id) === -1,
  );

  const onClickAddMember = async () => {
    try {
      setLoading(true);
      await addMemberHandler({
        selectedUsers: selectedUsers,
        trainingStatus: trainingStatus,
      });
      setIsAddMemberDialogOpen(false);
      setSelectedUsers([]);
      await utils.interview_pool.module_and_users.invalidate({
        module_id: editModule.id,
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error adding member.',
      });
    } finally {
      // extra time for refetching
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
            isLoading={loading}
            disabled={selectedUsers.length === 0}
            onClick={() => {
              if (!loading) onClickAddMember();
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
          pillColor='var(--neutral-3)'
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
