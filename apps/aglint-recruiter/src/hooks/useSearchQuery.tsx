import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearchQuery<
  T extends Record<string, string | number | boolean>,
>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
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
    const url = `${pathName}?${tempParams}`;
    router.push(url);
  };
  return { queryParams, setQueryParams };
}
