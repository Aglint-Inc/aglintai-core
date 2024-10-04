import { getFullName } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { PageActions, PageHeaderText } from '@components/layouts/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import axios from '@/client/axios';
import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

import { useInterviewer } from '../../hooks/useInterviewer';
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
    <>
      <PageHeaderText>
        <div className='flex flex-row space-x-12'>
          <div className='flex flex-row items-center gap-2'>
            <Avatar className='h-10 w-10 rounded-md'>
              <AvatarImage src={avatar} alt={first_name} />
              <AvatarFallback className='h-10 w-10 rounded-md bg-gray-200'>
                <User
                  className='h-6 w-6 text-gray-600'
                  size={40}
                  strokeWidth={1.5}
                />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <div className='text-lg font-medium text-gray-900'>
                {getFullName(first_name ?? '', last_name ?? '')}
              </div>
              <p className='line-clamp-1 text-sm text-gray-600'>
                {role} - {department}
              </p>
            </div>
          </div>
          <div className='mt-2 flex flex-col gap-2'>
            <span className='flex items-center text-sm'>
              <MapPin className='mr-1 h-4 w-4' />
              {location}
            </span>
            <span className='flex items-center text-sm'>
              <Clock className='mr-1 h-4 w-4' />
              {timeZone}
            </span>
          </div>
          <div className='mt-2 flex flex-col gap-2'>
            <span className='flex items-center text-sm'>
              <Mail className='mr-1 h-4 w-4' />
              {email}
            </span>
            <span className='flex items-center text-sm'>
              <Phone className='mr-1 h-4 w-4' />
              {phone}
            </span>
          </div>
        </div>
      </PageHeaderText>
      <PageActions>
        <div className='mt-4 flex gap-3'>
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
      </PageActions>
      {/* Eidt Dialog  */}
      <EditUser isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
