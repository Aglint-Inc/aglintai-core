import { errorMessages } from '@utils/errorMessages';
import { AlertCircle } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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
  onSelect?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: () => void;
  defaultValue?: string | number;
  height?: number;
  width?: string;
  select?: boolean;
  secondaryText?: string;
  labelBold?: 'default' | 'normal';
  defaultLabelColor?: string;
  id?: string;
  autoFocus?: boolean;
};

// eslint-disable-next-line react/display-name
const UITextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
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
      minRows = 4,
      onKeyDown,
      onBlur,
      defaultValue,
      width,
      height,
      secondaryText,
      labelBold = 'default',
      id,
      defaultLabelColor = null,
      ...props
    },
    ref,
  ) => {
    const [contentExceeded, setContentExceeded] = useState(false);

    const labelClasses = cn(
      'text-neutral-900',
      labelBold === 'default' ? 'font-semibold' : 'font-normal',
      {
        'text-sm': labelSize === 'small',
        'text-base': labelSize === 'medium',
        'text-lg': labelSize === 'large',
        'text-xl': labelSize === 'xLarge',
        'text-2xl': labelSize === 'xxLarge',
        'text-3xl': labelSize === 'xxxLarge',
      },
      disabled && 'text-neutral-500',
      defaultLabelColor,
    );

    const inputClasses = cn(
      'w-full',
      fullWidth && 'w-full',
      error && 'border-error-500',
      disabled && 'bg-neutral-100 text-neutral-500',
      height && `h-[${height}px]`,
      width && `w-[${width}]`,
    );

    const InputComponent = multiline ? Textarea : Input;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <div className='flex flex-row items-center'>
            <Label htmlFor={id} className={labelClasses}>
              {label}
            </Label>
            {required && <span className='text-error-500 ml-1'>*</span>}
          </div>
        )}
        {secondaryText && (
          <p className='text-sm text-neutral-600'>{secondaryText}</p>
        )}
        <InputComponent
          {...props}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={() => {
            onBlur?.();
            setContentExceeded(false);
          }}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          ref={ref as any}
          rows={multiline ? minRows : undefined}
          type={type}
          className={inputClasses}
          defaultValue={defaultValue}
        />
        {(error || contentExceeded) && helperText && (
          <div className='flex flex-row items-center mt-1'>
            <AlertCircle className='w-4 h-4 text-error-500 mr-1' />
            <p className='text-sm text-error-700'>
              {error
                ? helperText
                : contentExceeded
                  ? errorMessages.maxCharExceeded
                  : ''}
            </p>
          </div>
        )}
      </div>
    );
  },
);

export default UITextField;
