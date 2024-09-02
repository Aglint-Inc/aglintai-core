import { Drawer } from '@mui/material';
import React, { type ReactNode } from 'react';

function SidePanelDrawer({
  openSidePanelDrawer,
  setOpenPanelDrawer,
  children,
  dir = 'right',
  onClose = () => null,
  zIndex = 1300,
}: {
  openSidePanelDrawer: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenPanelDrawer: (x: boolean) => void;
  children?: ReactNode;
  dir?: 'top' | 'right' | 'bottom' | 'left';
  onClose?: () => void;
  zIndex?: Number;
}) {
  return (
    <Drawer
      sx={{
        zIndex: Number(zIndex),
      }}
      disableEscapeKeyDown
      anchor={dir}
      open={openSidePanelDrawer}
      onClose={() => {
        setOpenPanelDrawer(false);
        onClose();
      }}
    >
      {children}
    </Drawer>
  );
}

export default SidePanelDrawer;
