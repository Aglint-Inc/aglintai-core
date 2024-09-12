import { toast } from '@components/hooks/use-toast';
import { Avatar } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Dialog, DialogClose, DialogContent } from '@components/ui/dialog';
import {
  Briefcase,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import ImageUploadManual from '../../Common/ImageUpload/ImageUploadManual';
import { ProfileForms } from '../ProfileForms';
import {
  type FormFields,
  type FormValues,
  type PreferenceFormFields,
  validateLinkedIn,
  validateMail,
  validatePhone,
  validateString,
} from '../util';

export const UserDetail = () => {
  const { recruiterUser, setRecruiterUser } = useAuthDetails();
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
  const [loading, setLoading] = useState(false);
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
        toast({
          description: 'No changes.',
        });
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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Unable to update profile. Please contact support.',
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Card className='p-6'>
        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='w-16 h-16 relative'>
              {recruiterUser.profile_image ? (
                <Image
                  src={recruiterUser.profile_image}
                  alt={recruiterUser.first_name || 'User profile'}
                  fill
                  sizes='(max-width: 64px) 100vw, 64px'
                  className='object-cover'
                />
              ) : (
                <User className='w-8 h-8 text-gray-400' />
              )}
            </Avatar>
            <div>
              <h2 className='text-2xl font-bold'>
                {`${recruiterUser?.first_name ?? ''} ${recruiterUser?.last_name ?? ''}`.trim()}
              </h2>
              <p className='text-gray-500'>{recruiterUser.position || '--'}</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center space-x-2'>
              <Briefcase className='w-5 h-5 text-gray-400' />
              <span>{recruiterUser.department?.name || '--'}</span>
            </div>
            <div className='flex items-center space-x-2'>
              <MapPin className='w-5 h-5 text-gray-400' />
              <span>{recruiterUser.office_location?.line1 || '--'}</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Mail className='w-5 h-5 text-gray-400' />
              <span>{recruiterUser.email || '--'}</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Phone className='w-5 h-5 text-gray-400' />
              <span>{recruiterUser.phone || '--'}</span>
            </div>
            {recruiterUser.linked_in && (
              <div className='flex items-center space-x-2'>
                <Linkedin className='w-5 h-5 text-gray-400' />
                <a
                  href={recruiterUser.linked_in}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline'
                >
                  LinkedIn Profile
                </a>
              </div>
            )}
            {recruiterUser.role === 'admin' && (
              <div className='flex items-center space-x-2'>
                <User className='w-5 h-5 text-gray-400' />
                <span
                  className='cursor-pointer text-blue-500 hover:underline'
                  onClick={() =>
                    router.push(
                      `${ROUTES['/company']()}?tab=roles&role=${recruiterUser.role}`,
                    )
                  }
                >
                  {capitalizeFirstLetter(recruiterUser.role)}
                </span>
              </div>
            )}
          </div>
          <Button onClick={() => setProfileForm(true)}>Edit Profile</Button>
        </CardContent>
      </Card>

      <Dialog open={profileForm} onOpenChange={setProfileForm}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogClose asChild>
            <Button
              variant='ghost'
              className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </DialogClose>
          <div className='space-y-4'>
            <ImageUploadManual
              image={recruiterUser.profile_image}
              size={64}
              imageFile={imageFile}
              setChanges={() => setIsImageChanged(true)}
            />
            {isError && (
              <p className='text-sm text-destructive'>
                The file you uploaded exceeds the maximum allowed size. Please
                ensure that the file size is less than 5 MB
              </p>
            )}
            <ProfileForms
              profile={profile}
              setProfile={setProfile}
              setChanges={() => setProfileChange(true)}
            />
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                onClick={() => {
                  setProfile(structuredClone(initialProfileFormFields));
                  setProfileForm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!loading) {
                    onUpdateSubmit();
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
