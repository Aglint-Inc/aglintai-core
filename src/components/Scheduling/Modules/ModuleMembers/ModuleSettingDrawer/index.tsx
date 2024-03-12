import { Drawer, MenuItem, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';

import { ButtonPrimaryRegular, Checkbox } from '@/devlink';
import { ModuleSetting } from '@/devlink2';
import {
  MemberType,
  useSchedulingContext
} from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';

import MembersAutoComplete from '../AddMemberDialog/MembersTextField';
import {
  setEditModule,
  setInterviewModules,
  setIsModuleSettingsDialogOpen,
  useSchedulingStore
} from '../../store';
import { ModuleType } from '../../types';

function ModuleSettingDrawer() {
  const isModuleSettingsDialogOpen = useSchedulingStore(
    (state) => state.isModuleSettingsDialogOpen
  );
  const interviewModules = useSchedulingStore(
    (state) => state.interviewModules
  );
  const { members } = useSchedulingContext();
  const editModule = useSchedulingStore((state) => state.editModule);
  const [moduleName, setModuleName] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<MemberType[]>([]);

  useEffect(() => {
    if (editModule) {
      setModuleName(editModule.name);
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
        settings: {
          ...editModule.settings,
          approve_users: selectedUsers.map((user) => user.user_id)
        }
      })
      .eq('id', editModule.id)
      .select();
    if (!error) {
      interviewModules.find((module) => module.id === editModule.id).name =
        moduleName;
      interviewModules.find((module) => module.id === editModule.id).settings =
        editModule.settings;
      setInterviewModules([...interviewModules]);
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
            <TextField
              fullWidth
              placeholder='Module Name'
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          }
          isRequireTrainingVisible={editModule?.settings?.require_training}
          slotRequiresTrainingToggle={
            <Checkbox
              isChecked={editModule?.settings?.require_training}
              onClickCheck={{
                onClick: () => {
                  setEditModule({
                    settings: {
                      ...editModule.settings,
                      require_training: !editModule.settings.require_training
                    }
                  });
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
            />
          }
          slotInputNoOfReverse={
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
