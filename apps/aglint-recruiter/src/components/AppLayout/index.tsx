import '@styles/globals.css';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import DefaultCompanyLogo from '@public/images/default/company.svg';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

import { useTenant } from '@/company/hooks';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useMemberList } from '@/hooks/useMemberList';
import { useRouterPro } from '@/hooks/useRouterPro';
import PERMISSIONS from '@/utils/routing/permissions';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import DefaultProfileImage from '../../../public/images/default/user.svg';
import { NotFound } from '../Common/404';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children, appRouter = false }) {
  const { checkPermissions } = useRolesAndPermissions();
  const { isShowFeature, handleLogout } = useAuthDetails();
  const { recruiter, recruiter_user } = useTenant();
  const router = useRouterPro();
  const logo = recruiter?.logo;

  const { data: members } = useMemberList();

  const userDetails = members?.find(
    (member) => member.user_id === recruiter_user.user_id,
  );

  const isHorizontalNav = !isShowFeature('SCHEDULING');

  return (
    <>
      {isHorizontalNav && (
        <nav className='sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white p-2'>
          <div className='flex items-center space-x-4'>
            <Link href='/jobs'>
              <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                <AvatarImage src={logo || ''} alt='@shadcn' />
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
                    src={userDetails?.profile_image || ''}
                    alt='@shadcn'
                  />
                  <AvatarFallback className='rounded-[4px]'>
                    <DefaultProfileImage />
                  </AvatarFallback>
                </Avatar>
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
                  <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                    <AvatarImage src={logo || ''} alt='@shadcn' />
                    <AvatarFallback className='rounded-[4px]'>
                      <DefaultCompanyLogo />
                    </AvatarFallback>
                  </Avatar>
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
                          user_id: recruiter_user?.user_id,
                        }) + '?profile=true'
                      }
                    >
                      <Avatar className='h-[32px] w-[32px] cursor-pointer rounded-[4px]'>
                        <AvatarImage
                          src={userDetails?.profile_image || ''}
                          alt='@shadcn'
                        />
                        <AvatarFallback className='rounded-[4px]'>
                          <DefaultProfileImage />
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
          className={`flex min-h-screen w-full bg-gray-50 py-8 ${
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
