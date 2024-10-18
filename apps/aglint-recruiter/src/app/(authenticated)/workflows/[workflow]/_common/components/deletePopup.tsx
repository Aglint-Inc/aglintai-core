import { Alert, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { BriefcaseBusiness } from 'lucide-react';
import { useState } from 'react';

import UITextField from '@/components/Common/UITextField';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';
import { useWorkflow } from '@/workflow/hooks';
import {
  useWorkflows,
  useWorkflowsActions,
  useWorkflowsDeletion,
} from '@/workflows/hooks';

export const DeletePopup = () => {
  const { push } = useRouterPro();
  const { handleDeleteWorkflow } = useWorkflows();
  const { workflow } = useWorkflow();
  const deletion = useWorkflowsDeletion();
  const { closeDeletion } = useWorkflowsActions();
  const [value, setValue] = useState('');
  const count = deletion?.workflow?.jobs?.length ?? 0;
  const title = workflow?.title ?? '';
  const enabled = title.trim() === value.trim();

  const handleClose = () => {
    closeDeletion();
    setValue('');
  };
  return (
    <Dialog open={deletion.open} onOpenChange={() => handleClose()}>
      <DialogContent className='border-border'>
        <DialogHeader>
          <DialogTitle>Delete workflow</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Alert variant='error'>
            <AlertTitle>
              {count === 0
                ? 'Are you sure you want to delete this workflow?'
                : 'By deleting this it will be unlinked from all connected jobs.'}
            </AlertTitle>
          </Alert>
          {count ? (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>
                Connected Jobs ({count})
              </h3>
              <ul className='space-y-2'>
                {(deletion?.workflow?.jobs ?? []).map(({ job_title }) => (
                  <li key={job_title} className='flex items-center space-x-2'>
                    <BriefcaseBusiness className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm font-normal'>
                      {capitalizeAll(job_title!)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className='text-base'>
            Confirm by typing the workflow name{' '}
            <span className='text-accent-11'>{workflow?.title ?? '---'}</span>{' '}
            below.
          </p>
          <UITextField
            value={value}
            placeholder='Enter workflow name here'
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            disabled={!enabled}
            onClick={() => {
              if (enabled) {
                push(ROUTES['/workflows']());
                handleDeleteWorkflow({ id: deletion.workflow?.id ?? null! });
                handleClose();
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
