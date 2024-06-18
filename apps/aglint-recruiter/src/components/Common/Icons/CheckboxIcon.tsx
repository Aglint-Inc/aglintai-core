import { SvgIcon } from '@mui/material';
import React from 'react';

function CheckboxIcon({
  variant,
  size = `16px`,
}: {
  variant: 'checked' | 'unchecked' | 'indeterminate' | 'disabled';
  size?: string;
}) {
  switch (variant) {
    case 'unchecked': {
      return (
        <SvgIcon
          sx={{
            width: size,
            height: size,
          }}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3z'
              fill='#fff'
              fill-opacity='.9'
            />
            <path
              d='M.5 3A2.5 2.5 0 0 1 3 .5h10A2.5 2.5 0 0 1 15.5 3v10a2.5 2.5 0 0 1-2.5 2.5H3A2.5 2.5 0 0 1 .5 13z'
              stroke='#191400'
              stroke-opacity='.208'
            />
          </svg>
        </SvgIcon>
      );
    }
    case 'indeterminate': {
      return (
        <SvgIcon
          sx={{
            width: size,
            height: size,
          }}
        >
          <svg
            className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1b9jlql-MuiSvgIcon-root'
            focusable='false'
            aria-hidden='true'
            viewBox='3 3 18 18'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z'></path>
          </svg>
        </SvgIcon>
      );
    }
    case 'checked': {
      return (
        <SvgIcon
          sx={{
            width: size,
            height: size,
          }}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_3687_31527)'>
              <path
                d='M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3Z'
                fill='currentColor'
              />
              <rect width='16' height='16' fill='white' fill-opacity='0.01' />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12.2316 3.97594C12.5397 4.17744 12.6262 4.5906 12.4247 4.89876L7.89138 11.8321C7.78455 11.9955 7.61146 12.1038 7.41782 12.1285C7.22416 12.1533 7.02941 12.0918 6.88495 11.9605L3.95162 9.29389C3.67918 9.04622 3.65911 8.62458 3.90678 8.35215C4.15445 8.07971 4.57608 8.05962 4.84851 8.3073L7.20331 10.448L11.3088 4.1691C11.5103 3.86094 11.9234 3.77446 12.2316 3.97594Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_3687_31527'>
                <path
                  d='M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3Z'
                  fill='white'
                />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }
  }
}

export default CheckboxIcon;
