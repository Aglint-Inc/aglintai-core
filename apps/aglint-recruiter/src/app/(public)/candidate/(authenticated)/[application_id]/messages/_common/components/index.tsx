'use client';
import { Mail } from 'lucide-react';

import EmptyState from '@/candidate/authenticated/components/EmptyState';

import { useCandidatePortalMessages } from '../hooks';
import MessageCard from './MessageCard';
import MessageCardSkeleton from './MessageCardSkeleton';

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
