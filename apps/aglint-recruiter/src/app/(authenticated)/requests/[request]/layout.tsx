import { RequestProvider } from '@request/contexts';
import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';

import { api } from '@/trpc/server';

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { request: string };
}) {
  noStore();
  void api.requests.utils.requestSessions.prefetch({
    request_id: params.request,
  });
  void api.requests.note.read.prefetch({
    request_id: params.request,
  });
  void api.requests.read.applicantRequest.prefetch({
    request_id: params.request,
  });
  return (
    <RequestProvider request_id={params.request}>{children}</RequestProvider>
  );
}

export default Layout;
