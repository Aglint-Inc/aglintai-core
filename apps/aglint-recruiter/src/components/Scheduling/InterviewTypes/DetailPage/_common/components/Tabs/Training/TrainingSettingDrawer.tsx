import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import _ from 'lodash';
import { AlertCircle, Minus, Plus, X } from 'lucide-react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDrawer from '@/components/Common/UIDrawer';
import UITextField from '@/components/Common/UITextField';
import MembersAutoComplete from '@/components/Scheduling/Common/MembersTextField';
import {
  setIsModuleSettingsDialogOpen,
  setLocalModule,
  useModulesStore,
} from '@/components/Scheduling/InterviewTypes/store';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';

import { type useEnableDisableTraining } from '../../../hooks/useEnableDisableTraining';
import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';

function TrainingSettingDrawer(
  props: ReturnType<typeof useEnableDisableTraining>,
) {
  const {
    disableError,
    errorApproval,
    isDisableError,
    open,
    selectedUsers,
    setErrorApproval,
    setDisableOpen,
    setOpen,
    setSelectedUsers,
    isSaving,
    updateModule,
  } = props;
  const { data: editModule } = useModuleAndUsers();
  const { localModule } = useModulesStore((state) => ({
    localModule: state.localModule,
  }));

  const { members } = useSchedulingContext();

  const qualifiedUserIds =
    editModule?.relations
      .filter((s) => s.training_status === 'qualified')
      .map((s) => s.user_id) || [];

  const dropDownMembers = members.filter((mem) =>
    qualifiedUserIds.includes(mem.user_id),
  );

  return (
    <UIDrawer
      size='sm'
      title='Training Settings'
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
              approve_users: selectedUsers?.map((user) => user.user_id).sort(),
            },
            {
              ...editModule?.settings,
              approve_users: editModule?.settings.approve_users.sort(),
            },
          )
        ) {
          setTimeout(() => {
            setLocalModule({
              ...localModule,
              settings: { ...editModule.settings },
            });
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
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Module Settings</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsModuleSettingsDialogOpen(false)}
              >
                <X className='h-5 w-5' />
              </Button>
            </div>

            <div
              className={`space-y-4 ${!localModule?.settings?.require_training ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className='flex items-center space-x-2'>
                <Checkbox
                  checked={localModule?.settings?.reqruire_approval}
                  onChange={() => {
                    setLocalModule({
                      ...localModule,
                      settings: {
                        ...localModule.settings,
                        reqruire_approval:
                          !localModule.settings.reqruire_approval,
                      },
                    });
                  }}
                  id='require-approval'
                />
                <Label htmlFor='require-approval'>Require Approval</Label>
              </div>

              {localModule?.settings?.reqruire_approval && (
                <div className='space-y-2'>
                  <Label>Approval Users</Label>
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
                    <div className='text-red-500 text-sm flex items-center'>
                      <AlertCircle className='h-3 w-3 mr-1' />
                      Please select users to approve or uncheck require approval
                    </div>
                  )}
                </div>
              )}

              <div className='space-y-2'>
                <Label>Number of Reverse Shadows</Label>
                <div className='flex items-center gap-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={localModule.settings.noReverseShadow === 1}
                    onClick={() => {
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          noReverseShadow: Number(
                            localModule.settings.noReverseShadow - 1,
                          ),
                        },
                      });
                    }}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <UITextField
                    className='w-20'
                    type='number'
                    value={localModule.settings.noReverseShadow}
                    onChange={(e) =>
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          noReverseShadow:
                            Number(e.target.value) === 0
                              ? editModule.settings.noReverseShadow
                              : Number(e.target.value),
                        },
                      })
                    }
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          noReverseShadow: Number(
                            localModule.settings.noReverseShadow + 1,
                          ),
                        },
                      });
                    }}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              <div className='space-y-2'>
                <Label>Number of Shadows</Label>
                <div className='flex items-center gap-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={localModule.settings.noShadow === 1}
                    onClick={() => {
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          noShadow: Number(localModule.settings.noShadow - 1),
                        },
                      });
                    }}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <Input
                    className='w-20'
                    type='number'
                    value={localModule.settings.noShadow}
                    onChange={(e) =>
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          noShadow:
                            Number(e.target.value) === 0
                              ? editModule.settings.noShadow
                              : Number(e.target.value),
                        },
                      })
                    }
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          noShadow: Number(localModule.settings.noShadow + 1),
                        },
                      });
                    }}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
  );
}

export default TrainingSettingDrawer;
