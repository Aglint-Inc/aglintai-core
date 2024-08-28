import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

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
  }, url);
  const asPath =
    pathName +
    '?' +
    Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
  return {
    ...router,
    params,
    pathName,
    asPath,
    queryParams,
    setQueryParams,
    isReady: Boolean(url),
  };
}
