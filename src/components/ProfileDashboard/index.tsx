/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Autocomplete, Dialog, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import React from 'react';

import {
  NavSublink,
  ProfileEmailPop,
  UserChangeEmail,
  UserDetails,
  UserPasswordChange,
  UserProfile,
} from '@/devlink';
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
  type: 'text' | 'password';
  placeholder: string;
  error: boolean;
  validation: 'string' | 'phone' | 'mail' | 'password';
  helperText: string;
  blocked: boolean;
  required: boolean;
  disabled: boolean;
  specialForm: boolean;
  options: string[];
};
type FormFields = {
  first_name: FormValues;
  last_name: FormValues;
  position: FormValues;
  phone: FormValues;
};
type PreferenceFormFields = {
  language: FormValues;
  timezone: FormValues;
};
type EmailFormFields = {
  email: FormValues;
};
type PasswordFormFields = {
  password: FormValues;
  confirmPassword: FormValues;
};
const ProfileDashboard = () => {
  const {
    userDetails,
    handleUpdateProfile,
    recruiterUser,
    handleUpdatePassword,
  } = useAuthDetails();
  const userMail = userDetails.user.email;
  const router = useRouter();
  const initialFormValues: FormValues = {
    value: null,
    label: null,
    type: 'text',
    helperText: null,
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
      label: 'First Name',
      placeholder: 'Enter your first name.',
    },
    last_name: {
      ...initialFormValues,
      value: recruiterUser.last_name,
      required: true,
      label: 'Last Name',
      placeholder: 'Enter your last name.',
    },
    phone: {
      ...initialFormValues,
      value: recruiterUser.phone,
      validation: 'phone',
      label: 'Contact Number',
      required:false
    },
    position: {
      ...initialFormValues,
      value: recruiterUser.position,
      label: 'Position',
      blocked: false,
      required:false,
      placeholder: 'Enter your job title.',
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
  const initialPassword: PasswordFormFields = {
    password: {
      ...initialFormValues,
      value: '',
      validation: 'password',
      type: 'password',
      required: true,
      label: 'Create New Password',
      placeholder: 'Enter a new password.',
    },
    confirmPassword: {
      ...initialFormValues,
      value: '',
      validation: 'password',
      type: 'password',
      required: true,
      label: 'Re-enter New Password',
      placeholder: 'Re-enter the new password for confirmation.',
    },
  };

  const [profileChange, setProfileChange] = React.useState(false);
  const [loading, setLoading] = React.useState({
    profile: false,
    preferences: false,
    email: false,
    password: false,
  });

  const [profile, setProfile] = React.useState<FormFields>(
    initalProfileFormFields,
  );
  const [email, setEmail] = React.useState(initialEmail);
  const [password, setPassword] = React.useState(initialPassword);
  const [passwordChange, setPasswordChange] = React.useState(false);

  let currTab: 'User Detail' | 'Change Email' | 'Change password' =
    'User Detail';
  if (router.query?.update === 'Change Email') {
    currTab = 'Change Email';
  } else if (router.query?.update === 'Change password') {
    currTab = 'Change password';
  }
  return (
    <Stack>
      <UserProfile
        slotInfo={
          <>
            {currTab === 'User Detail' && (
              <UserDetails
                slotUserImage={<ProfileImage />}
                slotUserForm={
                  <>
                    <ProfileForms
                      profile={profile}
                      setProfile={setProfile}
                      setChanges={() => setProfileChange(true)}
                    />
                  </>
                }
                slotUserInfoBtn={
                  <>
                    <Stack
                      style={{
                        position: 'relative',
                        pointerEvents: loading.profile ? 'none' : 'auto',
                        zIndex: 0,
                      }}
                    >
                      <ButtonPrimaryOutlinedRegular
                        buttonText={'Save Changes'}
                        isDisabled={!profileChange}
                        buttonProps={{
                          onClick: async () => {
                            setLoading((prev) => {
                              return { ...prev, password: true };
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
                  </>
                }
                onClickProfilePhotoChange={{
                  onClick: () => {
                    document.getElementById('image-upload').click();
                  },
                }}
              />
            )}
            {currTab === 'Change Email' && (
              <>
                <UserChangeEmail
                  onClickEmailChange={{
                    onClick: () => {
                      document
                        .getElementById('job-profile-change-email')
                        .click();
                    },
                  }}
                  slotEmail={
                    <ProfileForms
                      profile={email}
                      setProfile={setEmail}
                      setChanges={() => setPasswordChange(true)}
                    />
                  }
                />
              </>
            )}
            <>
              {currTab === 'Change password' && (
                <UserPasswordChange
                  slotPassword={
                    <>
                      <ProfileForms
                        profile={password}
                        setProfile={setPassword}
                        setChanges={() => setPasswordChange(true)}
                      />
                    </>
                  }
                  slotSavePassword={
                    <>
                      <Stack
                        style={{
                          pointerEvents: loading.password ? 'none' : 'auto',
                          zIndex: 0,
                        }}
                      >
                        <ButtonPrimaryOutlinedRegular
                          buttonText={'Update Password'}
                          isDisabled={
                            !passwordChange ||
                            password.password.value === '' ||
                            password.confirmPassword.value === ''
                          }
                          buttonProps={{
                            onClick: async () => {
                              setLoading((prev) => {
                                return { ...prev, profile: true };
                              });
                              const confirmation = await handleSubmitPassword(
                                password,
                                setPassword,
                                handleUpdatePassword,
                              );
                              if (confirmation) {
                                setPasswordChange(true);
                                setPassword(initialPassword);
                              }
                              setLoading((prev) => {
                                return { ...prev, password: false };
                              });
                            },
                          }}
                        />
                      </Stack>
                    </>
                  }
                />
              )}
            </>
          </>
        }
        // slotPreferenceForm={<>fjerknferjkn</>}
        slotNavSublink={
          <>
            <NavSublink
              isActive={currTab === 'User Detail'}
              onClickNav={{
                onClick: () => {
                  router.query.update = 'User Detail';
                  router.push(router);
                },
              }}
              textLink='Your Details'
            />
            <NavSublink
              isActive={currTab === 'Change Email'}
              onClickNav={{
                onClick: () => {
                  router.query.update = 'Change Email';
                  router.push(router);
                },
              }}
              textLink='Change Email'
            />
            <NavSublink
              isActive={currTab === 'Change password'}
              onClickNav={{
                onClick: () => {
                  router.query.update = 'Change password';
                  router.push(router);
                },
              }}
              textLink='Password Update'
            />
          </>
        }
      />
    </Stack>
  );
};
const ProfileImage = () => {
  const { recruiterUser, handleUpdateProfile } = useAuthDetails();
  return (
    <ImageUpload
      image={recruiterUser.profile_image}
      size={80}
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
      if(curr.required){
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

const handleValidatePassword = (password: PasswordFormFields) => {
  if (
    validatePassword(password.password.value) &&
    validatePassword(password.confirmPassword.value)
  ) {
    if (
      password.password.value.trim() === password.confirmPassword.value.trim()
    ) {
      return {
        newPassword: password.password.value.trim(),
        error: null,
      };
    } else
      return {
        newPassword: null,
        error: 'Passwords do not match',
      };
  } else
    return {
      newPassword: null,
      error:
        'Must contain more than 7 characters, 1 uppercase letter, 1 lowercase letter and 1 number',
    };
};

const handleSubmit = async (
  profile: any,
  setProfile: any,
  // eslint-disable-next-line no-unused-vars
  handleUpdateProfile: (userDetails: RecruiterUserType) => Promise<boolean>,
  recruiterUser: RecruiterUserType,
) => {
  const { newProfile, error } = handleValidate(profile);
  if (!error) {
    const confirmation = await handleUpdateProfile({
      ...recruiterUser,
      first_name: profile.first_name.value,
      last_name: profile.last_name.value,
      phone: profile.phone.value,
      position: profile.position.value,
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

const handleSubmitPassword = async (
  password: any,
  setPassword: any,
  // eslint-disable-next-line no-unused-vars
  handleUpdatePassword: (password: string) => Promise<boolean>,
) => {
  const { newPassword, error } = handleValidatePassword(password);
  if (!error) {
    await handleUpdatePassword(newPassword);
    return true;
  } else {
    setPassword((prev) => {
      return {
        ...prev,
        password: { ...prev.password, error: true, helperText: error },
        confirmPassword: {
          ...prev.confirmPassword,
          error: true,
          helperText: error,
        },
      };
    });
  }
};
const validateString = (value: string) => {
  return value && value.trim() !== '';
};
const validatePassword = (value: string) => {
  if (
    validateString(value) &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value.trim(),
    )
  )
    return true;
};
const validateMail = (value: string) => {
  return (
    value &&
    value.trim() !== '' &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(value.trim())
  );
};
const validatePhone = (value: string) => {
  function countRept(string, regex) {
    var numbers = string?.match(regex);
    return numbers ? numbers.length : 0;
  }
  return !(
    value.trim() === '' ||
    !(
      countRept(value.trim(), /\d/g) === countRept('+.. .....-.....', /\./g) ||
      countRept(value.trim(), /\d/g) === countRept('+. ......-....', /\./g)
    )
  );
};
const ProfileForms = ({
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
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  style={{ opacity: value.value ? 1 : 0.5 }}
                >
                  {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
        <Stack>
          {value.specialForm && (
            <SpecialForm name={id} validation={value.validation} />
          )}
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
      labelBold='default'
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
