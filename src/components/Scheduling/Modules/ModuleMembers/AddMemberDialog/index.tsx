import { Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { PanelMemberPill } from '@/devlink2';
import { ConfirmationPopup } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { InterviewModuleRelationType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MembersAutoComplete from './MembersTextField';
import {
  setEditModule,
  setInterviewModules,
  setIsAddMemberDialogOpen,
  setSelectedUsers,
  useSchedulingStore
} from '../../store';

function AddMemberDialog() {
  const { members } = useAuthDetails();
  const { isAddMemberDialogOpen, selectedUsers, editModule, interviewModules } =
    useSchedulingStore();
  const [loading, setLoading] = useState(false);

  const addMemberHandler = async () => {
    try {
      if (!selectedUsers.length || !editModule.id) {
        setIsAddMemberDialogOpen(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('interview_module_relation')
        .insert(
          selectedUsers.map((user) => ({
            user_id: user.user_id,
            module_id: editModule.id
          }))
        )
        .select();
      if (error) {
        throw new Error();
      }
      setEditModule({
        ...editModule,
        relations: [
          ...(editModule.relations || []),
          ...data
        ] as InterviewModuleRelationType[]
      });
      interviewModules.map((module) => {
        if (module.id === editModule.id) {
          module.relations = [
            ...(module.relations || []),
            ...data
          ] as InterviewModuleRelationType[];
        } else {
          module;
        }
      });
      setInterviewModules([...interviewModules]);
      setIsAddMemberDialogOpen(false);
      setSelectedUsers([]);
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
