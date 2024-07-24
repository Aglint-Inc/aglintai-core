import { getFullName } from '@aglint/shared-utils';
import {
  Checkbox,
  Drawer,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ModuleSetting } from '@/devlink2/ModuleSetting';
import { TrainingSetting } from '@/devlink2/TrainingSetting';
import { TrainingSettingItem } from '@/devlink2/TrainingSettingItem';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MembersAutoComplete, {
  MemberTypeAutoComplete,
} from '../../../Common/MembersTextField';
import { setIsModuleSettingsDialogOpen } from '../../store';
import { ModuleType } from '../../types';
import SlotTrainingMembers from '../SlotBodyComp/SlotTrainingMembers';

function ModuleSettingComp({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) {
  const { members } = useSchedulingContext();
  const [localModule, setEditLocalModule] = useState<ModuleType | null>(null);
  const [errorApproval, setErrorApproval] = useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<
    MemberTypeAutoComplete[]
  >([]);
  const { checkPermissions } = useRolesAndPermissions();
  const [open, setOpen] = React.useState(false);

  const [isSaving, setIsSaving] = useState(false);

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
    try {
      setIsSaving(true);
      if (
        localModule.settings.reqruire_approval &&
        selectedUsers.length === 0
      ) {
        setErrorApproval(true);
        return;
      }
      await supabase
        .from('interview_module')
        .update({
          name: localModule.name,
          description: localModule.description,
          settings: {
            ...localModule.settings,
          },
          department: localModule.department,
        })
        .eq('id', editModule.id)
        .select()
        .throwOnError();

      updateApproveUsers(
        editModule.settings.approve_users,
        selectedUsers.map((sel) => sel.user_id),
        editModule.id,
      );

      refetch();
      setIsModuleSettingsDialogOpen(false);
    } catch (e) {
      toast.error('Failed to update module');
    } finally {
      setIsSaving(false);
      setOpen(false);
    }
  };

  const updateApproveUsers = async (
    olduser_ids: string[],
    newuser_ids: string[],
    module_id: string,
  ) => {
    // Calculate the difference
    const usersToDelete = olduser_ids.filter(
      (user_id) => !newuser_ids.includes(user_id),
    );
    const usersToInsert = newuser_ids.filter(
      (user_id) => !olduser_ids.includes(user_id),
    );

    // Delete users no longer approved
    if (usersToDelete.length > 0) {
      await supabase
        .from('interview_module_approve_users')
        .delete()
        .in('user_id', usersToDelete);
    }

    // Insert new approved users
    if (usersToInsert.length > 0) {
      await supabase
        .from('interview_module_approve_users')
        .insert(usersToInsert.map((user_id) => ({ user_id, module_id })));
    }
  };

  const qualifiedUserIds =
    editModule?.relations
      .filter((s) => s.training_status === 'qualified')
      .map((s) => s.user_id) || [];

  const dropDownMembers = members.filter((mem) =>
    qualifiedUserIds.includes(mem.user_id),
  );

  const approvers = members.filter((member) =>
    editModule.settings.approve_users.includes(member.user_id),
  );
  return (
    <Stack p={'var(--space-4)'} spacing={2} maxWidth={'900px'}>
      <TrainingSetting
        isDisable={!localModule?.settings?.require_training}
        isEnable={localModule?.settings?.require_training}
        textDisable={'sdjfksdfj'}
        textHeading={
          localModule?.settings?.require_training
            ? 'Training is enabled for this module'
            : 'Training is disabled for this module'
        }
        textShadow={`${editModule.settings.noShadow} shadow interviews required by each trainee`}
        textReverseShadow={`${editModule.settings.noReverseShadow} reverse shadow interviews required by each trainee`}
        slotButton={
          checkPermissions(['interview_types']) ? (
            <ButtonSoft
              textButton='Settings'
              iconName='settings'
              isLeftIcon
              size={1}
              onClickButton={{ onClick: () => setOpen(true) }}
              color={'neutral'}
            />
          ) : (
            <></>
          )
        }
        slotApproval={approvers.map((user, i) => (
          <TrainingSettingItem
            key={i}
            text={getFullName(user.first_name, user.last_name)}
            slotImage={
              <MuiAvatar
                src={user.profile_image}
                level={getFullName(user?.first_name, user?.last_name)}
                variant='rounded'
                height='20px'
                width='20px'
                fontSize='12px'
              />
            }
          />
        ))}
      />
      {localModule?.settings?.require_training && (
        <SlotTrainingMembers editModule={editModule} />
      )}
      <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
        <SideDrawerLarge
          drawerSize={'small'}
          textDrawertitle='Training members update'
          onClickCancel={{
            onClick: () => setOpen(false),
          }}
          slotButtons={
            <>
              <ButtonSoft
                color={'neutral'}
                textButton='Back'
                size={2}
                onClickButton={{ onClick: () => setOpen(false) }}
              />
              <ButtonSolid
                textButton='Update'
                size={2}
                isDisabled={isSaving}
                isLoading={isSaving}
                onClickButton={{
                  onClick: () => {
                    if (!isSaving) {
                      updateModule();
                    }
                  },
                }}
              />
            </>
          }
          slotSideDrawerbody={
            localModule && (
              <ModuleSetting
                onClickClose={{
                  onClick: () => setIsModuleSettingsDialogOpen(false),
                }}
                isDisable={!localModule?.settings?.require_training}
                slotRequiresTrainingToggle={
                  <Switch
                    size='small'
                    checked={localModule?.settings?.require_training}
                    onChange={() => {
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
                    }}
                  />
                }
                isRequireTrainingVisible={true}
                isApprovalDoneVisible={localModule?.settings?.reqruire_approval}
                slotCheckbox={
                  <Checkbox
                    checked={localModule?.settings?.reqruire_approval}
                    onChange={() => {
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          reqruire_approval: !prev.settings.reqruire_approval,
                        },
                      }));
                    }}
                  />
                }
                slotButtonPrimary={<></>}
                slotApprovalDoneInput={
                  <MembersAutoComplete
                    error={errorApproval}
                    helperText='Please select users to approve or uncheck require approval'
                    disabled={false}
                    renderUsers={dropDownMembers}
                    setSelectedUsers={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    pillColor='var(--neutral-3)'
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
            )
          }
        />
      </Drawer>
    </Stack>
  );
}

export default ModuleSettingComp;
