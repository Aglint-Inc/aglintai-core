import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import capitalize from 'lodash/capitalize';
import React from 'react';
import type {
  FormFields,
  FormValues,
} from 'src/app/_common/components/Profile/uitls';

import { ShadcnPhoneInput } from '@/components/Common/UIPhoneInput/PhoneInput';

export const ProfileForms = ({
  profile,
  setProfile,
  setChanges,
}: {
  profile: FormFields;
  setProfile: React.Dispatch<React.SetStateAction<FormFields>>;
  setChanges?: () => void;
}) => {
  const handleChange = (e: any, key: keyof FormFields) => {
    setProfile((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          value: e.target.value,
          error: false,
        },
      };
    });
    if (setChanges) setChanges();
  };
  const forms = Object.entries(profile).map(([k, val]) => {
    const key = k as keyof FormFields;
    return (
      <ProfileForm key={key} id={key} value={val} onChange={handleChange} />
    );
  });
  return <>{forms}</>;
};

const ProfileForm = ({
  id,
  value,
  onChange,
}: {
  id: keyof FormFields;
  value: FormValues;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any, key: keyof FormFields, phoneFormat?: any) => void;
}) => {
  const defaultCountry =
    value.validation === 'phone' && !value.value ? 'us' : '+1';

  switch (value.validation) {
    case 'phone': {
      return (
        <div className='space-y-2'>
          {value.label && <Label>{value.label}</Label>}
          <ShadcnPhoneInput
            country={defaultCountry || ''}
            placeholder={value.placeholder}
            value={value.value}
            required={value.required}
            disabled={value.disabled}
            onChange={(phone) => {
              onChange({ target: { value: phone } }, id);
            }}
          />
          {value.error && (
            <p className='text-sm text-red-500'>{`Please enter a valid ${capitalize(id)}`}</p>
          )}
        </div>
      );
    }
    case 'password': {
      return (
        <div className='space-y-2'>
          <Label htmlFor={id}>{value.label}</Label>
          <Input
            id={id}
            type='password'
            placeholder={value.placeholder}
            required={value.required}
            value={value.value}
            disabled={value.blocked}
            onChange={(e) => onChange(e, id)}
            className={value.error ? 'border-red-500' : ''}
          />
          {value.error && (
            <p className='text-sm text-red-500'>
              {value.helperText ?? `Please enter a valid ${capitalize(id)}`}
            </p>
          )}
        </div>
      );
    }
    default: {
      return (
        <div className='space-y-2'>
          <Label htmlFor={id}>{value.label}</Label>
          <Input
            id={id}
            placeholder={value.placeholder}
            required={value.required}
            value={value.value}
            disabled={value.blocked}
            onChange={(e) => onChange(e, id)}
            className={value.error ? 'border-red-500' : ''}
          />
          {value.error && (
            <p className='text-sm text-red-500'>
              {value.helperText ?? `Please enter a valid ${capitalize(id)}`}
            </p>
          )}
        </div>
      );
    }
  }
};
