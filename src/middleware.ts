import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import { allowedPaths } from './utils/paths/allowed';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const requestUrl = request.nextUrl.pathname;
  if (isAllowedPaths(requestUrl)) {
    return response;
  }
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // if user is signed in and the current path is / redirect the user to /account
  if (user && allowedPaths.has(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // if user is not signed in and the current path is not /login redirect the user to /
  if (!user && !allowedPaths.has(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/login', '/', '/signup', '/api/:function*'],
};

const isAllowedPaths = (reqUrl = '') => {
  return allowedPaths.has(reqUrl);
};
