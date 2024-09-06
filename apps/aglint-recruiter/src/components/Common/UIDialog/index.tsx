import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import React from 'react';

import { UIButton } from '../UIButton';

function UIDialog({
  slotButtons,
  title = 'Title',
  onClose = () => {},
  onClickPrimary = () => {},
  onClickSecondary = () => {},
  children,
  open,
}: {
  slotButtons?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  onClickPrimary?: () => void;
  onClickSecondary?: () => void;
  children?: React.ReactNode;
  open: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          {slotButtons ?? (
            <>
              <UIButton
                variant='secondary'
                size='sm'
                onClick={onClickSecondary}
              >
                Cancel
              </UIButton>
              <UIButton variant='default' size='sm' onClick={onClickPrimary}>
                Confirm
              </UIButton>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UIDialog;
