'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCandidatePortalNavbar } from 'src/app/(public)/candidate/(authenticated)/_common/hooks';
import { useCandidatePortalMessages } from 'src/app/(public)/candidate/(authenticated)/messages/_common/hooks';

import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

import CandidatePortalLoader from './CandidatePortalLoader';
import NavProfile from './NavProfile';

export default function Navigation() {
  const { data, isLoading } = useCandidatePortalNavbar();

  const { data: messages, isLoading: messageLoading } =
    useCandidatePortalMessages();

  const router = useRouterPro();
  const { queryParams } = router;
  const application_id = queryParams.application_id as string;
  const isPreview = !!queryParams.isPreview;

  const [signingOut, setSigningOut] = useState(false);

  if (isLoading || messageLoading)
    return <CandidatePortalLoader loadingText='Loading Candidate Portal..' />;

  const messageCount = messages?.length || 0;

  const company = data?.company;

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
            <Link
              href={
                isPreview
                  ? ''
                  : `/candidate/home?application_id=${application_id}`
              }
            >
              <Button variant='ghost'>Home</Button>
            </Link>
            <Link
              href={
                isPreview
                  ? ''
                  : `/candidate/interviews?application_id=${application_id}`
              }
            >
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
            <Link
              href={
                isPreview
                  ? ''
                  : `/candidate/messages?application_id=${application_id}`
              }
            >
              <Button variant='ghost'>
                Messages
                {messageCount > 0 && (
                  <Badge className='ml-2 bg-gray-500 px-2 py-0.5 text-xs'>
                    {messageCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          <div className='flex items-center space-x-2'>
            {/* <ThemeSwitcher />  */}
            <Button
              size='sm'
              disabled={isPreview}
              onClick={async () => {
                setSigningOut(true);
                await supabase.auth.signOut();
                router.push(
                  `/candidate/login?application_id=${application_id}`,
                );
                setSigningOut(false);
              }}
            >
              {signingOut ? 'Signing out...' : 'Logout'}
            </Button>

            {data?.candidate && (
              <Link
                href={
                  isPreview
                    ? ''
                    : `/candidate/profile?application_id=${application_id}`
                }
              >
                <NavProfile candidate={data.candidate} />
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
