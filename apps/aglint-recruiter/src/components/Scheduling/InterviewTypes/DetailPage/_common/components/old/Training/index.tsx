import { getFullName } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { ModuleSetting } from '@devlink2/ModuleSetting';
import _ from 'lodash';
import { AlertCircle, Minus, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UIDrawer from '@/components/Common/UIDrawer';
import UITypography from '@/components/Common/UITypography';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/utils/supabase/client';

import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from '../../../../../../Common/MembersTextField';
import { TrainingSettingItem } from '../../../../../_common/TraningSettingItem';
import { TrainingSetting } from '../../../../../_common/TraninigSetting';
import { setIsModuleSettingsDialogOpen } from '../../../../../store';
import { type ModuleType } from '../../../../../types';
import SlotTrainingMembers from '../SlotTrainingMembers';

function ModuleSettingComp({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) {
  const { toast } = useToast();
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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update module',
      });
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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update module',
      });
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
    <div className='p-4 space-y-4 max-w-[900px]'>
      {!editModule?.settings?.require_training && (
        <UIAlert
          type='small'
          title='To add trainee interviewers and track their progress, enable training using the button on the right.'
          color={'warning'}
          actions={
            <UIButton
              variant='default'
              size='sm'
              disabled={isBannerLoading}
              onClick={() => enableDiabaleTraining({ type: 'enable' })}
            >
              {isBannerLoading ? 'Loading...' : 'Enable'}
            </UIButton>
          }
        />
      )}
      {editModule?.settings?.require_training && (
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>Trainee</p>

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
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setOpen(true)}
                >
                  <Settings className='w-4 h-4 mr-2' />
                  Settings
                </Button>
              ) : (
                <></>
              )
            }
            slotApproval={approvers.map((user, i) => (
              <Link href={`/user/profile/${user.user_id}`} key={i}>
                <TrainingSettingItem
                  text={getFullName(user.first_name, user.last_name)}
                  image={
                    <Avatar className='w-[20px] h-[20px]'>
                      <AvatarImage src={user.profile_image} alt='@shadcn' />
                      <AvatarFallback>
                        {getFullName(user?.first_name, user?.last_name)}
                      </AvatarFallback>
                    </Avatar>
                  }
                />
              </Link>
            ))}
          />
        </div>
      )}
      {editModule?.settings?.require_training && (
        <div className='flex flex-col gap-4'>
          <SlotTrainingMembers editModule={editModule} refetch={refetch} />
        </div>
      )}
      <UIDrawer
        size='sm'
        title='Training members update'
        open={open}
        slotBottom={
          <>
            <Button
              className='w-full'
              variant='outline'
              size='lg'
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button
              className='w-full'
              variant='default'
              size='lg'
              disabled={
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
              onClick={() => {
                if (!isSaving) {
                  updateModule();
                }
              }}
            >
              {isSaving ? 'Updating...' : 'Update'}
            </Button>
          </>
        }
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
        <>
          {localModule && (
            <ModuleSetting
              onClickClose={{
                onClick: () => setIsModuleSettingsDialogOpen(false),
              }}
              isDisable={!localModule?.settings?.require_training}
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
                <>
                  <MembersAutoComplete
                    error={errorApproval || selectedUsers.length === 0}
                    renderUsers={dropDownMembers}
                    setSelectedUsers={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    pillColor='var(--neutral-3)'
                    maxWidth='430px'
                    onUserSelect={() => setErrorApproval(false)}
                  />
                  {selectedUsers.length === 0 && (
                    <div className='text-error-9 mb-2 pt-2 flex items-center'>
                      <AlertCircle className='h-3 w-3 text-error-9 mr-1' />
                      Please select users to approve or uncheck require approval
                    </div>
                  )}
                </>
              }
              slotInputNoOfReverse={
                <div className='flex items-center gap-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={localModule.settings.noReverseShadow === 1}
                    onClick={() => {
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          noReverseShadow: Number(
                            localModule.settings.noReverseShadow - 1,
                          ),
                        },
                      }));
                    }}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <Input
                    className='w-20'
                    type='number'
                    value={localModule.settings.noReverseShadow}
                    onChange={(e) =>
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          noReverseShadow:
                            Number(e.target.value) === 0
                              ? editModule.settings.noReverseShadow
                              : Number(e.target.value),
                        },
                      }))
                    }
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          noReverseShadow: Number(
                            localModule.settings.noReverseShadow + 1,
                          ),
                        },
                      }));
                    }}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              }
              slotInputNoOfShadow={
                <div className='flex items-center gap-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={localModule.settings.noShadow === 1}
                    onClick={() => {
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          noShadow: Number(localModule.settings.noShadow - 1),
                        },
                      }));
                    }}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <Input
                    className='w-20'
                    type='number'
                    value={localModule.settings.noShadow}
                    onChange={(e) =>
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          noShadow:
                            Number(e.target.value) === 0
                              ? editModule.settings.noShadow
                              : Number(e.target.value),
                        },
                      }))
                    }
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setEditLocalModule((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          noShadow: Number(localModule.settings.noShadow + 1),
                        },
                      }));
                    }}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              }
            />
          )}
          {editModule?.settings?.require_training && (
            <div className='mx-2'>
              <UIAlert
                color={'error'}
                title='Disable Training'
                description='Disabling training will stop tracking trainee progress and remove access to trainee interviewer features.'
                actions={
                  <>
                    <UIButton
                      variant='destructive'
                      onClick={() => {
                        if (
                          localModule.relations.filter(
                            (relation) =>
                              relation.training_status === 'training' &&
                              !relation.is_archived,
                          ).length > 0
                        ) {
                          disableError();
                        } else {
                          setDisableOpen(true);
                        }
                      }}
                    >
                      Disable
                    </UIButton>
                  </>
                }
              />

              {isDisableError && (
                <div className='text-error mt-1 flex items-center'>
                  <AlertCircle size={12} className='text-error-9 mr-1' />
                  Cannot disable training while members are still in training.
                </div>
              )}
            </div>
          )}
        </>
      </UIDrawer>
      <UIDialog
        title='Disable Training'
        open={disableOpen}
        onClose={() => setDisableOpen(false)}
        slotButtons={
          <>
            <UIButton
              variant='outline'
              size='sm'
              onClick={() => setDisableOpen(false)}
            >
              Cancel
            </UIButton>

            <UIButton
              variant='destructive'
              size='sm'
              isLoading={isBannerLoading}
              disabled={isBannerLoading}
              onClick={() => enableDiabaleTraining({ type: 'disable' })}
            >
              Disable Training
            </UIButton>
          </>
        }
      >
        <>
          <UITypography>
            Are you sure you want to disable training?
          </UITypography>
          <div>
            <ol>
              <li>Stop tracking trainee progress</li>
              <li>Remove access to trainee interviewer features</li>
            </ol>
          </div>
        </>
      </UIDialog>
    </div>
  );
}

export default ModuleSettingComp;
