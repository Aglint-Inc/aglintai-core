'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import React from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export function SchedulingPageHeader({
  title,
  description,
  companyDetails,
  candidateDetails,
}: {
  title?: React.ReactNode;
  description: React.ReactNode;
  companyDetails?: {
    name?: string;
    logo?: string;
    location?: string;
    jobTitle?: string;
    jobType?: string;
  };
  candidateDetails?: {
    name?: string;
    position?: string;
    email?: string;
  };
}) {
  return (
    <div className='flex w-full flex-row items-center justify-between space-x-16 rounded-t-lg bg-muted p-4'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-row items-center space-x-2'>
          <Avatar className='h-[50px] w-[50px]'>
            <AvatarImage
              src={companyDetails?.logo}
              alt={companyDetails?.name}
            />
            <AvatarFallback>{companyDetails?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h1 className='text-lg font-semibold'>{companyDetails?.name}</h1>
            <dl className='flex flex-row items-center space-x-1 text-sm text-muted-foreground'>
              {companyDetails?.location?.trim() ? (
                <>
                  <dt>
                    <MapPin size={16} className='mr-1' />
                  </dt>
                  <dd>
                    <p className='mr-2'>{companyDetails?.location}</p>
                  </dd>
                </>
              ) : (
                ''
              )}

              {companyDetails?.jobTitle && (
                <>
                  <dt>
                    <Briefcase size={16} className='mr-1' />
                  </dt>
                  <dd>
                    <p className='mr-2'>
                      {capitalizeFirstLetter(companyDetails?.jobTitle)}
                    </p>
                  </dd>
                </>
              )}
              {companyDetails?.jobType && (
                <>
                  <dt>
                    <Clock size={16} className='mr-1' />
                  </dt>
                  <dd>
                    <p className='mr-2'>
                      {capitalizeFirstLetter(companyDetails?.jobType)}
                    </p>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col items-end text-right'>
        <div className='flex flex-row items-center'>
          <p className='mb-2 px-2 text-sm text-muted-foreground'>
            Welcome, {candidateDetails?.name}!
          </p>
        </div>
        {title ? title : null}
        {description ? description : null}
      </div>
    </div>
  );
}

export default SchedulingPageHeader;
