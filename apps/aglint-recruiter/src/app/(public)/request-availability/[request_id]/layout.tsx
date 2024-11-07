import { unstable_noStore as noStore } from 'next/cache';
import { type PropsWithChildren } from 'react';

import { api, HydrateClient } from '@/trpc/server';

import { RequestAvailabilityProvider } from './_common/contexts/RequestAvailabilityContext';

async function AvailabilityLayout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    request_id: string;
  };
}>) {
  noStore();
  const { request_id } = await params;
  void api.candidate_availability.getCandidateAvailabilityData.prefetch({
    candidate_request_availability_id: request_id,
  });
  return (
    <HydrateClient>
      <RequestAvailabilityProvider>{children}</RequestAvailabilityProvider>
    </HydrateClient>
  );
}

export default AvailabilityLayout;
