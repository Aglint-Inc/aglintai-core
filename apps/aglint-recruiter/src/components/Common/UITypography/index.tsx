/* eslint-disable security/detect-object-injection */
import { type Variant } from '@mui/material/styles/createTypography';
import MuiTypography from '@mui/material/Typography';
import React from 'react';

export const typesDefinition = {
  extraSmall: {
    fontSize: '12px',
    letterSpacing: '0px',
    lineHeight: '16px',
  },
  small: {
    fontSize: '14px',
    letterSpacing: '0px',
    lineHeight: '20px',
  },
  medium: {
    fontSize: '16px',
    letterSpacing: '-0.15px',
    lineHeight: '20px',
  },
  large: {
    fontSize: '18px',
    letterSpacing: '-0.45px',
    lineHeight: '24px',
  },
  xLarge: {
    fontSize: '22px',
  },
  xxLarge: {
    fontSize: '26px',
  },
  xxxLarge: {
    fontSize: '36px',
  },
};

const fontWeight = {
  default: '400',
  normal: '600',
};

type Props = {
  type?:
    | 'small'
    | 'medium'
    | 'large'
    | 'xLarge'
    | 'xxLarge'
    | 'xxxLarge'
    | 'extraSmall';
  children?: React.ReactNode;
  variant?: Variant;
  fontBold?: 'default' | 'normal';
  color?: string;
  textTransform?: any;
};

const UITypography = ({
  children,
  variant = 'body1',
  fontBold,
  type = 'medium',
  color = '',
  textTransform,
}: Props) => {
  return (
    <MuiTypography
      sx={{ ...typesDefinition[type], color }}
      variant={variant}
      color={color}
      fontWeight={fontBold ? fontWeight[fontBold] : undefined}
      textTransform={textTransform}
    >
      {children}
    </MuiTypography>
  );
};

export default UITypography;
