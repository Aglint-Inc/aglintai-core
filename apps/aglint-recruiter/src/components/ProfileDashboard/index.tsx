/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import { DatabaseEnums } from '@aglint/shared-types';
import { RecruiterUserType } from '@aglint/shared-types';
import { Autocomplete, Avatar, Dialog, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { EmailChangePop } from '@/devlink/EmailChangePop';
import { NavSublink } from '@/devlink/NavSublink';
import { PasswordUpdated } from '@/devlink/PasswordUpdated';
import { ProfileList } from '@/devlink/ProfileList';
import { UserChangeEmail } from '@/devlink/UserChangeEmail';
import { UserDetails } from '@/devlink/UserDetails';
import { UserPasswordChange } from '@/devlink/UserPasswordChange';
import { UserProfile } from '@/devlink/UserProfile';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { handleUpdatePassword } from '@/src/context/AuthContext/utils';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import AUIButton from '../Common/AUIButton';
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
  validation: 'string' | 'phone' | 'mail' | 'password' | 'linkedIn';
  helperText: string;
  blocked: boolean;
  required: boolean;
  disabled: boolean;
  specialForm: boolean;
  options: string[];
  modal: boolean;
};
type FormFields = {
  first_name: FormValues;
  last_name: FormValues;
  // email: FormValues;
  phone: FormValues;
  linked_in: FormValues;
  // location: FormValues;
  // designation: FormValues;
  // department: FormValues;
  // role: FormValues;
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

const navTabs: {
  label: string;
  route: string;
  roles?: DatabaseEnums['user_roles'][];
}[] = [
  {
    label: 'Your Details',
    route: 'user_detail',
  },
  {
    label: 'Change Email',
    route: 'change_email',
    roles: ['admin'],
  },
  {
    label: 'Password Update',
    route: 'password_update',
  },
];

const ProfileDashboard = () => {
  const {
    userDetails,
    handleUpdateProfile,
    recruiterUser,
    handleUpdateEmail,
    isAllowed,
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
    modal: false,
  };
  const initialProfileFormFields: FormFields = {
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
    // email: {
    //   ...initialFormValues,
    //   value: recruiterUser.email,
    //   blocked: true,
    //   required: false,
    //   label: 'Email',
    //   placeholder: 'Enter your email.',
    // },
    phone: {
      ...initialFormValues,
      value: recruiterUser.phone,
      validation: 'phone',
      label: 'Contact Number',
      required: false,
    },
    linked_in: {
      ...initialFormValues,
      value: recruiterUser.linked_in,
      validation: 'linkedIn',
      label: 'LinkedIn',
      required: false,
    },
  };
  const initialEmail: EmailFormFields = {
    email: {
      ...initialFormValues,
      value: '',
      validation: 'mail',
      placeholder: 'john.doe@example.com',
      blocked: false,
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

  const [profileChange, setProfileChange] = useState(false);
  const [profileForm, setProfileForm] = useState(false);
  const [loading, setLoading] = React.useState({
    profile: false,
    preferences: false,
    email: false,
    password: false,
  });

  const [profile, setProfile] = React.useState<FormFields>(
    structuredClone(initialProfileFormFields),
  );
  const [email, setEmail] = React.useState(initialEmail);
  const [password, setPassword] = React.useState(initialPassword);
  const [passwordChange, setPasswordChange] = React.useState(false);
  const [currTab, setCurrTab] = useState<
    'user_detail' | 'change_email' | 'password_update'
  >('user_detail');
  // let currTab: 'user_detail' | 'change_email' | 'password_update' =
  //   'user_detail';
  // if (router.query?.tab === 'Change Email') {
  //   currTab = 'Change Email';
  // } else if (router.query?.tab === 'Change password') {
  //   currTab = 'Change password';
  // }

  useEffect(() => {
    if (router.query?.tab)
      setCurrTab(router.query?.tab as unknown as typeof currTab);
  }, [router.query?.tab]);

  const handleValidatePassword = () => {
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
  const handleValidateMail = () => {
    if (validateMail(email.email.value)) {
      if (validateGMail(email.email.value))
        return {
          newEmail: null,
          error: 'Enter a valid work email',
        };
      return {
        newEmail: refactorEmail(email.email.value).trim(),
        error: null,
      };
    } else return { newEmail: null, error: 'Enter a valid work email' };
  };

  const refactorEmail = (email: string) => {
    const regex = /\+.*@/;
    if (regex.test(email)) return email.replace(regex, '@');
    return email;
  };

  const handleSubmitPassword = async () => {
    const { newPassword, error } = handleValidatePassword();
    if (!error) {
      await handleUpdatePassword(newPassword, false);
      setPassword((prev) => ({
        ...prev,
        password: { ...prev.password, modal: true },
      }));
      setPasswordChange(true);
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

  const handleSubmitEmail = async () => {
    const { newEmail, error } = handleValidateMail();
    if (!error) {
      const confirmation = await handleUpdateEmail(newEmail);
      if (confirmation) {
        setEmail((prev) => ({
          ...prev,
          email: { ...prev.email, modal: true },
        }));
        return true;
      } else return false;
    } else {
      setEmail((prev) => {
        return {
          ...prev,
          email: { ...prev.email, error: true, helperText: error },
        };
      });
    }
  };
  const handleClosePassword = () => {
    setPassword(initialPassword);
  };
  const handleCloseEmail = () => {
    setEmail(initialEmail);
  };
  const [isError, setError] = useState(false);

  return (
    <>
      {profileForm && (
        <Dialog
          open={profileForm}
          onClose={() => {
            setProfile(structuredClone(initialProfileFormFields));
            setProfileForm(false);
          }}
        >
          <UserDetails
            isWarningVisible={isError}
            slotWarning={
              <Typography variant='caption' color='error'>
                The file you uploaded exceeds the maximum allowed size. Please
                ensure that the file size is less than 5 MB
              </Typography>
            }
            slotUserImage={
              <ImageUpload
                image={recruiterUser.profile_image}
                size={80}
                table='recruiter-user'
                handleUpdateProfile={handleUpdateProfile}
                error={(e) => {
                  if (e) {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
              />
            }
            slotUserForm={
              // <></>
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
                {/* <Stack
                  style={{
                    position: 'relative',
                    pointerEvents: loading.profile ? 'none' : 'auto',
                    zIndex: 0,
                  }}
                >
                  <ButtonPrimaryRegular
                    textLabel={'Save Changes'}
                    isDisabled={!profileChange}
                    onClickButton={{
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
                </Stack> */}
              </>
            }
            onClickClose={{
              onClick: () => {
                setProfile(structuredClone(initialProfileFormFields));
                setProfileForm(false);
              },
            }}
            onClickUpdate={{
              onClick: async () => {
                if (profileChange) {
                  if (profile) {
                    setLoading((prev) => {
                      return { ...prev, password: true };
                    });
                    const confirmation = await handleSubmit(
                      profile,
                      setProfile,
                      handleUpdateProfile,
                      recruiterUser,
                    );
                    if (confirmation) {
                      setProfileChange(false);
                      setProfileForm(false);
                    }
                    setLoading((prev) => {
                      return { ...prev, profile: false };
                    });
                  }
                } else {
                  toast.error('No changes.');
                }
              },
            }}
            onClickProfilePhotoChange={{
              onClick: () => {
                document.getElementById('image-upload').click();
              },
            }}
          />
        </Dialog>
      )}
      <Stack>
        <UserProfile
          slotInfo={
            <>
              {currTab === 'user_detail' && (
                <ProfileList
                  isLinkedInVisible={Boolean(recruiterUser.linked_in?.length)}
                  onClickLinkedIn={{
                    onClick: () => {
                      recruiterUser.linked_in?.length &&
                        window.open(recruiterUser.linked_in, '_ blank');
                    },
                  }}
                  slotUserImage={
                    <Avatar
                      variant='rounded'
                      src={recruiterUser.profile_image}
                      alt={recruiterUser.first_name}
                      sx={{
                        width: '50px',
                        height: '50px',
                      }}
                    />
                  }
                  textName={`${recruiterUser?.first_name ?? ''} ${
                    recruiterUser?.last_name ?? ''
                  }`.trim()}
                  textDepartment={recruiterUser.department}
                  textEmail={recruiterUser.email}
                  textJobTitle={recruiterUser.position}
                  textLocation={recruiterUser.interview_location}
                  textRole={capitalizeFirstLetter(recruiterUser.role)}
                  textNumber={recruiterUser.phone}
                  onClickEdit={{
                    onClick: () => {
                      setProfileForm(true);
                    },
                  }}
                />
              )}
              {currTab === 'change_email' && (
                <>
                  <Dialog
                    open={email.email.modal}
                    onClose={() => handleCloseEmail()}
                  >
                    <EmailChangePop
                      textDesc={
                        <>
                          <>A confirmation link has been sent to </>
                          <span style={{ color: 'var(--accent-11)', fontWeight: 400 }}>
                            {email.email.value}
                          </span>
                          <>. Please confirm it to update your email ID.</>
                        </>
                      }
                      onClickClose={{
                        onClick: () => handleCloseEmail(),
                      }}
                    />
                  </Dialog>
                  <UserChangeEmail
                    texDesc={
                      <>
                        <>Your registered email is </>
                        <span style={{ color: 'var(--accent-11)', fontWeight: 400 }}>
                          {userMail}
                        </span>
                        <>
                          . To change your email, enter the new email address
                          below. A verification link will be sent to this new
                          address.
                        </>
                      </>
                    }
                    onClickEmailChange={{
                      onClick: async () => {
                        setLoading((prev) => ({ ...prev, email: true }));
                        await handleSubmitEmail();
                        setLoading((prev) => ({ ...prev, email: false }));
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
                {currTab === 'password_update' && (
                  <>
                    <Dialog
                      open={password.password.modal}
                      onClose={() => handleClosePassword()}
                    >
                      <PasswordUpdated
                        onClickClose={{
                          onClick: () => handleClosePassword(),
                        }}
                      />
                    </Dialog>
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
                            <AUIButton
                              disabled={
                                !passwordChange ||
                                password.password.value === '' ||
                                password.confirmPassword.value === ''
                              }
                              onClick={async () => {
                                setLoading((prev) => {
                                  return { ...prev, profile: true };
                                });
                                await handleSubmitPassword();
                                setLoading((prev) => {
                                  return { ...prev, password: false };
                                });
                              }}
                            >
                              Update Password
                            </AUIButton>
                          </Stack>
                        </>
                      }
                    />
                  </>
                )}
              </>
            </>
          }
          // slotPreferenceForm={<>fjerknferjkn</>}
          slotNavSublink={
            <>
              {navTabs
                .filter((item) => (item.roles ? isAllowed(item.roles) : true))
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

const handleValidate = (profile: FormFields | PreferenceFormFields) => {
  return Object.entries(profile).reduce(
    (acc, [key, curr]) => {
      let value = curr.value?.trim() || null;
      let error = false;
      if (curr.required || value?.length) {
        switch (curr.validation) {
          case 'string':
            {
              if (!validateString(value)) error = true;
            }
            break;
          case 'mail':
            {
              if (!validateMail(value)) error = true;
            }
            break;
          case 'phone':
            {
              if (!validatePhone(value)) error = true;
            }
            break;
          case 'linkedIn': {
            if (!validateLinkedIn(value)) error = true;
          }
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
      linked_in: profile.linked_in.value,
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
    /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g.test(
      value.trim(),
    )
  );
};
const validateGMail = (value: string) => {
  return (
    value &&
    value.trim() !== '' &&
    /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@g(oogle)?mail([\.])com/g.test(
      value.trim(),
    )
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
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  style={{ opacity: value.value ? 1 : 0.5 }}
                >
                  <svg
                        width='15'
                        height='15'
                        viewBox='0 0 15 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        {showPassword ? (
                          <path
                            d='M3.49219 4.6875C2.99219 5.17188 2.57031 5.66406 2.22656 6.16406C1.89844 6.66406 1.65625 7.10938 1.5 7.5C1.65625 7.89062 1.89844 8.33594 2.22656 8.83594C2.57031 9.33594 2.99219 9.82812 3.49219 10.3125C4.00781 10.7969 4.59375 11.1953 5.25 11.5078C5.92188 11.8203 6.67188 11.9844 7.5 12C8.32812 11.9844 9.07812 11.8203 9.75 11.5078C10.4062 11.1953 10.9922 10.7969 11.5078 10.3125C12.0078 9.82812 12.4297 9.33594 12.7734 8.83594C13.1016 8.33594 13.3438 7.89062 13.5 7.5C13.3438 7.10938 13.1016 6.66406 12.7734 6.16406C12.4297 5.66406 12.0078 5.17188 11.5078 4.6875C10.9922 4.20312 10.4062 3.80469 9.75 3.49219C9.07812 3.17969 8.32812 3.01563 7.5 3C6.67188 3.01563 5.92188 3.17969 5.25 3.49219C4.59375 3.80469 4.00781 4.20312 3.49219 4.6875ZM7.5 2.25C8.45312 2.26563 9.30469 2.45313 10.0547 2.8125C10.8047 3.17187 11.4609 3.61719 12.0234 4.14844C12.5703 4.66406 13.0234 5.19531 13.3828 5.74219C13.7422 6.28906 14.0156 6.78125 14.2031 7.21875C14.2812 7.40625 14.2812 7.59375 14.2031 7.78125C14.0156 8.21875 13.7422 8.71094 13.3828 9.25781C13.0234 9.80469 12.5703 10.3359 12.0234 10.8516C11.4609 11.3828 10.8047 11.8281 10.0547 12.1875C9.30469 12.5469 8.45312 12.7344 7.5 12.75C6.54688 12.7344 5.69531 12.5469 4.94531 12.1875C4.19531 11.8281 3.53906 11.3828 2.97656 10.8516C2.42969 10.3359 1.97656 9.80469 1.61719 9.25781C1.25781 8.71094 0.992188 8.21875 0.820312 7.78125C0.742188 7.59375 0.742188 7.40625 0.820312 7.21875C0.992188 6.78125 1.25781 6.28906 1.61719 5.74219C1.97656 5.19531 2.42969 4.66406 2.97656 4.14844C3.53906 3.61719 4.19531 3.17187 4.94531 2.8125C5.69531 2.45313 6.54688 2.26563 7.5 2.25ZM5.25 7.5C5.25 7.90625 5.35156 8.28125 5.55469 8.625C5.75781 8.96875 6.03125 9.24219 6.375 9.44531C6.73438 9.64844 7.10938 9.75 7.5 9.75C7.89062 9.75 8.26562 9.64844 8.625 9.44531C8.96875 9.24219 9.24219 8.96875 9.44531 8.625C9.64844 8.28125 9.75 7.90625 9.75 7.5C9.75 7.09375 9.64844 6.71875 9.44531 6.375C9.24219 6.03125 8.96875 5.75781 8.625 5.55469C8.26562 5.35156 7.89062 5.25 7.5 5.25C7.10938 5.25 6.73438 5.35156 6.375 5.55469C6.03125 5.75781 5.75781 6.03125 5.55469 6.375C5.35156 6.71875 5.25 7.09375 5.25 7.5ZM10.5 7.5C10.5 8.04688 10.3672 8.54688 10.1016 9C9.83594 9.45312 9.46875 9.82031 9 10.1016C8.53125 10.3672 8.03125 10.5 7.5 10.5C6.96875 10.5 6.46875 10.3672 6 10.1016C5.53125 9.82031 5.16406 9.45312 4.89844 9C4.63281 8.54688 4.5 8.04688 4.5 7.5C4.5 6.95312 4.63281 6.45312 4.89844 6C5.16406 5.54688 5.53125 5.17969 6 4.89844C6.46875 4.63281 6.96875 4.5 7.5 4.5C8.03125 4.5 8.53125 4.63281 9 4.89844C9.46875 5.17969 9.83594 5.54688 10.1016 6C10.3672 6.45312 10.5 6.95312 10.5 7.5Z'
                            fill='#2F3941'
                          />
                        ) : (
                          <path
                            d='M1.60938 1.57031L15.8594 12.8438C16.0312 13 16.0547 13.1719 15.9297 13.3594C15.7578 13.5312 15.5781 13.5547 15.3906 13.4297L1.14062 2.17969C0.96875 2.00781 0.945312 1.82812 1.07031 1.64062C1.24219 1.48437 1.42188 1.46094 1.60938 1.57031ZM15.2031 7.78125C14.9531 8.39062 14.5312 9.08594 13.9375 9.86719L13.3516 9.42188C13.8984 8.6875 14.2812 8.04688 14.5 7.5C14.3438 7.10938 14.1016 6.66406 13.7734 6.16406C13.4297 5.66406 13.0078 5.17188 12.5078 4.6875C11.9922 4.20312 11.4062 3.80469 10.75 3.49219C10.0781 3.17969 9.32812 3.01563 8.5 3C7.5625 3.01563 6.72656 3.21875 5.99219 3.60938L5.35938 3.11719C6.25 2.57031 7.29688 2.28125 8.5 2.25C9.45312 2.26563 10.3047 2.45313 11.0547 2.8125C11.8047 3.17187 12.4609 3.61719 13.0234 4.14844C13.5703 4.66406 14.0234 5.19531 14.3828 5.74219C14.7422 6.28906 15.0156 6.78125 15.2031 7.21875C15.2656 7.40625 15.2656 7.59375 15.2031 7.78125ZM3.0625 5.13281L3.67188 5.60156C3.10938 6.32031 2.71875 6.95312 2.5 7.5C2.65625 7.89062 2.89844 8.33594 3.22656 8.83594C3.57031 9.33594 3.99219 9.82812 4.49219 10.3125C5.00781 10.7969 5.59375 11.1953 6.25 11.5078C6.92188 11.8203 7.67188 11.9844 8.5 12C9.4375 11.9844 10.2734 11.7812 11.0078 11.3906L11.6406 11.8828C10.75 12.4297 9.70312 12.7188 8.5 12.75C7.54688 12.7344 6.69531 12.5469 5.94531 12.1875C5.19531 11.8281 4.54688 11.3828 4 10.8516C3.4375 10.3359 2.97656 9.80469 2.61719 9.25781C2.25781 8.71094 1.99219 8.21875 1.82031 7.78125C1.74219 7.59375 1.74219 7.40625 1.82031 7.21875C2.05469 6.60938 2.46875 5.91406 3.0625 5.13281ZM8.5 10.5C7.65625 10.4844 6.94531 10.1875 6.36719 9.60938C5.80469 9.04688 5.51562 8.34375 5.5 7.5C5.5 7.34375 5.50781 7.19531 5.52344 7.05469L6.25 7.64062C6.29688 8.23438 6.53125 8.73438 6.95312 9.14062C7.375 9.53125 7.89062 9.73438 8.5 9.75C8.625 9.75 8.75781 9.74219 8.89844 9.72656L9.60156 10.2891C9.25781 10.4297 8.89062 10.5 8.5 10.5ZM11.5 7.5C11.5 7.65625 11.4922 7.80469 11.4766 7.94531L10.75 7.35938C10.7031 6.76562 10.4688 6.26562 10.0469 5.85938C9.625 5.46875 9.10938 5.26562 8.5 5.25C8.375 5.25 8.25 5.26562 8.125 5.29688L7.39844 4.71094C7.74219 4.57031 8.10938 4.5 8.5 4.5C9.34375 4.51562 10.0547 4.80469 10.6328 5.36719C11.1953 5.94531 11.4844 6.65625 11.5 7.5Z'
                            fill='#2F3941'
                          />
                        )}
                      </svg>
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

const validateLinkedIn = (value: string) => {
  const linkedInURLPattern =
    /^(https?:\/\/)?((www|in)\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  return linkedInURLPattern.test(value);
};
