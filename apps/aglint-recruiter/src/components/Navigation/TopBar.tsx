'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useLogout } from '@/authenticated/hooks/useLogout';
import { useTenant } from '@/company/hooks';
import { capitalizeAll } from '@/utils/text/textUtils';

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
        <div className='mr-4 flex flex-row items-center gap-2'>
          <p>👋 </p>
          <p className='text-sm text-muted-foreground'>Hey {userName},</p>
          <p className='text-sm text-muted-foreground'>
            Welcome to {recruiterName}!
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Button variant='link' asChild>
              <Link href={`/user/${userId}?profile=true`}>
                <Avatar className='h-[24px] w-[24px] cursor-pointer rounded-[4px]'>
                  <AvatarImage src={profileImage || ''} alt={userName} />
                  <AvatarFallback className='rounded-[4px]'>
                    <DefaultProfileImage />
                  </AvatarFallback>
                </Avatar>
                <span className='sr-only'>
                  {capitalizeAll(userName) || 'Your profile'}
                </span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent align='start' side='right'>
            <p>{capitalizeAll(userName) || 'Your profile'}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button variant='link' onClick={() => logout(queryClient)}>
              <LogOut className='h-5 w-5' strokeWidth={1.5} />
            </Button>
          </TooltipTrigger>
          <TooltipContent align='center' side='right'>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;
