// import { Login } from '@/components/CandiatePortal/Login';
'use client';

import {
  getCandidateEmailByApplicationId,
  hideEmail,
  sendMagicLink,
} from '@/candidate/authenticated/uilts';
import { UIButton } from '@/components/Common/UIButton';
import { supabase } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const { application_id }: { application_id: string } = useParams();
  const [email, setEmail] = useState(null);
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
      application_id,
      email,
    });
    if (!error) {
      setStatus('sent');
    }
    setIsSending(false);
  };

  if (isLoading) return <>Loading...</>;

  if (status === 'send')
    return (
      <div>
        <h3> Welcome to our company</h3>
        {email ? (
          <>
            <p>{hideEmail(email) || 'sample'}</p>
            <UIButton onClick={sendLink} size='sm'>
              {isSending ? 'Sending...' : 'Send login link'}
            </UIButton>
          </>
        ) : (
          <>Invalid Candidate</>
        )}
      </div>
    );

  if (status === 'sent')
    return (
      <div>
        <h3>check your mail box</h3>
      </div>
    );
};

export default Page;
