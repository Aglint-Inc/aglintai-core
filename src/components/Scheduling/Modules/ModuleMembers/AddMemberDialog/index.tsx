import { Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { PanelMemberPill } from '@/devlink2';
import { ConfirmationPopup } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
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

  const addMemberHandler = async () => {
    try {
      if (!selectedUsers.length || !editModule.id) {
        setIsAddMemberDialogOpen(false);
        return;
      }
      setLoading(true);
      const { data, error } = await addMemberbyUserIds({
        module_id: editModule.id,
        user_ids: selectedUsers.map((user) => user.user_id)
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
        textPopupTitle={'Add Members'}
        textPopupDescription={
          'Select interview panel members from your team list.'
        }
        isIcon={false}
        slotWidget={
          <Stack spacing={2} width={'100%'}>
            <Stack gap={1} direction={'row'} sx={{ flexWrap: 'wrap' }}>
              {selectedUsers.map((user) => {
                return (
                  <PanelMemberPill
                    key={user.user_id}
                    onClickClose={{
                      onClick: () => {
                        setSelectedUsers(
                          selectedUsers.filter(
                            (us) => us.user_id !== user.user_id
                          )
                        );
                      }
                    }}
                    slotImage={
                      <MuiAvatar
                        src={user.profile_image}
                        level={user.first_name}
                        variant='circular'
                        height='24px'
                        width='24px'
                        fontSize='12px'
                      />
                    }
                    textMemberName={user.first_name}
                  />
                );
              })}
            </Stack>

            <MembersAutoComplete
              disabled={loading}
              renderUsers={allMembers}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </Stack>
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
