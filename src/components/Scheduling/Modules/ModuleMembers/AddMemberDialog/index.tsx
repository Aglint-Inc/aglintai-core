import { Dialog } from '@mui/material';
import { useState } from 'react';

import { ConfirmationPopup } from '@/devlink3';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { InterviewModuleRelationType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import MembersAutoComplete from './MembersTextField';
import {
  addMembersSchedulingStore,
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  useSchedulingStore
} from '../../store';
import { addMemberbyUserIds } from '../../utils';

function AddMemberDialog() {
  const { members } = useSchedulingContext();
  const [loading, setLoading] = useState(false); // used to disable multiple clicks
  const isAddMemberDialogOpen = useSchedulingStore(
    (state) => state.isAddMemberDialogOpen
  );
  const editModule = useSchedulingStore((state) => state.editModule);
  const selectedUsers = useSchedulingStore((state) => state.selectedUsers);
  const trainingStatus = useSchedulingStore((state) => state.trainingStatus);

  const addMemberHandler = async () => {
    try {
      if (!selectedUsers.length || !editModule.id) {
        setIsAddMemberDialogOpen(false);
        return;
      }
      setLoading(true);
      const { data, error } = await addMemberbyUserIds({
        module_id: editModule.id,
        user_ids: selectedUsers.map((user) => user.user_id),
        training_status: trainingStatus
      });
      if (error) {
        throw new Error();
      }
      addMembersSchedulingStore(data as InterviewModuleRelationType[]);
    } catch (e) {
      toast.error('Error adding panel members');
    } finally {
      setLoading(false);
    }
  };

  const allMembers = members.filter(
    (user) =>
      editModule?.relations?.findIndex(
        (rel) => rel.user_id === user.user_id
      ) === -1
  );

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px'
        }
      }}
      open={isAddMemberDialogOpen}
      onClose={() => {
        setIsAddMemberDialogOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={
          trainingStatus === 'qualified'
            ? 'Add Qualified Members'
            : 'Add Trainee Members'
        }
        textPopupDescription={
          'Select interview panel members from your team list.'
        }
        isIcon={false}
        slotWidget={
          <MembersAutoComplete
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
          }
        }}
        onClickAction={{
          onClick: addMemberHandler
        }}
        textPopupButton={editModule?.relations.length > 0 ? 'Add' : 'Create'}
      />
    </Dialog>
  );
}

export default AddMemberDialog;
