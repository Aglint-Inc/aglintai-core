import { Dialog, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CloseJobModal } from '@/devlink/CloseJobModal';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import UITextField from '@/src/components/Common/UITextField';
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
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setValue('');
    setErrors([]);
  }, [isArchiveDialogOpen]);

  const archiveModule = async () => {
    if (!loading) {
      try {
        setLoading(true);
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

        if (!isActiveMeeting && uniqueJobs.length === 0) {
          const { error } = await supabase
            .from('interview_module')
            .update({
              is_archived: true,
            })
            .eq('id', editModule.id);
          if (!error) {
            refetch();
            toast.success('Interview type archived successfully.');
            setIsArchiveDialogOpen(false);
          } else {
            throw new Error();
          }
        } else {
          if (uniqueJobs.length) {
            uniqueJobs.map((job) => {
              errors.push(
                `Remove this type from  ${job} job's interview plan.`,
              );
            });
          }

          if (isActiveMeeting) {
            errors.push(
              'Please wait until the ongoing schedules are completed to archive this interview type.',
            );
          }

          setErrors([...errors]);
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
  const moduleDescription = (editModule?.description ?? '').trim();

  const onClose = useCallback(() => {
    if (!loading) {
      setIsArchiveDialogOpen(false);
      setTimeout(() => setValue(''), 400);
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  }, [loading]);

  return (
    <Dialog open={isArchiveDialogOpen} onClose={onClose}>
      <CloseJobModal
        textPopupTitle={`Archive`}
        textWarning={`By clicking archive the interview type will not be available to select in interview plans while scheduling.`}
        textButton={'Archive'}
        textJobTitle={moduleName}
        onClickCloseJob={{ onClick: onClose }}
        slotButton={
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
              isDisabled={loading || moduleName !== value.trim()}
            />
          </>
        }
        textLocation={moduleDescription}
        slotInput={
          <Stack spacing={1}>
            <UITextField
              disabled={loading}
              placeholder={moduleName}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            {errors.length > 0 && (
              <GlobalBannerShort
                color={'error'}
                iconName='error'
                textTitle='Unable to Archive'
                textDescription=''
                slotButtons={
                  <Stack display={'flex'} flexDirection={'column'}>
                    {errors.map((error, index) => (
                      <li key={index} style={{ color: 'var(--error-11)' }}>
                        <Typography
                          key={index}
                          variant='caption'
                          color={'var(--error-11)'}
                        >
                          {error}
                        </Typography>
                      </li>
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
