import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent } from '@components/ui/card';
import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import { useState } from 'react';

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
}) => {
  const router = useRouterPro();
  const [isOpen, setIsOpen] = useState(router.queryParams.edit_enable || false);

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
            <div className='flex flex-col items-end space-y-2'>
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
