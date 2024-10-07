import { Alert, AlertDescription } from '@components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import { AlertCircle } from 'lucide-react';
import React, { type Dispatch, type SetStateAction } from 'react';

import { Loader } from '../Loader';

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
            <Loader />
          ) : (
            <>
              <Alert className='mb-4'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  This email contains sample data for preview purposes only.
                </AlertDescription>
              </Alert>
              <ScrollArea className='h-[calc(100vh-300px)] w-full rounded-lg'>
                <iframe
                  className='w-full'
                  height='800px'
                  srcDoc={isHtml}
                  title='Preview Email'
                />
              </ScrollArea>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
