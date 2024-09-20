import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  type FormFields,
  type FormValues,
  type PreferenceFormFields,
  validateLinkedIn,
  validateMail,
  validatePhone,
  validateString,
} from 'src/app/_common/components/Profile/uitls';

import ImageUploadManual from '@/components/Common/ImageUpload/ImageUploadManual';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { ProfileForms } from './ProfileForms';

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
        const value = curr.value?.trim() || null;
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>
            Edit Profile
          </DialogTitle>
          <UIButton
            variant='ghost'
            size='sm'
            onClick={() => {
              setProfile(structuredClone(initialProfileFormFields));
              setIsOpen(false);
            }}
          >
            <X className='h-4 w-4' />
          </UIButton>
        </DialogHeader>
        <div className='space-y-4'>
          <ImageUploadManual
            image={recruiterUser.profile_image}
            size={64}
            imageFile={imageFile}
            setChanges={() => {
              setIsImageChanged(true);
            }}
          />

          {isError && (
            <p className='text-sm text-red-500'>
              The file you uploaded exceeds the maximum allowed size. Please
              ensure that the file size is less than 5 MB
            </p>
          )}

          <ProfileForms
            profile={profile}
            setProfile={setProfile}
            setChanges={() => setProfileChange(true)}
          />

          <div className='space-y-2'>
            <p className='text-sm font-medium'>Time Zone</p>
            <TimezonePicker
              // @ts-ignore
              value={selectedTimeZone}
              onChange={(value) => {
                if (value) {
                  setSelectedTimeZone(value);
                }
              }}
              width='420'
            />
          </div>
        </div>

        <div className='flex justify-end space-x-2'>
          <UIButton
            variant='secondary'
            onClick={() => {
              setProfile(structuredClone(initialProfileFormFields));
              setIsOpen(false);
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            variant='default'
            isLoading={Loading}
            onClick={() => {
              if (!Loading) {
                onUpdateSubmit();
              }
            }}
          >
            Update
          </UIButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};