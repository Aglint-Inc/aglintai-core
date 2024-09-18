import { useParams } from 'next/navigation';
import React from 'react';

import { RequestProvider } from '@/context/RequestContext';
import { RequestsProvider } from '@/context/RequestsContext';

function RequestDetailsLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  return (
    <RequestsProvider>
      <RequestProvider request_id={String(params.id)}>
        {children}
      </RequestProvider>
    </RequestsProvider>
  );
}

export default RequestDetailsLayout;
