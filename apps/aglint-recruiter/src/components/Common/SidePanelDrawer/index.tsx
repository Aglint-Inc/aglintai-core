import { Sheet, SheetContent, SheetPortal } from '@components/ui/sheet';
import React, { type ReactNode } from 'react';

function SidePanelSheet({
  openSidePanelSheet,
  setOpenPanelSheet,
  children,
  dir = 'right',
  onClose = () => null,
  zIndex = 1300,
}: {
  openSidePanelSheet: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenPanelSheet: (x: boolean) => void;
  children?: ReactNode;
  dir?: 'top' | 'right' | 'bottom' | 'left';
  onClose?: () => void;
  zIndex?: number;
}) {
  const handleOpenChange = (open: boolean) => {
    setOpenPanelSheet(open);
    if (!open) onClose();
  };

  return (
    <Sheet open={openSidePanelSheet} onOpenChange={handleOpenChange}>
      <SheetPortal>
        <SheetContent
          side={dir}
          className='p-6 w-full max-w-[400px]'
          style={{ zIndex }}
        >
          {children}
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}

export default SidePanelSheet;
