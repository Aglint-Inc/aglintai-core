import { Dialog } from '@mui/material';
import React from 'react';

function MuiPopup({ children, props }) {
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
