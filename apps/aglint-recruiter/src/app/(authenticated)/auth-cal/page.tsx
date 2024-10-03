'use client';

import { useToast } from '@components/hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';

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
  const { code } = router.queryParams;
  const { mutateAsync } = api.user.update_current_user.useMutation();
  const { mutateAsync: getAuthEmail } = api.user.get_oauth_user.useMutation();

  useEffect(() => {
    if (recruiter_user) {
      if (!code) return;

      (async () => {
        try {
          const tokens = await getTokens(code as string);
          const email = await getAuthEmail({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
          });
          await mutateAsync({
            is_calendar_connected: true,
            schedule_auth: {
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expiry_date: tokens.expiry_date,
              email: email,
            },
          });
        } catch (error) {
          if (error instanceof Error) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Something went wrong. Please try again.',
            });
          }
        } finally {
          // const path = localStorage.getItem('gmail-redirect-path');
          // if (path) {
          //   router.replace(path);
          // } else {
          //   router.replace('/jobs');
          // }
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

AuthHoc.publicProvider = (page: ReactNode) => {
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
