import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { type ReactNode } from 'react';

import { Loader } from '@/components/Common/Loader';

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
      <DialogContent className='sm:max-w-[425px]'>
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
        <div className='mt-6 flex justify-end space-x-2'>
          <Button variant='outline' onClick={close}>
            Cancel
          </Button>
          <Button onClick={action}>
            {reason === 'connect_google_workSpace' || reason === 'connect_zoom'
              ? 'Connect'
              : (reason === 'update_google_workspace' ||
                  reason === 'update_zoom') &&
                'Update'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulingPopUps;
