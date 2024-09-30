'use client';

import '@styles/globals.css';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useLogout } from '@/authenticated/hooks/useLogout';
import { useTenant } from '@/company/hooks';
import { useFlags } from '@/company/hooks/useFlags';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import PERMISSIONS from '@/utils/routing/permissions';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { NotFound } from '../Common/404';
import { OnboardPending } from './OnboardPending';
import SideNavbar from './SideNavbar';

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

export default function AppLayout({ children }) {
  const queryClient = useQueryClient();
  const { checkPermissions } = useRolesAndPermissions();
  const { logout } = useLogout();
  const { isShowFeature } = useFlags();
  const { recruiter, recruiter_user } = useTenant();
  const router = useRouterPro();
  const logo = recruiter?.logo;
  const isHorizontalNav = !isShowFeature('SCHEDULING');

  return (
    <>
      <OnboardPending />
      <div className='flex w-full flex-col bg-gray-50'>
        {isHorizontalNav && (
          <nav className='sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white p-2'>
            <div className='flex items-center space-x-4'>
              <Link href='/jobs'>
                <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                  <AvatarImage src={logo || ''} alt={recruiter?.name} />
                  <AvatarFallback className='rounded-[4px]'>
                    <DefaultCompanyLogo />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className='flex space-x-2'>
                <Button variant='ghost' asChild>
                  <Link href='/jobs'>Jobs</Link>
                </Button>
              </div>
            </div>
            <div className='flex items-center'>
              <Button variant='ghost' asChild>
                <Link href='/company?tab=company-info'>
                  <Settings className='mr-2 h-5 w-5' strokeWidth={1.5} />
                  Settings
                </Link>
              </Button>

              <Button variant='link' asChild>
                <Link
                  href={
                    ROUTES['/user/[user]']({
                      user_id: recruiter_user?.user_id,
                    }) + '?profile=true'
                  }
                >
                  <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                    <AvatarImage
                      src={recruiter_user?.profile_image || ''}
                      alt={recruiter_user?.first_name}
                    />
                    <AvatarFallback className='rounded-[4px]'>
                      <DefaultProfileImage />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>

              <Button
                variant='link'
                onClick={() => {
                  logout(queryClient);
                }}
                asChild
              >
                <Link href='#'>
                  <LogOut className='mr-2 h-5 w-5' strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </nav>
        )}
        {!isHorizontalNav && (
          <>
            <div className='flex w-full flex-row items-center justify-between'>
              <Button variant='link' className='mt-2 p-2' asChild>
                <Link href='/jobs'>
                  <Avatar>
                    <AvatarImage src={logo || ''} alt={recruiter?.name} />
                    <AvatarFallback>
                      <DefaultCompanyLogo />
                    </AvatarFallback>
                  </Avatar>
                  <span className='ml-1'>{recruiter?.name}</span>
                </Link>
              </Button>
              <div className='mr-2 flex flex-row items-center'>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant='link' asChild>
                      <Link
                        href={
                          ROUTES['/user/[user]']({
                            user_id: recruiter_user?.user_id,
                          }) + '?profile=true'
                        }
                      >
                        <Avatar className='h-[24px] w-[24px] cursor-pointer rounded-[4px]'>
                          <AvatarImage
                            src={recruiter_user?.profile_image || ''}
                            alt={recruiter_user?.first_name}
                          />
                          <AvatarFallback className='rounded-[4px]'>
                            <DefaultProfileImage />
                          </AvatarFallback>
                        </Avatar>
                        <span className='sr-only'>
                          {capitalizeAll(recruiter_user?.first_name) ||
                            'Your profile'}
                        </span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align='start' side='right'>
                    <p>
                      {capitalizeAll(recruiter_user?.first_name) ||
                        'Your profile'}
                    </p>
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
            <div className='flex w-full flex-row'>
              <nav className='h-[calc(100vh-64px)] flex flex-col justify-between'>
                <SideNavbar />
              </nav>
              {/* <div className='h-[calc(100vh-64px)] overflow-auto mx-2 mt-2 w-full rounded-lg border bg-white py-4'>
                {checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
                  children
                ) : (
                  <NotFound />
                )}
              </div> */}
              <div className="mx-2 mt-2 w-full">
      <ScrollArea className="h-[calc(100vh-64px)] rounded-lg border bg-white">
        <div className="p-4">
          {checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
            children
          ) : (
            <NotFound />
          )}
        </div>
      </ScrollArea>
    </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
