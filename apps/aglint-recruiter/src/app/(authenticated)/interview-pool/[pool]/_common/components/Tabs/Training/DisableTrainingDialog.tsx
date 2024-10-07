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
import { Loader } from 'lucide-react';
import React from 'react';

import { type useEnableDisableTraining } from '../../../hooks/useEnableDisableTraining';

function DisableTrainingDialog(
  props: ReturnType<typeof useEnableDisableTraining>,
) {
  const {
    disableOpen,
    setDisableOpen,
    isBannerLoading,
    enableDiabaleTraining,
  } = props;
  return (
    <AlertDialog open={disableOpen} onOpenChange={setDisableOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disable Training</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to disable training?
            <ol className='mt-2 list-decimal pl-5'>
              <li>Stop tracking trainee progress</li>
              <li>Remove access to trainee interviewer features</li>
            </ol>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant='destructive'
              disabled={isBannerLoading}
              onClick={() => enableDiabaleTraining({ type: 'disable' })}
            >
              {isBannerLoading ? (
                <>
                  <Loader />
                  Disabling...
                </>
              ) : (
                'Disable Training'
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DisableTrainingDialog;
