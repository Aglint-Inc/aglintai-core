import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const MessageSkeleton: React.FC<{ isUser?: boolean }> = ({
  isUser = false,
}) => (
  <div className='flex justify-start mb-4'>
    <div className='flex flex-row items-start'>
      <Skeleton
        className={`h-8 w-8 rounded-full ${isUser ? 'bg-secondary' : 'bg-secondary'}`}
      />
      <div className='mx-2 rounded-tr-xl rounded-br-xl rounded-bl-sm'>
        <Skeleton
          className={`h-16 w-80 rounded-tr-xl rounded-br-xl rounded-bl-sm ${isUser ? 'bg-secondary' : 'bg-secondary'}`}
        />
      </div>
    </div>
  </div>
);

export default function SkeletonMessage() {
  return (
    <div className='space-y-12'>
      <MessageSkeleton isUser />
      <MessageSkeleton />
      <MessageSkeleton isUser />
      <MessageSkeleton />
    </div>
  );
}
