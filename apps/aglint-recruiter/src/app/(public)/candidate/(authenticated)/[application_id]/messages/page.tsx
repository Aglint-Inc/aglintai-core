'use client';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

import { type apiResponsePortalMessage } from '@/app/api/candidate_portal/get_message/route';
import EmptyState from '@/components/CandiatePortal/components/EmptyState';
import MessageCard from '@/components/CandiatePortal/components/MessageCard';
import { usePortalMessage } from '@/components/CandiatePortal/hook';
import Loader from '@/components/Common/Loader';

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
    return <Loader />;
  }
  if (data === undefined || data?.length === 0)
    return <EmptyState icon={Mail} text='No Past interviews' />;

  return (
    <>
      {data.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </>
  );
}
