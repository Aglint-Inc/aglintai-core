import { Button } from '@components/ui/button';
import { Input, type InputProps } from '@components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

interface PasswordFieldProps extends InputProps {}
const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(props, inputRef) {
    const [showKey, setShowKey] = useState(false);
    return (
      <div className='relative w-full'>
        <Input ref={inputRef} type={showKey ? 'text' : 'password'} {...props} />
        <Button
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full'
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? (
            <EyeOff className='h-4 w-4' />
          ) : (
            <Eye className='h-4 w-4' />
          )}
          <span className='sr-only'>{showKey ? 'Hide' : 'Show'} API key</span>
        </Button>
      </div>
    );
  },
);

export default PasswordField;
