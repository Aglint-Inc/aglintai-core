import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { LoaderSvg } from '@/devlink';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  AuthProvider,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';
// import { pageRoutes } from '@/src/utils/pageRouting';
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
          supabaseWrap(
            await supabase
              .from('recruiter_user')
              .update({
                schedule_auth: {
                  access_token: tokens.access_token,
                  refresh_token: tokens.refresh_token,
                  expiry_date: tokens.expiry_date,
                },
              })
              .eq('user_id', recruiterUser.user_id),
          );
          setRecruiterUser((prev) => ({
            ...prev,
            schedule_auth: {
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expiry_date: tokens.expiry_date,
            },
          }));
          toast.success('Calender authentication sucessfull');
        } catch (err) {
          toast.error(API_FAIL_MSG);
        } finally {
          router.replace('/jobs');
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

AuthHoc.getLayout = (page) => {
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
