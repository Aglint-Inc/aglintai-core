'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCandidatePortalMessages } from 'src/app/(public)/candidate/(authenticated)/[application_id]/messages/_common/hooks';

import {
  useCandidatePortal,
  useCandidatePortalNavbar,
} from '@/candidate/authenticated/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

import CandidatePortalLoader from './CandidatePortalLoader';
import NavProfile from './NavProfile';
// import { ThemeSwitcher } from '../components/ThemeSwitcher';
// import NavProfile from './NavProfile';

// type tabs = 'home' | 'interviews' | 'messages';

export default function Navigation() {
  // const pathname = usePathname();

  // const currentTab = pathname.split('/').filter((a) => a)[2] as tabs;

  const { data, isPending } = useCandidatePortalNavbar();
  const { data: messages, isPending: messagePending } =
    useCandidatePortalMessages();
  const { application_id } = useCandidatePortal();
  const [signingOut, setSigningOut] = useState(false);

  const router = useRouterPro();

  if (isPending || messagePending)
    return <CandidatePortalLoader loadingText='Loading Candidate Portal..' />;
  const messageNewCount = messages?.filter((mes) => mes.isNew).length || 0;

  const { company } = data;
  return (
    <div className='sticky top-3 z-50 flex w-full items-center justify-center px-5'>
      <header className='container mx-auto w-full max-w-screen-xl rounded-md border border-border bg-background/80 p-0 shadow-sm backdrop-blur-sm'>
        <div className='container mx-auto flex items-center justify-between px-4 py-2'>
          <div className='flex items-center justify-center'>
            {company?.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={36}
                height={36}
                className='rounded-md object-contain'
              />
            ) : (
              <span className='text-4xl font-bold text-foreground'>
                {company?.name}
              </span>
            )}
          </div>

          <nav className='flex space-x-4'>
            <Link href={`/candidate/${application_id}/home`}>
              <Button
                variant='ghost'
                // className={
                //   currentTab === 'home'
                //     ? 'text-primary'
                //     : 'text-muted-foreground'
                // }
              >
                Home
              </Button>
            </Link>
            <Link href={`/candidate/${application_id}/interviews`}>
              <Button
                variant='ghost'
                // className={
                //   currentTab === 'interviews'
                //     ? 'text-primary'
                //     : 'text-muted-foreground'
                // }
              >
                Interviews
              </Button>
            </Link>
            <Link href={`/candidate/${application_id}/messages`}>
              <Button
                variant='ghost'
                // className={
                //   currentTab === 'messages'
                //     ? 'text-primary'
                //     : 'text-muted-foreground'
                // }
              >
                Messages
                {messageNewCount > 0 && (
                  <Badge className='ml-2 bg-red-500 px-2 py-0.5 text-xs'>
                    {messageNewCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          <div className='flex items-center space-x-2'>
            {/* <ThemeSwitcher />  */}
            <Button
              size='sm'
              onClick={async () => {
                setSigningOut(true);
                await supabase.auth.signOut();
                router.push(`/candidate/${application_id}/login`);
                setSigningOut(false);
              }}
            >
              {signingOut ? 'Signing out...' : 'Logout'}
            </Button>
            <Link href={`/candidate/${application_id}/profile`}>
              <NavProfile
                application_id={application_id}
                candidate={data?.candidate}
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
