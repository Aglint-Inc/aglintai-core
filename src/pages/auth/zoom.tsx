import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { LoaderSvg } from '@/devlink';
import {
  AuthProvider,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';

const PageHoc = () => {
  return (
    <>
      <AuthProvider>
        <Page />
      </AuthProvider>
    </>
  );
};

const Page = () => {
  const router = useRouter();
  const { recruiter_id } = useAuthDetails();
  useEffect(() => {
    if (router.isReady && router.query.code && recruiter_id) {
      (async () => {
        try {
          await axios.post('/api/scheduling/integrations/zoom/save-zoom-auth', {
            code: router.query.code,
            recruiter_id,
          });
          router.query = {
            'zoom-auth': 'sucess',
          };
          router.push(router);
        } catch (error) {
          router.query = {
            'zoom-auth': 'failed',
          };
          router.push(router);
        }
      })();
    }
  }, [router.isReady]);

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
      width={'100vw'}
    >
      <LoaderSvg />
    </Stack>
  );
};

PageHoc.publicProvider = (page) => {
  return <>{page}</>;
};

export default PageHoc;
