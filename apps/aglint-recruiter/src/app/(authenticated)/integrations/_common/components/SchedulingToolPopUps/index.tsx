import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { type ReactNode } from 'react';

import { Loader } from '@/common/Loader';

import { type SchedulingReasonTypes } from '../types';

function SchedulingPopUps({
  isOpen,
  close,
  popUpBody,
  action,
  reason,
  isLoading,
}: {
  isOpen: boolean;
  close: () => void;
  popUpBody: ReactNode;
  action: () => void;
  reason: SchedulingReasonTypes;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='border border-border sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {reason === 'connect_google_workSpace'
              ? 'Connect Google Workspace'
              : reason === 'connect_zoom'
                ? 'Connect Zoom'
                : reason === 'update_google_workspace'
                  ? 'Google Workspace'
                  : reason === 'update_zoom'
                    ? 'Zoom'
                    : ''}
          </DialogTitle>
        </DialogHeader>
        {popUpBody}
        <DialogFooter className='-mx-6 -mb-6 mt-6 rounded-b-lg p-4'>
          <DialogClose asChild>
            <Button variant='outline' onClick={close}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={action}>
            {reason === 'connect_google_workSpace' || reason === 'connect_zoom'
              ? 'Connect'
              : (reason === 'update_google_workspace' ||
                  reason === 'update_zoom') &&
                'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulingPopUps;
