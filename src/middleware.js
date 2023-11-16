import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

// run middleware only for api folder
export const config = {
  matcher: '/api/:function*',
};

const whiteListedEndPoints = [
  '/api/sendgrid',
  '/api/lever/saveResume',
  '/api/greenhouse/saveResume',
  '/api/lever/candidateSync',
  '/api/webhook',
  '/api/JobApplicationsApi',
  '/api/ai/resume-embedding',
  '/api/interview', // need this publicly access for interview feedback.
];

export async function middleware(request) {
  if (isUrlWhiteListed(request.url)) {
    const response = NextResponse.next();
    return response;
  }
  // get token from cookie
  const access_token = request.cookies.get('access_token');
  if (!access_token)
    return NextResponse.json(
      { error: 'No Access Token found' },
      { status: 401 },
    );

  const isTokenVerified = await verify(
    access_token.value,
    process.env.SUPABASE_SECRET_KEY,
  );
  if (isTokenVerified) {
    // if verified redired to requested end point
    const response = NextResponse.next();
    return response;
  } else {
    return NextResponse.json(
      { error: 'Invalid Access Token' },
      { status: 401 },
    );
  }
}

async function verify(token, secret) {
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      maxTokenAge: 86400, //one day in supabase
    });
    return true;
  } catch (e) {
    return false;
  }
}

const isUrlWhiteListed = (reqUrl = '') => {
  for (let url of whiteListedEndPoints) {
    if (reqUrl.includes(url)) return true;
  }
  return false;
};
