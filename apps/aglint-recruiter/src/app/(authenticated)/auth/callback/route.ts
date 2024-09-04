import { NextResponse } from 'next/server';

import { getRecruiterUser, handleRedirect } from '@/src/utils/auth';
import { createClient } from '@/src/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    const user_id = data?.user.id;

    if (error) {
      return NextResponse.redirect(`${origin}/login`);
    }

    const relations = await getRecruiterUser(user_id, supabase);

    if (relations) {
      const url = await handleRedirect({
        relations,
        session: data.session,
        supabase,
        origin,
      });

      return NextResponse.redirect(url);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login`);
}
