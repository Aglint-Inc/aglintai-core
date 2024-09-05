import { Input, InputProps } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { cn } from '@lib/utils';
import { AlertCircle } from 'lucide-react';
import React, { forwardRef } from 'react';

type Props = InputProps & {
  error?: boolean;
  label?: string;
  fieldSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  labelSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  helperText?: string;
  secondaryText?: string;
  labelBold?: 'default' | 'normal';
  defaultLabelColor?: string;
  fullWidth?: boolean;
  ref: React.ForwardedRef<HTMLInputElement>;
};

const UITextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({
    disabled,
    error,
    helperText,
    type = 'text',
    secondaryText,
    label,
    labelSize = 'small',
    labelBold = 'default',
    defaultLabelColor = null,
    required,
    fullWidth,
    id,
    ref,
    fieldSize,
    className,
    ...props
  }) => {
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
      'w-full border rounded px-3 py-2 transition-colors duration-200', // Smooth transition for color changes
      fullWidth && 'w-full',
      error ? 'border-red-500 focus-visible:ring-0' : 'border-neutral-300',
      disabled && 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
      fieldSize === 'small'
        ? 'h-6'
        : fieldSize === 'medium'
          ? 'h-8'
          : fieldSize === 'large'
            ? 'h-10'
            : fieldSize === 'xLarge'
              ? 'h-12'
              : fieldSize === 'xxLarge'
                ? 'h-14'
                : fieldSize === 'xxxLarge'
                  ? 'h-16'
                  : 'h-10',
      className,
    );

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <div className='flex flex-row items-center'>
            <Label htmlFor={id} className={labelClasses}>
              {label}
            </Label>
            {required && <span className='text-red-500 ml-1'>*</span>}{' '}
            {/* Corrected color class */}
          </div>
        )}
        {secondaryText && (
          <p className='text-sm text-neutral-600'>{secondaryText}</p>
        )}
        <div>
          <Input
            {...props}
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            required={required}
            type={type}
          />
          {error && helperText && (
            <div className='flex flex-row items-center mt-1'>
              <AlertCircle className='w-4 h-4 text-red-500 mr-1' />
              <p className='text-sm text-red-700'>{helperText}</p>
            </div>
          )}
        </div>
      </div>
    );
  },
);

UITextField.displayName = 'UITextField';

export default UITextField;
