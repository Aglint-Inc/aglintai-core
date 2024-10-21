import { NextResponse } from 'next/server';
import { getRecruiterUser, handleRedirect } from 'src/app/_common/utils/auth';

import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  const supabase = createClient();
  const { error, data } = await supabase.auth.getSession();
  const user_id = data?.session?.user.id;

  if (error) {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (user_id && data?.session) {
    const relations = await getRecruiterUser(user_id, supabase);

    if (relations && relations[0].recruiter_user?.status === 'invited') {
      await supabase
        .from('recruiter_user')
        .update({ status: 'active' })
        .eq('user_id', user_id);
    }

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
