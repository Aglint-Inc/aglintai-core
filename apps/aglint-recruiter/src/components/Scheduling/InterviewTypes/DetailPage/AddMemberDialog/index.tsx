import { useToast } from '@components/hooks/use-toast';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import UIDialog from '@/components/Common/UIDialog';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';

import { UIButton } from '@/components/Common/UIButton';
import MembersAutoComplete from '../../../Common/MembersTextField';
import { useAddMemberHandler } from '../../queries/hooks';
import {
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  setTrainingStatus,
  useModulesStore,
} from '../../store';
import { type ModuleType } from '../../types';

function AddMemberDialog({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) {
  //all active members
  const { toast } = useToast();
  const { members } = useSchedulingContext();
  const [loading, setLoading] = useState(false);
  const isAddMemberDialogOpen = useModulesStore(
    (state) => state.isAddMemberDialogOpen,
  );
  const selectedUsers = useModulesStore((state) => state.selectedUsers);
  const trainingStatus = useModulesStore((state) => state.trainingStatus);
  const initalOpen = useModulesStore((state) => state.initalOpen);

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
      await refetch();
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
      <div className='flex flex-col w-full'>
        <Typography marginBottom={1}>Choose members from your team.</Typography>
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
