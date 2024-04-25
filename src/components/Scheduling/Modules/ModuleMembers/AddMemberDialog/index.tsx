import { Dialog } from '@mui/material';
import { useState } from 'react';

import { ConfirmationPopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import MembersAutoComplete from '../../../Common/MembersTextField';
import { useAddMemberHandler } from '../../queries/hooks';
import {
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  useModulesStore,
} from '../../store';
import { ModuleType } from '../../types';

function AddMemberDialog({ editModule }: { editModule: ModuleType }) {
  const { recruiter } = useAuthDetails();
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
      ) === -1 &&
      (user.email.split('@')[1] === recruiter.email.split('@')[1] ||
        !!user.schedule_auth),
  );

  const onClickAddMember = async () => {
    setLoading(true);
    await addMemberHandler({
      module_id: editModule.id,
      selectedUsers: selectedUsers,
      trainingStatus: trainingStatus,
    });
    setIsAddMemberDialogOpen(false);
    setSelectedUsers([]);
    setLoading(false);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
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
            pillColor='grey.200'
            disabled={loading}
            renderUsers={allMembers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
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
          onClick: onClickAddMember,
        }}
        textPopupButton={'Add'}
      />
    </Dialog>
  );
}

export default AddMemberDialog;
