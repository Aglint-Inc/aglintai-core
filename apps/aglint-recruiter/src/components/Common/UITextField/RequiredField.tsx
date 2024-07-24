import { Typography } from '@mui/material';
import React from 'react';

function RequiredField() {
  return <Typography sx={{ color: 'var(--error-9)' }}>&nbsp;*</Typography>;
}

export default RequiredField;
