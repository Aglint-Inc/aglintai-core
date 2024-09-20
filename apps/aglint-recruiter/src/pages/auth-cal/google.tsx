import { supabaseWrap } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import {
  AuthProvider,
  useAuthDetails,
} from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

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
  const router = useRouterPro();
  const { toast } = useToast();
  const { recruiterUser, setRecruiterUser } = useAuthDetails();

  useEffect(() => {
    if (recruiterUser) {
      const { code } = router.params;
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
        } catch (error) {
          if (error instanceof Error) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Something went wrong. Please try again.',
            });
          }
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
      <div className='flex h-screen w-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
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
