import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent } from '@components/ui/card';
import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

export const Header = ({
  avatar,
  name,
  role,
  department,
  location,
  timeZone,
  email,
  phone,
  setIsOpen,
  userCardRef,
}) => {
  return (
    <>
      <Card className='mb-8' ref={userCardRef}>
        <CardContent className='p-6'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-start gap-2'>
              <Avatar className='h-24 w-24'>
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>
                  <User className='text-gray-700' size={40} strokeWidth={1} />
                </AvatarFallback>
              </Avatar>

              {/* <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                        <AvatarImage
                          src={
                            userDetails?.profile_image || defaultProfileImage
                          }
                          alt='@shadcn'
                        />
                        <AvatarFallback className='rounded-[4px]'>
                          <User className='text-gray-700' />
                        </AvatarFallback>
                      </Avatar> */}

              <div className="flex flex-col gap-2">
                <h2 className='text-lg font-semibold capitalize text-gray-900'>{name}</h2>
                <p className='text-gray-600'>
                  {role} - {department}
                </p>
                <div className="flex flex-col gap-2">
                <div className='flex items-start flex-col gap-2'>
                  <span className='flex items-center text-sm text-gray-500'>
                    <MapPin className='mr-1 h-4 w-4' />
                    {location}
                  </span>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Clock className='mr-1 h-4 w-4' />
                    {timeZone}
                  </span>
                </div>
                <div className='flex items-start flex-col gap-2'>
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
            </div>
            <div className='flex flex-col items-end space-y-2'>
              {/* <UIButton>Schedule Interview</UIButton> */}
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
