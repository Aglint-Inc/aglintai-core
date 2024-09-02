'use client';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { useState } from 'react';

import { useRouterPro } from '../hooks/useRouterPro';
import { UNAUTHENTICATED } from '../server/enums';
import ROUTES from '../utils/routing/routes';
import toast from '../utils/toast';

export const GC_TIME = 5 * 60 * 1000;
export const STALE_TIME = 0;
export const REFETCH_ON_MOUNT = false;
export const REFETCH_ON_WINDOW_FOCUS = false;

type Pages = typeof ROUTES;

const reactQueryPageRoute: (keyof Pages)[] = [
  '/assessment-new',
  '/assessment-new/[id]',
  '/jobs/[id]/assessment',
  '/jobs',
  '/jobs/[id]',
  '/jobs/create',
  '/jobs/[id]/metrics',
  '/jobs/[id]/job-details',
  '/jobs/[id]/profile-score',
  '/jobs/[id]/hiring-team',
  '/jobs/[id]/interview-plan',
  '/jobs/[id]/workflows',
  '/jobs/[id]/application/[application_id]',
  '/scheduling/interviewer/[member_id]',
  '/jobs/[id]/email-templates',
  '/jobs/[id]/interview-plan',
  '/scheduling',
  '/scheduling/application/[application_id]',
  '/scheduling/invite/[id]',
  '/workflows',
  '/workflows/[id]',
  '/requests',
  '/interviewers',
];

export const appKey = 'app';
export const noPollingKey = 'no-polling';

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouterPro();

  const validEnv =
    process.env.NEXT_PUBLIC_HOST_NAME.startsWith('http://localhost');
  const validPath = reactQueryPageRoute.includes(
    (router?.pathName ?? null) as any,
  );
  const showRQDevTools = validEnv && validPath;

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: GC_TIME,
          staleTime: STALE_TIME,
          refetchOnMount: REFETCH_ON_MOUNT,
          refetchOnWindowFocus: REFETCH_ON_WINDOW_FOCUS,
        },
        mutations: {
          onError: (error) => errorLogic(error, router),
        },
      },
      queryCache: new QueryCache({
        onError: (error) => errorLogic(error, router),
      }),
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <>
        {children}
        {showRQDevTools && <ReactQueryDevtools />}
      </>
    </QueryClientProvider>
  );
};

export const argsToKeys = (obj: Object) => {
  return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
};

const errorLogic = (error: Error, router: ReturnType<typeof useRouterPro>) => {
  if (error.name === 'TRPCClientError' && error.message === UNAUTHENTICATED) {
    toast.error('Session expired');
    router.push(ROUTES['/login']());
  }
};

// const getBasePath = (route: string) => {
//   const secondSlashIndex = route.indexOf('/', 1);
//   if (secondSlashIndex !== -1) return route.slice(0, secondSlashIndex);
//   return route;
// };
