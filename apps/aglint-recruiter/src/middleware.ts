import { type NextRequest, NextResponse } from 'next/server';

import { createPrivateClient } from './server/db';
import { trpcPublicRoutes } from './server/utils';
import { server_check_permissions } from './utils/middleware/util';
import { allowedPaths, dynamicPublicRoutes } from './utils/paths/allowed';
import PERMISSIONS from './utils/routing/permissions';

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
// 1. Specify protected and public routes
const publicRoutes = [...allowedPaths] as const;

export async function middleware(req: NextRequest) {
  const requestUrl = req.nextUrl.pathname;

  if (requestUrl.startsWith('/api') && !requestUrl.startsWith('/api/trpc'))
    return await middlewareV1(req);

  // Check the origin from the request
  const origin = req.headers.get('origin') ?? '';
  const isAllowedOrigin = origin.startsWith('http://localhost');

  const isPreflight = req.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute =
    trpcPublicRoutes(requestUrl) ||
    publicRoutes.includes(path as (typeof publicRoutes)[number]) ||
    dynamicPublicRoutes.some((regex) => regex.test(path));

  const supabase = createPrivateClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) NextResponse.redirect(new URL('/', req.nextUrl));

  if (isPublicRoute) {
    if (data.session && path === '/login')
      return NextResponse.redirect(new URL('/jobs', req.nextUrl));
  } else {
    if (!data.session)
      return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*.svg$|sitemap.xml|robots.txt).*)',
  ],
};

const middlewareV1 = async (request: NextRequest) => {
  const requestUrl = request.nextUrl.pathname;
  if (isAllowedPaths(requestUrl)) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  const { isAllowed, id, rec_id, role } = await server_check_permissions({
    getVal: (name) => request.cookies.get(name)?.value ?? null!,
    // eslint-disable-next-line security/detect-object-injection
    permissions: PERMISSIONS[requestUrl as keyof typeof PERMISSIONS],
  });

  if (requestUrl.startsWith('/api/')) {
    if (isAllowed) {
      // user this headers to get id and role for requester
      request.headers.append('x-requester-id', id!);
      request.headers.append('x-requester-rec_id', rec_id!);
      request.headers.append('x-requester-role', role!);
    } else {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  } else {
    // not login
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
};

const isAllowedPaths = (reqUrl: any) => {
  return allowedPaths.has(reqUrl);
};
