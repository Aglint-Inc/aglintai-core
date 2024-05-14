/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import { DatabaseEnums } from '@aglint/shared-types';
import { RecruiterUserType } from '@aglint/shared-types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Autocomplete, Avatar, Dialog, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  EmailChangePop,
  NavSublink,
  PasswordUpdated,
  ProfileList,
  UserChangeEmail,
  UserDetails,
  UserPasswordChange,
  UserProfile,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { handleUpdatePassword } from '@/src/context/AuthContext/utils';
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
                  textRole={recruiterUser.role}
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
                          <span style={{ color: '#ED8F1C', fontWeight: 400 }}>
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
                        <span style={{ color: '#ED8F1C', fontWeight: 400 }}>
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
