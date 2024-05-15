'use client';

import React, { ReactNode } from 'react';

import {
  ButtonAiLarge,
  ButtonAiRegular,
  ButtonAiSmall,
  ButtonDangerLarge,
  ButtonDangerRegular,
  ButtonDangerSmall,
  ButtonOutlinedLarge,
  ButtonOutlinedRegular,
  ButtonOutlinedSmall,
  ButtonPrimaryLarge,
  ButtonPrimaryRegular,
  ButtonPrimarySmall,
  ButtonSuccessLarge,
  ButtonSuccessRegular,
  ButtonSuccessSmall,
  ButtonTextLarge,
  ButtonTextRegular,
  ButtonTextSmall,
  // @ts-ignore
} from '@/devlink';

type Variant = 'primary' | 'outlined' | 'success' | 'text' | 'error' | 'ai';
type Size = 'large' | 'medium' | 'small';

type AuiButtonProps = {
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  style?: HTMLStyleElement;
  id?: string;
};

const AUIButton = ({
  variant,
  size,
  children,
  startIcon,
  disabled,
  endIcon,
  onClick = () => {},
  style,
  id,
  ...props
}: AuiButtonProps) => {
  const handleKeyup = (e) => {
    if (!disabled && e.key === 'Enter') {
      onClick();
    }
  };
  const handleFocus = (e) => {
    e.stopPropagation();
    if (!disabled) {
      let elem = e.currentTarget;
      let btn = elem.querySelector('div');
      //console.log(elem, 'elem');
      //console.log(btn);
      btn.focus();
    }
  };
  const BUTTON_VARIANTS: Record<Variant, Record<Size, React.ReactNode>> = {
    primary: {
      large: (
        <ButtonPrimaryLarge
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      medium: (
        <ButtonPrimaryRegular
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      small: (
        <ButtonPrimarySmall
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
    },

    success: {
      large: (
        <ButtonSuccessLarge
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      medium: (
        <ButtonSuccessRegular
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      small: (
        <ButtonSuccessSmall
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
    },
    error: {
      large: (
        <ButtonDangerLarge
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      medium: (
        <ButtonDangerRegular
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      small: (
        <ButtonDangerSmall
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
    },
    outlined: {
      large: (
        <ButtonOutlinedLarge
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      medium: (
        <ButtonOutlinedRegular
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
            ...(style ? { style } : {}),
          }}
          {...props}
        />
      ),
      small: (
        <ButtonOutlinedSmall
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
    },
    text: {
      large: (
        <ButtonTextLarge
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      medium: (
        <ButtonTextRegular
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      small: (
        <ButtonTextSmall
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
    },
    ai: {
      large: (
        <ButtonAiLarge
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      medium: (
        <ButtonAiRegular
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
      small: (
        <ButtonAiSmall
          tabIndex={disabled ? -1 : 0}
          wrapperProps={{
            onKeyUp: (e) => {
              handleKeyup(e);
            },
            onFocus: (e) => {
              handleFocus(e);
            },
            style: { overflow: disabled ? 'hidden' : 'visible' },
          }}
          isStartIcon={startIcon ? true : false}
          isDisabled={disabled}
          slotStartIcon={startIcon}
          slotEndIcon={endIcon}
          isEndIcon={endIcon ? true : false}
          textLabel={children}
          onClickButton={{
            onClick,
            id,
          }}
          {...props}
        />
      ),
    },
  };
  // If the variant is not specified but the size is specified, return the primary variant of the specified size
  if (!variant && size && BUTTON_VARIANTS['primary'][String(size)]) {
    return BUTTON_VARIANTS['primary'][String(size)];
  }
  // If the variant is specified and exists in the BUTTON_VARIANTS object
  if (variant && BUTTON_VARIANTS[String(variant)]) {
    // If the size is specified and exists in the BUTTON_VARIANTS[variant] object
    if (size && BUTTON_VARIANTS[String(variant)][String(size)]) {
      return BUTTON_VARIANTS[String(variant)][String(size)];
    }
    // If size is not specified, use medium size as default for the variant
    return BUTTON_VARIANTS[String(variant)]['medium'];
  }
  // If variant is not specified or is not found, return null or a default fallback component
  return BUTTON_VARIANTS['primary']['medium'];
};
export default AUIButton;
