import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const MessageSkeleton: React.FC<{ isUser?: boolean }> = ({
  isUser = false,
}) => (
  <div className='mb-4 flex justify-start'>
    <div className='flex flex-row items-start'>
      <Skeleton
        className={`h-8 w-8 rounded-full ${isUser ? 'bg-secondary' : 'bg-secondary'}`}
      />
      <div className='mx-2 rounded-bl-sm rounded-br-xl rounded-tr-xl'>
        <Skeleton
          className={`h-16 w-80 rounded-bl-sm rounded-br-xl rounded-tr-xl ${isUser ? 'bg-secondary' : 'bg-secondary'}`}
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
