import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Globe, Linkedin, Mail, Phone } from 'lucide-react';

import { useCandidatePortalProfile } from '../hooks';
import { ProfileEdit } from './ProfileEdit';

export default function ProfileView() {
  const { data } = useCandidatePortalProfile();
  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-40 w-40 rounded-md'>
              <AvatarImage src={data.avatar || ''} />
              <AvatarFallback className='rounded-md text-6xl font-semibold'>
                {data.first_name.charAt(0) + data?.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className='text-xl font-semibold'>
            {getFullName(data.first_name || '', data.last_name || '')}
          </h2>
        </div>
        <ProfileEdit />
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Mail className='h-5 w-5' />
          <span>{data.email || ''}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Linkedin className='h-5 w-5' />
          <span>{data.linkedin || ''}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Phone className='h-5 w-5' />
          <span>{data.phone || ''}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Globe className='h-5 w-5' />
          <span>{data.timezone || ''}</span>
        </div>
      </CardContent>
    </Card>
  );
}
