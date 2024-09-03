import { Dialog, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';

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
    <Dialog
      open={isAddMemberDialogOpen}
      onClose={() => {
        setIsAddMemberDialogOpen(false);
        setSelectedUsers([]);
      }}
    >
      <DcPopup
        popupName={
          trainingStatus === 'qualified' ? 'Add Interviewers' : 'Add Trainee.'
        }
        onClickClosePopup={{
          onClick: () => {
            setIsAddMemberDialogOpen(false);
            setSelectedUsers([]);
          },
        }}
        slotBody={
          <Stack>
            <Typography marginBottom={1}>
              Choose members from your team.
            </Typography>
            <MembersAutoComplete
              maxWidth={'100%'}
              pillColor='var(--neutral-4)'
              disabled={loading}
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
          </Stack>
        }
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              textButton='Cancel'
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setIsAddMemberDialogOpen(false);
                  setSelectedUsers([]);
                },
              }}
            />

            <ButtonSolid
              size={2}
              textButton='Add'
              isDisabled={selectedUsers.length === 0}
              isLoading={loading}
              onClickButton={{
                onClick: () => {
                  if (!loading) onClickAddMember();
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default AddMemberDialog;
