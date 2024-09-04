import { type DialogProps, Dialog, Paper } from '@mui/material';
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
      <Paper>{children}</Paper>
    </Dialog>
  );
}

export default MuiPopup;
