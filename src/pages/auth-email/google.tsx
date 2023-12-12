import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { LoaderSvg } from '@/devlink';
import { API_FAIL_MSG } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  AuthProvider,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';
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

  const { recruiter } = useAuthDetails();
  useEffect(() => {
    if (router.isReady) {
      const { code } = router.query;
      if (!code) return;

      (async () => {
        try {
          const { access_token, refresh_token, expiry_date } = await getTokens(
            code as string,
          );
          if (!access_token || !refresh_token)
            throw new Error('no tokens found');
          const email = await getUserEmail({ access_token, refresh_token });
          localStorage.setItem(
            `email-outreach${recruiter.id}`,
            JSON.stringify({
              access_token,
              refresh_token,
              email,
              provider: 'google',
              exp: '',
              expiry_date,
            }),
          );
          return router.replace('/candidates');
        } catch (err) {
          toast.error(API_FAIL_MSG);
          router.replace('/candidates');
        }
      })();
    }
  }, [router.isReady, recruiter]);
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
  const { data } = await axios.post('/api/email-outreach/get-accesstoken', {
    code,
  });
  return data as {
    access_token: string;
    refresh_token: string;
    expiry_date: number;
  };
};

const getUserEmail = async ({ access_token, refresh_token }) => {
  const { data } = await axios.post('/api/email-outreach/get-user-email', {
    access_token,
    refresh_token,
  });
  return data;
};
