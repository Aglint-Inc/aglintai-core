import Icon from '@components/Common/Icons/Icon';
import { Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';

import { palette } from '@/src/context/Theme/Theme';

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
  required?: boolean;
  startIcon?: any;
  size?: 'sm' | 'md';
  error?: boolean;
  helperText?: string;
  placeHolder?: string;
};

const UISelect = ({
  menuOptions = [],
  value,
  onChange,
  disabled,
  label,
  required,
  defaultValue,
  startIcon,
  error,
  helperText,
  placeHolder = 'Choose from the list',
}: Props) => {
  let [focus, setFocus] = useState(false);

  let borderColor = `#b1cee6`;

  return (
    <Stack
      borderColor={focus && borderColor}
      borderRadius={'7px'}
      padding={0}
      gap={'var(--space-1)'}
    >
      {label && (
        <Stack direction={'row'}>
          <UITypography type={'small'} fontBold='default'>
            {label}
          </UITypography>

          {required && (
            <Typography sx={{ color: 'var(--error-9)' }}>&nbsp;*</Typography>
          )}
        </Stack>
      )}
      <Stack
        style={{
          position: 'relative',
          height: '36px',
        }}
      >
        <Stack style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <Select
            startAdornment={startIcon}
            disabled={disabled}
            value={value}
            onChange={onChange}
            error={error}
            onFocus={() => setFocus(true)}
            defaultValue={defaultValue}
          >
            {menuOptions.length === 0 ? (
              <Stack
                px={1}
                style={{
                  fontStyle: 'italic',
                  color: 'var(--neutral-9)',
                  cursor: 'default',
                }}
              >
                No options available
              </Stack>
            ) : (
              menuOptions.map((menu, idx) => (
                <MenuItem key={idx} value={menu?.value}>
                  {menu?.name}
                </MenuItem>
              ))
            )}
          </Select>
        </Stack>
        {placeHolder && (value === null || value === undefined) && (
          <Stack
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              padding: '8px 12px',
              color: palette.grey[500],
              pointerEvents: 'none',
            }}
          >
            {placeHolder}
          </Stack>
        )}
      </Stack>
      {error && helperText && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
          <Icon height='12px' color='var(--error-9)' variant='AlertIcon' />
          <UITypography type='small' color={'var(--error-11)'}>
            {error ? (helperText ? helperText : '') : ''}
          </UITypography>
        </Stack>
      )}
    </Stack>
  );
};

export default UISelect;
