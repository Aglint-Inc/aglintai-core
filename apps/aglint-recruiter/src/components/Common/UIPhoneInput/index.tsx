/* eslint-disable no-unused-vars */
import 'react-phone-input-2/lib/style.css';

import { Stack, Typography } from '@mui/material';
import { AlertCircle } from 'lucide-react';
import React from 'react';
import PhoneInput, { type CountryData } from 'react-phone-input-2';

import countries from '@/src/utils/CountryUtils';

import UITypography from '../UITypography';

type Props = {
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?(
    value: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ): void;
  error?: boolean;
  label?: string;
  labelBold?: 'default' | 'normal';
  labelSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement>,
    data: CountryData | {},
  ) => void;
  defaultCountry?: string;
  setDefaultCountry?: () => void;
};

// eslint-disable-next-line react/display-name
const UIPhoneInput = ({
  disabled,
  error,
  helperText,
  label,
  labelBold = 'default',
  labelSize = 'medium',
  onChange,
  placeholder = '',
  required,
  value,
  onFocus = () => {},
  onBlur = () => {},
  defaultCountry,
  setDefaultCountry = () => {},
}: Props) => {
  let labelColor = 'var(--neutral-12)';
  if (disabled) {
    labelColor = 'var(--neutral-11)';
  }

  return (
    <Stack
      direction={'column'}
      gap={'var(--space-1)'}
      sx={customPhoneStyle}
      p={'0px'}
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
      <PhoneInput
        autoFormat={true}
        onlyCountries={countries.map((c) => c.code)}
        copyNumbersOnly={false}
        country={defaultCountry ? defaultCountry.toLowerCase() : null}
        value={value}
        onChange={(value, data, event, formattedValue) => {
          if (
            // @ts-ignore
            countRept(formattedValue, /\d/g) <= countRept(data.format, /\./g)
          ) {
            onChange(value, data, event, formattedValue);
          } else {
            onChange(value, data, event, formattedValue);
          }
        }}
        isValid={!error}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={(value, country) => {
          if (required) onBlur(value, country);
        }}
        inputProps={{
          sx: {
            width: '100%',
            '& .form-control': {
              width: '100%',
            },
          },
          value: value,
        }}
      />
      {error && (
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'start'}
          spacing={'2px'}
        >
          <Stack className='placeholder-icon'>
            <AlertCircle size={12} color={'var(--error-9)'} />
          </Stack>
          <Stack className='placeholder'>
            <UITypography type='small' color={'var(--error-11)'}>
              {error ? helperText : ''}
            </UITypography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export const customPhoneStyle = {
  '& .react-tel-input .flag-dropdown': {
    borderColor: 'var(--neutral-6)',
  },
  '& .country-list': {
    width: 'fit-content !important',
    minWidth: '200px',
    // position: 'fixed !important',
  },
  '& .react-tel-input .form-control.invalid-number , & .react-tel-input .flag-dropdown.invalid-number':
    {
      backgroundColor: 'var(--white)',
      borderColor: 'var(--neutral-6)',
    },
  '& .react-tel-input .form-control.invalid-number:focus': {
    backgroundColor: 'var(--white)',
    borderColor: 'var(--neutral-6)',
    outline: '3px solid',
    outlineColor: 'var(--accent-a9)',
  },
  '& .react-tel-input .form-control:focus , & .react-tel-input .flag-dropdown:focus':
    {
      outline: '3px solid',
      outlineColor: 'var(--accent-a9)',
    },
  '& .react-tel-input .form-control': {
    width: '100%',
    height: 'unset',
    lineHeight: 'var(--line-height-2)',
    fontSize: 'var(--font-size-2)',
    borderColor: 'var(--neutral-6)',
  },
  '& input': {
    padding: 'var(--space-2) var(--space-3)',
  },
};

export default UIPhoneInput;

export const phonePatternError = (format, value) => {
  if (
    !value ||
    !value?.trim() ||
    countRept(value, /\d/g) != countRept(format, /\./g)
  ) {
    return true;
  } else {
    return false;
  }
};

function countRept(string, regex) {
  var patternArray = string?.match(regex);
  return patternArray ? patternArray.length : 0;
}
