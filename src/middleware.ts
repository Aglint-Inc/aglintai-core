import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

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
  // matcher: ['/', '/:path*'],
};

const allowedPaths = new Set([
  '/login',
  '/signup',
  '/api/sendgrid',
  '/api/lever/saveResume',
  '/api/interview_feedback',
  '/api/greenhouse/saveResume',
  '/api/greenhouse/candidatesync',
  '/api/greenhouse/batchsave',
  '/api/greenhouse/getCandidates',
  '/api/lever/candidateSync',
  '/api/webhook',
  '/api/ai/resume-embedding',
  '/api/interview', // need this publicly access for interview feedback.
  '/api/assistant/listAssistant',
  '/api/assistant/listMessages',
  '/api/assistant/createMessage',
  '/api/assistant/createThread',
  '/api/assistant/createRun',
  '/api/assistant/createAssistant',
  '/api/google/overview',
  '/api/google/resume',
  '/api/google/jdparser',
  '/api/google/overview-handler',
  '/api/getLinkedin',
  '/api/resumecron/batchscore',
  '/api/resumeScoring',
  '/api/ashby/createapplication',
  '/api/ashby/batchsave',
  '/api/ashby/syncapplications',
  '/api/ashby/getCandidates',
  '/api/ashby/cron',
  '/api/trigger',
  '/api/jobpost/read',
  '/api/jobpost/write',
  '/api/jobpost/company',
  '/api/phone-screening/submit',
  '/api/phone-screening/get-application-info',
  '/api/candidatedb/cron',
  '/api/candidatedb/save-cron',
  '/api/candidatedb/cron-email-sender',
  '/api/email-outreach/send-email',
  '/api/assessment/access_applications',
  '/api/assessment/access_public_jobs',
  '/api/assessment/access_recruiter',
  '/api/assessment/insert_assessment_results',
  '/api/assessment/update_applications',
  '/api/jobApplications/candidateEmail',
  '/api/jobApplications/candidateUpload/csvUpload',
  '/api/jobApplications/candidateUpload/manualUpload',
  '/api/jobApplications/candidateUpload/resumeUpload',
  '/api/jobApplications/read',
  '/api/job-assistant/createThread',
  '/api/job-assistant/cluoud-functions/assistant',
  '/api/jobpost/indexing',
  '/api/sitemap.xml',
  // remove below 2 after testing done
  '/api/scheduling/google-consent',
  '/api/scheduling/list-events',
]);

const isAllowedPaths = (reqUrl = '') => {
  return allowedPaths.has(reqUrl);
};
