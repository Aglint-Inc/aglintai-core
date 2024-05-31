import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import type React from 'react';

import ROUTES from '../utils/routing/routes';

export const GC_TIME = 5 * 60 * 1000;
export const STALE_TIME = 0;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME,
      staleTime: STALE_TIME,
    },
  },
});

type Pages = typeof ROUTES;

const reactQueryPageRoute: (keyof Pages)[] = [
  '/assessment-new',
  '/assessment-new/[id]',
  '/jobs/[id]/assessment',
  '/jobs',
  '/jobs/[id]',
  '/jobs/create',
  '/jobs/[id]/job-details',
  '/jobs/[id]/profile-score',
  '/scheduling/interviewer/[member_id]',
  '/jobs/[id]/email-templates',
  '/jobs/[id]/interview-plan',
  '/scheduling',
  '/scheduling/application/[application_id]',
  '/scheduling/invite/[id]',
  '/workflows',
  '/workflows/[id]',
];

export const appKey = 'app';

export const QueryProvider: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  const router = useRouter();
  const validEnv =
    process.env.NEXT_PUBLIC_HOST_NAME.startsWith('http://localhost');
  const validPath = reactQueryPageRoute.includes(
    (router?.pathname ?? null) as any,
  );
  const showRQDevTools = validEnv && validPath;
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

// const getBasePath = (route: string) => {
//   const secondSlashIndex = route.indexOf('/', 1);
//   if (secondSlashIndex !== -1) return route.slice(0, secondSlashIndex);
//   return route;
// };
