import { NextResponse } from 'next/server';
import { getRecruiterUser, handleRedirect } from 'src/app/_common/utils/auth';

import { createClient } from '@/utils/supabase/server';
import { verifyToken } from '@/utils/supabase/verifyToken';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  const supabase = await createClient();
  const json = await verifyToken(supabase);
  const user_id = json?.user.id;

  if (user_id) {
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
        session: json,
        supabase,
        origin,
      });
      return NextResponse.redirect(url);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login`);
}
