import { Dialog, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import toast from '@/src/utils/toast';

import MembersAutoComplete from '../../../Common/MembersTextField';
import { useAddMemberHandler } from '../../queries/hooks';
import {
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  setTrainingStatus,
  useModulesStore,
} from '../../store';
import { ModuleType } from '../../types';

function AddMemberDialog({ editModule }: { editModule: ModuleType }) {
  const { members } = useSchedulingContext();
  const [loading, setLoading] = useState(false);
  const isAddMemberDialogOpen = useModulesStore(
    (state) => state.isAddMemberDialogOpen,
  );
  const selectedUsers = useModulesStore((state) => state.selectedUsers);
  const trainingStatus = useModulesStore((state) => state.trainingStatus);
  const initalOpen = useModulesStore((state) => state.initalOpen);

  const { addMemberHandler } = useAddMemberHandler();

  const allMembers = members.filter(
    (user) =>
      editModule?.relations?.findIndex(
        (rel) => rel.user_id === user.user_id,
      ) === -1,
  );

  const onClickAddMember = async () => {
    try {
      setLoading(true);
      await addMemberHandler({
        module_id: editModule.id,
        selectedUsers: selectedUsers,
        trainingStatus: trainingStatus,
      });
      setIsAddMemberDialogOpen(false);
      setSelectedUsers([]);
    } catch {
      toast.error('Error adding member.');
    } finally {
      setLoading(false);
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
          trainingStatus === 'qualified'
            ? 'Add Qualified Members'
            : 'Add Trainee Members'
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
              pillColor='var(--neutral-2)'
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
