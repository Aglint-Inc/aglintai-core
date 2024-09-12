import { Alert, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { PreviewEmail } from '@devlink2/PreviewEmail';
import { AlertCircle, Loader2, X } from 'lucide-react';
import React, { type Dispatch, type SetStateAction } from 'react';

interface Prop {
  Loading: boolean;
  anchorEl: HTMLButtonElement;
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement>>;
  setHtml: any;
  isHtml: any;
}

export default function EmailPreviewPopover({
  Loading,
  anchorEl,
  setAnchorEl,
  setHtml,
  isHtml,
}: Prop) {
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setHtml(null);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='w-auto max-w-none p-0'>
        <PreviewEmail
          slotContent={
            Loading ? (
              <div className='flex items-center justify-center h-[800px]'>
                <Loader2 className='h-8 w-8 animate-spin' />
              </div>
            ) : (
              <>
                <div className='flex items-center bg-[#f1f0ef] pt-4 pb-2'>
                  <div>
                    <Alert>
                      <AlertCircle className='h-4 w-4' />
                      <AlertTitle>
                        This email contains sample data for preview purposes
                        only.
                      </AlertTitle>
                    </Alert>
                  </div>
                </div>
                <div className='h-full'>
                  <iframe
                    className='h-full w-full'
                    srcDoc={isHtml}
                    title='Preview Email'
                  />
                </div>
              </>
            )
          }
          slotClose={
            <Button
              variant='ghost'
              size='sm'
              onClick={() => {
                setAnchorEl(null);
                setHtml(null);
              }}
            >
              <X className='h-4 w-4' />
            </Button>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
