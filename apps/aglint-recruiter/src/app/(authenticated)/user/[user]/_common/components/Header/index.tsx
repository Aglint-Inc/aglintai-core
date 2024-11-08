import { getFullName } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import axios from '@/client/axios';
import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';
import { capitalizeAll } from '@/utils/text/textUtils';

import { useInterviewer } from '../../hooks/useInterviewer';
import { KeyMatrics } from '../KeyMatrix';
import { EditUser } from './EditUser';

export const Header = () => {
  const router = useRouterPro();
  const isInitalOpen = router.queryParams.edit_enable as unknown as boolean;
  const [isOpen, setIsOpen] = useState<boolean>(isInitalOpen || false);

  const { recruiter_user } = useTenant();
  const param = useParams() as { user: string };
  const user_id = param.user as string;
  const { data: interviewerDetails } = useInterviewer();

  const {
    avatar,
    first_name,
    last_name,
    role,
    department,
    location,
    timeZone,
    email,
    phone,
  } = interviewerDetails;

  const getConsent = async () => {
    try {
      localStorage.setItem(
        'gmail-redirect-path',
        `${process.env.NEXT_PUBLIC_HOST_NAME}/user/${user_id}`,
      );
      const { data } = await axios.get('/api/scheduling/google-consent');
      return router.push(data);
    } catch (error) {
      toast({ title: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className='rounded-lg border border-border p-4'>
      <div className='flex flex-row space-x-4'>
        <Avatar className='h-32 w-32 rounded-md'>
          <AvatarImage src={avatar} alt={first_name} />
          <AvatarFallback className='rounded-md bg-muted'>
            <User
              className='text-muted-foreground'
              size={40}
              strokeWidth={1.5}
            />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-col'>
          <div className='flex flex-1 gap-10'>
            <div className='flex flex-col'>
              <div className='text-lg font-medium'>
                {getFullName(first_name ?? '', last_name ?? '')}
              </div>
              <p className='line-clamp-1 text-sm text-muted-foreground'>
                {capitalizeAll(role)}{' '}
                {department ? ' - ' + capitalizeAll(department) : ''}
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='flex items-center text-sm'>
                <MapPin className='mr-1 h-4 w-4' />
                {location || '-'}
              </span>
              <span className='flex items-center text-sm'>
                <Clock className='mr-1 h-4 w-4' />
                {timeZone}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='flex items-center text-sm'>
                <Mail className='mr-1 h-4 w-4' />
                {email}
              </span>
              <span className='flex items-center text-sm'>
                <Phone className='mr-1 h-4 w-4' />
                {phone || '-'}
              </span>
            </div>
          </div>
          <KeyMatrics />
        </div>
        <div className='flex gap-3'>
          {recruiter_user?.user_id === user_id &&
            !recruiter_user.is_calendar_connected && (
              <UIButton onClick={getConsent}>Connect Calendar</UIButton>
            )}
          <UIButton
            variant='outline'
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Edit Profile
          </UIButton>
        </div>
      </div>
      {/* Eidt Dialog  */}
      <EditUser isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
