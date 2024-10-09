'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import React from 'react';

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
    <div className='flex w-full flex-row items-start justify-between space-x-16 rounded-t-lg bg-muted p-4'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-row items-start'>
          <Avatar className='h-[50px] w-[50px]'>
            <AvatarImage
              src={companyDetails?.logo}
              alt={companyDetails?.name}
            />
            <AvatarFallback>{companyDetails?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold'>{companyDetails?.name}</h1>
            <dl className='flex flex-row items-center'>
              {companyDetails?.location && (
                <>
                  <dt>
                    <MapPin size={16} className='mr-1' />
                  </dt>
                  <dd>
                    <p>{companyDetails?.location}</p>
                  </dd>
                </>
              )}

              {companyDetails?.jobTitle && (
                <>
                  <dt>
                    <Briefcase size={16} className='mr-1' />
                  </dt>
                  <dd>
                    <p>{companyDetails?.jobTitle}</p>
                  </dd>
                </>
              )}
              {companyDetails?.jobType && (
                <>
                  <dt>
                    <Clock size={16} className='mr-1' />
                  </dt>
                  <dd>
                    <p>{companyDetails?.jobType}</p>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col items-end text-right'>
        {candidateDetails?.name} ({candidateDetails?.position})
        {title ? title : null}
        {description ? description : null}
      </div>
    </div>
  );
}

export default SchedulingPageHeader;
