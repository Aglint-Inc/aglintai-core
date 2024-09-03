/* eslint-disable no-unused-vars */
import { type TypographyOptions } from '@mui/material/styles/createTypography';
import type React from 'react';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1medium: true;
    body1bold: true;
    body2medium: true;
    body2bold: true;
  }
}

export interface ExtendedTypographyOptions extends TypographyOptions {
  body1medium: React.CSSProperties;
  body1bold: React.CSSProperties;
  body2medium: React.CSSProperties;
  body2bold: React.CSSProperties;
}

declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    'rounded-small': true;
    'rounded-medium': true;
    'rounded-large': true;
    'circular-small': true;
    'circular-medium': true;
    'circular-large': true;
    'square-small': true;
    'square-medium': true;
    'square-large': true;
    'rounded-xs': true;
  }
}
