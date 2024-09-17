'use client';
import { Mail } from 'lucide-react';

import EmptyState from '@/components/CandiatePortal/components/EmptyState';
import MessageCard from '@/components/CandiatePortal/components/MessageCard';
import MessageCardSkeleton from '@/components/CandiatePortal/components/MessageCardSkeleton';

import { useCandidatePortalMessages } from '../_common/hooks';

export default function MessagesPage() {
  const { data, isPending, status } = useCandidatePortalMessages();
  if (isPending)
    return (
      <div className='mx-auto mt-8 max-w-screen-sm'>
        <MessageCardSkeleton />
        <MessageCardSkeleton />
        <MessageCardSkeleton />
      </div>
    );
  if (status === 'error') return <>Error</>;
  if (data === undefined || data?.length === 0)
    return <EmptyState icon={Mail} text='No Past interviews' />;

  return (
    <div className='mx-auto mt-8 flex max-w-screen-sm flex-col'>
      {data.map((message, index) => (
        <MessageCard key={message.id} index={index} />
      ))}
    </div>
  );
}
