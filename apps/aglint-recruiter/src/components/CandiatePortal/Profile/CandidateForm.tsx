'use client';
import axios from 'axios';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type candidatePortalProfileType } from '@/src/app/api/candidate_portal/get_profile/route';
import { supabase } from '@/src/utils/supabase/client';
import timeZone from '@/src/utils/timeZone';

import ImageUploadManual from './ImageUpload';
import { ThemeSelector } from './ThemeSelector';

export default function CandidateForm({
  formData,
  application_id,
}: {
  formData: candidatePortalProfileType;
  application_id: string;
}) {
  const [form, setForm] = useState<candidatePortalProfileType>(formData);
  const [loading, setLoading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageFile = useRef(null);

  const handleUpdateProfile = async () => {
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
    } catch (e) {
      console.error(e.message);
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
      <ThemeSelector />
      <Card className='w-full max-w-2xl border-none'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Candidate Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-6'>
            <div className='flex flex-col space-y-4 rounded-lg '>
              <ImageUploadManual
                image={form.avatar}
                imageFile={imageFile}
                size={100}
                setChanges={() => {
                  setIsImageChanged(true);
                }}
              />
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