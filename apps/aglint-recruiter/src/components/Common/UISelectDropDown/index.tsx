/* eslint-disable no-unused-vars */
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { cn } from '@lib/utils';
import { SelectProps } from '@radix-ui/react-select';
import { AlertCircle } from 'lucide-react';
import React from 'react';

type MenuOption = {
  name: string;
  value: any;
};

type Props = SelectProps & {
  label?: string;
  menuOptions: MenuOption[];
  disabled?: boolean;
  required?: boolean;
  startIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  labelSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  labelBold?: 'default' | 'normal';
  fieldSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  defaultLabelColor?: string;
  id?: string;
  fullWidth?: boolean;
  className?: string;
};

const UISelectDropDown = ({
  menuOptions = [],
  disabled,
  required,
  startIcon,
  error,
  helperText,
  placeholder = 'Choose from the list',
  fullWidth,
  label,
  labelSize = 'small',
  labelBold = 'default',
  defaultLabelColor = null,
  id,
  className,
  fieldSize,
  ...props
}: Props) => {
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
    error ? 'border-red-500 focus:ring-0' : 'border-neutral-300',
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
          {required && <span className='text-error-500 ml-1'>*</span>}
        </div>
      )}
      <div>
        <Select {...props} disabled={disabled} required={required}>
          <SelectTrigger className={inputClasses}>
            {startIcon && <span className='mr-2'>{startIcon}</span>}
            <SelectValue placeholder={placeholder} id={id} />
          </SelectTrigger>
          <SelectContent className='z-[2000]'>
            {menuOptions.length === 0 ? (
              <div className='px-2 py-1 italic text-gray-500 cursor-default'>
                No options available
              </div>
            ) : (
              menuOptions.map((menu, idx) => (
                <SelectItem key={idx} value={menu.value}>
                  {menu.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {error && helperText && (
          <div className='flex flex-row items-center mt-1'>
            <AlertCircle className='w-4 h-4 text-red-500 mr-1' />
            <p className='text-sm text-red-700'>{helperText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UISelectDropDown;
