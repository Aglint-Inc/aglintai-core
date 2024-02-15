import { Drawer, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { InterviewPanelSidebar, PanelMemberPill } from '@/devlink2';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import {
  setEditPanel,
  setInterviewPanels,
  setIsCreateDialogOpen,
  setPanelName,
  setSelectedUsers,
  useSchedulingStore,
} from './../store';
import TeamAutoComplete from './TeamTextField';
import { createPanel, editPanel } from '../utils';

function CreateDialog() {
  const { recruiter, members } = useAuthDetails();
  const router = useRouter();
  const isCreatePanelOpen = useSchedulingStore(
    (state) => state.isCreateDialogOpen,
  );
  const selectedUsers = useSchedulingStore((state) => state.selectedUsers);
  const panelName = useSchedulingStore((state) => state.panelName);
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);
  const editPanelDetails = useSchedulingStore((state) => state.editPanel);
  const [loading, setLoading] = useState(false);

  const createPanelHandler = async () => {
    try {
      setLoading(true);
      const res = await createPanel({
        name: panelName,
        recruiter_id: recruiter.id,
        selectedUsers,
      });
      setInterviewPanels([
        ...interviewPanels,
        { ...res.interviewPanel, relations: res.interviewPanelRelations },
      ]);
      setIsCreateDialogOpen(null);
      setSelectedUsers([]);
      setPanelName('');
    } catch (e) {
      toast.error('Error creating panel');
      setIsCreateDialogOpen(null);
    } finally {
      setLoading(false);
    }
  };

  const editPanelHandler = async () => {
    try {
      setLoading(true);

      const res = await editPanel({
        name: panelName,
        selectedUsers,
        panel: editPanelDetails,
      });
      setInterviewPanels(
        interviewPanels.map((panel) => {
          if (panel.id === editPanelDetails.id) {
            return {
              ...panel,
              name: res.name,
              relations: res.updatedRelations,
            };
          }
          return panel;
        }),
      );
      setEditPanel({
        ...editPanelDetails,
        name: res.name,
        relations: res.updatedRelations,
      });
      close();
    } catch (e) {
      toast.error('Error editing panel');
      setIsCreateDialogOpen(null);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    if (isCreatePanelOpen == 'create') {
      setSelectedUsers([]);
      setPanelName('');
    }
    setIsCreateDialogOpen(null);
  };

  const checkCandidate = (user) => {
    console.log('checkCandidate', user);

    // setSelectedUsers(
    //   selectedUsers.filter(
    //     (us) => us.user_id !== user.user_id,
    //   ),
    // );
  };

  return (
    <Drawer
      anchor={'right'}
      open={isCreatePanelOpen !== null}
      onClose={() => {
        if (!loading) {
          close();
        }
      }}
    >
      <Stack sx={{ width: '450px', overflow: 'hidden' }}>
        <InterviewPanelSidebar
          isNoTeamFound={members.length === 0}
          onClickInvite={{
            onClick: () => {
              router.push(pageRoutes.COMPANY + '?tab=team');
            },
          }}
          slotLoader={
            <Stack width={16} height={16}>
              <LoaderGrey />
            </Stack>
          }
          isLoading={loading}
          isButtonEnabled={selectedUsers.length > 0 && panelName.length > 0}
          slotPanelNameInput={
            <UITextField
              disabled={loading}
              placeholder='Enter Panel Name'
              value={panelName}
              onChange={(e) => {
                setPanelName(e.target.value);
              }}
            />
          }
          slotPanelMemberDropdown={<TeamAutoComplete loading={loading} />}
          onClickButton={{
            onClick: () => {
              if (!loading) {
                if (isCreatePanelOpen == 'create') {
                  createPanelHandler();
                }
                if (isCreatePanelOpen == 'edit') {
                  editPanelHandler();
                }
              }
            },
          }}
          isMemberEmpty={selectedUsers.length === 0}
          slotPanelMemberPills={selectedUsers.map((user) => {
            return (
              <PanelMemberPill
                key={user.user_id}
                onClickClose={{
                  onClick: () => {
                    if (isCreatePanelOpen == 'edit') {
                      checkCandidate(user);
                    } else {
                      setSelectedUsers(
                        selectedUsers.filter(
                          (us) => us.user_id !== user.user_id,
                        ),
                      );
                    }
                  },
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
          textButton={
            isCreatePanelOpen == 'create' ? 'Create Panel' : 'Save Changes'
          }
          textPanelMemberDescription={
            isCreatePanelOpen == 'create'
              ? 'Select interview panel members from your team list.'
              : 'Add new members by selecting from the list below and remove them by clicking the close icon next to their name.'
          }
          textPanelMemberTitle={
            isCreatePanelOpen == 'create'
              ? 'Choose team members'
              : 'Panel Members'
          }
          textTitle={
            isCreatePanelOpen == 'create'
              ? 'Create Interview Panel'
              : 'Edit Interview Panel'
          }
          onClickClose={{
            onClick: () => {
              close();
            },
          }}
        />
      </Stack>
    </Drawer>
  );
}

export default CreateDialog;
