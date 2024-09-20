import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import React, { useState } from 'react';

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  // Add more country codes as needed
];

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const PhoneInput: React.FC<{
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState('+1');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    onChange(formattedPhoneNumber);
  };

  return (
    <div className='flex'>
      <Select
        onValueChange={(value) => setCountryCode(value)}
        defaultValue={countryCode}
      >
        <SelectTrigger className='w-[80px]'>
          <SelectValue placeholder='Code' />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type='tel'
        placeholder='(555) 555-5555'
        value={value}
        onChange={handlePhoneChange}
        className='ml-2 flex-1'
      />
    </div>
  );
};
