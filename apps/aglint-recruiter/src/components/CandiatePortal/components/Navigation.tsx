'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import NavProfile from '../Layout/NavProfile';

export default function Navigation() {
  const pathname = usePathname();
  const companyName = 'Discord';
  const imageSrc = '/images/discord-nav.svg';

  const isActive = (path: string) => pathname === path;

  return (
    <div className='fixed w-full top-3 z-50 flex items-center justify-center'>
      <header
        className='bg-white shadow-sm rounded-md border-gray-200 border'
        style={{ width: '900px' }}
      >
        <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
          <div className='flex items-center justify-center'>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={companyName}
                width={100}
                height={20}
                className='rounded-md object-contain'
              />
            ) : (
              <span className='text-white text-4xl font-bold'>
                {companyName}
              </span>
            )}
          </div>

          <nav className='flex space-x-4'>
            <Link href='/home' passHref>
              <Button
                variant='ghost'
                className={isActive('/home') ? 'text-blue-600' : ''}
              >
                Home
              </Button>
            </Link>
            <Link href='/interviews' passHref>
              <Button
                variant='ghost'
                className={isActive('/interviews') ? 'text-blue-600' : ''}
              >
                Interviews
              </Button>
            </Link>
            <Link href='/messages' passHref>
              <Button
                variant='ghost'
                className={isActive('/messages') ? 'text-blue-600' : ''}
              >
                Messages
              </Button>
            </Link>
          </nav>
          {/* <Avatar className='w-10 h-10 rounded-md overflow-hidden'>
            <AvatarImage src="/images/user-4.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <NavProfile />
        </div>
      </header>
    </div>
  );
}
