import { SvgIcon } from '@mui/material';
import React from 'react';

function RadioButtonIcon({
  variant,
  size = 16,
}: {
  variant: 'checked' | 'unchecked' | 'disabled';
  size?: number;
}) {
  if (variant === 'unchecked') {
    return (
      <SvgIcon
        sx={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g filter='url(#filter0_ii_3687_28997)'>
            <path
              d='M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z'
              fill='white'
              fill-opacity='0.9'
            />
            <path
              d='M0.5 7C0.5 3.41015 3.41015 0.5 7 0.5C10.5899 0.5 13.5 3.41015 13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7Z'
              stroke='#191400'
              stroke-opacity='0.207843'
            />
          </g>
          <defs>
            <filter
              id='filter0_ii_3687_28997'
              x='0'
              y='0'
              width='14'
              height='15.5'
              filterUnits='userSpaceOnUse'
              color-interpolation-filters='sRGB'
            >
              <feFlood flood-opacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='1.5' />
              <feGaussianBlur stdDeviation='1' />
              <feComposite
                in2='hardAlpha'
                operator='arithmetic'
                k2='-1'
                k3='1'
              />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.145098 0 0 0 0 0.145098 0 0 0 0 0 0 0 0 0.027451 0'
              />
              <feBlend
                mode='normal'
                in2='shape'
                result='effect1_innerShadow_3687_28997'
              />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='1.5' />
              <feGaussianBlur stdDeviation='1' />
              <feComposite
                in2='hardAlpha'
                operator='arithmetic'
                k2='-1'
                k3='1'
              />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
              />
              <feBlend
                mode='normal'
                in2='effect1_innerShadow_3687_28997'
                result='effect2_innerShadow_3687_28997'
              />
            </filter>
          </defs>
        </svg>
      </SvgIcon>
    );
  }

  if (variant === 'checked') {
    return (
      <SvgIcon
        sx={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.92' filter='url(#filter0_ii_3687_40755)'>
            <path
              d='M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z'
              fill='#EF5F00'
            />
            <circle cx='7' cy='7' r='3' fill='white' />
          </g>
          <defs>
            <filter
              id='filter0_ii_3687_40755'
              x='0'
              y='0'
              width='14'
              height='15.5'
              filterUnits='userSpaceOnUse'
              color-interpolation-filters='sRGB'
            >
              <feFlood flood-opacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='1.5' />
              <feGaussianBlur stdDeviation='1' />
              <feComposite
                in2='hardAlpha'
                operator='arithmetic'
                k2='-1'
                k3='1'
              />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.145098 0 0 0 0 0.145098 0 0 0 0 0 0 0 0 0.027451 0'
              />
              <feBlend
                mode='normal'
                in2='shape'
                result='effect1_innerShadow_3687_40755'
              />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='1.5' />
              <feGaussianBlur stdDeviation='1' />
              <feComposite
                in2='hardAlpha'
                operator='arithmetic'
                k2='-1'
                k3='1'
              />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
              />
              <feBlend
                mode='normal'
                in2='effect1_innerShadow_3687_40755'
                result='effect2_innerShadow_3687_40755'
              />
            </filter>
          </defs>
        </svg>
      </SvgIcon>
    );
  }
}

export default RadioButtonIcon;
