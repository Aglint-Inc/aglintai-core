import { Dialog, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { Text } from '@/devlink/Text';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { SkeletonParagraph } from '@/devlink2/SkeletonParagraph';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useDeleteRelationHandler } from '../../queries/hooks';
import {
  setIsDeleteMemberDialogOpen,
  setSelUser,
  useModulesStore,
} from '../../store';
import { type ModuleType } from '../../types';

function DeleteMemberDialog({ refetch }: { refetch: () => void }) {
  const isDeleteMemberDialogOpen = useModulesStore(
    (state) => state.isDeleteMemberDialogOpen,
  );
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

  const onClickRemove = async (selUser: ModuleType['relations'][0]) => {
    try {
      if (selUser.id && !isOngoingSchedules) {
        setIsSaving(true);
        await deleteRelationByUserId({
          module_id: selUser.module_id,
          module_relation_id: selUser.id,
        });
        setIsDeleteMemberDialogOpen(false);
      }
      refetch();
    } catch (e) {
      toast.error('Failed to remove member.Please contact support');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isDeleteMemberDialogOpen} onClose={resetState}>
      <DcPopup
        onClickClosePopup={{
          onClick: resetState,
        }}
        slotBody={
          <>
            <Text
              color={'neutral'}
              size={2}
              content={
                'By clicking remove the member will be permanently removed from this interview type'
              }
            />
            {isFetching ? (
              <Stack>
                <SkeletonParagraph />
              </Stack>
            ) : (
              <Stack spacing={'var(--space-2)'}>
                {isOngoingSchedules ? (
                  <GlobalBannerShort
                    color={'error'}
                    iconName={'warning'}
                    textTitle={'User cannot be removed'}
                    textDescription={`There are ongoing schedules for this user. Once the schedules are completed, you can remove the user.`}
                    slotButtons={<></>}
                  />
                ) : (
                  <>
                    {connectedJobs.length > 0 ? (
                      <GlobalBannerShort
                        color={'warning'}
                        iconName={'error'}
                        textTitle={`Here is a list of job's interview plan that will be impacted:`}
                        textDescription=''
                        slotButtons={
                          <Stack
                            display={'flex'}
                            flexDirection={'column'}
                            spacing={'var(--space-2)'}
                          >
                            <Text
                              size={1}
                              color={'neutral'}
                              content={connectedJobs
                                .flatMap((job) => job.job_title)
                                .join(', ')}
                            />
                            <Text
                              size={1}
                              color={'neutral'}
                              content={`If user exist in previous scheduled interviews, the user will be removed from those schedules.`}
                            />
                          </Stack>
                        }
                      />
                    ) : (
                      <GlobalBannerShort
                        color={'warning'}
                        iconName={'error'}
                        textTitle={`Note :`}
                        textDescription='User is not connected to any interview plan. If user exist in previous scheduled interviews, the user will be removed from those schedules.'
                        slotButtons={<></>}
                      />
                    )}
                  </>
                )}
              </Stack>
            )}
          </>
        }
        popupName={'Remove Member'}
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              color={'neutral'}
              textButton={'Cancel'}
              onClickButton={{
                onClick: resetState,
              }}
            />
            <ButtonSolid
              size={2}
              color={'error'}
              textButton={'Remove'}
              isDisabled={isOngoingSchedules || isFetching}
              isLoading={isSaving}
              onClickButton={{
                onClick: async () => {
                  if (isSaving) return;
                  onClickRemove(selUser);
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default DeleteMemberDialog;
