import { Alert, AlertTitle } from '@components/ui/alert';
import { Dialog, DialogContent, DialogHeader } from '@components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { AlertCircle, Loader2 } from 'lucide-react';
import React, { type Dispatch, type SetStateAction } from 'react';

interface Prop {
  isLoading: boolean;
  anchorEl: HTMLButtonElement;
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
  setHtml: Dispatch<SetStateAction<string | null>>;
  isHtml: string | null;
}

export default function EmailPreviewPopover({
  isLoading,
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
      <DialogContent className='w-full max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
        </DialogHeader>
        <div className='h-[80vh]'>
          {!isHtml || isLoading ? (
            <div className='flex h-full items-center justify-center'>
              <Loader2 className='h-8 w-8 animate-spin' />
            </div>
          ) : (
            <>
              <Alert className='mb-4'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>
                  This email contains sample data for preview purposes only.
                </AlertTitle>
              </Alert>
              <iframe
                className='h-[calc(100%-4rem)] w-full'
                srcDoc={isHtml}
                title='Preview Email'
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
