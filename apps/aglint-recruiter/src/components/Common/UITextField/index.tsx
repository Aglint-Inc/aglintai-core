import Icon from '@components/Common/Icons/Icon';
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
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: any) => void;
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
  select?: boolean;
  secondaryText?: string;
  labelBold?: 'default' | 'normal';
  defaultLabelColor?: string;
  id?: string;
  autoFocus?: boolean;
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
      onFocus,
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
      width,
      select,
      height,
      secondaryText,
      labelBold = 'default',
      id,
      defaultLabelColor = null,
      ...props
    }: Props,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const [contentExceeded, setContentExceeded] = useState(false);
    let labelColor = defaultLabelColor
      ? defaultLabelColor
      : 'var(--neutral-12)';

    if (disabled) {
      labelColor = defaultLabelColor ? defaultLabelColor : 'var(--neutral-11)';
    }

    return (
      <Stack
        width={fullWidth ? '100%' : 'inherit'}
        direction={'column'}
        gap={'var(--space-1)'}
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
              <Typography sx={{ color: 'var(--error-9)' }}>&nbsp;*</Typography>
            )}
          </Stack>
        )}
        {secondaryText && (
          <Typography variant='body1'>{secondaryText}</Typography>
        )}
        <MuiTextField
          {...props}
          name={name}
          margin='none'
          select={select}
          fullWidth={fullWidth}
          value={value}
          onFocus={onFocus}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          id={id}
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
          onBlur={(e) => {
            onBlur(e);
            setContentExceeded(false);
          }}
          type={type}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: height ? `${height}px !important` : '26px',
            },
            width: width,
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 30px white inset !important',
              WebkitTextFillColor: 'black !important',
            },
            '& input:-moz-autofill': {
              boxShadow: '0 0 0 30px white inset !important',
              textFillColor: 'black !important',
            },
          }}
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
            <Icon height='12px' color={'var(--error-9)'} variant='AlertIcon' />
            <UITypography type='small' color={'var(--error-11)'}>
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
