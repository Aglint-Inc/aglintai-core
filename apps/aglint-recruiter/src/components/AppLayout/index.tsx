import '@styles/globals.css';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
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
    width={40}
    height={40}
  />
);
const DefaultCompanyLogo = () => (
  <Image
    src={'/images/default/company.svg'}
    alt={'Greenhouse'}
    width={40}
    height={40}
  />
);

export default function AppLayout({ children }) {
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
                    src={recruiter_user?.profile_image || ''}
                    alt='@shadcn'
                  />
                  <AvatarFallback className='rounded-[4px]'>
                    <DefaultProfileImage />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </Button>

            <Button variant='link' onClick={() => {}} asChild>
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
                          src={recruiter_user?.profile_image || ''}
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
                    {capitalizeAll(recruiter_user?.first_name) ||
                      'Your profile'}
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant='link' onClick={logout}>
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
        <div
          className={`flex w-full overflow-auto bg-gray-50 ${
            isHorizontalNav ? '' : 'ml-16'
          }`}
        >
          <div className='w-full py-8'>
            {checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
              children
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
