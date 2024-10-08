import { api } from '@/trpc/server';
import { RequestProvider } from '@request/contexts';
import { unstable_noStore } from 'next/cache';
import React from 'react';

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { request: string };
}) {
  unstable_noStore();
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
