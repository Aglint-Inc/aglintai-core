import {
  Autocomplete,
  capitalize,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { ButtonPrimaryRegular, Checkbox } from '@/devlink';
import { ModuleSetting } from '@/devlink2';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MembersAutoComplete, {
  MemberTypeAutoComplete,
} from '../../../Common/MembersTextField';
import { QueryKeysInteviewModules } from '../../queries/type';
import { setIsModuleSettingsDialogOpen } from '../../store';
import { ModuleType } from '../../types';

function ModuleSettingComp({ editModule }: { editModule: ModuleType }) {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();

  const { members } = useSchedulingContext();
  const [localModule, setEditLocalModule] = useState<ModuleType | null>(null);
  const [errorApproval, setErrorApproval] = useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<
    MemberTypeAutoComplete[]
  >([]);

  useEffect(() => {
    if (editModule) {
      setEditLocalModule(editModule);
      setSelectedUsers(
        members.filter((member) =>
          editModule.settings.approve_users.includes(member.user_id),
        ),
      );
    }
  }, [editModule, members]);

  const updateModule = async () => {
    if (localModule.settings.reqruire_approval && selectedUsers.length === 0) {
      setErrorApproval(true);
      return;
    }
    const { data, error } = await supabase
      .from('interview_module')
      .update({
        name: localModule.name,
        description: localModule.description,
        settings: {
          ...localModule.settings,
          approve_users: selectedUsers.map((sel) => sel.user_id),
        },
        department: localModule.department,
      })
      .eq('id', editModule.id)
      .select();
    if (!error) {
      const updatedEditModule = {
        ...editModule,
        ...data[0],
      } as ModuleType;

      queryClient.setQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({
          moduleId: editModule.id,
        }),
        {
          ...updatedEditModule,
        },
      );
      setIsModuleSettingsDialogOpen(false);
    }
  };

  const qualifiedUserIds =
    editModule?.relations
      .filter((s) => s.training_status === 'qualified')
      .map((s) => s.user_id) || [];

  const dropDownMembers = members.filter((mem) =>
    qualifiedUserIds.includes(mem.user_id),
  );

  return (
    <>
      {localModule && (
        <ModuleSetting
          onClickClose={{
            onClick: () => setIsModuleSettingsDialogOpen(false),
          }}
          slotModuleNameInput={
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder='Ex: Initial Screening'
                value={localModule.name}
                onChange={(e) =>
                  setEditLocalModule((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Stack gap={'5px'}>
                <UITypography type={'small'} fontBold={'default'}>
                  Department
                </UITypography>
                <Autocomplete
                  fullWidth
                  value={localModule.department}
                  onChange={(event: any, newValue: string | null) => {
                    setEditLocalModule((prev) => ({
                      ...prev,
                      department: newValue,
                    }));
                  }}
                  options={recruiter?.departments?.map((departments) =>
                    capitalize(departments),
                  )}
                  renderInput={(params) => (
                    <TextField
                      margin='none'
                      {...params}
                      name='department'
                      placeholder='Select Department'
                    />
                  )}
                />
              </Stack>
              <UITextField
                label='Objective'
                multiline
                placeholder='Add a brief description of the interview'
                fullWidth
                value={localModule.description}
                onChange={(e) => {
                  setEditLocalModule((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </Stack>
          }
          isRequireTrainingVisible={localModule?.settings?.require_training}
          slotRequiresTrainingToggle={
            <Checkbox
              isChecked={localModule?.settings?.require_training}
              onClickCheck={{
                onClick: () => {
                  if (
                    localModule.relations.filter(
                      (relation) => relation.training_status === 'training',
                    ).length == 0
                  ) {
                    {
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          require_training: !prev.settings.require_training,
                        },
                      }));
                    }
                  } else if (
                    localModule.settings.require_training === false &&
                    localModule.relations.filter(
                      (relation) => relation.training_status === 'training',
                    ).length > 0
                  ) {
                    //this condition is not needed actually just temporary
                    setEditLocalModule((prev) => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        require_training: !prev.settings.require_training,
                      },
                    }));
                  } else {
                    toast.warning(
                      'Cannot disable training while members are still in training.',
                    );
                  }
                },
              }}
            />
          }
          isApprovalDoneVisible={localModule?.settings?.reqruire_approval}
          slotCheckbox={
            <Checkbox
              isChecked={localModule?.settings?.reqruire_approval}
              onClickCheck={{
                onClick: () => {
                  setEditLocalModule((prev) => ({
                    ...prev,
                    settings: {
                      ...prev.settings,
                      reqruire_approval: !prev.settings.reqruire_approval,
                    },
                  }));
                },
              }}
            />
          }
          slotButtonPrimary={
            <ButtonPrimaryRegular
              textLabel={'Update'}
              onClickButton={{
                onClick: updateModule,
              }}
            />
          }
          slotApprovalDoneInput={
            <MembersAutoComplete
              error={errorApproval}
              helperText='Please select users to approve or uncheck require approval'
              disabled={false}
              renderUsers={dropDownMembers}
              setSelectedUsers={setSelectedUsers}
              selectedUsers={selectedUsers}
              pillColor='#fff'
              maxWidth='430px'
              setError={setErrorApproval}
            />
          }
          slotInputNoOfReverse={
            <TextField
              sx={{ width: '200px' }}
              select
              value={localModule.settings.noReverseShadow}
              onChange={(e) => {
                setEditLocalModule((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    noReverseShadow: Number(e.target.value),
                  },
                }));
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
              sx={{ width: '200px' }}
              select
              value={localModule.settings.noShadow}
              onChange={(e) => {
                setEditLocalModule((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    noShadow: Number(e.target.value),
                  },
                }));
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
    </>
  );
}

export default ModuleSettingComp;
