import { useToast } from '@components/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { AlertCircle } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { api } from '@/trpc/client';

import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import { setIsArchiveDialogOpen, useModulesStore } from '../../stores/store';

function ArchiveModuleDialog() {
  const { toast } = useToast();
  const isArchiveDialogOpen = useModulesStore(
    (state) => state.isArchiveDialogOpen,
  );
  const { data: editModule } = useModuleAndUsers();
  const { mutateAsync, isPending } = api.interview_pool.update.useMutation();
  const { data, isLoading } = api.interview_pool.archive_get_sessions.useQuery(
    {
      id: editModule?.id ?? '',
    },
    {
      enabled: !!editModule?.id,
    },
  );
  const moduleName = (editModule?.name ?? '').trim();

  const errors = data?.errors ?? [];

  const archiveModule = async () => {
    if (!isPending && editModule?.id) {
      try {
        await mutateAsync({
          id: editModule.id,
          is_archived: true,
        });
        onClose();
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error archiving interview type.',
        });
      }
    }
  };

  const onClose = () => {
    if (!isPending) {
      setIsArchiveDialogOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Please wait until the ongoing process is complete.',
      });
    }
  };

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
              isLoading={isPending}
              disabled={isLoading || errors.length > 0}
              onClick={() => {
                if (editModule?.id) archiveModule();
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
