'use client';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

import { type apiResponsePortalMessage } from '@/app/api/candidate_portal/get_message/route';
// import CandidatePortalLoader from '@/components/CandiatePortal/components/CandidatePortalLoader';
import EmptyState from '@/components/CandiatePortal/components/EmptyState';
import MessageCard from '@/components/CandiatePortal/components/MessageCard';
import MessageCardSkeleton from '@/components/CandiatePortal/components/MessageCardSkeleton';
import { usePortalMessage } from '@/components/CandiatePortal/hook';

export default function MessagesPage({ params }) {
  const application_id = params.application_id;
  const { isLoading, data } = usePortalMessage({ application_id });

  const [selectedMessage, setSelectedMessage] =
    useState<apiResponsePortalMessage[0]>(null);

  useEffect(() => {
    if (data?.length > 0 && selectedMessage === null)
      setSelectedMessage(data[0]);
  }, [data]);

  if (isLoading) {
    // return <CandidatePortalLoader loadingText='Loading messages..' />;
    return (
      <div className='max-w-screen-sm mt-8 mx-auto'>
        <MessageCardSkeleton />
      <MessageCardSkeleton />
      <MessageCardSkeleton />
      </div>
    )
  }
  if (data === undefined || data?.length === 0)
    return <EmptyState icon={Mail} text='No Past interviews' />;

  return (
    <div className='flex flex-col max-w-screen-sm mt-8 mx-auto'>
      {data.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  );
}
