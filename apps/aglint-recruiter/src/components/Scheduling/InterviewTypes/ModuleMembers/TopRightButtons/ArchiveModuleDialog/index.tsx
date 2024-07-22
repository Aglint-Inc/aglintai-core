import { Dialog, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { Text } from '@/devlink/Text';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setIsArchiveDialogOpen, useModulesStore } from '../../../store';
import { ModuleType } from '../../../types';

function ArchiveModuleDialog({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) {
  const isArchiveDialogOpen = useModulesStore(
    (state) => state.isArchiveDialogOpen,
  );
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editModule?.id) fetchMeetings();
  }, [editModule?.id]);

  const fetchMeetings = async () => {
    try {
      const { data } = await supabase
        .from('interview_session')
        .select(
          '*,interview_meeting(*),interview_plan(public_jobs(id,job_title))',
        )
        .eq('module_id', editModule.id);

      const connectedJobs: string[] = data
        .filter((ses) => !!ses.interview_plan_id)
        .map((ses) => ses.interview_plan?.public_jobs?.job_title);

      const uniqueJobs = [...new Set(connectedJobs)];

      const isActiveMeeting = data.some(
        (meet) =>
          meet.interview_meeting.status === 'confirmed' ||
          meet.interview_meeting.status === 'waiting',
      );

      if (isActiveMeeting) {
        errors.push(
          'Please wait until the ongoing schedules are completed to archive this interview type.',
        );
      }
      if (uniqueJobs.length) {
        uniqueJobs.map((job) => {
          errors.push(`Remove this type from  ${job} job's interview plan.`);
        });
      }
      setErrors([...errors]);
    } catch {
      toast.error('Error fetching meetings.');
    }finally{
      setIsFetching(false);
    }
  };

  const archiveModule = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const { error } = await supabase
          .from('interview_module')
          .update({
            is_archived: true,
          })
          .eq('id', editModule.id);
        if (!error) {
          refetch();
          toast.success('Interview type archived successfully.');
          onClose();
        } else {
          throw new Error();
        }
      } catch {
        toast.error('Error archiving interview type.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  };

  const moduleName = (editModule?.name ?? '').trim();

  const onClose = useCallback(() => {
    if (!loading) {
      setIsArchiveDialogOpen(false);
      setErrors([]);
      setIsFetching(true);
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  }, [loading]);

  return (
    <Dialog open={isArchiveDialogOpen} onClose={onClose}>
      <DcPopup
        popupName={`Archive ${moduleName}`}
        onClickClosePopup={{ onClick: onClose }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{ onClick: () => onClose() }}
            />
            <ButtonSolid
              textButton='Archive'
              size={2}
              onClickButton={{
                onClick: () => {
                  if (editModule.id) archiveModule();
                },
              }}
              isLoading={loading}
              isDisabled={isFetching || errors.length > 0}
            />
          </>
        }
        slotBody={
          <Stack spacing={1}>
            <Text
              size={2}
              color={'neutral'}
              content={`By clicking archive the interview type will not be available to select in interview plans while scheduling.`}
            />
            {errors.length > 0 && (
              <GlobalBannerShort
                color={'error'}
                iconName='warning'
                textTitle='Unable to Archive'
                textDescription=''
                slotButtons={
                  <Stack>
                    {errors.map((error, index) => (
                      <Stack direction={'row'} key={index}>
                        <li style={{ color: 'var(--neutral-11)' }}></li>
                        <Text size={1} color={'neutral'} content={error} />
                      </Stack>
                    ))}
                  </Stack>
                }
              />
            )}
          </Stack>
        }
      />
    </Dialog>
  );
}

export default ArchiveModuleDialog;
