import Typography from '@components/typography';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { Skeleton } from '@components/ui/skeleton';
import { UIAlert } from '@components/ui-alert';

import type { FetchRelations } from '@/routers/interview_pool/delete_user/fetch_relations';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
import toast from '@/utils/toast';

import type { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import {
  setIsDeleteMemberDialogOpen,
  setSelUser,
  useModulesStore,
} from '../../stores/store';

const useFetchRelations = (): ProcedureQuery<FetchRelations> => {
  const selUser = useModulesStore((state) => state.selUser);
  return api.interview_pool.delete_user.fetch_relations.useQuery(
    {
      module_id: selUser?.module_id ?? '',
      selected_user_id: selUser?.user_id ?? '',
    },
    {
      enabled: !!selUser?.module_id && !!selUser?.user_id,
    },
  );
};

function DeleteMemberDialog() {
  const isDeleteMemberDialogOpen = useModulesStore(
    (state) => state.isDeleteMemberDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);

  const { data, isLoading, isError } = useFetchRelations();

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
    <AlertDialog open={isDeleteMemberDialogOpen} onOpenChange={resetState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this member? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-col gap-2'>
          <Typography type='small' color='neutral'>
            By clicking remove, the member will be permanently removed from this
            interview type.
          </Typography>

          {isLoading ? (
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[250px]' />
            </div>
          ) : (
            <>
              {isOngoingSchedules ? (
                <UIAlert type='error' title='User cannot be removed'>
                  <div className='mt-2 flex flex-col space-y-2'>
                    <Typography
                      variant='small'
                      className='text-muted-foreground'
                    >
                      There are ongoing schedules for this user. Once the
                      schedules are completed, you can remove the user.
                    </Typography>
                  </div>
                </UIAlert>
              ) : (
                <>
                  {isError ? (
                    <UIAlert type='error' title='Error'>
                      <div className='mt-2 flex flex-col space-y-2'>
                        <Typography
                          variant='small'
                          className='text-muted-foreground'
                        >
                          Failed to fetch data. Please contact support.
                        </Typography>
                      </div>
                    </UIAlert>
                  ) : (
                    <>
                      {' '}
                      {connectedJobs.length > 0 ? (
                        <UIAlert
                          type='warning'
                          title="Here is a list of job's interview plan that will be impacted:"
                        >
                          <div className='mt-2 flex flex-col space-y-2'>
                            <Typography
                              variant='small'
                              className='text-muted-foreground'
                            >
                              {connectedJobs
                                .map((job) => job.job_title)
                                .join(', ')}
                            </Typography>
                            <Typography
                              variant='small'
                              className='text-muted-foreground'
                            >
                              If the user exists in previously scheduled
                              interviews, the user will be removed from those
                              schedules.
                            </Typography>
                          </div>
                        </UIAlert>
                      ) : (
                        <UIAlert type='warning' title='Note :'>
                          User is not connected to any interview plan. If user
                          exists in previous scheduled interviews, the user will
                          be removed from those schedules.
                        </UIAlert>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetState}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (isPending || !selUser) return;
              onClickRemove(selUser);
            }}
            disabled={isOngoingSchedules || isLoading || isError}
          >
            {isPending ? 'Removing...' : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteMemberDialog;
