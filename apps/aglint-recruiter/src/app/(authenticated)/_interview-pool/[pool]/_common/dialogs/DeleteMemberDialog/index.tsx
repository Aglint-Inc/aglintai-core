import { Skeleton } from '@components/ui/skeleton';
import { useEffect, useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import {
  setIsDeleteMemberDialogOpen,
  setSelUser,
  useModulesStore,
} from '../../../../../../../components/Scheduling/InterviewTypes/store';
import { useDeleteRelationHandler } from '../../hooks/useDeleteRelationHandler';
import { type useModuleAndUsers } from '../../hooks/useModuleAndUsers';

function DeleteMemberDialog() {
  const isDeleteMemberDialogOpen = useModulesStore(
    (state) => state.isDeleteMemberDialogOpen,
  );
  const utils = api.useUtils();
  const selUser = useModulesStore((state) => state.selUser);
  const [connectedJobs, setConnectedJobs] = useState<
    {
      id: string;
      job_title: string;
    }[]
  >([]);
  const [isOngoingSchedules, setIsOngoingSchedules] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { deleteRelationByUserId } = useDeleteRelationHandler();

  useEffect(() => {
    if (selUser?.user_id && isDeleteMemberDialogOpen) {
      fetchSessionDetails();
    }
  }, [selUser?.user_id]);

  const fetchSessionDetails = async () => {
    try {
      const { data: meetDet } = await supabase
        .from('meeting_details')
        .select('*')
        .contains('confirmed_user_ids', [selUser.user_id])
        .eq('module_id', selUser.module_id)
        .eq('status', 'confirmed')
        .throwOnError();

      if (meetDet.length > 0) {
        setIsOngoingSchedules(true);
      } else {
        setIsOngoingSchedules(false);
      }

      const { data: meetInt } = await supabase
        .from('meeting_interviewers')
        .select('*')
        .eq('interview_module_relation_id', selUser.id)
        .is('meeting_id', null)
        .throwOnError();

      const { data: jobs } = await supabase
        .from('public_jobs')
        .select('id,job_title')
        .in(
          'id',
          meetInt.flatMap((meet) => meet.job_id),
        )
        .throwOnError();

      setConnectedJobs(jobs);
    } catch (e) {
      //
    } finally {
      setIsFetching(false);
    }
  };

  const resetState = () => {
    setIsFetching(true);
    setSelUser(null);
    setConnectedJobs([]);
    setIsDeleteMemberDialogOpen(false);
    setIsOngoingSchedules(false);
    setIsSaving(false);
  };

  const onClickRemove = async (
    selUser: ReturnType<typeof useModuleAndUsers>['data']['relations'][0],
  ) => {
    try {
      if (selUser.id && !isOngoingSchedules) {
        setIsSaving(true);
        await deleteRelationByUserId({
          module_relation_id: selUser.id,
        });
        setIsDeleteMemberDialogOpen(false);
        await utils.interview_pool.module_and_users.invalidate({
          module_id: selUser.module_id,
        });
      }
    } catch (e) {
      toast.error('Failed to remove member.Please contact support');
    } finally {
      setIsSaving(false);
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
            isLoading={isSaving}
            disabled={isOngoingSchedules || isFetching}
            variant='destructive'
            onClick={async () => {
              if (isSaving) return;
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

        {isFetching ? (
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
                {connectedJobs.length > 0 ? (
                  <UIAlert
                    color={'warning'}
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
                          If the user exists in previously scheduled interviews,
                          the user will be removed from those schedules.
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
      </div>
    </UIDialog>
  );
}

export default DeleteMemberDialog;