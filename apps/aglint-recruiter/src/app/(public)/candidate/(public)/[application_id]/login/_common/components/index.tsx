'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  getCandidateEmailByApplicationId,
  sendMagicLink,
} from '@/candidate/authenticated/uilts';
import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

import { Send } from './Send';
import { Sent } from './Sent';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const { params } = useRouterPro();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'send' | 'sent'>('send');

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          router.push(
            `{${process.env.NEXT_PUBLIC_HOST_NAME}/candidate/${application_id}/home`,
          );
        } else {
          const can = await getCandidateEmailByApplicationId(application_id);
          setEmail(can.email);
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
      application_id: params.application_id,
      email,
    });
    if (!error) {
      setStatus('sent');
    }
    setIsSending(false);
  };

  if (isLoading) return <Loader />;

  if (status === 'send')
    return (
      <Send email={email} isSending={isSending} handleSendLink={sendLink} />
    );

  if (status === 'sent') return <Sent email={email} setStatus={setStatus} />;
};

export default LoginPage;
