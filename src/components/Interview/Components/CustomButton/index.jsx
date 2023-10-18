import { Box, Button } from '@mui/material';
import React from 'react';

export default function CustomButton({
  text,
  variant,
  onClick,
  startIcon,
  endIcon,
  sx: style,
  alignSelf,
  type,
  ...props
}) {
  return (
    <Box sx={{ ...(alignSelf ? { alignSelf } : {}) }}>
      <Button
        sx={{
          px: 2,
          py: 1,
          whiteSpace: 'nowrap',
          ...style,
        }}
        onClick={onClick}
        variant={variant}
        startIcon={startIcon}
        endIcon={endIcon}
        type={type}
        {...props}
      >
        {text}
      </Button>
    </Box>
  );
}
