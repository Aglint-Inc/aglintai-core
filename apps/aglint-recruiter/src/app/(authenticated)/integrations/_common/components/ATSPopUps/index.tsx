import { useToast } from '@components/hooks/use-toast';
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
import { Label } from '@components/ui/label';
import { type ReactNode } from 'react';

import { Loader } from '@/common/Loader';
import { ShowCode } from '@/common/ShowCode';

import { type PopUpReasonTypes } from '../types';

function ATSPopUps({
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
  action: () => Promise<boolean>;
  reason: PopUpReasonTypes;
  isLoading: boolean;
}) {
  const { toast } = useToast();
  // const isDisconnect = reason?.startsWith('disconnect_');
  const atsName = reason?.split('_')[1];

  const handleAction = async () => {
    // try {
    const result = await action();
    if (result) {
      toast({
        title: 'Success',
        description: 'Action completed successfully',
        variant: 'default',
      });
    }
    close();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <ShowCode>
          <ShowCode.When isTrue={isLoading}>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <Loader />
              <p className='text-sm'>
                {reason?.startsWith('connect') ? 'Connecting' : 'Reconnecting'}{' '}
                to {atsName}
              </p>
            </div>
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              reason === 'learn_how_greenhouse' ||
              reason === 'learn_how_ashby' ||
              reason === 'learn_how_lever'
            }
          >
            <ShowCode>
              {/* <ShowCode.When isTrue={reason === 'learn_how_greenhouse'}>
                <LearnHowGreenhouse onClickClose={{ onClick: close }} />
              </ShowCode.When>
              <ShowCode.When isTrue={reason === 'learn_how_ashby'}>
                <LearnHowAshby onClickClose={{ onClick: close }} />
              </ShowCode.When>
              <ShowCode.When isTrue={reason === 'learn_how_lever'}>
                <LearnHowLever onClickClose={{ onClick: close }} />
              </ShowCode.When> */}
            </ShowCode>
          </ShowCode.When>
          <ShowCode.Else>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {reason?.includes('connect')
                  ? `Connect ${atsName}`
                  : atsName
                    ? atsName.charAt(0).toUpperCase() + atsName.slice(1)
                    : 'Unknown Action'}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div className='flex flex-col space-y-2'>
                {['greenhouse', 'lever', 'ashby'].map((ats) => (
                  <ShowCode.When key={ats} isTrue={reason?.includes(ats)}>
                    <Label>{`${ats.charAt(0).toUpperCase() + ats.slice(1)} API key`}</Label>
                  </ShowCode.When>
                ))}
                <ShowCode.Else>
                  <div className='flex flex-row items-center space-x-2'>
                    {popUpBody}
                  </div>
                </ShowCode.Else>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter className='-mx-6 -mb-6 mt-6 rounded-b-lg bg-secondary p-4'>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction}>
                {reason?.startsWith('connect') ? 'Connect' : 'Update'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </ShowCode.Else>
        </ShowCode>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ATSPopUps;
