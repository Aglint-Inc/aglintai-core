import { FormControlLabel, Stack, Switch } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const AntSwitch = styled(Switch)(() => ({
  width: 'var(--space-6)',
  height: 'var(--space-4)',
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 'calc (var(--space-4) -1)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: 'var(--white)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'var(--accent-9)',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'var(--shadow-3)',
    width: 'var(--space-3)',
    height: 'var(--space-3)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 'var(--space-4)',
    opacity: 1,
    backgroundColor: 'var(--neutral-7)',
    boxSizing: 'border-box',
  },
}));

function ToggleBtn({
  isChecked,
  handleChange = () => {},
}: {
  isChecked: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (value: boolean) => void;
}) {
  return (
    <FormControlLabel
      sx={{ width: 'var(--space-6)', margin: 0 }}
      control={
        <Stack style={{ transform: 'scale(0.8)' }}>
          <AntSwitch
            onChange={(e, value) => {
              handleChange(value);
              return e;
            }}
            checked={isChecked}
          />
        </Stack>
      }
      label={''}
    />
  );
}

export default ToggleBtn;
