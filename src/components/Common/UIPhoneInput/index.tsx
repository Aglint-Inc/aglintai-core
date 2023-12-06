/* eslint-disable no-unused-vars */
import Icon from '@components/Common/Icons/Icon';
import { palette } from '@context/Theme/Theme';
import { Stack } from '@mui/material';
import countries from '@utils/CountryUtils';
import React from 'react';
import PhoneInput, { CountryData } from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

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
  let labelColor = palette.grey[800];
  if (disabled) {
    labelColor = palette.grey[600];
  }

  return (
    <Stack direction={'column'} gap={'5px'} sx={customPhoneStyle} p={'0px'}>
      {label && (
        <UITypography type={labelSize} color={labelColor} fontBold='normal'>
          {label}
          {required && <sup>*</sup>}
        </UITypography>
      )}
      <PhoneInput
        onlyCountries={countries.map((c) => c.code)}
        enableLongNumbers
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
            // event.preventDefault();
            onChange(
              value,
              data,
              event,
              // @ts-ignore
              formattedValue.substring(0, data.format.length),
            );
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
            <Icon height='13px' color={palette.red[400]} variant='AlertIcon' />
          </Stack>
          <Stack className='placeholder'>
            <UITypography type='small' color={palette.red[400]}>
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
    borderColor: palette.grey[300],
  },
  '& .country-list': {
    width: 'fit-content !important',
    minWidth: '200px',
    // position: 'fixed !important',
  },
  '& .react-tel-input .form-control.invalid-number , & .react-tel-input .flag-dropdown.invalid-number':
    {
      backgroundColor: '#ffffff',
      borderColor: palette.red[400],
    },
  '& .react-tel-input .form-control.invalid-number:focus': {
    backgroundColor: '#ffffff',
    borderColor: palette.red[400],
    outline: '3px solid',
    outlineColor: palette.red[300],
  },
  '& .react-tel-input .form-control:focus , & .react-tel-input .flag-dropdown:focus':
    {
      outline: '3px solid',
      outlineColor: palette.blue[300],
      // borderColor: palette.blue[400],
    },
  '& .react-tel-input .form-control': {
    width: '100%',
    height: 'unset',
    lineHeight: 0,
    fontSize: '14px',
    borderColor: palette.grey[300],
  },
  '& input': {
    padding: '10px 10px',
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
