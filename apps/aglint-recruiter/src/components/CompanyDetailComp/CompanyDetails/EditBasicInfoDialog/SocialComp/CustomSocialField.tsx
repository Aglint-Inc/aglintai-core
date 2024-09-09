import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface CustomSocialFieldProps {
  socialName: string;
  value: string;
  error: { error: boolean; msg: string };
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onDelete: () => void;
  setError: React.Dispatch<React.SetStateAction<any>>;
}

const CustomSocialField: React.FC<CustomSocialFieldProps> = ({
  socialName,
  value,
  error,
  onChange,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='relative flex items-center w-full'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex-grow space-y-2'>
        <Input
          value={value}
          placeholder={`${socialName}`}
          onBlur={() => onChange(value)}
          onChange={(e) => onChange(e.target.value)}
          className={`${error?.error ? 'border-red-500' : ''} ${isHovered ? 'pr-10' : ''}`}
        />
        {error?.error && <p className='text-sm text-red-500'>{error.msg}</p>}
      </div>
      {isHovered && (
        <Button
          variant='ghost'
          onClick={onDelete}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8'
        >
          <Trash2 className='h-3 w-3' />
        </Button>
      )}
    </div>
  );
};

export default CustomSocialField;
