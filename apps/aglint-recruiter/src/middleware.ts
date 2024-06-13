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
  const isRouteApi = requestUrl.startsWith('/api');
  // is public route
  if (process.env.NODE_ENV === 'development' || isAllowedPaths(requestUrl)) {
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

  if (isRouteApi) {
    if (user) {
      return response;
    } else {
      return NextResponse.json('Not Authenticated', { status: 401 });
    }
  } else {
    if (user) {
      return response;
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/login', '/', '/signup', '/api/:function*'],
};

const isAllowedPaths = (reqUrl = '') => {
  return allowedPaths.has(reqUrl);
};
