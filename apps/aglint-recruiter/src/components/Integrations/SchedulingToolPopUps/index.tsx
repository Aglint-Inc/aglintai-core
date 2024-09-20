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
  const isDisconnect =
    reason === 'disconnect_google_workSpace' || reason === 'disconnect_zoom';

  if (isLoading) {
    return <Loader />;
  }

  if (isDisconnect) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {reason === 'disconnect_google_workSpace'
                ? 'Disconnect Google workspace'
                : 'Disconnect Zoom'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {reason === 'disconnect_google_workSpace'
                ? 'By clicking "Disconnect", Google workspace will be disconnected from Aglint and will no longer be accessible in this application. You can reconnect again on the Integrations page.'
                : 'By clicking "Disconnect", Zoom will be disconnected from Aglint and will no longer be accessible in this application. You can reconnect again on the Integrations page.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={action}>Disconnect</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
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
