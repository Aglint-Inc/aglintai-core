import { useToast } from '@components/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import { setIsArchiveDialogOpen, useModulesStore } from '../../stores/store';

function ArchiveModuleDialog() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const isArchiveDialogOpen = useModulesStore(
    (state) => state.isArchiveDialogOpen,
  );
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { data: editModule } = useModuleAndUsers();

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
          meet.interview_meeting &&
          (meet.interview_meeting.status === 'confirmed' ||
            meet.interview_meeting.status === 'waiting'),
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
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error fetching meetings.',
      });
    } finally {
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
          await utils.interview_pool.module_and_users.invalidate({
            module_id: editModule.id,
          });
          toast({
            title: 'Interview type archived successfully.',
          });
          onClose();
        } else {
          throw new Error();
        }
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error archiving interview type.',
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Please wait until the ongoing process is complete.',
      });
    }
  };

  const moduleName = (editModule?.name ?? '').trim();

  const onClose = useCallback(() => {
    if (!loading) {
      setIsArchiveDialogOpen(false);
      setErrors([]);
      setIsFetching(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Please wait until the ongoing process is complete.',
      });
    }
  }, [loading]);

  return (
    <>
      <UIDialog
        open={isArchiveDialogOpen}
        title={`Archive ${moduleName}`}
        onClose={onClose}
        slotButtons={
          <>
            <UIButton onClick={onClose} size='md' variant='secondary'>
              Cancel
            </UIButton>
            <UIButton
              size='md'
              isLoading={loading}
              disabled={isFetching || errors.length > 0}
              onClick={() => {
                if (editModule.id) archiveModule();
              }}
            >
              Archive
            </UIButton>
          </>
        }
      >
        <div className='flex flex-col space-y-4'>
          <p className='text-muted-foreground'>
            By clicking archive the interview type will not be available to
            select in interview plans while scheduling.
          </p>
          {errors.length > 0 && (
            <Alert variant='error'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Unable to Archive</AlertTitle>
              <AlertDescription>
                <ul className='list-disc space-y-1 pl-5'>
                  {errors.map((error, index) => (
                    <li key={index} className='text-sm text-muted-foreground'>
                      {error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </UIDialog>
    </>
  );
}

export default ArchiveModuleDialog;
