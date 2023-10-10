import { Dialog, DialogProps } from '@mui/material';
import React from 'react';

function MuiPopup({
  children,
  props,
}: {
  children: React.ReactNode;
  props: DialogProps;
}) {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
        },
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
}

export default MuiPopup;
