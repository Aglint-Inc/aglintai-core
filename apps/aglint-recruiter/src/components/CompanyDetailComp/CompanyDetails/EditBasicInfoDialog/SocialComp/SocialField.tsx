import { Input } from '@components/ui/input';
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react';
import React from 'react';

import { socialPlaceholder } from './utils';

interface SocialFieldProps {
  socialName: string;
  value: string;
  disabled: boolean;
  error: { error: boolean; msg: string };
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}

const SocialField: React.FC<SocialFieldProps> = ({
  socialName,
  value,
  disabled,
  error,
  onChange,
}) => {
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook />;
      case 'twitter':
        return <Twitter />;
      case 'linkedin':
        return <Linkedin />;
      case 'instagram':
        return <Instagram />;
      case 'github':
        return <Github />;
      case 'youtube':
        return <Youtube />;
      default:
        return <Globe />;
    }
  };

  return (
    <div className='flex items-start justify-start  w-full'>
      <div className='w-full'>
        <div className='flex'>
          <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
            {getSocialIcon(socialName) || <Globe />}
          </span>
          <Input
            type='text'
            id={socialName}
            name={socialName}
            value={value}
            disabled={disabled}
            placeholder={socialPlaceholder[socialName].split('.com/')[1]}
            onBlur={() => onChange(value)}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className='rounded-l-none'
          />
        </div>
        {error?.error && (
          <p className='mt-1 text-sm text-red-600'>{error.msg}</p>
        )}
      </div>
    </div>
  );
};

export default SocialField;
