'use Client';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { type PATHS } from '@/constant/allPaths';

import type ROUTES from '../utils/routing/routes';

type ExtractParams<T extends string> =
  T extends `${string}[${infer Param}]${infer Rest}`
    ? // eslint-disable-next-line no-unused-vars
      { [K in Param | keyof ExtractParams<Rest>]: string }
    : undefined;

type RouteArgs<T extends string> = {
  params?: ExtractParams<T>;
  searchParams?: Record<string, string>;
};

export function useRouterPro<T extends Record<string, string | number>>() {
  const router = useRouter();
  const params = useParams<Record<string, string>>() || {};
  const searchParams = useSearchParams();
  const url = usePathname();

  const queryParams = {} as T;
  for (const [key, value] of searchParams.entries()) {
    (queryParams as any)[String(key)] = value;
  }
  const setQueryParams = (data: Partial<T>) => {
    const newParams = { ...queryParams, ...data };

    const tempParams = Object.entries(newParams)
      .map(([key, value]) => {
        if (!value || !String(value).trim().length) return null;
        else return [key, value].join('=');
      })
      .filter((item) => Boolean(item))
      .join('&');
    const temp_url = `${url}?${tempParams}`;
    router.push(temp_url);
  };

  const pathName = Object.entries(params).reduce((acc, [key, val]) => {
    return acc.replace(val, `[${key}]`);
  }, url) as keyof typeof ROUTES;
  const asPath =
    pathName +
    '?' +
    Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
  function superPush<T extends (typeof PATHS)[number]>(
    url: T,
    args?: RouteArgs<T>,
  ) {
    const path = updateUrl(url, {
      params: args.params,
      searchParams: { ...queryParams, ...(args?.searchParams || {}) },
    });
    router.push(path);
  }
  return {
    ...router,
    superPush,
    params,
    pathName,
    asPath,
    queryParams,
    setQueryParams,
    isReady: Boolean(url),
  };
}

function updateUrl<T extends string>(
  url: string,
  { params, searchParams }: RouteArgs<T>,
) {
  if (params) {
    const temp = Object.entries(params);
    if (!temp.length) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`[${key}]`, value);
      });
    }
  }
  if (searchParams) {
    const temp = Object.entries(searchParams);
    if (!temp.length) {
      const sp = Object.entries(searchParams)
        .map(([key, value]) => {
          if (!value || !String(value).trim().length) return null;
          else return [key, value].join('=');
        })
        .filter((item) => Boolean(item))
        .join('&');
      url = url + '?' + sp;
    }
  }
  return url;
}
