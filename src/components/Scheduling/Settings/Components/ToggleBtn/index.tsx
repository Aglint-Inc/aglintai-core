import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';

function ToggleBtn({ isActive, handleCheck }) {
  return (
    <FormControlLabel
      sx={{
        height: '20px',
        margin: '0px'
      }}
      control={
        <Switch
          sx={{
            '& .MuiSwitch-thumb': {
              color: 'white.700', // Color of the switching ball
              height: '13px',
              width: '13px',
              opacity: 1
            },
            '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
              backgroundColor: '#1F73B7',
              opacity: 1,
              height: '16px'
            },
            '& .MuiSwitch-switchBase': {
              top: '4px ',
              left: '4px'
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              left: '2px'
            },
            '& .MuiSwitch-track': {
              // backgroundColor: '#1F73B7', // Background color of the switch
              height: '16px',
              width: '34px',
              borderRadius: '20px'
            }
          }}
          onChange={(e, value) => {
            handleCheck(value);
            return e;
          }}
          checked={isActive}
          // defaultChecked
        />
      }
      label=''
    />
  );
}

export default ToggleBtn;
