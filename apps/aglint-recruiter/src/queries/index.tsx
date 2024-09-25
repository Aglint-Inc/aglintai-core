'use client';

export const GC_TIME = 5 * 60 * 1000;
export const REFETCH_INTERVAL = 30_000;

export const appKey = 'app';
export const noPollingKey = 'no-polling';

export const argsToKeys = (obj: object) => {
  return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
};

// const errorLogic = (error: Error, router: ReturnType<typeof useRouterPro>) => {
//   if (error.name === 'TRPCClientError' && error.message === UNAUTHENTICATED) {
//     toast.error('Session expired');
//     router.push(ROUTES['/login']());
//   }
// };

// const getBasePath = (route: string) => {
//   const secondSlashIndex = route.indexOf('/', 1);
//   if (secondSlashIndex !== -1) return route.slice(0, secondSlashIndex);
//   return route;
// };
