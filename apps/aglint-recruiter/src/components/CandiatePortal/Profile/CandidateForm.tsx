'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/shadcn/ui/avatar';
import { Button } from '@components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import axios from 'axios';
import React, { useState } from 'react';

import { candidatePortalProfileType } from '@/src/app/api/candidate_portal/get_profile/route';
import timeZone from '@/src/utils/timeZone';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/ui/select';

export default function CandidateForm({
  formData,
  application_id,
}: {
  formData: candidatePortalProfileType;
  application_id: string;
}) {
  const [form, setForm] = useState<candidatePortalProfileType>(formData);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('/placeholder.svg?height=128&width=128');
  const [resume, setResume] = useState(null);

  const handlePhotoUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e?.target?.result as any);
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (file) => {
    setResume(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(photo);
  console.log(resume);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      const payload = {
        application_id,
        details: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          timezone: form.timezone,
          phone: form.phone,
          linkedin: form.linkedin,
          avatar: form.avatar,
        },
      };

      const { status } = await axios.post(
        '/api/candidate_portal/update_profile',
        payload,
      );

      if (status !== 200) {
        throw new Error('Profile update failed');
      }
    } catch (e) {
      console.error(e.message);
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
      <Card className='w-full max-w-2xl border-none'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Candidate Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col items-center space-y-4'>
              <Avatar className='w-32 h-32'>
                <AvatarImage src={form.avatar} alt={form.first_name} />
                <AvatarFallback>{form.first_name}</AvatarFallback>
              </Avatar>
              <FileUploader
                accept='image/*'
                onFileSelect={handlePhotoUpload}
                className='w-full max-w-xs'
              >
                Upload Photo
              </FileUploader>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>First Name</Label>
              <Input
                id='name'
                value={form.first_name}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, first_name: e.target.value }))
                }
                placeholder='Enter your first name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>Last Name</Label>
              <Input
                id='name'
                value={form.last_name}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, last_name: e.target.value }))
                }
                placeholder='Enter your last name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={form.email}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, email: e.target.value }))
                }
                placeholder='Enter your email address'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                type='tel'
                value={form.phone}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, phone: e.target.value }))
                }
                placeholder='Enter your phone number'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Linked In</Label>
              <Input
                id='phone'
                type='tel'
                value={form.linkedin}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, linkedin: e.target.value }))
                }
                placeholder='Enter your Linked in'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Time Zone</Label>
              <Select
                onValueChange={(value) => {
                  setForm((pre) => ({ ...pre, timezone: value }));
                }}
                defaultValue={form.timezone}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder={form.timezone || 'Time zone'} />
                </SelectTrigger>
                <SelectContent>
                  {timeZone.map((tz) => (
                    <SelectItem value={tz.tzCode} key={tz.tzCode}>
                      {tz.tzCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Resume</Label>
              <FileUploader
                accept='.pdf,.doc,.docx'
                onFileSelect={handleResumeUpload}
                className='w-full'
              >
                {resume ? 'Update Resume' : 'Upload Resume'}
              </FileUploader>
              {resume && (
                <div className='flex items-center space-x-2 mt-2'>
                  <span className='text-sm text-gray-600'>{resume.name}</span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      window.open(URL.createObjectURL(resume), '_blank')
                    }
                  >
                    View
                  </Button>
                </div>
              )}
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={loading}
              onClick={() => {
                handleUpdateProfile();
              }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// FileUploader component (you may need to implement this or use a library)
function FileUploader({ children, accept, onFileSelect, className }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className={className}>
      <label className='block'>
        <span className='sr-only'>Choose file</span>
        <input
          type='file'
          accept={accept}
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          border border-gray-300 rounded-md
        '
        />
      </label>
      {children}
    </div>
  );
}
