import { palette } from '@context/Theme/Theme';
import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';

import UITypography from '../UITypography';

type MenuOption = {
  name: string;
  value: any;
};

type Props = {
  label?: string;
  menuOptions: MenuOption[];
  value: any;
  fullWidth?: boolean;
  disabled?: boolean;
  onChange: (
    // eslint-disable-next-line no-unused-vars
    event: SelectChangeEvent<any>,
  ) => void;
  defaultValue?: any;
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
}: Props) => {
  let [focus, setFocus] = useState(false);

  let borderColor = `#b1cee6`;

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
        // sx={{
        //   '&': {
        //     width: '100%',
        //     fieldset: {
        //       py: 0,

        //       border: `1px solid ${outlineColor}!important`,
        //     },
        //     '&:hover fieldset': {
        //       py: 0,

        //       border: `1px solid ${outlineColor}!important`,
        //     },
        //     '.MuiSelect-outlined': {
        //       py: 0,

        //       fontSize: '14px',
        //       p: size === 'md' ? '8px 14px' : '4px 12px',
        //     },
        //     outline: `${size === 'md' ? '3px' : '2px'} solid ${
        //       focus ? borderColor : 'transparent'
        //     }`,
        //   },
        // }}
        defaultValue={defaultValue}
      >
        {menuOptions.length === 0 ? (
          <Stack
            px={1}
            style={{
              fontStyle: 'italic',
              color: palette.grey[400],
              cursor: 'default',
            }}
          >
            No options available
          </Stack>
        ) : (
          menuOptions.map((menu, idx) => (
            <MenuItem key={idx} value={menu.value}>
              {menu.name}
            </MenuItem>
          ))
        )}
      </Select>
    </Stack>
  );
};

export default UISelect;
