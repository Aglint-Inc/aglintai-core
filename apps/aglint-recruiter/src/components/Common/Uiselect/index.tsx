import { AlertCircle } from 'lucide-react';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type MenuOption = {
  name: string;
  value: any;
};

type Props = {
  label?: string;
  menuOptions: MenuOption[];
  value: any;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: Props['value']) => void;
  defaultValue?: any;
  required?: boolean;
  startIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

const UISelect = ({
  menuOptions = [],
  value,
  onChange,
  disabled,
  label,
  required,
  defaultValue,
  startIcon,
  error,
  helperText,
  placeholder = 'Choose from the list',
}: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <div className='flex flex-row'>
          <span className='text-sm font-medium'>{label}</span>
          {required && <span className='text-red-500'>&nbsp;*</span>}
        </div>
      )}
      <Select
        disabled={disabled}
        value={value?.toString()}
        onValueChange={onChange}
        defaultValue={defaultValue}
      >
        <SelectTrigger
          className={`w-full h-9 ${error ? 'border-red-500' : ''}`}
        >
          {startIcon && <span className='mr-2'>{startIcon}</span>}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
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
        <div className='flex flex-row items-center justify-start gap-1'>
          <AlertCircle className='w-3 h-3 text-red-500' />
          <span className='text-xs text-red-500'>{helperText}</span>
        </div>
      )}
    </div>
  );
};

export default UISelect;
