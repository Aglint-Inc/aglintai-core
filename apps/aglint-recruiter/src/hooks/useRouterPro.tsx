'use Client';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { type PATHS } from '@/constant/allPaths';
import { type TYPE_SAFE_PATHS } from '@/constant/typeSafePaths';

import type ROUTES from '../utils/routing/routes';

export function useRouterPro<T extends Record<string, string | number>>() {
  const router = useRouter();
  const params = useParams<Record<string, string>>() || {};
  const searchParams = useSearchParams();
  const url = usePathname() || '';

  const queryParams = {} as T;
  for (const [key, value] of searchParams?.entries() || []) {
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
    op?: TYPE_SAFE_PATHS<T>,
  ) {
    const path = updateUrl(url, op);
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

function updateUrl(url: string, op: unknown) {
  const { params, searchParams } = op as {
    params?: Record<string, string>;
    searchParams: Record<string, string | number>;
  };
  if (params) {
    const temp = Object.entries(params);
    if (temp.length) {
      temp.forEach(([key, value]) => {
        url = url.replace(`[${key}]`, value);
      });
    }
  }
  if (searchParams) {
    const temp = Object.entries(searchParams);
    if (temp.length) {
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

export function getUrlPro<T extends (typeof PATHS)[number]>(
  url: T,
  op?: TYPE_SAFE_PATHS<T>,
) {
  return updateUrl(url, op);
}
