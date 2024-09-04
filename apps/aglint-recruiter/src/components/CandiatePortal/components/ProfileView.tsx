import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Globe, Linkedin, Mail, Phone } from 'lucide-react';

import { candidatePortalProfileType } from '@/app/api/candidate_portal/get_profile/route';

import { ProfileEdit } from './ProfileEdit';

export default function ProfileView({
  application_id,
  formData,
  refetchProfile,
}: {
  application_id: string;
  formData: candidatePortalProfileType;
  refetchProfile: any;
}) {
  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div className='flex flex-col gap-4'>
          <Avatar>
            <AvatarImage src={formData?.avatar || ''} />
            <AvatarFallback>{formData?.first_name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h2 className='text-xl font-semibold'>
            {getFullName(formData?.first_name || '', formData?.last_name || '')}
          </h2>
        </div>
        <ProfileEdit
          application_id={application_id}
          formData={formData}
          refetchProfile={refetchProfile}
        />
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Mail className='h-5 w-5' />
          <span>{formData?.email || ''}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Linkedin className='h-5 w-5' />
          <span>{formData?.linkedin || ''}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Phone className='h-5 w-5' />
          <span>{formData?.phone || ''}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Globe className='h-5 w-5' />
          <span>{formData?.timezone || ''}</span>
        </div>
      </CardContent>
    </Card>
  );
}
