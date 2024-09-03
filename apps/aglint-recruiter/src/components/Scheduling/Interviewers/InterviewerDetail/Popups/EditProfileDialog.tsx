import { Autocomplete, Dialog, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { UserDetails } from '@/devlink/UserDetails';
import ImageUploadManual from '@/src/components/Common/ImageUpload/ImageUploadManual';
import UITextField from '@/src/components/Common/UITextField';
import { ProfileForms } from '@/src/components/Profile';
import {
  type FormFields,
  type FormValues,
  type PreferenceFormFields,
  validateLinkedIn,
  validateMail,
  validatePhone,
  validateString,
} from '@/src/components/Profile/util';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import timeZone from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

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

export const EditProfileDialog = ({
  isOpen,
  setIsOpen,
  interviewerDetailsRefetch,
}) => {
  const { recruiterUser, setRecruiterUser } = useAuthDetails();
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    recruiterUser.scheduling_settings.timeZone || null,
  );

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

  const [profileChange, setProfileChange] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<FormFields>(
    structuredClone(initialProfileFormFields),
  );
  const [isError, setError] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageFile = useRef(null);

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

  async function onUpdateSubmit() {
    try {
      if (!profileChange && !isImageChanged) {
        toast.error('No changes.');
      } else {
        const { error } = handleValidate(profile);
        if (error) return;
        let profile_image = recruiterUser.profile_image;
        setLoading(true);
        if (isImageChanged) {
          const { data } = await supabase.storage
            .from('recruiter-user')
            .upload(`public/${recruiterUser.user_id}`, imageFile.current, {
              cacheControl: '3600',
              upsert: true,
            });

          if (data?.path && imageFile?.current?.size) {
            profile_image = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recruiter-user/${data?.path}?t=${new Date().toISOString()}`;
            setError(false);
          } else {
            profile_image = null;
          }
          setIsImageChanged(false);
        }

        await supabase
          .from('recruiter_user')
          .update({
            first_name: profile.first_name.value,
            last_name: profile.last_name.value,
            phone: profile.phone.value,
            linked_in: profile.linked_in.value,
            profile_image,
            scheduling_settings: {
              ...recruiterUser.scheduling_settings,
              timeZone: selectedTimeZone,
            },
          })
          .eq('user_id', recruiterUser.user_id);

        setRecruiterUser({
          ...recruiterUser,
          first_name: profile.first_name.value,
          last_name: profile.last_name.value,
          phone: profile.phone.value,
          linked_in: profile.linked_in.value,
          profile_image,
          scheduling_settings: {
            ...recruiterUser.scheduling_settings,
            timeZone: selectedTimeZone,
          },
        });
        await interviewerDetailsRefetch();
        setProfileChange(false);
        setIsOpen(false);
      }
    } catch (e) {
      toast.error('Unable to udpate profile. Please contact support');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        // setProfile(structuredClone(initialProfileFormFields));
        setIsOpen(false);
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
                setIsOpen(false);
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
                  setIsOpen(false);
                },
              }}
            />
            <ButtonSolid
              textButton='Update'
              isLoading={Loading}
              size={2}
              onClickButton={{
                onClick: () => {
                  if (!Loading) {
                    onUpdateSubmit();
                  }
                },
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
            setChanges={() => {
              setIsImageChanged(true);
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
            <Stack>
              <Typography paddingBottom={1}>Time Zone</Typography>

              <Autocomplete
                disableClearable
                fullWidth
                options={timeZone}
                value={selectedTimeZone}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedTimeZone(value);
                    setProfileChange(true);
                  }
                }}
                autoComplete={false}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  return (
                    <li {...props}>
                      <Typography variant='body1' color={'var(--neutral-12)'}>
                        {option.label}
                      </Typography>
                    </li>
                  );
                }}
                renderInput={(params) => {
                  return (
                    <UITextField
                      {...params}
                      labelSize='medium'
                      // fullWidth
                      label={''}
                      placeholder='Ex. Healthcare'
                    />
                  );
                }}
              />
            </Stack>
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
  );
};
