import { SupabaseType } from '@aglint/shared-types';
import { Session } from '@supabase/supabase-js';
import axios from 'axios';

import ROUTES from './routing/routes';

export async function handleRedirect({
  origin,
  relations,
  supabase,
  session,
}: {
  origin: string;
  relations: Awaited<ReturnType<typeof getRecruiterUser>>;
  supabase: SupabaseType;
  session: Session;
}) {
  if (!relations || relations.length === 0) {
    axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/supabase/deleteuser`, {
      user_id: session.user.id,
    });
    return `${origin}${ROUTES['/login']()}?error=unauthorized`;
  }

  if (relations[0].recruiter_user.status === 'suspended') {
    return `${origin}${ROUTES['/login']()}?error=suspended`;
  } else if (session.user.user_metadata?.is_invite === 'true') {
    await supabase.auth.updateUser({
      data: { is_invite: 'false' },
    });
  }
  const role = relations[0].roles.name;
  if (role === 'interviewer') {
    return `${origin}${ROUTES['/scheduling']()}?tab=myschedules`;
  } else if (role === 'recruiter') {
    return `${origin}${ROUTES['/jobs']()}`;
  } else if (role === 'recruiting_coordinator') {
    return `${origin}${ROUTES['/requests']()}`;
  } else {
    return `${origin}${ROUTES['/jobs']()}`;
  }
}

export async function getRecruiterUser(
  user_id: string,
  supabase: SupabaseType,
) {
  return (
    await supabase
      .from('recruiter_relation')
      .select(
        '*,recruiter_user!public_recruiter_relation_user_id_fkey(*),recruiter(industry),roles(*)',
      )
      .eq('user_id', user_id)
      .eq('is_active', true)
      .throwOnError()
  ).data;
}
