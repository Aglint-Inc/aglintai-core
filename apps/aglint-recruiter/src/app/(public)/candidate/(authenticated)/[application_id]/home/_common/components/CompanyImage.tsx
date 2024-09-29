import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import React from 'react';

import { type usePortalHomePage } from '../hooks';

function CompanyImage({
  candidate,
  altText = 'Company Name',
  coverSrc,
}: {
  candidate: ReturnType<typeof usePortalHomePage>['data']['candidate'];
  altText?: string;
  coverSrc: string;
}) {
  return (
    <div
      className='relative h-48'
      style={{
        backgroundImage: `url(${coverSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute -bottom-16 left-8'>
        <div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-md bg-white'>
          {candidate ? (
            <Avatar className='h-full w-full cursor-pointer rounded-md'>
              <AvatarImage
                className='rounded-md object-cover'
                src={candidate?.avatar}
                alt={candidate?.first_name}
              />
              <AvatarFallback className='rounded-md text-4xl font-semibold'>
                {candidate.first_name.charAt(0) + candidate.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <span className='text-4xl font-bold text-white'>{altText}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyImage;
