import '@styles/globals.css';

import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import defaultCompanyLogo from '@public/images/default-company-logo.svg';
import defaultProfileImage from '@public/images/default-user-profile.svg';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import NotFoundPage from '@/pages/404';
import PERMISSIONS from '@/utils/routing/permissions';
import ROUTES from '@/utils/routing/routes';

// import { ThemeSwitcher } from '../CandiatePortal/components/ThemeSwitcher';
import { useImrQuery } from '../Scheduling/Interviewers/InterviewerDetail/hooks';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children, appRouter = false }) {
  const { checkPermissions } = useRolesAndPermissions();
  const { handleLogout } = useAuthDetails();
  const { recruiter, recruiterUser } = useAuthDetails();
  const queryClient = useQueryClient();
  const router = useRouterPro();
  const logo = recruiter?.logo;
  const name = recruiter?.name;

  const { data: userDetails } = useImrQuery({ user_id: recruiterUser.user_id });

  const handleSignOut = () => {
    queryClient.removeQueries();
    handleLogout();
  };

  return (
    <div className='flex h-screen'>
      <nav className='flex flex-col justify-between w-16 border-r bg-white'>
        <div className='flex flex-col items-center py-3 flex-grow'>
          <Button variant='ghost' className='mt-4' asChild>
            <Link href='/'>
              <Image
                src={logo || defaultCompanyLogo}
                alt={name}
                width={40}
                height={40}
                className='rounded-sm mb-5'
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </Button>
          <SideNavbar />
        </div>
        <div className='flex flex-col items-center pb-3 space-y-3'>
          <Tooltip>
            <TooltipTrigger>
              <Button variant='ghost' className='rounded-sm' asChild>
                <Link
                  href={
                    ROUTES['/user/profile/[user_id]']({
                      user_id: recruiterUser?.user_id,
                    }) + '?profile=true'
                  }
                >
                  <Image
                    src={userDetails?.profile_image || defaultProfileImage}
                    alt={name}
                    width={32}
                    height={32}
                    className='rounded-sm'
                    style={{ objectFit: 'cover' }}
                  />
                  <span className='sr-only'>Your profile</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent align='center' side='right'>
              <p>Your profile</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant='outline' onClick={handleSignOut}>
                <LogOut className='w-5 h-5' strokeWidth={1.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent align='center' side='right'>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>

      <main className='flex-1 overflow-auto'>
        {appRouter || checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
          children
        ) : (
          <NotFoundPage />
        )}
      </main>
    </div>
  );
}
