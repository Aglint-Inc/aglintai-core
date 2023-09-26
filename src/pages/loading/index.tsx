import { Box } from '@mui/material';
import { pageRoutes } from '@utils/pageRouting';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { LoaderSvg } from '@/devlink';
import { stepObj } from '@/src/components/SignUpComp/SlideSignup/utils';
import {
  AuthProvider,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';

export default function Loading() {
  const { userDetails } = useAuthDetails();
  const router = useRouter();

  useEffect(() => {
    try {
      if (userDetails?.user?.id) {
        const storedValue = localStorage.getItem('flow') || 'Company';
        supabase.auth.updateUser({
          data: {
            name: '',
            role: 'Recruiter',
            role_type: storedValue,
            sub_role: 'Admin',
          },
        });
        supabase
          .from('recruiter')
          .select('*')
          .eq('user_id', userDetails?.user?.id)
          .then(({ data, error }) => {
            if (!error) {
              if (data.length == 0) {
                (async () => {
                  await refershAccessToken();
                  await supabase
                    .from('recruiter')
                    .insert({
                      email: userDetails.user.email,
                      user_id: userDetails.user.id,
                      name: userDetails.user.user_metadata.custom_claims.hd.replace(
                        '.com',
                        '',
                      ),
                      recruiter_type: storedValue,
                    })
                    .select();
                })();
                router.push(`${pageRoutes.SIGNUP}?step=${stepObj.detailsOne}`);
              } else {
                router.push(pageRoutes.JOBS);
              }
            } else {
              router.push(pageRoutes.LOGIN);
            }
          });
      } else {
        router.push(pageRoutes.LOGIN);
      }
    } catch (error) {
      router.push(pageRoutes.LOGIN);
    }
  }, [userDetails]);

  const refershAccessToken = async () => {
    await supabase.auth.refreshSession({
      refresh_token: userDetails?.refresh_token,
    });
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
      <LoaderSvg />
    </Box>
  );
}

Loading.getProvider = function getProvider(page) {
  return <AuthProvider>{page}</AuthProvider>;
};

Loading.getLayout = (page) => {
  return <>{page}</>;
};
