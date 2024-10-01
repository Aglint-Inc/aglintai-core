'use client';

import { useToast } from '@components/hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

const AuthHoc = () => {
  return (
    <>
      <Google />
    </>
  );
};

const Google = () => {
  const router = useRouterPro();
  const { toast } = useToast();
  const { recruiter_user } = useTenant();
  const { mutateAsync } = api.user.update_current_user.useMutation();
  useEffect(() => {
    if (recruiter_user) {
      const { code } = router.params;
      if (!code) return;

      (async () => {
        try {
          const { access_token, refresh_token, expiry_date } = await getTokens(
            code as string,
          );
          if (!access_token || !refresh_token)
            throw new Error('no tokens found');
          const email = await getUserEmail({ access_token, refresh_token });
          const authEmailDetails = {
            access_token,
            refresh_token,
            email,
            provider: 'google',
            exp: '',
            expiry_date,
          };

          await mutateAsync({
            schedule_auth: authEmailDetails,
            user_id: recruiter_user.user_id,
          });

          const path = localStorage.getItem('gmail-redirect-path');
          if (path) {
            return router.replace(path);
          } else {
            return router.replace('/jobs');
          }
        } catch (err) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong. Please try again.',
          });
        }
      })();
    }
  }, [recruiter_user]);

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
