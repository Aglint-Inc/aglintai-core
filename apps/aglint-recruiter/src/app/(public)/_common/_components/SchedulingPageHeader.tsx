'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Separator } from '@components/ui/separator';
import React from 'react';

export function SchedulingPageHeader({
  title,
  description,
  companyName,
  logo,
}: {
  title?: React.ReactNode;
  description: React.ReactNode;
  companyName: string;
  logo: string;
}) {
  return (
    <div className='flex w-full flex-col items-start'>
      <div className='flex w-full items-start rounded-t-lg bg-muted p-4'>
        <div className='flex flex-row items-center space-x-4'>
          <Avatar className='h-[50px] w-[50px]'>
            <AvatarImage src={logo} alt={companyName} />
            <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className='text-2xl font-semibold'>{companyName}</h1>
        </div>
      </div>
      {title ? title : null}
      <Separator />
      {description ? description : null}
    </div>
  );
}

export default SchedulingPageHeader;
