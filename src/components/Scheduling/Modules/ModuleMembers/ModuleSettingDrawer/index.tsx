import { Drawer, MenuItem, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';

import { ButtonPrimaryRegular, Checkbox } from '@/devlink';
import { ModuleSetting } from '@/devlink2';
import UITextField from '@/src/components/Common/UITextField';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MembersAutoComplete from '../AddMemberDialog/MembersTextField';
import {
  setEditModule,
  setIsModuleSettingsDialogOpen,
  useSchedulingStore
} from '../../store';
import { MemberType, ModuleType } from '../../types';

function ModuleSettingDrawer() {
  const isModuleSettingsDialogOpen = useSchedulingStore(
    (state) => state.isModuleSettingsDialogOpen
  );
  const { members } = useSchedulingContext();
  const editModule = useSchedulingStore((state) => state.editModule);
  const [moduleName, setModuleName] = React.useState('');
  const [objective, setObjective] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<MemberType[]>([]);

  useEffect(() => {
    if (editModule) {
      setModuleName(editModule.name);
      setObjective(editModule.description);
      setSelectedUsers(
        members.filter((member) =>
          editModule.settings.approve_users.includes(member.user_id)
        )
      );
    }
  }, [editModule]);

  const updateModule = async () => {
    const { data, error } = await supabase
      .from('interview_module')
      .update({
        name: moduleName,
        description: objective,
        settings: {
          ...editModule.settings,
          approve_users: selectedUsers.map((user) => user.user_id)
        }
      })
      .eq('id', editModule.id)
      .select();
    if (!error) {
      setEditModule(data[0] as ModuleType);
      setIsModuleSettingsDialogOpen(false);
    }
  };

  return (
    <Drawer
      anchor={'right'}
      open={isModuleSettingsDialogOpen}
      onClose={() => {
        setIsModuleSettingsDialogOpen(false);
      }}
    >
      {editModule && (
        <ModuleSetting
          onClickClose={{
            onClick: () => setIsModuleSettingsDialogOpen(false)
          }}
          slotModuleNameInput={
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder='Module Name'
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
              <UITextField
                label='Objective'
                multiline
                placeholder='Ex. Node JS Developer'
                fullWidth
                value={objective}
                onChange={(e) => {
                  setObjective(e.target.value);
                }}
              />
            </Stack>
          }
          isRequireTrainingVisible={editModule?.settings?.require_training}
          slotRequiresTrainingToggle={
            <Checkbox
              isChecked={editModule?.settings?.require_training}
              onClickCheck={{
                onClick: () => {
                  if (
                    editModule.relations.filter(
                      (relation) => relation.training_status === 'training'
                    ).length == 0
                  ) {
                    {
                      setEditModule({
                        settings: {
                          ...editModule.settings,
                          require_training:
                            !editModule.settings.require_training
                        }
                      });
                    }
                  } else if (
                    editModule.settings.require_training === false &&
                    editModule.relations.filter(
                      (relation) => relation.training_status === 'training'
                    ).length > 0
                  ) {
                    //this condition is not needed actually just temporary
                    setEditModule({
                      settings: {
                        ...editModule.settings,
                        require_training: !editModule.settings.require_training
                      }
                    });
                  } else {
                    toast.error(
                      'Cannot disable training when there are members in training'
                    );
                  }
                }
              }}
            />
          }
          isApprovalDoneVisible={editModule?.settings?.reqruire_approval}
          slotCheckbox={
            <Checkbox
              isChecked={editModule?.settings?.reqruire_approval}
              onClickCheck={{
                onClick: () => {
                  setEditModule({
                    settings: {
                      ...editModule.settings,
                      reqruire_approval: !editModule.settings.reqruire_approval
                    }
                  });
                }
              }}
            />
          }
          slotButtonPrimary={
            <Stack width={'100%'}>
              <ButtonPrimaryRegular
                textLabel={'Save Changes'}
                onClickButton={{
                  onClick: updateModule
                }}
              />
            </Stack>
          }
          slotApprovalDoneInput={
            <MembersAutoComplete
              disabled={false}
              renderUsers={members}
              setSelectedUsers={setSelectedUsers}
              selectedUsers={selectedUsers}
              pillColor='#fff'
            />
          }
          slotInputNoOfReverse={
            <TextField
              select
              value={editModule.settings.noReverseShadow}
              onChange={(e) => {
                setEditModule({
                  settings: {
                    ...editModule.settings,
                    noReverseShadow: Number(e.target.value)
                  }
                });
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </TextField>
          }
          slotInputNoOfShadow={
            <TextField
              select
              value={editModule.settings.noShadow}
              onChange={(e) => {
                setEditModule({
                  settings: {
                    ...editModule.settings,
                    noShadow: Number(e.target.value)
                  }
                });
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </TextField>
          }
        />
      )}
    </Drawer>
  );
}

export default ModuleSettingDrawer;
