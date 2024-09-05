'use client';
import { Mail } from 'lucide-react';

import CandidatePortalLoader from '@/components/CandiatePortal/components/CandidatePortalLoader';
import EmptyState from '@/components/CandiatePortal/components/EmptyState';
import MessageCard from '@/components/CandiatePortal/components/MessageCard';

import { useCandidatePortalMessages } from '../_common/hooks';

export default function MessagesPage() {
  const { data, status } = useCandidatePortalMessages();
  if (status === 'error') return <>Error</>;
  if (status === 'pending')
    return <CandidatePortalLoader loadingText='Loading messages..' />;
  if (data.length === 0)
    return <EmptyState icon={Mail} text='No Past interviews' />;
  return (
    <>
      {data.map((message, index) => (
        <MessageCard key={message.id} index={index} />
      ))}
    </>
  );
}
