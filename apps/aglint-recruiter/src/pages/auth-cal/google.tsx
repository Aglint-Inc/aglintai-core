import { supabaseWrap } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import {
  AuthProvider,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const AuthHoc = () => {
  return (
    <>
      <AuthProvider>
        <Google />
      </AuthProvider>
    </>
  );
};

const Google = () => {
  const router = useRouter();

  const { recruiterUser, setRecruiterUser } = useAuthDetails();

  useEffect(() => {
    if (router.isReady && recruiterUser) {
      const { code } = router.query;
      if (!code) return;

      (async () => {
        try {
          const tokens = await getTokens(code as string);
          const email = await axios.post('/api/email-outreach/get-user-email', {
            ...tokens,
          });

          supabaseWrap(
            await supabase
              .from('recruiter_user')
              .update({
                schedule_auth: {
                  access_token: tokens.access_token,
                  refresh_token: tokens.refresh_token,
                  expiry_date: tokens.expiry_date,
                  email: email.data,
                },
              })
              .eq('user_id', recruiterUser.user_id),
          );
          setRecruiterUser((prev) => ({
            ...prev,
            schedule_auth: {
              email: email.data,
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expiry_date: tokens.expiry_date,
            },
          }));
        } catch (err) {
          toast.error('Something went wrong. Please try again.');
        } finally {
          const path = localStorage.getItem('gmail-redirect-path');
          if (path) {
            router.replace(path);
          } else {
            router.replace('/jobs');
          }
        }
      })();
    }
  }, [router.isReady]);

  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        width={'100vw'}
        justifyContent={'center'}
        height={'100vh'}
      >
        <LoaderSvg />
      </Stack>
    </>
  );
};

AuthHoc.publicProvider = (page) => {
  return <>{page}</>;
};

export default AuthHoc;

const getTokens = async (code: string) => {
  const { data } = await axios.post('/api/scheduling/get-accesstoken', {
    code,
  });

  return data as {
    access_token: string;
    refresh_token: string;
    expiry_date: number;
  };
};

// const getUserEmail = async ({ access_token, refresh_token }) => {
//   const { data } = await axios.post('/api/email-outreach/get-user-email', {
//     access_token,
//     refresh_token,
//   });
//   return data;
// };
