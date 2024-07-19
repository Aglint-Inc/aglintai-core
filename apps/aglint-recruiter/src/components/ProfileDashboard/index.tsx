import { Autocomplete, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { NavSublink } from '@/devlink/NavSublink';
import { UserProfile } from '@/devlink/UserProfile';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { PermissionEnums } from '@/src/utils/routing/permissions';
import { capitalize } from '@/src/utils/text/textUtils';

import UIPhoneInput from '../Common/UIPhoneInput';
import UITextField from '../Common/UITextField';
import { ChangeEmail } from './components/ChangeEmail';
import { PasswordUpdate } from './components/PasswordUpdate';
import { UserDetail } from './components/UserDetails';
import {
  EmailFormFields,
  FormFields,
  FormValues,
  PasswordFormFields,
  PreferenceFormFields,
} from './util';

const navTabs: {
  label: string;
  route: string;
  roles?: PermissionEnums[];
}[] = [
  {
    label: 'Your Details',
    route: 'user_detail',
  },
  {
    label: 'Change Email',
    route: 'change_email',
  },
  {
    label: 'Password Update',
    route: 'password_update',
  },
];

const ProfileDashboard = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const router = useRouter();

  const [currTab, setCurrTab] = useState<
    'user_detail' | 'change_email' | 'password_update'
  >('user_detail');

  useEffect(() => {
    if (router.query?.tab)
      setCurrTab(router.query?.tab as unknown as typeof currTab);
  }, [router.query?.tab]);

  return (
    <>
      <Stack>
        <UserProfile
          slotInfo={
            <>
              {currTab === 'user_detail' && <UserDetail />}
              {currTab === 'change_email' && <ChangeEmail />}
              {currTab === 'password_update' && <PasswordUpdate />}
            </>
          }
          // slotPreferenceForm={<>fjerknferjkn</>}
          slotNavSublink={
            <>
              {navTabs
                .filter((item) =>
                  item.roles ? checkPermissions(item.roles) : true,
                )
                .map((item) => (
                  <NavSublink
                    key={item.route}
                    isActive={currTab === item.route}
                    onClickNav={{
                      onClick: () => {
                        router.query.tab = item.route;
                        router.push(router);
                      },
                    }}
                    textLink={item.label}
                  />
                ))}
            </>
          }
        />
      </Stack>
    </>
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

type phone = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    if (value.value) setShowPassword(!showPassword);
  };

  switch (value.validation) {
    case 'phone': {
      return (
        <UIPhoneInput
          labelSize='small'
          defaultCountry={defaultCountry}
          label={value.label}
          placeholder={value.placeholder}
          value={value.value}
          required={value.required}
          disabled={value.disabled}
          error={value.error}
          onChange={(value, data: phone, event, formattedValue) => {
            onChange({ target: { value: formattedValue } }, id, data.format);
          }}
          helperText={`Please enter a valid ${capitalize(id)}`}
        />
      );
    }
    case 'password': {
      return (
        <UITextField
          labelBold='default'
          labelSize='small'
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label={value.label}
          placeholder={value.placeholder}
          required={value.required}
          value={value.value}
          disabled={value.blocked}
          error={value.error}
          helperText={
            value.helperText ?? `Please enter a valid ${capitalize(id)}`
          }
          onChange={(e) => onChange(e, id)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  style={{ opacity: value.value ? 1 : 0.5 }}
                >
                  {showPassword ? (
                    <GlobalIcon iconName='visibility' />
                  ) : (
                    <GlobalIcon iconName='visibility_off' />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              width: '360px',
            },
          }}
        />
      );
    }
    default: {
      if (value.options !== null) {
        return (
          <Autocomplete
            disableClearable
            freeSolo
            fullWidth
            options={value.options}
            onChange={(event, value) => {
              if (value) {
                onChange({ target: { value: value } }, id);
              }
            }}
            value={value.value}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <UITextField
                labelBold='default'
                rest={{ ...params }}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                }}
                label={value.label}
                labelSize='small'
              />
            )}
          />
        );
      }
      return (
        <UITextField
          labelBold='default'
          labelSize='small'
          fullWidth
          label={value.label}
          placeholder={value.placeholder}
          required={value.required}
          value={value.value}
          disabled={value.blocked}
          error={value.error}
          helperText={
            value.helperText ?? `Please enter a valid ${capitalize(id)}`
          }
          onChange={(e) => onChange(e, id)}
        />
      );
    }
  }
};
export default ProfileDashboard;
