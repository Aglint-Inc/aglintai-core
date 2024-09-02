'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import NavProfile from './NavProfile';

export default function Navigation() {
  const pathname = usePathname();
  const companyName = 'Discord';
  const imageSrc = 'https://aglintai-seed-data.vercel.app/logo/discord.jpg';

  const application_id = pathname.split('/').filter((a) => a)[1];
  const currentTab = pathname.split('/').filter((a) => a)[2];

  return (
    <div className='sticky w-full top-3 z-50 flex items-center justify-center'>
      <header className='bg-background/80 backdrop-blur-sm shadow-sm rounded-md border border-border w-full max-w-screen-xl mx-auto'>
        <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
          <div className='flex items-center justify-center'>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={companyName}
                width={36}
                height={36}
                className='rounded-md object-contain'
              />
            ) : (
              <span className='text-foreground text-4xl font-bold'>
                {companyName}
              </span>
            )}
          </div>

          <nav className='flex space-x-4'>
            <Link href={`/candidate/${application_id}/home`}>
              <Button
                variant='ghost'
                className={currentTab === 'home' ? 'text-primary' : ''}
              >
                Home
              </Button>
            </Link>
            <Link href={`/candidate/${application_id}/interviews`}>
              <Button
                variant='ghost'
                className={currentTab === 'interviews' ? 'text-primary' : ''}
              >
                Interviews
              </Button>
            </Link>
            <Link href={`/candidate/${application_id}/messages`}>
              <Button
                variant='ghost'
                className={currentTab === 'messages' ? 'text-primary' : ''}
              >
                Messages
              </Button>
            </Link>
          </nav>

          <div className='flex items-center space-x-2'>
            <ThemeSwitcher />
            <NavProfile application_id={application_id} />
          </div>
        </div>
      </header>
    </div>
  );
}
