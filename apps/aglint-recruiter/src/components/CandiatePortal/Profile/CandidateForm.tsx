'use client';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useCandidatePortal,
  useCandidatePortalNavbar,
  useCandidatePortalProfile,
} from '@/app/(public)/candidate/(authenticated)/[application_id]/_common/hooks';
import { supabase } from '@/utils/supabase/client';
import timeZone from '@/utils/timeZone';

import ImageUploadManual from './ImageUpload';

// import ImageUploadManual from './ImageUpload';

export default function CandidateForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  // const { data } = useCandidatePortalProfile();
  // const { mutate, isPending } = useCandidatePortalProfileUpdate();

  // const onSubmit = async (form: any) => {
  //   if (!isPending) {
  //     mutate({
  //       id: data?.id,
  //       ...form,
  //     });
  //     closeDialog();
  //   }
  // };

  const { application_id } = useCandidatePortal();
  const { data, refetch: profileRefetch } = useCandidatePortalProfile();
  const { refetch: navRefetch } = useCandidatePortalNavbar();

  // const [form, setForm] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageFile = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      linkedin: data?.linkedin || '',
      timezone: data?.timezone || '',
    },
  });

  const handleUpdateProfile = async (form) => {
    try {
      setLoading(true);

      let profile_image = form.avatar;
      if (isImageChanged) {
        const { data } = await supabase.storage
          .from('candidate-files')
          .upload(`profile/${form.id}`, imageFile.current, {
            cacheControl: '3600',
            upsert: true,
          });

        if (data?.path && imageFile?.current?.size) {
          profile_image = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/candidate-files/${data?.path}?t=${new Date().toISOString()}`;
        } else {
          profile_image = null;
        }
        setIsImageChanged(false);
      }

      const payload = {
        application_id,
        details: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          timezone: form.timezone,
          phone: form.phone,
          linkedin: form.linkedin,
          avatar: profile_image,
        },
      };

      const { status } = await axios.post(
        '/api/candidate_portal/update_profile',
        payload,
      );

      if (status !== 200) {
        throw new Error('Profile update failed');
      }
      await navRefetch();
      await profileRefetch();
      closeDialog();
    } catch (e) {
      console.error(e.message);
      //
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex justify-center items-center'>
      <Card className='w-full max-w-2xl border-none bg-white p-0'>
        <CardHeader className='p-0'>
          <CardTitle className='text-md font-semibold text-left px-4 py-4'>
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className='px-4 flex flex-col gap-2'>
              <div className='flex flex-col space-y-4 rounded-lg'>
                <ImageUploadManual
                  image={data?.avatar}
                  imageFile={imageFile}
                  size={100}
                  setChanges={() => setIsImageChanged(true)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='first_name'>First Name</Label>
                <Input
                  id='first_name'
                  {...register('first_name', {
                    required: 'First name is required',
                  })}
                  placeholder='Enter your first name'
                />
                {errors.first_name && (
                  <p className='text-red-500'>{errors.first_name.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='last_name'>Last Name</Label>
                <Input
                  id='last_name'
                  {...register('last_name', {
                    required: 'Last name is required',
                  })}
                  placeholder='Enter your last name'
                />
                {errors.last_name && (
                  <p className='text-red-500'>{errors.last_name.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  placeholder='Enter your email address'
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  type='tel'
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                  placeholder='Enter your phone number'
                />
                {errors.phone && (
                  <p className='text-red-500'>{errors.phone.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='linkedin'>LinkedIn</Label>
                <Input
                  id='linkedin'
                  {...register('linkedin', {
                    required: 'LinkedIn URL is required',

                    pattern: {
                      // eslint-disable-next-line security/detect-unsafe-regex
                      value:
                        /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
                      message: 'Enter a valid LinkedIn URL',
                    },
                  })}
                  placeholder='Enter your LinkedIn profile URL'
                />
                {errors.linkedin && (
                  <p className='text-red-500'>{errors.linkedin.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='timezone'>Time Zone</Label>
                <Select
                  onValueChange={(value) => {
                    setValue('timezone', value);
                  }}
                  defaultValue={data?.timezone}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Time zone' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZone.map((tz) => (
                      <SelectItem value={tz.tzCode} key={tz.tzCode}>
                        {tz.tzCode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timezone && (
                  <p className='text-red-500'>{errors.timezone.message}</p>
                )}
              </div>
            </div>
            <div className='p-4 m-0 mt-0'>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
