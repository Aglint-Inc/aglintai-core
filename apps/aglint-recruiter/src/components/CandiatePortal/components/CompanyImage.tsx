import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import React from 'react';

import { usePortalHomePage } from '../hook';

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
      className='h-48 relative'
      style={{
        backgroundImage: `url(${coverSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute -bottom-16 left-8'>
        <div className='w-32 h-32 bg-white rounded-md flex items-center justify-center overflow-hidden'>
          {candidate ? (
            // <Image
            //   src={imageSrc}
            //   alt={altText}
            //   width={128}
            //   height={128}
            //   className="rounded-md object-contain border border-border"
            // />
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            // <img src={candidate?.avatar} width={'128px'} height={'128px'} />
            <Avatar className='w-full h-full cursor-pointer rounded-md'>
              <AvatarImage
                className='object-cover rounded-md'
                src={candidate?.avatar}
                alt='@shadcn'
              />
              <AvatarFallback className='rounded-md text-4xl font-semibold'>
                {candidate.first_name.charAt(0) + candidate.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <span className='text-white text-4xl font-bold'>{altText}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyImage;
