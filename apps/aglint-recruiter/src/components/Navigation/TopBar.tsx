'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useLogout } from '@/authenticated/hooks/useLogout';
import { useTenant } from '@/company/hooks';

const DefaultProfileImage = () => (
  <Image
    src={'/images/default/user.svg'}
    alt={'Greenhouse'}
    width={20}
    height={20}
  />
);
const DefaultCompanyLogo = () => (
  <Image
    src={'/images/default/company.svg'}
    alt={'Brand'}
    width={20}
    height={20}
  />
);

const TopBar = () => {
  const { recruiter, recruiter_user } = useTenant();
  const queryClient = useQueryClient();
  const { logout } = useLogout();
  const logo = recruiter?.logo;
  const recruiterName = recruiter?.name;
  const profileImage = recruiter_user?.profile_image;
  const userName = recruiter_user?.first_name;
  const userId = recruiter_user?.user_id;

  return (
    <div className='flex w-full flex-row items-center justify-between'>
      <Button variant='link' className='mt-2 p-2' asChild>
        <Link href='/jobs'>
          <Avatar>
            <AvatarImage src={logo || ''} alt={recruiterName} />
            <AvatarFallback>
              <DefaultCompanyLogo />
            </AvatarFallback>
          </Avatar>
          <span className='ml-1'>{recruiterName}</span>
        </Link>
      </Button>
      <div className='mr-2 flex flex-row items-center'>
        <div className='sr-only mr-4 flex-row items-center gap-2 md:flex'>
          <p>👋 </p>
          <p className='text-sm text-muted-foreground'>Hey {userName}</p>
          <p className='text-sm text-muted-foreground'>
            Welcome to {recruiterName}!
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost'>
              <Avatar className='h-[24px] w-[24px] cursor-pointer rounded-full'>
                <AvatarImage src={profileImage || ''} alt={userName} />
                <AvatarFallback className='rounded-[4px]'>
                  <DefaultProfileImage />
                </AvatarFallback>
              </Avatar>
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='end' alignOffset={20}>
            <DropdownMenuItem>
              <Link href={`/user/${userId}?profile=true`}>
                <span>Your Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={() => logout(queryClient)}>
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
