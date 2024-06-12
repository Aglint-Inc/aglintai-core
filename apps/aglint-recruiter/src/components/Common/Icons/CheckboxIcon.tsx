import { SvgIcon } from '@mui/material';
import React from 'react';

function CheckboxIcon({
  variant,
  size = `16px`,
}: {
  variant: 'checked' | 'unchecked' | 'disabled';
  size?: string;
}) {
  if (variant === 'unchecked') {
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
            d='M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3Z'
            fill='white'
            fill-opacity='0.9'
          />
          <path
            d='M0.5 3C0.5 1.61929 1.61929 0.5 3 0.5H13C14.3807 0.5 15.5 1.61929 15.5 3V13C15.5 14.3807 14.3807 15.5 13 15.5H3C1.61929 15.5 0.5 14.3807 0.5 13V3Z'
            stroke='#191400'
            stroke-opacity='0.207843'
          />
        </svg>
      </SvgIcon>
    );
  }

  if (variant === 'checked') {
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

export default CheckboxIcon;
