'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '../../shadcn/ui/button';
import NavProfile from './NavProfile';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export default function Navigation() {
  const pathname = usePathname();
  const companyName = 'Discord';
  const imageSrc = 'https://aglintai-seed-data.vercel.app/logo/discord.jpg';

  const isActive = (path: string) => pathname === path;

  return (
    <div className='fixed w-full top-3 z-50 flex items-center justify-center'>
      <header
        className='bg-background/80 backdrop-blur-sm shadow-sm rounded-md border border-border'
        style={{ width: '900px' }}
      >
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
            <Link href='/candidate/home' passHref>
              <Button
                variant='ghost'
                className={isActive('/candidate/home') ? 'text-primary' : ''}
              >
                Home
              </Button>
            </Link>
            <Link href='/candidate/interviews' passHref>
              <Button
                variant='ghost'
                className={isActive('/candidate/interviews') ? 'text-primary' : ''}
              >
                Interviews
              </Button>
            </Link>
            <Link href='/candidate/messages' passHref>
              <Button
                variant='ghost'
                className={isActive('/candidate/messages') ? 'text-primary' : ''}
              >
                Messages
              </Button>
            </Link>
          </nav>

          <div className='flex items-center space-x-2'>
            <ThemeSwitcher />
            <NavProfile />
          </div>
        </div>
      </header>
    </div>
  );
}
