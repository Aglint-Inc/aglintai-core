import { Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import Seo from '@/src/components/Common/Seo';
import { stepObj } from '@/src/components/SignUpComp/SlideSignup/utils';
import { Session } from '@/src/context/AuthContext/types';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    getSupabaseSession();
  }, []);

  async function getSupabaseSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      toast.error('Unable to login. Please try again later.');
      handleLogout();
    }
    if (data?.session) {
      handleUser({
        userDetails: data?.session,
      });
    } else {
      toast.error('Session not found');
      handleLogout();
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut({
      scope: 'local',
    });
    if (!error) {
      router.push(ROUTES['/login']());
    }
  };

  const handleUser = async ({ userDetails }: { userDetails: Session }) => {
    try {
      if (userDetails?.user?.id) {
        if (
          await checkRelation({
            user_id: userDetails?.user?.id,
          })
        ) {
          await handleAuthRoute({
            userDetails: userDetails,
          });
        } else {
          await axios.post('/api/supabase/deleteuser', {
            user_id: userDetails.user.id,
          });
          toast.error(
            'Please reach out to your admin or the Aglint support team.',
          );
          await handleLogout();
          return;
        }
      } else {
        toast.error('Unable to login. Please try again.');
        router.push(ROUTES['/login']());
        await handleLogout();
      }
    } catch (error) {
      toast.error('Unable to login. Please try again.');
      router.push(ROUTES['/login']());
      await handleLogout();
    }
  };

  const checkRelation = async ({ user_id }: { user_id: string }) => {
    const { data, error } = await supabase
      .from('recruiter_relation')
      .select('*')
      .eq('user_id', user_id);
    if (error) {
      throw new Error(error.message);
    } else {
      if (data.length == 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  const handleAuthRoute = async ({ userDetails }: { userDetails: Session }) => {
    try {
      const relationData = await getRelationsDetails({
        user_id: userDetails.user.id,
      });

      if (relationData?.recruiter_user) {
        if (userDetails?.user.user_metadata?.is_invite === 'true') {
          await supabase.auth.updateUser({
            data: { is_invite: 'false' }, // for invite user flow this is needed
          });
        }
        try {
          const recruiterRel = relationData;
          if (userDetails.user.email !== recruiterRel.recruiter_user.email) {
            await supabase
              .from('recruiter_user')
              .update({
                email: userDetails.user.email,
              })
              .eq('user_id', userDetails?.user?.id);
          }

          if (recruiterRel.roles.name === 'interviewer') {
            router.push(
              localStorage.getItem('redirectURL') ||
                `${ROUTES['/scheduling']()}?tab=myschedules`,
            );
            localStorage.removeItem('redirectURL');
          } else if (recruiterRel.roles.name === 'recruiter') {
            router.push(
              localStorage.getItem('redirectURL') || ROUTES['/jobs'](),
            );
            localStorage.removeItem('redirectURL');
          } else if (recruiterRel.roles.name === 'recruiting_coordinator') {
            router.push(
              localStorage.getItem('redirectURL') || ROUTES['/scheduling'](),
            );
            localStorage.removeItem('redirectURL');
          } else {
            router.push(
              localStorage.getItem('redirectURL') || ROUTES['/jobs'](),
            );
            localStorage.removeItem('redirectURL');
          }
        } catch {
          router.push(`${ROUTES['/signup']()}?step=${stepObj.detailsOne}`);
        }
      }
    } catch {
      router.push(ROUTES['/login']());
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Seo title='Loading' description='AI for People Products' />
      <LoaderSvg />
    </Box>
  );
}

Loading.publicProvider = (page) => {
  return <>{page}</>;
};

export const splitFullName = (name: string) => {
  const nameParts = name.trim().split(' ');

  if (nameParts.length === 1) {
    // If there is only one word, consider it as the first name and no last name
    return {
      firstName: nameParts[0],
      lastName: '',
    };
  } else {
    // If there are multiple words, the last word is the last name, and the rest are the first name
    const lastName = nameParts.pop();
    const firstName = nameParts.join(' ');
    return {
      firstName,
      lastName,
    };
  }
};

const getRelationsDetails = ({ user_id }: { user_id: string }) => {
  return supabase
    .from('recruiter_relation')
    .select(
      '*,recruiter_user!public_recruiter_relation_user_id_fkey(*),recruiter(industry),roles(*)',
    )
    .eq('user_id', user_id)
    .eq('is_active', true)
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
