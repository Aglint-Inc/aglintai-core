import Icon from '@components/Common/Icons/Icon';
import { palette } from '@context/Theme/Theme';
import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  Stack,
  Typography,
} from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { errorMessages } from '@utils/errorMessages';
import React, { useState } from 'react';

import UITypography from '../UITypography';
type Props = {
  value?: string | number;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  label?: string;
  labelSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  fullWidth?: boolean;
  name?: string;
  rest?: any;
  onSelect?: () => void;
  // eslint-disable-next-line no-unused-vars
  onFocus?: (e: any) => void;
  onBlur?: () => void;
  // eslint-disable-next-line no-unused-vars
  onKeyDown?: (e: any) => void;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
  defaultValue?: string | number;
  children?: any;
  height?: number;
  noBorder?: boolean;
  width?: string;
  borderRadius?: number;
  select?: boolean;
  secondaryText?: string;
  labelBold?: 'default' | 'normal';
  defaultLabelColor?: string;
};

// eslint-disable-next-line react/display-name
const UITextField = React.forwardRef(
  (
    {
      disabled,
      error,
      helperText,
      label,
      labelSize = 'small',
      onChange,
      onSelect,
      type = 'text',
      placeholder = '',
      required,
      value,
      fullWidth = false,
      name = null,
      multiline = false,
      minRows = 4.7,
      maxRows = 4.7,
      rest = undefined,
      onKeyDown = () => {},
      onBlur = () => {},
      InputProps,
      children,
      defaultValue,
      borderRadius = 4,
      width,
      select,
      height,
      secondaryText,
      labelBold = 'default',
      defaultLabelColor = null,
    }: Props,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const [contentExceeded, setContentExceeded] = useState(false);
    let labelColor = defaultLabelColor ? defaultLabelColor : palette.grey[800];

    if (disabled) {
      labelColor = defaultLabelColor ? defaultLabelColor : palette.grey[600];
    }

    return (
      <Stack
        width={fullWidth ? '100%' : 'inherit'}
        direction={'column'}
        gap={'5px'}
      >
        {label && (
          <Stack direction={'row'}>
            <UITypography
              type={labelSize}
              color={labelColor}
              fontBold={labelBold}
            >
              {label}
            </UITypography>
            {required && (
              <Typography
                sx={{ fontWeight: 600, color: palette.red[400], pl: 0.5 }}
              >
                <sup>*</sup>
              </Typography>
            )}
          </Stack>
        )}
        {secondaryText && (
          <Typography variant='body1'>{secondaryText}</Typography>
        )}
        <MuiTextField
          name={name}
          margin='none'
          select={select}
          fullWidth={fullWidth}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          error={error || contentExceeded}
          disabled={disabled}
          required={required}
          variant='outlined'
          placeholder={placeholder}
          inputRef={ref}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          InputProps={{
            ...InputProps,
          }}
          onBlur={() => {
            onBlur();
            setContentExceeded(false);
          }}
          type={type}
          // sx={{
          //   '& .MuiOutlinedInput-root': {
          //     height: height ? `${height}px !important` : '100%',
          //     borderRadius: `${borderRadius}px`,
          //   },
          //   width: width,
          // }}
          {...rest}
        >
          {children}
        </MuiTextField>
        {(error || contentExceeded) && helperText && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'start'}
          >
            <Icon height='13px' color={palette.red[400]} variant='AlertIcon' />
            <UITypography type='small' color={palette.red[400]}>
              {error
                ? helperText
                : contentExceeded
                  ? errorMessages.maxCharExceeded
                  : ''}
            </UITypography>
          </Stack>
        )}
      </Stack>
    );
  },
);

export default UITextField;
