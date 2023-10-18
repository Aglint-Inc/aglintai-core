import Icon from '@components/Common/Icons/Icon';
import { palette } from '@context/Theme/Theme';
import { InputBaseComponentProps, Stack, Typography } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { errorMessages } from '@utils/errorMessages';
import React, { useState } from 'react';

import UITypography from '../UITypography';
type Props = {
  contentLimit?: number;
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
  rest?: any;
  onSelect?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  InputProps?: InputBaseComponentProps;
  defaultValue?: string | number;
  children?: any;
  height?: string;
  noBorder?: boolean;
  width?: string;
  select?: boolean;
  secondaryText?: string;
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
      multiline = false,
      minRows = 3,
      maxRows = 3,
      rest = undefined,
      onFocus = () => {},
      onBlur = () => {},
      contentLimit,
      InputProps,
      children,
      defaultValue,
      noBorder,
      width,
      select,
      height,
      secondaryText,
    }: Props,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const [focus, setfocus] = useState(false);
    const [contentExceeded, setContentExceeded] = useState(false);
    let borderColor = `#b1cee6`;
    let outlineColor = palette.grey[300];
    let labelColor = palette.grey[800];
    if (focus) {
      outlineColor = palette.blue[600];
    }
    if (error) {
      outlineColor = palette.red[400];
      borderColor = palette.red[200];
    }
    if (disabled) {
      labelColor = palette.grey[600];
    }

    const checkMaxLength = (content) => {
      if (contentLimit && content.length >= contentLimit && focus) {
        setContentExceeded(true);
      } else {
        setContentExceeded(false);
      }
    };

    return (
      <Stack
        width={fullWidth ? '100%' : 'inherit'}
        direction={'column'}
        gap={'5px'}
      >
        {label && (
          <UITypography type={labelSize} color={labelColor} fontBold='normal'>
            {label}
            {required && <sup>*</sup>}
          </UITypography>
        )}
        {secondaryText && (
          <Typography variant='body2'>{secondaryText}</Typography>
        )}
        <MuiTextField
          margin='none'
          select={select}
          fullWidth={fullWidth}
          value={value}
          defaultValue={defaultValue}
          inputProps={{ maxLength: contentLimit || false }}
          onChange={onChange}
          onKeyDown={(e: ReturnType<typeof onkeydown>) => {
            checkMaxLength(e.target.value);
          }}
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
          InputProps={InputProps}
          onFocus={() => {
            setfocus(true);
            if (onFocus) onFocus();
          }}
          onBlur={() => {
            setfocus(false);
            onBlur();
            setContentExceeded(false);
          }}
          type={type}
          sx={{
            '&': {
              margin: 0,
            },
            '& .MuiOutlinedInput-root': {
              height: multiline ? height : '40px',
              bgcolor: disabled ? 'transparent' : 'white.700',
              fontSize: '14px',
              fieldset: {
                pt: '8px',
                border: noBorder
                  ? 'transparent'
                  : `1px solid ${outlineColor}!important`,
              },
              '&:hover fieldset': {
                border: noBorder
                  ? 'transparent'
                  : `1px solid ${outlineColor}!important`,
              },
              '&': {
                outline: `3px solid ${focus ? borderColor : 'transparent'}`,
              },
            },
            width: width,
          }}
          {...rest}
        >
          {children}
        </MuiTextField>
        {(error || contentExceeded) && (
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
