import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { LearnHowAshby } from '@devlink3/LearnHowAshby';
import { LearnHowGreenhouse } from '@devlink3/LearnHowGreenhouse';
import { LearnHowLever } from '@devlink3/LearnHowLever';
import { Loader2 } from 'lucide-react';
import { type ReactNode } from 'react';

import { ShowCode } from '../../Common/ShowCode';
import { DeletePopup } from '../components/DeletePopup';
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
  action: () => void;
  reason: PopUpReasonTypes;
  isLoading: boolean;
  inputValue: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-[425px]'>
        <ShowCode>
          <ShowCode.When isTrue={isLoading}>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
              <p className='text-sm'>
                {reason && reason.startsWith('connect')
                  ? 'Connecting'
                  : 'Reconnecting'}{' '}
                to {reason && reason.split('_')[1]}
              </p>
            </div>
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              reason === 'disconnect_greenhouse' ||
              reason === 'disconnect_ashby' ||
              reason === 'disconnect_lever'
            }
          >
            <DeletePopup
              isOpen={isOpen}
              onClose={close}
              onDelete={action}
              title={`Disconnect ${
                reason === 'disconnect_greenhouse'
                  ? 'Greenhouse'
                  : reason === 'disconnect_ashby'
                    ? 'Ashby'
                    : 'Lever'
              }`}
              description={`By clicking "Disconnect", ${
                reason === 'disconnect_greenhouse'
                  ? 'Greenhouse'
                  : reason === 'disconnect_ashby'
                    ? 'Ashby'
                    : 'Lever'
              } will be disconnected from Aglint and will no longer be accessible in this application. You can reconnect again on the Integrations page.`}
              deleteButtonText='Disconnect'
            />
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              reason === 'learn_how_greenhouse' ||
              reason === 'learn_how_ashby' ||
              reason === 'learn_how_lever'
            }
          >
            <ShowCode>
              <ShowCode.When isTrue={reason === 'learn_how_greenhouse'}>
                <LearnHowGreenhouse
                  onClickClose={{
                    onClick: close,
                  }}
                />
              </ShowCode.When>
              <ShowCode.When isTrue={reason === 'learn_how_ashby'}>
                <LearnHowAshby
                  onClickClose={{
                    onClick: close,
                  }}
                />
              </ShowCode.When>
              <ShowCode.When isTrue={reason === 'learn_how_lever'}>
                <LearnHowLever
                  onClickClose={{
                    onClick: close,
                  }}
                />
              </ShowCode.When>
            </ShowCode>
          </ShowCode.When>
          <ShowCode.Else>
            <DialogHeader>
              <DialogTitle>
                {reason &&
                typeof reason === 'string' &&
                reason.includes('connect')
                  ? `Connect ${reason.split('_')[1]}`
                  : reason && typeof reason === 'string'
                    ? reason.split('_')[1]
                    : 'Unknown Action'}
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col space-y-2'>
              {['greenhouse', 'lever', 'ashby'].map((ats) => (
                <ShowCode.When
                  key={ats}
                  isTrue={
                    reason && typeof reason === 'string' && reason.includes(ats)
                  }
                >
                  {`${ats.charAt(0).toUpperCase() + ats.slice(1)} API key`}
                </ShowCode.When>
              ))}
              <ShowCode.Else>
                <div className='flex flex-row items-center space-x-2'>
                  {popUpBody}
                </div>
              </ShowCode.Else>
            </div>
            <div className='flex flex-row justify-end space-x-2 mt-4'>
              <Button variant='outline' onClick={close}>
                Cancel
              </Button>
              <Button onClick={action}>
                {reason &&
                typeof reason === 'string' &&
                reason.startsWith('connect')
                  ? 'Connect'
                  : 'Update'}
              </Button>
            </div>
          </ShowCode.Else>
        </ShowCode>
      </DialogContent>
    </Dialog>
  );
}

export default ATSPopUps;
