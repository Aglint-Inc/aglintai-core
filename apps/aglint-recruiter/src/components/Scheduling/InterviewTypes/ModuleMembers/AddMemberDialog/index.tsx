import { Dialog } from '@mui/material';
import { useState } from 'react';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import toast from '@/src/utils/toast';

import MembersAutoComplete from '../../../Common/MembersTextField';
import { useAddMemberHandler } from '../../queries/hooks';
import {
  setIsAddMemberDialogOpen,
  setSelectedUsers,
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

  return (
    <Dialog
      open={isAddMemberDialogOpen}
      onClose={() => {
        setIsAddMemberDialogOpen(false);
        setSelectedUsers([]);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={
          trainingStatus === 'qualified'
            ? 'Add Qualified Members'
            : 'Add Trainee Members'
        }
        textPopupDescription={'Choose members from your team.'}
        isIcon={false}
        slotWidget={
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
        }
        isWidget={true}
        onClickCancel={{
          onClick: () => {
            setIsAddMemberDialogOpen(false);
            setSelectedUsers([]);
          },
        }}
        onClickAction={{
          onClick: () => {
            if (!loading) onClickAddMember();
          },
        }}
        textPopupButton={'Add'}
      />
    </Dialog>
  );
}

export default AddMemberDialog;
