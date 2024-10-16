'use client';
import { EmptyState } from '@components/empty-state';
import { Mail } from 'lucide-react';

import { useCandidatePortalMessages } from '../hooks';
import MessageCard from './MessageCard';
import MessageCardSkeleton from './MessageCardSkeleton';

export default function MessagesPage() {
  const { data, isPending } = useCandidatePortalMessages();
  if (isPending)
    return (
      <div className='mx-auto mt-8 min-h-screen max-w-screen-sm'>
        <MessageCardSkeleton />
        <MessageCardSkeleton />
        <MessageCardSkeleton />
      </div>
    );
  if (data === undefined || data?.length === 0)
    return <EmptyState icon={Mail} header='No Messages' />;

  return (
    <div className='mx-auto mt-8 flex min-h-screen max-w-screen-sm flex-col'>
      {data.map((message, index) => (
        <MessageCard key={message.id} index={index} />
      ))}
    </div>
  );
}
