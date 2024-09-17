import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const AntSwitch = styled(Switch)(() => ({
  width: 32,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: 'text-white',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'bg-accent-500',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'shadow-md',
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'bg-neutral-400',
    boxSizing: 'border-box',
  },
}));

function ToggleBtn({ isChecked, handleChange }) {
  return (
    <FormControlLabel
      sx={{
        height: '20px',
        margin: '0px',
      }}
      control={
        <AntSwitch
          onChange={(e, value) => {
            handleChange(value);
            return e;
          }}
          checked={isChecked}
        />
      }
      label=''
    />
  );
}

export default ToggleBtn;
