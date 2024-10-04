import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import _ from 'lodash';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import MembersAutoComplete from 'src/app/_common/components/MembersTextField';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDrawer from '@/components/Common/UIDrawer';
import NumberInput from '@/components/Common/UINumberInput';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';

import { type useEnableDisableTraining } from '../../../hooks/useEnableDisableTraining';
import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';
import { setLocalModule, useModulesStore } from '../../../stores/store';
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
            size='md'
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            className='w-full'
            variant='default'
            size='md'
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
                if (
                  localModule?.settings.reqruire_approval &&
                  selectedUsers.length === 0
                ) {
                  setErrorApproval(true);
                } else {
                  updateModule();
                }
              }
            }}
          >
            {isSaving ? 'Updating...' : 'Update'}
          </Button>
        </>
      }
      onClose={() => {
        if (!editModule || !localModule) return;
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
          <div className='space-y-6 p-4'>
            <div
              className={`space-y-4 ${!localModule?.settings?.require_training ? 'pointer-events-none opacity-50' : ''}`}
            >
              <div className='items-left flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Checkbox
                    checked={localModule?.settings?.reqruire_approval}
                    onCheckedChange={(checked) => {
                      setLocalModule({
                        ...localModule,
                        settings: {
                          ...localModule.settings,
                          reqruire_approval: checked === true,
                        },
                      });
                    }}
                    id='require-approval'
                  />
                  <Label htmlFor='require-approval'>Require Approval</Label>
                </div>
                <div className='text-sm text-muted-foreground'>
                  By selecting this option, the approval of the chosen members
                  is required to move a trainee to the qualified stage.
                </div>
              </div>

              {localModule?.settings?.reqruire_approval && (
                <div className='space-y-1 pb-2'>
                  <Label>Approval Users</Label>
                  <MembersAutoComplete
                    error={errorApproval}
                    renderUsers={dropDownMembers}
                    setSelectedUsers={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    pillColor='bg-neutral-200'
                    maxWidth='465px'
                    onUserSelect={() => setErrorApproval(false)}
                  />
                  {errorApproval && selectedUsers.length === 0 && (
                    <div className='flex items-center text-sm text-red-500'>
                      <AlertCircle className='mr-1 h-3 w-3' />
                      Please select users to approve or uncheck require approval
                    </div>
                  )}
                </div>
              )}

              <div className='space-y-2'>
                <Label>Number of Reverse Shadows</Label>
                <NumberInput
                  value={localModule.settings.noReverseShadow}
                  min={1}
                  max={10}
                  inputWidth='w-16'
                  onChange={(newValue) => {
                    setLocalModule({
                      ...localModule,
                      settings: {
                        ...localModule.settings,
                        noReverseShadow: newValue,
                      },
                    });
                  }}
                />
              </div>

              <div className='space-y-2'>
                <Label>Number of Shadows</Label>
                <NumberInput
                  value={localModule.settings.noShadow}
                  min={1}
                  max={10}
                  inputWidth='w-16'
                  onChange={(newValue) => {
                    setLocalModule({
                      ...localModule,
                      settings: {
                        ...localModule.settings,
                        noShadow: newValue,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {editModule?.settings?.require_training && (
          <div className='mx-4 mt-6'>
            <UIAlert
              iconName='Ban'
              type='small'
              color={'error'}
              title='Disable Training'
              description='Disabling training will stop tracking trainee progress and remove access to trainee interviewer features.'
              actions={
                <>
                  <UIButton
                    variant='destructive'
                    onClick={() => {
                      if (
                        editModule.relations.filter(
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
              <Alert variant='error' className='mt-1'>
                <AlertTriangle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Cannot disable training while members are still in training.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </>
    </UIDrawer>
  );
}

export default TrainingSettingDrawer;
