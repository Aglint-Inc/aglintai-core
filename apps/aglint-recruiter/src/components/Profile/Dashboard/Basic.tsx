import { Avatar, Dialog, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { ProfileList } from '@/devlink/ProfileList';
import { UserDetails } from '@/devlink/UserDetails';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import ImageUploadManual from '../../Common/ImageUpload/ImageUploadManual';
import { ProfileForms } from '..';
import {
  FormFields,
  FormValues,
  PreferenceFormFields,
  validateLinkedIn,
  validateMail,
  validatePhone,
  validateString,
} from '../util';

export const UserDetail = ({id}:{id:string}) => {
  const {
    recruiterUser,
    userDetails: userDetail,
    setRecruiterUser,
  } = useAuthDetails();
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

  const router = useRouter();
  const [profileChange, setProfileChange] = useState(false);
  const [profileForm, setProfileForm] = useState(false);
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
            .upload(`public/${userDetail?.user?.id}`, imageFile.current, {
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
          })
          .eq('user_id', recruiterUser.user_id);

        setRecruiterUser({
          ...recruiterUser,
          first_name: profile.first_name.value,
          last_name: profile.last_name.value,
          phone: profile.phone.value,
          linked_in: profile.linked_in.value,
          profile_image,
        });
        setProfileForm(false);
        setProfileChange(false);
      }
    } catch (e) {
      toast.error('Unable to udpate profile. Please contact support');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
        textDepartment={recruiterUser.department?.name || '--'}
        textEmail={recruiterUser.email || '--'}
        textJobTitle={recruiterUser.position || '--'}
        textLocation={recruiterUser.office_location?.line1 || '--'}
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
          recruiterUser.role ? capitalizeFirstLetter(recruiterUser.role) : '--'
        }
        textNumber={recruiterUser.phone || '--'}
        onClickEdit={{
          onClick: () => {
            setProfileForm(true);
          },
        }}
      />
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
    </>
  );
};
