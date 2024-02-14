import { palette } from '@context/Theme/Theme';
import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';

import UITypography from '../UITypography';

type MenuOption = {
  name: string;
  value: string | number;
};

type Props = {
  label?: string;
  menuOptions: MenuOption[];
  value: string | number;
  fullWidth?: boolean;
  disabled?: boolean;
  onChange: (
    // eslint-disable-next-line no-unused-vars
    event: SelectChangeEvent<string | number>,
  ) => void;
  defaultValue?: string | number;
  startIcon?: any;
  size?: 'sm' | 'md';
};

const UISelect = ({
  menuOptions = [],
  value,
  onChange,
  disabled,
  label,
  defaultValue,
  startIcon,
  size = 'md',
}: Props) => {
  let [focus, setFocus] = useState(false);
  let outlineColor = palette.grey[300];
  // let outlineColor = '#b1cee6';
  let borderColor = `#b1cee6`;
  if (focus) {
    outlineColor = palette.blue[600];
  }

  return (
    <Stack
      borderColor={focus && borderColor}
      borderRadius={'7px'}
      padding={0}
      gap={'5px'}
    >
      {label && (
        <UITypography type={'small'} fontBold='default'>
          {label}
        </UITypography>
      )}
      <Select
        startAdornment={startIcon}
        disabled={disabled}
        value={value}
        onChange={onChange}
        // displayEmpty
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        sx={{
          '&': {
            width: '100%',
            fieldset: {
              py: 0,

              border: `1px solid ${outlineColor}!important`,
            },
            '&:hover fieldset': {
              py: 0,

              border: `1px solid ${outlineColor}!important`,
            },
            '.MuiSelect-outlined': {
              py: 0,

              fontSize: '14px',
              p: size === 'md' ? '8px 14px' : '4px 12px',
            },
            outline: `${size === 'md' ? '3px' : '2px'} solid ${
              focus ? borderColor : 'transparent'
            }`,
          },
        }}
        defaultValue={defaultValue}
      >
        {...menuOptions.map((menu, idx) => (
          <MenuItem sx={{ padding: '5px' }} key={idx} value={menu.value}>
            {menu.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default UISelect;
