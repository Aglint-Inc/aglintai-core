import '@styles/globals.css';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import defaultCompanyLogo from '@public/images/default-company-logo.svg';
import { LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useMemberList } from '@/hooks/useMemberList';
import { useRouterPro } from '@/hooks/useRouterPro';
import PERMISSIONS from '@/utils/routing/permissions';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import defaultProfileImage from '../../../public/images/default-user-profile.svg';
import { NotFound } from '../Common/404';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children, appRouter = false }) {
  const { checkPermissions } = useRolesAndPermissions();
  const { recruiter, recruiterUser, isShowFeature, handleLogout } =
    useAuthDetails();
  const router = useRouterPro();
  const logo = recruiter?.logo;
  const name = recruiter?.name;

  const { data: members } = useMemberList();

  const userDetails = members?.find(
    (member) => member.user_id === recruiterUser.user_id,
  );

  const isHorizontalNav = !isShowFeature('SCHEDULING');

  return (
    <>
      {isHorizontalNav && (
        <nav className='sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white p-2'>
          <div className='flex items-center space-x-4'>
            <Link href='/jobs'>
              <Image
                src={logo || defaultCompanyLogo}
                alt={name}
                width={32}
                height={32}
                className='rounded-sm'
                style={{ objectFit: 'contain' }}
              />
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
                    user_id: recruiterUser?.user_id,
                  }) + '?profile=true'
                }
              >
                {recruiterUser?.profile_image ? (
                  // <Image
                  //   src={recruiterUser?.profile_image}
                  //   alt={recruiterUser?.first_name || 'User'}
                  //   width={32}
                  //   height={32}
                  //   className='rounded-full'
                  //   style={{ objectFit: 'cover' }}
                  // />
                  <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                    <AvatarImage
                      src={userDetails?.profile_image || defaultProfileImage}
                      alt='@shadcn'
                    />
                    <AvatarFallback className='rounded-[4px]'>
                      <User className='text-gray-700' />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className='h-5 w-5' strokeWidth={1.5} />
                )}
              </Link>
            </Button>

            <Button variant='link' onClick={handleLogout} asChild>
              <Link href='#'>
                <LogOut className='mr-2 h-5 w-5' strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </nav>
      )}
      <div className='flex flex-1'>
        {!isHorizontalNav && (
          <nav className='fixed z-20 flex h-[100vh] w-16 flex-col justify-between border-r bg-white'>
            <div className='flex flex-grow flex-col items-center py-3'>
              <Button variant='link' className='mt-4' asChild>
                <Link href='/jobs'>
                  <Image
                    src={logo || defaultCompanyLogo}
                    alt={name}
                    width={40}
                    height={40}
                    className='mb-5 rounded-sm'
                    style={{ objectFit: 'contain' }}
                  />
                </Link>
              </Button>
              <SideNavbar />
            </div>
            <div className='mb-3 flex flex-col items-center'>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant='link' asChild>
                    <Link
                      href={
                        ROUTES['/user/[user]']({
                          user_id: recruiterUser?.user_id,
                        }) + '?profile=true'
                      }
                    >
                      <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                        <AvatarImage
                          src={
                            userDetails?.profile_image || defaultProfileImage
                          }
                          alt='@shadcn'
                        />
                        <AvatarFallback className='rounded-[4px]'>
                          <User className='text-gray-600' strokeWidth={1.5} />
                        </AvatarFallback>
                      </Avatar>
                      <span className='sr-only'>Your profile</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent align='start' side='right'>
                  <p>
                    {capitalizeAll(userDetails?.first_name) || 'Your profile'}
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant='link' onClick={handleLogout}>
                    <LogOut className='h-5 w-5' strokeWidth={1.5} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align='center' side='right'>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </nav>
        )}
        <main
          className={`flex min-h-screen w-full bg-gray-50 pt-8 ${
            isHorizontalNav ? '' : 'ml-16'
          }`}
        >
          {appRouter ||
          checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
            children
          ) : (
            <NotFound />
          )}
        </main>
      </div>
    </>
  );
}
