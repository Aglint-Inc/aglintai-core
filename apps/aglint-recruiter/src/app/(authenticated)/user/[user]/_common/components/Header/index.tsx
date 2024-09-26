import { toast } from '@components/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent } from '@components/ui/card';
import axios from 'axios';
import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { type RefObject, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

import { EditUser } from './EditUser';

export const Header = ({
  avatar,
  name,
  role,
  department,
  location,
  timeZone,
  email,
  phone,
  userCardRef,
}: {
  avatar: string;
  name: string;
  role: string;
  department: string;
  location: string;
  timeZone: string;
  email: string;
  phone: string;
  userCardRef: RefObject<HTMLDivElement>;
}) => {
  const router = useRouterPro();
  const isInitalOpen = router.queryParams.edit_enable as unknown as boolean;
  const [isOpen, setIsOpen] = useState<boolean>(isInitalOpen || false);

  const { recruiter_user } = useTenant();
  const param = useParams() as { user: string };
  const user_id = param.user as string;
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
      {/* Eidt Dialog  */}
      <EditUser isOpen={isOpen} setIsOpen={setIsOpen} />
      <Card className='mb-8' ref={userCardRef}>
        <CardContent className='p-6'>
          <div className='flex justify-between'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-24 w-24'>
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>
                  <User className='text-gray-700' size={40} strokeWidth={1} />
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className='text-2xl font-bold text-gray-900'>{name}</h2>
                <p className='text-gray-600'>
                  {role} - {department}
                </p>
                <div className='mt-2 flex items-center space-x-4'>
                  <span className='flex items-center text-sm text-gray-500'>
                    <MapPin className='mr-1 h-4 w-4' />
                    {location}
                  </span>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Clock className='mr-1 h-4 w-4' />
                    {timeZone}
                  </span>
                </div>
                <div className='mt-2 flex items-center space-x-4'>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Mail className='mr-1 h-4 w-4' />
                    {email}
                  </span>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Phone className='mr-1 h-4 w-4' />
                    {phone}
                  </span>
                </div>
              </div>
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
        </CardContent>
      </Card>
    </>
  );
};
