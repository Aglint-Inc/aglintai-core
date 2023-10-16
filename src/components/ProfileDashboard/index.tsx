/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import { Autocomplete, Dialog, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { ProfileEmailPop, UserProfile } from '@/devlink';
import { ButtonPrimaryOutlinedRegular } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import ImageUpload from '../Common/ImageUpload';
import UIPhoneInput from '../Common/UIPhoneInput';
import UITextField from '../Common/UITextField';
import { capitalize } from '../JobApplicationsDashboard/utils';
type FormValues = {
  value: string;
  label: string;
  placeholder: string;
  error: boolean;
  validation: 'string' | 'phone' | 'mail';
  blocked: boolean;
  required: boolean;
  disabled: boolean;
  specialForm: boolean;
  options: string[];
};
type FormFields = {
  first_name: FormValues;
  last_name: FormValues;
  role: FormValues;
  phone: FormValues;
};
type PreferenceFormFields = {
  language: FormValues;
  timezone: FormValues;
};
type EmailFormFields = {
  email: FormValues;
};
const ProfileDashboard = () => {
  const { userDetails, handleUpdateProfile, recruiterUser } = useAuthDetails();
  const userMail = userDetails.user.email;
  const initialFormValues: FormValues = {
    value: null,
    label: null,
    placeholder: null,
    error: false,
    blocked: false,
    validation: 'string',
    required: false,
    disabled: false,
    specialForm: false,
    options: null,
  };
  const initalProfileFormFields: FormFields = {
    first_name: {
      ...initialFormValues,
      value: recruiterUser.first_name,
      required: true,
      label: 'First name',
      placeholder: 'John',
    },
    last_name: {
      ...initialFormValues,
      value: recruiterUser.last_name,
      required: true,
      label: 'Last name',
      placeholder: 'Doe',
    },
    role: {
      ...initialFormValues,
      value: recruiterUser.role,
      label: 'Position',
      blocked: true,
      placeholder: 'Recruiter',
    },
    phone: {
      ...initialFormValues,
      value: recruiterUser.phone,
      validation: 'phone',
      label: 'Phone number',
    },
  };
  const initialEmail: EmailFormFields = {
    email: {
      ...initialFormValues,
      value: userMail,
      validation: 'mail',
      placeholder: 'john.doe@example.com',
      specialForm: true,
      blocked: true,
    },
  };
  const initialPreferenceFormFields: PreferenceFormFields = {
    language: {
      ...initialFormValues,
      value: '',
      label: 'Language',
      validation: 'string',
      options: ['English', 'Spanish'],
    },
    timezone: {
      ...initialFormValues,
      value: '',
      label: 'Timezone',
      validation: 'string',
      options: ['IST', 'GMT'],
    },
  };

  const [profileChange, setProfileChange] = React.useState(false);
  const [preferenceChange, setPreferenceChange] = React.useState(false);
  const [loading, setLoading] = React.useState({
    profile: false,
    preferences: false,
    email: false,
  });

  const [profile, setProfile] = React.useState<FormFields>(
    initalProfileFormFields,
  );
  const [email, setEmail] = React.useState(initialEmail);
  const [preferences, setPreferences] = React.useState(
    initialPreferenceFormFields,
  );

  return (
    <Stack>
      <UserProfile
        slotUserImage={<ProfileImage />}
        slotUserForm={
          <ProfileForms
            profile={profile}
            setProfile={setProfile}
            setChanges={() => setProfileChange(true)}
          />
        }
        slotEmail={<ProfileForms profile={email} setProfile={setEmail} />}
        slotPassword={
          <Link
            href={'/reset-password'}
            style={{ textDecoration: 'underline' }}
          >
            Change password
          </Link>
        }
        onClickProfilePhotoChange={{
          onClick: () => {
            document.getElementById('image-upload').click();
          },
        }}
        slotUserInfoBtn={
          <Stack style={{ pointerEvents: loading.profile ? 'none' : 'auto' }}>
            <ButtonPrimaryOutlinedRegular
              buttonText={'Save'}
              isDisabled={!profileChange}
              buttonProps={{
                onClick: async () => {
                  setLoading((prev) => {
                    return { ...prev, profile: true };
                  });
                  const confirmation = await handleSubmit(
                    profile,
                    setProfile,
                    handleUpdateProfile,
                    recruiterUser,
                  );
                  if (confirmation) setProfileChange(false);
                  setLoading((prev) => {
                    return { ...prev, profile: false };
                  });
                },
              }}
            />
          </Stack>
        }
        slotPreferencesBtn={
          <Stack
            style={{ pointerEvents: loading.preferences ? 'none' : 'auto' }}
          >
            <ButtonPrimaryOutlinedRegular
              buttonText={'Save'}
              isDisabled={!preferenceChange}
              buttonProps={{
                onClick: async () => {
                  setLoading((prev) => {
                    return { ...prev, preferences: true };
                  });
                  const confirmation = await handleSubmit(
                    preferences,
                    setPreferences,
                    handleUpdateProfile,
                    recruiterUser,
                  );
                  if (confirmation) setPreferenceChange(false);
                  setLoading((prev) => {
                    return { ...prev, preferences: false };
                  });
                },
              }}
            />
          </Stack>
        }
        onClickEmailChange={{
          onClick: () => {
            document.getElementById('job-profile-change-email').click();
          },
        }}
      />
    </Stack>
  );
};
const ProfileImage = () => {
  const { recruiterUser, handleUpdateProfile } = useAuthDetails();
  return (
    <ImageUpload
      image={recruiterUser.profile_image}
      size={70}
      table='recruiter-user'
      handleUpdateProfile={handleUpdateProfile}
    />
  );
};

const handleValidate = (profile: FormFields | PreferenceFormFields) => {
  return Object.entries(profile).reduce(
    (acc, [key, curr]) => {
      let value = curr.value;
      let error = false;
      switch (curr.validation) {
        case 'string':
          {
            if (validateString(value)) value = value.trim();
            else error = true;
          }
          break;
        case 'mail':
          {
            if (validateMail(value)) value = value.trim();
            else error = true;
          }
          break;
        case 'phone':
          {
            if (validatePhone(value)) value = value.trim();
            else error = true;
          }
          break;
      }
      return {
        newProfile: {
          ...acc.newProfile,
          [key]: { ...acc.newProfile[key], value, error },
        },
        error: error && !acc.error ? true : acc.error,
      };
    },
    {
      newProfile: profile,
      error: false,
    },
  );
};
const handleSubmit = async (
  profile: any,
  setProfile: any,
  // eslint-disable-next-line no-unused-vars
  handleUpdateProfile: (userDetails: RecruiterUserType) => Promise<boolean>,
  recruiterUser: RecruiterUserType,
  // eslint-disable-next-line no-unused-vars
) => {
  const { newProfile, error } = handleValidate(profile);
  if (!error) {
    const confirmation = await handleUpdateProfile({
      ...recruiterUser,
      first_name: profile.first_name.value,
      last_name: profile.last_name.value,
      phone: profile.phone.value,
    });
    if (confirmation) {
      toast.success('Profile infomation saved successfully');
      return true;
    }
  } else {
    {
      setProfile(newProfile);
      return false;
    }
  }
};
const validateString = (value: string) => {
  return value && value.trim() !== '';
};
const validateMail = (value: string) => {
  return (
    value &&
    value.trim() !== '' &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
  );
};
const validatePhone = (value: string) => {
  function countRept(string, regex) {
    var numbers = string?.match(regex);
    return numbers ? numbers.length : 0;
  }
  return !(
    value.trim() === '' ||
    countRept(value.trim(), /\d/g) != countRept('+.. .....-.....', /\./g)
  );
};
const ProfileForms = ({
  profile,
  setProfile,
  setChanges = null,
}: {
  profile: FormFields | PreferenceFormFields | EmailFormFields;
  setProfile:
    | React.Dispatch<React.SetStateAction<FormFields>>
    | React.Dispatch<React.SetStateAction<PreferenceFormFields>>
    | React.Dispatch<React.SetStateAction<EmailFormFields>>;
  setChanges?: () => void;
}) => {
  const handleChange = (e, key: string) => {
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
  const [defaultCountry, setDefaultCountry] = React.useState('');
  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json', {
        headers: {
          Authorization: `Bearer e82b96e5cb0802`,
        },
      });
      const data = await response.json();

      const country = data.country; // Extract the country code from the response
      setDefaultCountry(country?.toLowerCase() || 'us'); // Set the default country based on the user's location
    } catch (error) {
      // Handle any errors that occur during the API call
    }
  };
  React.useEffect(() => {
    if (value.validation === 'phone') {
      fetchUserLocation();
    }
  }, []);
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
        <Stack>
          {value.specialForm && (
            <SpecialForm name={id} validation={value.validation} />
          )}
          <UITextField
            labelSize='small'
            fullWidth
            label={value.label}
            placeholder={value.placeholder}
            required={value.required}
            value={value.value}
            disabled={value.blocked}
            error={value.error}
            helperText={`Please enter a valid ${capitalize(id)}`}
            onChange={(e) => onChange(e, id)}
          />
        </Stack>
      );
    }
  }
};
const SpecialForm = ({
  name,
  validation,
}: {
  name: string;
  validation: FormValues['validation'];
}) => {
  const { handleUpdateEmail } = useAuthDetails();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValue('');
    setError(false);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    setError(false);
  };
  const handleValidate = (value: string, phoneFormat: string = null) => {
    switch (validation) {
      case 'string':
        return { newValue: value.trim(), error: !validateString(value) };
      case 'mail':
        return { newValue: value.trim(), error: !validateMail(value) };
      case 'phone':
        return {
          newValue: value.trim(),
          error: !validatePhone(phoneFormat),
        };
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const { newValue, error } = handleValidate(value);
    if (!error) {
      // triggerChange({ target: { value: newValue } });
      if (validation === 'mail') await handleUpdateEmail(newValue);
      handleClose();
    } else {
      setError(true);
    }
    setLoading(false);
  };
  const inputSlot = (
    <UITextField
      labelSize='small'
      fullWidth
      value={value}
      error={error}
      helperText={`Please enter a valid ${capitalize(name)}`}
      onChange={(e) => handleChange(e)}
    />
  );
  return (
    <>
      <Dialog open={open} onClose={() => handleClose()}>
        <Stack style={{ pointerEvents: loading ? 'none' : 'auto' }}>
          <ProfileEmailPop
            onClickClose={{ onClick: () => handleClose() }}
            slotInput={inputSlot}
            onClickSendLink={{ onClick: () => handleSubmit() }}
          />
        </Stack>
      </Dialog>
      <Stack id={`job-profile-change-${name}`} onClick={() => handleOpen()} />
    </>
  );
};
export default ProfileDashboard;
