'use client';
import { toast } from '@components/hooks/use-toast';
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
import { useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/_common/hooks';

import timeZone from '@/utils/timeZone';

import { useProfliePicUpdate } from '../../../_common/hooks/useProfilePicUpdate';
import {
  useCandidatePortalProfile,
  useCandidatePortalProfileUpdate,
} from '../hooks';
import ImageUploadManual from './ImageUpload';

type LoginFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin: string;
  timezone: string;
  avatar: string;
};

export default function CandidateForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const { application_id } = useCandidatePortal();
  const { data, refetch } = useCandidatePortalProfile();
  const { mutateAsync: profileMutateAsync } = useCandidatePortalProfileUpdate();
  const { mutateAsync: picMutateAsync } = useProfliePicUpdate();
  const [loading, setLoading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageFile = useRef<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
      timezone: data?.timezone,
      avatar: data.avatar,
    },
  });

  const handleUpdateProfile: SubmitHandler<LoginFormInputs> = async (form) => {
    try {
      setLoading(true);

      if (isImageChanged) {
        const formData = new FormData();
        formData.append('profilePic', imageFile.current as File);
        formData.append('oldimage', data?.avatar || '');
        formData.append('candidate_id', data?.id || '');

        await picMutateAsync(formData);
        setIsImageChanged(false);
      }

      const payload = {
        application_id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        timezone: form.timezone,
        phone: form.phone,
        linkedin: form.linkedin,
      };

      await profileMutateAsync({ ...payload });
      await refetch();
      //image upload

      closeDialog();
    } catch (e) {
      // if (e instanceof Error)
      toast({ title: 'Profile update failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex items-center justify-center'>
      <Card className='w-full max-w-2xl border-none bg-white p-0'>
        <CardHeader className='p-0'>
          <CardTitle className='text-md px-4 py-4 text-left font-semibold'>
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className='flex flex-col gap-2 px-4'>
              <div className='flex flex-col space-y-4 rounded-lg'>
                <ImageUploadManual
                  image={data?.avatar ?? ''}
                  imageFile={imageFile}
                  size={20}
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
                  <p className='text-destructive'>
                    {errors.first_name.message}
                  </p>
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
                  <p className='text-destructive'>{errors.last_name.message}</p>
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
                  <p className='text-destructive'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  type='tel'
                  {...register('phone', {
                    required: 'Phone number is required',
                    // pattern: {
                    //   value: /^\+?[1-9]\d{1,14}$/,
                    //   message: 'Enter a valid phone number',
                    // },
                  })}
                  placeholder='Enter your phone number'
                />
                {errors.phone && (
                  <p className='text-destructive'>{errors.phone.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='linkedin'>LinkedIn</Label>
                <Input
                  id='linkedin'
                  {...register('linkedin', {
                    required: 'LinkedIn URL is required',

                    pattern: {
                      value:
                        // eslint-disable-next-line security/detect-unsafe-regex
                        /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
                      message: 'Enter a valid LinkedIn URL',
                    },
                  })}
                  placeholder='Enter your LinkedIn profile URL'
                />
                {errors.linkedin && (
                  <p className='text-destructive'>{errors.linkedin.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='timezone'>Time Zone</Label>
                <Select
                  onValueChange={(value) => {
                    setValue('timezone', value);
                  }}
                  defaultValue={data?.timezone ?? undefined}
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
                  <p className='text-destructive'>{errors.timezone.message}</p>
                )}
              </div>
            </div>
            <div className='m-0 mt-0 p-4'>
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
