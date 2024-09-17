import { Skeleton } from '@components/ui/skeleton';
import { useEffect, useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { deleteRelationByUserDbDelete } from '../../../InterviewTypes/DetailPage/_common/utils/utils';
import {
  setisRemoveModuleDialogOpen,
  setSelRelation,
  useInterviewerDetailStore,
} from '../store';

//

function DeleteMemberDialog({ refetch }: { refetch: () => void }) {
  const { isRemoveModuleDialogOpen, selRelation } = useInterviewerDetailStore();
  const [connectedJobs, setConnectedJobs] = useState<
    {
      id: string;
      job_title: string;
    }[]
  >([]);
  const [isOngoingSchedules, setIsOngoingSchedules] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSessionDetails = async () => {
    try {
      const { data: meetDet } = await supabase
        .from('meeting_details')
        .select('*')
        .contains('confirmed_user_ids', [selRelation.user_id])
        .eq('module_id', selRelation.module_id)
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
        .eq('interview_module_relation_id', selRelation.id)
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

  const onClickRemove = async (selRelation) => {
    try {
      if (selRelation.id && !isOngoingSchedules) {
        setIsSaving(true);
        await deleteRelationByUserDbDelete({
          module_relation_id: selRelation.id,
        });
        setisRemoveModuleDialogOpen(false);
      }
      refetch();
    } catch (e) {
      toast.error('Failed to remove member.Please contact support');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (selRelation?.id && isRemoveModuleDialogOpen) {
      fetchSessionDetails();
    }
  }, [selRelation?.id]);

  const close = () => {
    if (isSaving) return;
    setisRemoveModuleDialogOpen(false);
    setSelRelation(null);
    setIsFetching(true);
  };

  return (
    <>
      <UIDialog
        open={isRemoveModuleDialogOpen}
        title='Remove Member'
        onClose={close}
        slotButtons={
          <>
            <UIButton size='sm' variant='secondary' onClick={close}>
              Cancel
            </UIButton>
            <UIButton
              size='sm'
              disabled={isOngoingSchedules || isFetching || isSaving}
              isLoading={isSaving}
              onClick={async () => {
                if (isSaving) return;
                onClickRemove(selRelation);
              }}
            >
              Remove
            </UIButton>
          </>
        }
      >
        <>
          <p className='text-sm text-muted-foreground'>
            By clicking remove the member will be permanently removed from this
            interview type
          </p>
          {isFetching ? (
            <div className='flex flex-col space-y-2'>
              <Skeleton className='mb-2 h-3 w-full' />
              <Skeleton className='mb-2 h-3 w-full' />
              <Skeleton className='h-3 w-3/4' />
            </div>
          ) : (
            <div className='flex flex-col space-y-2'>
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
                          <p className='text-sm text-muted-foreground'>
                            {connectedJobs
                              .flatMap((job) => job.job_title)
                              .join(', ')}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            If user exist in previous scheduled interviews, the
                            user will be removed from those schedules.
                          </p>
                        </div>
                      }
                    />
                  ) : (
                    <UIAlert
                      color={'warning'}
                      iconName={'TriangleAlert'}
                      title={`Note :`}
                      description='User is not connected to any interview plan. If user exist in previous scheduled interviews, the user will be removed from those schedules.'
                    />
                  )}
                </>
              )}
            </div>
          )}
        </>
      </UIDialog>
    </>
  );
}

export default DeleteMemberDialog;
