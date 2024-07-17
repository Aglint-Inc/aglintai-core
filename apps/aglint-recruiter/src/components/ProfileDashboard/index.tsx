import { RecruiterUserType } from '@aglint/shared-types';
import { Autocomplete, Avatar, Dialog, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { EmailChangePop } from '@/devlink/EmailChangePop';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { NavSublink } from '@/devlink/NavSublink';
import { PasswordUpdated } from '@/devlink/PasswordUpdated';
import { ProfileList } from '@/devlink/ProfileList';
import { UserChangeEmail } from '@/devlink/UserChangeEmail';
import { UserDetails } from '@/devlink/UserDetails';
import { UserPasswordChange } from '@/devlink/UserPasswordChange';
import { UserProfile } from '@/devlink/UserProfile';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { handleUpdatePassword } from '@/src/context/AuthContext/utils';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { PermissionEnums } from '@/src/utils/routing/permissions';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import { capitalize, capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import ImageUploadManual from '../Common/ImageUpload/ImageUploadManual';
import UIPhoneInput from '../Common/UIPhoneInput';
import UITextField from '../Common/UITextField';
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
  const { userDetails, handleUpdateProfile, recruiterUser, handleUpdateEmail } =
    useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
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
      const res = await handleUpdatePassword(newPassword, false);
      if (!res) return;
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
    if (userMail === newEmail) {
      toast.error(
        'You have entered your current email address. Please use different email',
      );
      return;
    }
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

  const imageFile = useRef(null);

  const { userDetails: userDetail } = useAuthDetails();

  async function onUpdateSubmit() {
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
        const { data } = await supabase.storage
          .from('recruiter-user')
          .upload(`public/${userDetail?.user?.id}`, imageFile.current, {
            cacheControl: '3600',
            upsert: true,
          });

        if (data?.path && imageFile?.current?.size) {
          setError(false);
          await handleUpdateProfile({
            profile_image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recruiter-user/${data?.path}?t=${new Date().toISOString()}`,
          } as RecruiterUserType);
        } else {
          await handleUpdateProfile({
            profile_image: null,
          } as RecruiterUserType);
        }

        setLoading((prev) => {
          return { ...prev, profile: false };
        });
      }
    } else {
      toast.error('No changes.');
    }
  }
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
            slotClose={
              <IconButtonGhost
                iconName='close'
                size={2}
                color={'neutral'}
                onClickButton={{
                  onClick: () => {
                    setProfile(structuredClone(initialProfileFormFields));
                    setProfileForm(false);
                  },
                }}
              />
            }
            slotButton={
              <>
                <ButtonSoft
                  textButton='Cancel'
                  size={2}
                  color={'neutral'}
                  onClickButton={{
                    onClick: () => {
                      setProfile(structuredClone(initialProfileFormFields));
                      setProfileForm(false);
                    },
                  }}
                />
                <ButtonSolid
                  textButton='Update'
                  size={2}
                  onClickButton={{
                    onClick: onUpdateSubmit,
                  }}
                />
              </>
            }
            isWarningVisible={isError}
            slotWarning={
              <Typography variant='caption' color='error'>
                The file you uploaded exceeds the maximum allowed size. Please
                ensure that the file size is less than 5 MB
              </Typography>
            }
            slotUserImage={
              <ImageUploadManual
                image={recruiterUser.profile_image}
                size={64}
                imageFile={imageFile}
                setChanges={() => setProfileChange(true)}
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
            slotUserInfoBtn={<></>}
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
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  }
                  textName={`${recruiterUser?.first_name ?? ''} ${
                    recruiterUser?.last_name ?? ''
                  }`.trim()}
                  textDepartment={recruiterUser.department || '--'}
                  textEmail={recruiterUser.email || '--'}
                  textJobTitle={recruiterUser.position || '--'}
                  textLocation={recruiterUser.interview_location || '--'}
                  isRoleLinkVisible={recruiterUser.role === 'admin'}
                  isManagerVisible={recruiterUser.role !== 'admin'}
                  onClickRole={{
                    onClick: () => {
                      router.push(
                        `${ROUTES['/company']()}?tab=roles&role=${recruiterUser.role}`,
                      );
                    },
                  }}
                  textManager={recruiterUser.manager_details?.name || '--'}
                  textRole={
                    recruiterUser.role
                      ? capitalizeFirstLetter(recruiterUser.role)
                      : '--'
                  }
                  textNumber={recruiterUser.phone || '--'}
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
                          <span
                            style={{
                              color: 'var(--accent-11)',
                              fontWeight: 400,
                            }}
                          >
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
                        <span
                          style={{ color: 'var(--accent-11)', fontWeight: 400 }}
                        >
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
                            <ButtonSolid
                              textButton='Update Password'
                              size={2}
                              isDisabled={
                                !passwordChange ||
                                password.password.value === '' ||
                                password.confirmPassword.value === ''
                              }
                              onClickButton={{
                                onClick: async () => {
                                  setLoading((prev) => {
                                    return { ...prev, profile: true };
                                  });
                                  await handleSubmitPassword();
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
                  </>
                )}
              </>
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
          [key]: { ...acc.newProfile[String(key)], value, error },
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
    // eslint-disable-next-line no-useless-escape
    /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g.test(
      value.trim(),
    )
  );
};
const validateGMail = (value: string) => {
  return (
    value &&
    value.trim() !== '' &&
    // eslint-disable-next-line no-useless-escape
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

const validateLinkedIn = (value: string) => {
  const linkedInURLPattern =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^(https?:\/\/)?((www|in)\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  return linkedInURLPattern.test(value);
};
