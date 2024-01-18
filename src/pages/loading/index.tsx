import { Box } from '@mui/material';
import { pageRoutes } from '@utils/pageRouting';
import { supabase } from '@utils/supabaseClient';
import axios from 'axios';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import React, { useEffect } from 'react';

import { LoaderSvg } from '@/devlink';
import Seo from '@/src/components/Common/Seo';
import {
  handleEmail,
  stepObj,
} from '@/src/components/SignUpComp/SlideSignup/utils';
import {
  AuthProvider,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

export default function Loading() {
  const { userDetails } = useAuthDetails();
  const router = useRouter();

  useEffect(() => {
    handleUser();
  }, [userDetails]);

  const handleUser = async () => {
    try {
      if (userDetails?.user?.id) {
        if (handleEmail(userDetails.user.email).error) {
          await axios.post('/api/supabase/deleteuser', {
            user_id: userDetails?.user?.id,
          });
          toast.error('Please signup/login with company email');
          router.push(pageRoutes.SIGNUP);
          return;
        }
        await createUser();
      } else {
        toast.error('Unable to login. Please try again later');
        router.push(pageRoutes.LOGIN);
      }
    } catch (error) {
      toast.error('Unable to login. Please try again later');
      router.push(pageRoutes.LOGIN);
    }
  };

  const createUser = () => {
    const storedValue = localStorage.getItem('flow') || 'Company';

    supabase.auth.updateUser({
      data: {
        role: 'recruiter',
        first_name: !userDetails.user.user_metadata.first_name
          ? splitFullName(userDetails.user.user_metadata.full_name).firstName
          : userDetails.user.user_metadata.first_name,
        last_name: !userDetails.user.user_metadata.first_name
          ? splitFullName(userDetails.user.user_metadata.full_name).lastName
          : userDetails.user.user_metadata.last_name,
        image_url: !userDetails.user.user_metadata.image_url
          ? ''
          : userDetails.user.user_metadata.image_url,
        phone: !userDetails.user.user_metadata.phone
          ? ''
          : userDetails.user.user_metadata.phone,
        language: !userDetails.user.user_metadata.language
          ? ''
          : userDetails.user.user_metadata.language,
        timezone: !userDetails.user.user_metadata.timezone
          ? ''
          : userDetails.user.user_metadata.timezone,
      },
    });
    supabase
      .from('recruiter_user')
      .select('*')
      .eq('user_id', userDetails?.user?.id)
      .then(({ data, error }) => {
        if (!error) {
          //post hog logging
          posthog.identify(userDetails.user.email , { Email: userDetails.user.email  });
          if (data.length == 0) {
            (async () => {
              await refershAccessToken();

              const { error: erroruser } = await supabase
                .from('recruiter_user')
                .insert({
                  user_id: userDetails.user.id,
                  email: userDetails.user.user_metadata.email,
                  first_name: splitFullName(
                    userDetails.user.user_metadata.full_name,
                  ).firstName,
                  last_name: splitFullName(
                    userDetails.user.user_metadata.full_name,
                  ).lastName,
                  role: 'admin',
                })
                .select();

              if (!erroruser) {
                const { data: dataRecruiter, error: errorRecruiter } =
                  await supabase
                    .from('recruiter')
                    .insert({
                      email: userDetails.user.email,
                      name:
                        userDetails?.user.user_metadata?.custom_claims?.hd?.replace(
                          '.com',
                          '',
                        ) || '',
                      recruiter_type: storedValue,
                    })
                    .select();
                if (!errorRecruiter) {
                  await supabase
                    .from('recruiter_user')
                    .update({ recruiter_id: dataRecruiter[0].id })
                    .eq('user_id', userDetails.user.id);
                  await supabase.from('recruiter_relation').insert({
                    user_id: userDetails.user.id,
                    recruiter_id: dataRecruiter[0].id,
                    is_active: true,
                  });
                  router.push(
                    `${pageRoutes.SIGNUP}?step=${stepObj.detailsOne}`,
                  );
                }
              }
            })();
          } else {
            router.push(pageRoutes.JOBS);
          }
        } else {
          router.push(pageRoutes.LOGIN);
        }
      });
  };

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
      <Seo
        title='Aglint | Loading'
        description='AI Powered Talent Development Platform.'
      />
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
