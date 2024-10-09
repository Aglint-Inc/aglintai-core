import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { toast } from '@components/hooks/use-toast';
import { useParams } from 'next/navigation';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  type FormFields,
  type FormValues,
  validateLinkedIn,
  validateMail,
  validateString,
} from 'src/app/_common/components/Profile/uitls';

import { useTenantMembers } from '@/company/hooks';
import ImageUploadManual from '@/components/Common/ImageUpload/ImageUploadManual';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { supabase } from '@/utils/supabase/client';
import type timeZone from '@/utils/timeZone';

import { useUserUpdate } from '../../../hooks/useUserUpdate';
import { ProfileForms } from './EditUserDialogUI';

const initialFormValues: FormValues = {
  value: '',
  label: '',
  type: 'text',
  helperText: '',
  placeholder: '',
  error: false,
  blocked: false,
  validation: 'string',
  required: false,
  disabled: false,
  specialForm: false,
  options: [],
  modal: false,
};

export const EditUserDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { allMembers } = useTenantMembers();

  const param = useParams()!;

  const user_id = param.user;

  const recruiter_user = allMembers.find(
    (member) => member.user_id === user_id,
  )!;

  const initialTimeZone = recruiter_user?.scheduling_settings?.timeZone
    ? recruiter_user.scheduling_settings.timeZone
    : null;

  const [selectedTimeZone, setSelectedTimeZone] = useState(initialTimeZone);
  const { mutateAsync } = useUserUpdate();

  const initialProfileFormFields: FormFields = {
    first_name: {
      ...initialFormValues,
      value: recruiter_user?.first_name ?? '',
      required: true,
      label: 'First Name',

      placeholder: 'Enter your first name.',
    },
    last_name: {
      ...initialFormValues,
      value: recruiter_user?.last_name ?? '',
      required: false,
      label: 'Last Name',
      placeholder: 'Enter your last name.',
    },
    phone: {
      ...initialFormValues,
      value: recruiter_user?.phone ?? '',
      validation: 'phone',
      label: 'Contact Number',
      required: false,
    },
    linked_in: {
      ...initialFormValues,
      value: recruiter_user?.linked_in ?? '',
      validation: 'linkedIn',
      label: 'LinkedIn',
      required: false,
      placeholder: 'Enter your linkedin url',
    },
  };

  const [profileChange, setProfileChange] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<FormFields>(
    structuredClone(initialProfileFormFields),
  );

  useEffect(() => {
    setProfile(structuredClone(initialProfileFormFields));
  }, [isOpen]);

  const [isError, setError] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageFile = useRef<File | null>(null);

  const handleValidate = (profile: FormFields) => {
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
            // case 'phone':
            //   {
            //     if (!validatePhone(value)) error = true;
            //   }
            //   break;
            case 'linkedIn': {
              if (!validateLinkedIn(value)) error = true;
            }
          }
        }

        const k = key as keyof FormFields;
        return {
          newProfile: {
            ...acc.newProfile,
            [key]: { ...acc.newProfile[k], value, error },
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
      const { error } = handleValidate(profile);

      if (error) return;
      let profile_image = recruiter_user?.profile_image;
      setLoading(true);

      if (isImageChanged) {
        if (imageFile?.current) {
          const { data } = await supabase.storage
            .from('recruiter-user')
            .upload(`public/${recruiter_user?.user_id}`, imageFile.current, {
              cacheControl: '3600',
              upsert: true,
            });

          if (data?.path && imageFile?.current?.size) {
            profile_image = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recruiter-user/${data?.path}?t=${new Date().toISOString()}`;
            setError(false);
          }
        } else {
          profile_image = null;
        }
        setIsImageChanged(false);
      }

      const scheduling_settings = {
        ...recruiter_user?.scheduling_settings,
        timeZone: selectedTimeZone,
      } as CustomSchedulingSettingsUser;

      const { user_id } = recruiter_user;
      const data = {
        first_name: profile.first_name.value,
        last_name: profile.last_name.value,
        phone: profile.phone.value,
        linked_in: profile.linked_in.value,
        profile_image,
        scheduling_settings,
        user_id,
      };

      await mutateAsync({ ...data });

      setProfileChange(false);
      setIsOpen(false);

      toast({ title: 'profile update successfully' });
    } catch (e: any) {
      toast({ title: 'profile update failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  const selectedTzCode =
    selectedTimeZone?.tzCode as (typeof timeZone)[number]['tzCode'];
  return (
    <UIDialog
      open={isOpen}
      title='Edit Profile'
      onClose={() => {
        setProfile(structuredClone(initialProfileFormFields));
        setSelectedTimeZone(initialTimeZone);
        setIsOpen(false);
      }}
      slotButtons={
        <>
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
            disabled={!profileChange && !isImageChanged}
            isLoading={Loading}
            onClick={() => {
              if (!Loading) {
                onUpdateSubmit();
              }
            }}
          >
            Update
          </UIButton>
        </>
      }
    >
      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='w-16'>
            <ImageUploadManual
              image={recruiter_user.profile_image ?? ''}
              size={64}
              imageFile={imageFile}
              setChanges={() => {
                setIsImageChanged(true);
              }}
            />
          </div>

          <div>
            <p className='text-sm font-medium'>
              <span className='text-destructive'>Change profile photo</span>{' '}
              (optional)
            </p>
            <p className='text-sm text-muted-foreground'>
              Upload a square profile image (PNG or JPEG). Maximum size: 5 MB.
            </p>
            {isError && (
              <p className='text-sm text-destructive'>
                The file you uploaded exceeds the maximum allowed size. Please
                ensure that the file size is less than 5 MB
              </p>
            )}
          </div>
        </div>

        <ProfileForms
          profile={profile}
          setProfile={setProfile}
          setChanges={() => setProfileChange(true)}
        />

        <div className='space-y-2'>
          <p className='text-sm font-medium'>Time Zone</p>
          <TimezonePicker
            value={selectedTzCode}
            onChange={(value) => {
              if (value) {
                setSelectedTimeZone(value);
                setProfileChange(true);
              }
            }}
            width='420'
          />
        </div>
      </div>
    </UIDialog>
  );
};
