import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { useEnableDisableTraining } from '../../../hooks/useEnableDisableTraining';
import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';
import { TrainingSettingItem } from '../../ui/TraningSettingItem';
import { TrainingSetting } from '../../ui/TraninigSetting';
import DisableTrainingDialog from './DisableTrainingDialog';
import TrainingSettingDrawer from './TrainingSettingDrawer';

function EnableDisable() {
  const { data: editModule } = useModuleAndUsers();

  const { checkPermissions } = useRolesAndPermissions();

  const props = useEnableDisableTraining();

  const { enableDiabaleTraining, isBannerLoading, approvers, setOpen } = props;

  return (
    <div>
      <DisableTrainingDialog {...props} />
      <TrainingSettingDrawer {...props} />
      {!editModule?.settings?.require_training ? (
        <UIAlert
          title='To add trainee interviewers and track their progress, enable training using the button on the right.'
          color={'warning'}
          actions={
            <UIButton
              variant='outline'
              size='sm'
              disabled={isBannerLoading}
              onClick={() => enableDiabaleTraining({ type: 'enable' })}
            >
              {isBannerLoading ? 'Loading...' : 'Enable'}
            </UIButton>
          }
        />
      ) : (
        <>
          {
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
          }
        </>
      )}
    </div>
  );
}

export default EnableDisable;
