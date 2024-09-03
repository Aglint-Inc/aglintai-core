import React, { JSX } from 'react';

import { cn } from '@/lib/utils';

const typesDefinition = {
  extraSmall: 'text-xs leading-4',
  small: 'text-sm leading-5',
  medium: 'text-base leading-5 tracking-tight',
  large: 'text-lg leading-6 tracking-tighter',
  xLarge: 'text-xl',
  xxLarge: 'text-2xl',
  xxxLarge: 'text-3xl',
};

const fontWeight = {
  default: 'font-normal',
  normal: 'font-semibold',
};

type Props = {
  type?: keyof typeof typesDefinition;
  children?: React.ReactNode;
  variant?: string;
  fontBold?: keyof typeof fontWeight;
  color?: string;
  textTransform?: string;
};

const UITypography = ({
  children,
  variant = 'p',
  fontBold,
  type = 'medium',
  color = '',
  textTransform,
}: Props) => {
  const Element = variant as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={cn(
        typesDefinition[type],
        fontBold && fontWeight[fontBold],
        color && `text-[${color}]`,
        textTransform && `${textTransform}`,
      )}
    >
      {children}
    </Element>
  );
};

export default UITypography;
