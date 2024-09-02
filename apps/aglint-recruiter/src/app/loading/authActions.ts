// import axios from 'axios';

import { type Session } from '@/src/context/AuthContext/types';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

export async function handleAuthFlow(router, toast) {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error('Unable to login. Please try again later.');
    }

    if (!data?.session) {
      throw new Error('Session not found');
    }

    const userDetails = data.session;
    const redirectUrl = await handleAuthRoute(userDetails);
    return redirectUrl; // Return the URL instead of redirecting
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message || "An unexpected error occurred",
    });
    await handleLogout(router);
    return ROUTES['/login'](); // Return login route on error
  }
}

// async function handleUser(userDetails: Session, router, toast) {
//   if (!userDetails?.user?.id) {
//     throw new Error('Unable to login. Please try again.');
//   }

//   const hasRelation = await checkRelation(userDetails.user.id);

//   if (!hasRelation) {
//     await deleteUser(userDetails.user.id);
//     throw new Error('Please reach out to your admin or the Aglint support team.');
//   }

//   await handleAuthRoute(userDetails, router, toast);
// }

// async function checkRelation(userId: string): Promise<boolean> {
//   const { data, error } = await supabase
//     .from('recruiter_relation')
//     .select('*')
//     .eq('user_id', userId);

//   if (error) throw new Error(error.message);
//   return data.length > 0;
// }

// async function deleteUser(userId: string) {
//   await axios.post('/api/supabase/deleteuser', { user_id: userId });
// }

async function handleAuthRoute(userDetails: Session) {
  const relationData = await getRelationsDetails(userDetails.user.id);

  if (!relationData?.recruiter_user) {
    throw new Error('User relation not found');
  }

  if (relationData.recruiter_user.status === 'suspended') {
    throw new Error('Your account has been suspended. Please reach out to your admin or the Aglint support team.');
  }

  await updateUserIfNeeded(userDetails, relationData);

  const redirectUrl = getRedirectUrl(relationData.roles.name);
  return redirectUrl; // Return the URL instead of redirecting
}

async function updateUserIfNeeded(userDetails: Session, relationData) {
  if (userDetails?.user.user_metadata?.is_invite === 'true') {
    await supabase.auth.updateUser({ data: { is_invite: 'false' } });
  }

  if (userDetails.user.email !== relationData.recruiter_user.email) {
    await supabase
      .from('recruiter_user')
      .update({ email: userDetails.user.email })
      .eq('user_id', userDetails?.user?.id);
  }
}

function getRedirectUrl(roleName: string): string {
  const storedUrl = localStorage.getItem('redirectURL');
  if (storedUrl) {
    localStorage.removeItem('redirectURL');
    return storedUrl;
  }

  switch (roleName) {
    case 'interviewer':
      return `${ROUTES['/scheduling']()}?tab=myschedules`;
    case 'recruiter':
      return ROUTES['/jobs']();
    case 'recruiting_coordinator':
    default:
      return ROUTES['/requests']();
  }
}

export async function handleLogout(router) {
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (!error) {
    router.push(ROUTES['/login']());
  }
}

async function getRelationsDetails(userId: string) {
  const { data, error } = await supabase
    .from('recruiter_relation')
    .select('*,recruiter_user!public_recruiter_relation_user_id_fkey(*),recruiter(industry),roles(*)')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();

  if (error) throw new Error(error.message);
  return data;
}