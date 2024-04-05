import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import type React from 'react';

import { pageRoutes } from '../utils/pageRouting';

const queryClient = new QueryClient();

type PageRoutes = typeof pageRoutes;

const reactQueryPageRoute: PageRoutes[keyof PageRoutes][] = [
  pageRoutes.ASSESSMENTS,
  pageRoutes.ASSESSMENT,
  pageRoutes.JOBASSESSMENT,
  pageRoutes.JOBS,
  pageRoutes.JOBDASHBOARD,
  pageRoutes.CREATEJOB,
  pageRoutes.EDITJOB,
  pageRoutes.PROFILESCORE,
  pageRoutes.SCHEDULINGINTERVIEWER,
  pageRoutes.JOBEMAILTEMPLATES,
  pageRoutes.JOBINTERVIEWPLAN,
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

// const getBasePath = (route: string) => {
//   const secondSlashIndex = route.indexOf('/', 1);
//   if (secondSlashIndex !== -1) return route.slice(0, secondSlashIndex);
//   return route;
// };
