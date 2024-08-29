import { Avatar, AvatarFallback } from '@components/shadcn/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/shadcn/ui/dropdown-menu';
import { Calendar, Home, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-4 py-2 bg-white shadow-sm'>
      <div className='flex items-center space-x-4'>
        <Link href='/candidate/home' className='flex items-center space-x-2'>
          <Image
            src='https://aglintai-seed-data.vercel.app/logo/intercom.jpg'
            alt='Intercom Logo'
            width={32}
            height={32}
          />
          <span className='text-xl font-semibold text-gray-800'>
            Good Health
          </span>
        </Link>
      </div>
      <div className='flex items-center space-x-4'>
        <NavItem
          href='/candidate/home'
          icon={<Home className='w-5 h-5' />}
          label='Home'
          active
        />
        <NavItem
          href='/candidate/messages'
          icon={<MessageCircle className='w-5 h-5' />}
          label='Messages'
          count={1}
        />
        <NavItem
          href='/candidate/interviews'
          icon={<Calendar className='w-5 h-5' />}
          label='Interviews'
          count={2}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='w-8 h-8 bg-purple-600 cursor-pointer'>
              <AvatarFallback>JR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <Link href='/candidate/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
}

function NavItem({ href, icon, label, active = false, count }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium ${
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className='flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full'>
          {count}
        </span>
      )}
    </Link>
  );
}
