'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  sendMagicLink,
  useGetCandidateEmailByApplicationId,
} from 'src/app/(public)/candidate/(authenticated)/_common/uilts';

import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

import { Send } from './Send';
import { Sent } from './Sent';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { queryParams } = useRouterPro();
  const application_id = queryParams.application_id as string;

  const fetcher = useGetCandidateEmailByApplicationId();

  const [status, setStatus] = useState<'send' | 'sent'>('send');

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          router.push(`/candidate/home?application_id=${application_id}`);
        } else {
          const { email } = await fetcher({ application_id });
          setEmail(email);
        }
      } catch {
        //
      } finally {
        setIsLoading(false);
      }
    };

    getSession();
  }, []);

  const sendLink = async () => {
    setIsSending(true);
    const { error } = await sendMagicLink({
      application_id: application_id,
      email,
    });
    if (!error) {
      setStatus('sent');
    }
    setIsSending(false);
  };

  if (isLoading) return <Loader />;

  if (status === 'send')
    return email ? (
      <Send email={email} isSending={isSending} handleSendLink={sendLink} />
    ) : (
      <>Invalidate Candidate</>
    );

  if (status === 'sent') return <Sent email={email} setStatus={setStatus} />;
};

export default LoginPage;
