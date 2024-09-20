import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import capitalize from 'lodash/capitalize';
import React from 'react';
import type {
  EmailFormFields,
  FormFields,
  FormValues,
  PasswordFormFields,
  PreferenceFormFields,
} from 'src/app/_common/components/Profile/uitls';

import { ShadcnPhoneInput } from '@/components/Common/UIPhoneInput/PhoneInput';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

export const ProfileForms = ({
  profile,
  setProfile,
  setChanges = null,
}: {
  profile:
    | FormFields
    | PreferenceFormFields
    | EmailFormFields
    | PasswordFormFields;
  setProfile:
    | React.Dispatch<React.SetStateAction<FormFields>>
    | React.Dispatch<React.SetStateAction<PreferenceFormFields>>
    | React.Dispatch<React.SetStateAction<EmailFormFields>>
    | React.Dispatch<React.SetStateAction<PasswordFormFields>>;
  setChanges?: () => void;
}) => {
  const handleChange = (e, key: string) => {
    setProfile((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[String(key)],
          value: e.target.value,
          error: false,
        },
      };
    });
    if (setChanges) setChanges();
  };
  const forms = Object.entries(profile).map(([key, val]) => {
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
  id: string;
  value: FormValues;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any, key: string, phoneFormat?: any) => void;
}) => {
  const { userCountry } = useAuthDetails();
  const defaultCountry =
    value.validation === 'phone' && !value.value ? userCountry : '+1';

  switch (value.validation) {
    case 'phone': {
      return (
        <div className='space-y-2'>
          {value.label && <Label>{value.label}</Label>}
          <ShadcnPhoneInput
            country={defaultCountry}
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
