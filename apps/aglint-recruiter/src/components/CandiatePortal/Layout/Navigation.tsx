'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  useCandidatePortal,
  useCandidatePortalMessages,
  useCandidatePortalNavbar,
} from '@/candidate/authenticated/hooks';

import CandidatePortalLoader from '../components/CandidatePortalLoader';
import NavProfile from './NavProfile';
// import { ThemeSwitcher } from '../components/ThemeSwitcher';
// import NavProfile from './NavProfile';

type tabs = 'home' | 'interviews' | 'messages';

export default function Navigation() {
  const pathname = usePathname();

  const currentTab = pathname.split('/').filter((a) => a)[2] as tabs;
  const { data, isPending } = useCandidatePortalNavbar();
  const { data: messages, isPending: messagePending } =
    useCandidatePortalMessages();
  const { application_id } = useCandidatePortal();

  if (isPending || messagePending)
    return <CandidatePortalLoader loadingText='Loading Candidate Portal..' />;
  const messageNewCount = messages?.filter((mes) => mes.isNew).length || 0;

  const { company } = data;
  return (
    <div className='sticky w-full px-5 top-3 z-50 flex items-center justify-center'>
      <header className='bg-background/80 backdrop-blur-sm shadow-sm rounded-md border border-border w-full max-w-screen-xl container mx-auto p-0'>
        <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
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
              <span className='text-foreground text-4xl font-bold'>
                {company?.name}
              </span>
            )}
          </div>

          <nav className='flex space-x-4'>
            <Link href={`/candidate/${application_id}/home`}>
              <Button
                variant='ghost'
                className={
                  currentTab === 'home'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }
              >
                Home
              </Button>
            </Link>
            <Link href={`/candidate/${application_id}/interviews`}>
              <Button
                variant='ghost'
                className={
                  currentTab === 'interviews'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }
              >
                Interviews
              </Button>
            </Link>
            <Link href={`/candidate/${application_id}/messages`}>
              <Button
                variant='ghost'
                className={
                  currentTab === 'messages'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }
              >
                Messages
                {messageNewCount > 0 && (
                  <Badge className='ml-2 px-2 py-0.5 text-xs bg-red-500'>
                    {messageNewCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          <div className='flex items-center space-x-2'>
            {/* <ThemeSwitcher />
            <NavProfile
              application_id={application_id}
              candidate={data?.candidate}
            /> */}
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
