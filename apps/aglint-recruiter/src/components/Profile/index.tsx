import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
// import { Permissions } from '@/src/types/permissions'; // Add this import
import { capitalize } from '@/src/utils/text/textUtils';

import { ShadcnPhoneInput } from '../Common/UIPhoneInput/PhoneInput';
import { PasswordUpdate } from './components/PasswordUpdate';
import { UserDetail } from './components/UserDetails';
import {
  type EmailFormFields,
  type FormFields,
  type FormValues,
  type PasswordFormFields,
  type PreferenceFormFields,
} from './util';

const navTabs: Array<{
  label: string;
  route: string;
  roles?: (Permissions | 'authorized')[];
}> = [
  { label: 'Your Details', route: 'user_detail' },
  { label: 'Password Update', route: 'password_update' },
];

const ProfileDashboard = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const router = useRouter();
  const [currTab, setCurrTab] = useState('user_detail');

  useEffect(() => {
    if (router.query?.tab) setCurrTab(router.query?.tab as string);
  }, [router.query?.tab]);

  return (
    <div className='p-4'>
      <Tabs
        value={currTab}
        onValueChange={(value) => {
          router.push({ query: { ...router.query, tab: value } });
        }}
      >
        <TabsList>
          {navTabs
            .filter((item) =>
              item.roles ? checkPermissions(item.roles as any) : true,
            )
            .map((item) => (
              <TabsTrigger key={item.route} value={item.route}>
                {item.label}
              </TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value='user_detail'>
          <UserDetail />
        </TabsContent>
        <TabsContent value='password_update'>
          <PasswordUpdate />
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = React.useState(false);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  // const handleClickShowPassword = () => {
  //   if (value.value) setShowPassword(!showPassword);
  // };

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
export default ProfileDashboard;
