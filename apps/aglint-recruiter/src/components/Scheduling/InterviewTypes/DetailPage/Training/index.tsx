import { getFullName } from '@aglint/shared-utils';
import { Checkbox, Dialog, Drawer, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { Text } from '@/devlink/Text';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { ModuleSetting } from '@/devlink2/ModuleSetting';
import { TrainingSetting } from '@/devlink2/TrainingSetting';
import { TrainingSettingItem } from '@/devlink2/TrainingSettingItem';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import Icon from '@/src/components/Common/Icons/Icon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import MuiNumberfield from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/MuiNumberfield';
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
  const [disableOpen, setDisableOpen] = React.useState(false);
  const [isBannerLoading, setBannerLoading] = useState(false);
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
    if (localModule.settings.reqruire_approval) {
      if (selectedUsers.length === 0) {
        setErrorApproval(true);
        return false;
      }
    }
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
          settings: {
            ...localModule.settings,
          },
        })
        .eq('id', editModule.id)
        .select()
        .throwOnError();

      updateApproveUsers(
        editModule.settings.approve_users,
        selectedUsers.map((sel) => sel.user_id),
        editModule.id,
      );

      await refetch();
      setIsModuleSettingsDialogOpen(false);
    } catch (e) {
      toast.error('Failed to update module');
    } finally {
      setErrorApproval(false);
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

  const enableDiabaleTraining = async ({
    type,
  }: {
    type: 'enable' | 'disable';
  }) => {
    try {
      setBannerLoading(true);
      await supabase
        .from('interview_module')
        .update({
          settings: {
            ...localModule.settings,
            require_training: type === 'disable' ? false : true,
          },
        })
        .eq('id', editModule.id)
        .select()
        .throwOnError();
      await refetch();

      updateApproveUsers(
        editModule.settings.approve_users,
        selectedUsers.map((sel) => sel.user_id),
        editModule.id,
      );

      await refetch();
      setIsModuleSettingsDialogOpen(false);
    } catch (e) {
      toast.error('Failed to update module');
    } finally {
      setBannerLoading(false);
      setOpen(false);
      setDisableOpen(false);
    }
  };

  const [isDisableError, setDisableError] = useState(false);
  const disableError = () => {
    setDisableError(true);
    setTimeout(() => {
      setDisableError(false);
    }, 5000);
  };

  return (
    <Stack p={'var(--space-4)'} spacing={'var(--space-4)'} maxWidth={'900px'}>
      {!editModule?.settings?.require_training && (
        <GlobalBanner
          textTitle='To add trainee interviewers and track their progress, enable training using the button on the right.'
          textDescription=''
          color={'warning'}
          slotButtons={
            <ButtonSolid
              textButton='Enable'
              isLoading={isBannerLoading}
              isDisabled={isBannerLoading}
              size={1}
              onClickButton={{
                onClick: () => enableDiabaleTraining({ type: 'enable' }),
              }}
            />
          }
        />
      )}
      {editModule?.settings?.require_training && (
        <Stack>
          <Stack marginBottom={'16px'}>
            <Text content='Trainee' weight={'medium'} />
          </Stack>

          <TrainingSetting
            isApprovalVisible={editModule?.settings?.reqruire_approval}
            isDisable={!editModule?.settings?.require_training}
            isEnable={editModule?.settings?.require_training}
            textHeading={
              editModule?.settings?.require_training
                ? 'Click on settings to adjust the default training settings, such as the number of shadow and reverse shadow interviews required.'
                : 'Training is disabled for this module'
            }
            textShadow={`${editModule.settings.noShadow} shadow interviews required by each trainee`}
            textReverseShadow={`${editModule.settings.noReverseShadow} reverse shadow interviews required by each trainee`}
            slotButton={
              checkPermissions(['interview_types']) ? (
                <ButtonSoft
                  textButton='Settings'
                  iconName='settings'
                  isDisabled={!editModule?.settings?.require_training}
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
              <Link href={`/user/profile/${user.user_id}`} key={i}>
                <TrainingSettingItem
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
              </Link>
            ))}
          />
        </Stack>
      )}
      {editModule?.settings?.require_training && (
        <Stack spacing={'var(--space-4)'}>
          <SlotTrainingMembers editModule={editModule} refetch={refetch} />
        </Stack>
      )}
      <Drawer
        anchor={'right'}
        open={open}
        onClose={() => {
          if (
            !_.isEqual(
              {
                ...localModule?.settings,
                approve_users: selectedUsers
                  ?.map((user) => user.user_id)
                  .sort(),
              },
              {
                ...editModule?.settings,
                approve_users: editModule?.settings.approve_users.sort(),
              },
            )
          ) {
            setTimeout(() => {
              setEditLocalModule(() => ({
                ...localModule,
                settings: { ...editModule.settings },
              }));
              setSelectedUsers(() =>
                dropDownMembers.filter((mem) =>
                  editModule?.settings.approve_users.includes(mem.user_id),
                ),
              );
            }, 500);
          }
          setOpen(false);
        }}
      >
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
                textButton='Close'
                size={2}
                onClickButton={{ onClick: () => setOpen(false) }}
              />
              <ButtonSolid
                textButton='Update'
                size={2}
                isDisabled={
                  isSaving ||
                  (localModule?.settings.reqruire_approval &&
                    selectedUsers.length === 0) ||
                  _.isEqual(
                    {
                      ...localModule?.settings,
                      approve_users: selectedUsers.map((user) => user.user_id),
                    },
                    editModule?.settings,
                  )
                }
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
            <>
              {localModule && (
                <ModuleSetting
                  onClickClose={{
                    onClick: () => setIsModuleSettingsDialogOpen(false),
                  }}
                  isDisable={!localModule?.settings?.require_training}
                  isRequireTrainingVisible={true}
                  isApprovalDoneVisible={
                    localModule?.settings?.reqruire_approval
                  }
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
                    <>
                      <MembersAutoComplete
                        error={errorApproval || selectedUsers.length === 0}
                        disabled={false}
                        renderUsers={dropDownMembers}
                        setSelectedUsers={setSelectedUsers}
                        selectedUsers={selectedUsers}
                        pillColor='var(--neutral-3)'
                        maxWidth='430px'
                        setError={setErrorApproval}
                      />
                      {selectedUsers.length === 0 && (
                        <Typography
                          color={'var(--error-9)'}
                          mb={'var(--space-2)'}
                          pt={'2px'}
                        >
                          <Icon
                            height='12px'
                            color={'var(--error-9)'}
                            variant='AlertIcon'
                          />
                          Please select users to approve or uncheck require
                          approval
                        </Typography>
                      )}
                    </>
                  }
                  slotInputNoOfReverse={
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                      <IconButtonSoft
                        isDisabled={localModule.settings.noReverseShadow === 1}
                        color={'neutral'}
                        iconName='remove'
                        size={1}
                        onClickButton={{
                          onClick: () => {
                            setEditLocalModule((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                noReverseShadow: Number(
                                  localModule.settings.noReverseShadow - 1,
                                ),
                              },
                            }));
                          },
                        }}
                      />
                      <MuiNumberfield
                        width='80px'
                        isMarginTop={false}
                        value={localModule.settings.noReverseShadow}
                        isDebounceEnable={false}
                        handleSelect={(value) =>
                          setEditLocalModule((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              noReverseShadow:
                                value === 0
                                  ? editModule.settings.noReverseShadow
                                  : value,
                            },
                          }))
                        }
                      />
                      <IconButtonSoft
                        iconName='Add'
                        size={1}
                        color={'neutral'}
                        onClickButton={{
                          onClick: () => {
                            setEditLocalModule((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                noReverseShadow: Number(
                                  localModule.settings.noReverseShadow + 1,
                                ),
                              },
                            }));
                          },
                        }}
                      />
                    </Stack>
                  }
                  slotInputNoOfShadow={
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                      <IconButtonSoft
                        isDisabled={localModule.settings.noShadow === 1}
                        color={'neutral'}
                        iconName='remove'
                        size={1}
                        onClickButton={{
                          onClick: () => {
                            setEditLocalModule((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                noShadow: Number(
                                  localModule.settings.noShadow - 1,
                                ),
                              },
                            }));
                          },
                        }}
                      />
                      <MuiNumberfield
                        width='80px'
                        isMarginTop={false}
                        value={localModule.settings.noShadow}
                        isDebounceEnable={false}
                        handleSelect={(value) =>
                          setEditLocalModule((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              noShadow:
                                value === 0
                                  ? editModule.settings.noShadow
                                  : value,
                            },
                          }))
                        }
                      />
                      <IconButtonSoft
                        iconName='Add'
                        size={1}
                        color={'neutral'}
                        onClickButton={{
                          onClick: () => {
                            setEditLocalModule((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                noShadow: Number(
                                  localModule.settings.noShadow + 1,
                                ),
                              },
                            }));
                          },
                        }}
                      />
                    </Stack>
                  }
                />
              )}
              {editModule?.settings?.require_training && (
                <Stack marginInline={2}>
                  <GlobalBannerShort
                    color={'error'}
                    textTitle='Disable Training'
                    textDescription='Disabling training will stop tracking trainee progress and remove access to trainee interviewer features.'
                    slotButtons={
                      <>
                        <ButtonSolid
                          textButton='Disable'
                          color={'error'}
                          onClickButton={{
                            onClick: () => {
                              if (
                                localModule.relations.filter(
                                  (relation) =>
                                    relation.training_status === 'training' &&
                                    !relation.is_archived,
                                ).length > 0
                              ) {
                                // toast.warning(
                                //   'Cannot disable training while members are still in training.',
                                // );
                                disableError();
                              } else {
                                setDisableOpen(true);
                              }
                            },
                          }}
                        />
                      </>
                    }
                  />

                  {isDisableError && (
                    <Typography mt={1} color={'error'}>
                      <Icon
                        height='12px'
                        color={'var(--error-9)'}
                        variant='AlertIcon'
                      />
                      Cannot disable training while members are still in
                      training.
                    </Typography>
                  )}
                </Stack>
              )}
            </>
          }
        />
      </Drawer>
      <Dialog open={disableOpen} onClose={() => setDisableOpen(false)}>
        <DcPopup
          popupName={'Disable Training'}
          slotBody={
            <>
              <Typography>
                Are you sure you want to disable training?
              </Typography>
              <Stack>
                <ul>
                  <li>Stop tracking trainee progress</li>
                  <li>Remove access to trainee interviewer features</li>
                </ul>
              </Stack>
            </>
          }
          onClickClosePopup={{ onClick: () => setDisableOpen(false) }}
          slotButtons={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{ onClick: () => setDisableOpen(false) }}
              />
              <ButtonSolid
                size={2}
                isLoading={isBannerLoading}
                isDisabled={isBannerLoading}
                color={'error'}
                textButton='Disable Training'
                onClickButton={{
                  onClick: () => {
                    enableDiabaleTraining({ type: 'disable' });
                  },
                }}
              />
            </>
          }
        />
      </Dialog>
    </Stack>
  );
}

export default ModuleSettingComp;

// {
//   onClick: () => {
//     enableDiabaleTraining({ type: 'disable' });
//   },
// }
