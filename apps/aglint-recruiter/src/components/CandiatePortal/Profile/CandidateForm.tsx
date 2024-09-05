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
import { useForm } from 'react-hook-form';

import {
  useCandidatePortalProfile,
  useCandidatePortalProfileUpdate,
} from '@/app/(public)/candidate/(authenticated)/[application_id]/_common/hooks';
import timeZone from '@/utils/timeZone';

// import ImageUploadManual from './ImageUpload';

export default function CandidateForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const { data } = useCandidatePortalProfile();
  const { mutate, isPending } = useCandidatePortalProfileUpdate();

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

  const onSubmit = async (form: any) => {
    if (!isPending) {
      mutate({
        id: data?.id,
        ...form,
      });
      closeDialog();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='px-4 flex flex-col gap-2'>
              <div className='flex flex-col space-y-4 rounded-lg'>
              {/* <ImageUploadManual
                  image={form.avatar}
                  imageFile={imageFile}
                  size={100}
                />              */}
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
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                      value: /^[0-9]+$/,
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
                      value: /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
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
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
