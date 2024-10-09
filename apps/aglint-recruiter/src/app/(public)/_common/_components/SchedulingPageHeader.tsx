'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Briefcase, Clock, MapPin } from 'lucide-react';
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
    <div className='flex w-full flex-row items-start justify-between space-x-16 rounded-t-lg bg-muted p-4'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-row items-start'>
          <Avatar className='h-[50px] w-[50px]'>
            <AvatarImage src={logo} alt={companyName} />
            <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold'>{companyName}</h1>
            <dl className='flex flex-row items-center'>
              <dt>
                <MapPin size={16} className='mr-1' />
              </dt>
              <dd>
                <p>Location</p>
              </dd>
              <dt className='ml-12'>
                <Briefcase size={16} className='mr-1' />
              </dt>
              <dd>
                <p>Job Title</p>
              </dd>
              <dt className='ml-12'>
                <Clock size={16} className='mr-1' />
              </dt>
              <dd>
                <p>Full time</p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col items-end text-right'>
        {title ? title : null}
        {description ? description : null}
      </div>
    </div>
  );
}

export default SchedulingPageHeader;
