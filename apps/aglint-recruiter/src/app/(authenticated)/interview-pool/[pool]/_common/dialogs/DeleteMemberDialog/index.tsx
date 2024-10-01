import { Skeleton } from '@components/ui/skeleton';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';
import { api } from '@/trpc/client';
import toast from '@/utils/toast';

import { type useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import {
  setIsDeleteMemberDialogOpen,
  setSelUser,
  useModulesStore,
} from '../../stores/store';

function DeleteMemberDialog() {
  const isDeleteMemberDialogOpen = useModulesStore(
    (state) => state.isDeleteMemberDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);

  const { data, isLoading, isError } =
    api.interview_pool.delete_user.fetch_relations.useQuery(
      {
        module_id: selUser?.module_id ?? '',
        selected_user_id: selUser?.user_id ?? '',
      },
      {
        enabled: !!selUser?.module_id && !!selUser?.user_id,
      },
    );

  const { mutateAsync, isPending } =
    api.interview_pool.delete_user.delete_relation.useMutation();

  const connectedJobs = data?.connectedJobs ?? [];
  const isOngoingSchedules = data?.isOngoingSchedules ?? false;

  const resetState = () => {
    if (isPending) return;
    setSelUser(null);
    setIsDeleteMemberDialogOpen(false);
  };

  const onClickRemove = async (
    selUser: NonNullable<
      ReturnType<typeof useModuleAndUsers>['data']
    >['relations'][0],
  ) => {
    try {
      if (selUser.id && !isOngoingSchedules) {
        await mutateAsync({
          relation_id: selUser.id,
        });
        resetState();
      }
    } catch (e) {
      toast.error('Failed to remove member.Please contact support');
    }
  };

  return (
    <UIDialog
      open={isDeleteMemberDialogOpen}
      title='Remove member'
      onClose={resetState}
      slotButtons={
        <>
          <UIButton variant='secondary' onClick={resetState}>
            Cancel
          </UIButton>
          <UIButton
            isLoading={isPending}
            disabled={isOngoingSchedules || isLoading || isError}
            variant='destructive'
            onClick={async () => {
              if (isPending || !selUser) return;
              onClickRemove(selUser);
            }}
          >
            Remove
          </UIButton>
        </>
      }
    >
      <div className='flex flex-col gap-2'>
        <UITypography type='small' color='neutral'>
          By clicking remove, the member will be permanently removed from this
          interview type.
        </UITypography>

        {isLoading ? (
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[250px]' />
          </div>
        ) : (
          <>
            {isOngoingSchedules ? (
              <UIAlert
                type='small'
                color={'error'}
                iconName={'CircleAlert'}
                title={'User cannot be removed'}
                description={`There are ongoing schedules for this user. Once the schedules are completed, you can remove the user.`}
              />
            ) : (
              <>
                {isError ? (
                  <UIAlert
                    type='small'
                    color='error'
                    iconName='CircleAlert'
                    title='Error'
                    description='Failed to fetch data. Please contact support.'
                  />
                ) : (
                  <>
                    {' '}
                    {connectedJobs.length > 0 ? (
                      <UIAlert
                        color={'warning'}
                        type='small'
                        iconName={'TriangleAlert'}
                        title={`Here is a list of job's interview plan that will be impacted:`}
                        actions={
                          <div className='flex flex-col space-y-2'>
                            <UITypography type='small' color='neutral'>
                              {connectedJobs
                                .flatMap((job) => job.job_title)
                                .join(', ')}
                            </UITypography>
                            <UITypography type='small' color='neutral'>
                              If the user exists in previously scheduled
                              interviews, the user will be removed from those
                              schedules.
                            </UITypography>
                          </div>
                        }
                      />
                    ) : (
                      <UIAlert
                        type={'small'}
                        color={'warning'}
                        iconName={'TriangleAlert'}
                        title={`Note :`}
                        description='User is not connected to any interview plan. If user exist in previous scheduled interviews, the user will be removed from those schedules.'
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </UIDialog>
  );
}

export default DeleteMemberDialog;
