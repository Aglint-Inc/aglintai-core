/* eslint-disable no-console */
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { LoaderSvg } from '@/devlink/LoaderSvg';

const Outlook = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady && router.query.code) {
      console.log(router.query);
      fetchAuthTOkens(router.query.code);
    }
  }, [router.query]);

  const handleSubmit = async () => {
    try {
      const { data: authLink } = await axios.post(
        '/api/scheduling/auth/outlook',
      );
      router.push(authLink);
    } catch (error) {
      console.log(error);
      //
    }
  };

  const fetchAuthTOkens = async (code) => {
    try {
      const { data: tokenInfo } = await axios.post(
        '/api/scheduling/auth/outlook-req-tokens',
        {
          code,
        },
      );

      console.log(tokenInfo);
    } catch (error) {
      console.log(error);
    } finally {
      router.query = {};
      router.push(router);
    }
  };

  return (
    <>
      <ButtonSolid
        size={2}
        textButton={'connect microsoft'}
        onClickButton={{ onClick: handleSubmit }}
      />
      <Stack
        direction={'row'}
        width={'100vw'}
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <LoaderSvg />
      </Stack>
    </>
  );
};

export default Outlook;
