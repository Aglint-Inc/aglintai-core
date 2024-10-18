import { useToast } from '@components/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
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
import { AlertCircle } from 'lucide-react';

import type { ArchiveGetSessions } from '@/routers/interview_pool/archive_get_sessions';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import { setIsArchiveDialogOpen, useModulesStore } from '../../stores/store';

const useArchiveGetSessions = (
  input: ArchiveGetSessions['input'],
): ProcedureQuery<ArchiveGetSessions> =>
  api.interview_pool.archive_get_sessions.useQuery(input);

function ArchiveModuleDialog() {
  const { toast } = useToast();
  const isArchiveDialogOpen = useModulesStore(
    (state) => state.isArchiveDialogOpen,
  );
  const { data: editModule } = useModuleAndUsers();
  const { isLoading, data } = useArchiveGetSessions({ id: editModule.id });
  const { mutate, isPending } = api.interview_pool.update.useMutation();

  const errors = data?.errors ?? [];
  const moduleName = editModule.name.trim();

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
      <AlertDialog
        open={isArchiveDialogOpen}
        onOpenChange={setIsArchiveDialogOpen}
      >
        <AlertDialogContent className='border border-border'>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Archive ${moduleName}`}</AlertDialogTitle>
            <AlertDialogDescription>
              By clicking archive the interview type will not be available to
              select in interview plans while scheduling.
            </AlertDialogDescription>
          </AlertDialogHeader>
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
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive text-destructive-foreground'
              onClick={() => {
                mutate({ id: editModule.id, is_archived: true });
              }}
              disabled={isLoading || errors.length > 0}
            >
              {isPending ? 'Archiving...' : 'Archive'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ArchiveModuleDialog;
