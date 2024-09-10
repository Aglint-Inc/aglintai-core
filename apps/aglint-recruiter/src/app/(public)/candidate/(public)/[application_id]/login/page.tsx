'use client';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  getCandidateEmailByApplicationId,
  hideEmail,
  sendMagicLink,
} from '@/candidate/authenticated/uilts';
import { UIButton } from '@/components/Common/UIButton';
import { supabase } from '@/utils/supabase/client';

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
      <Send email={email} isSending={isSending} handleSendLink={sendLink} />
    );

  if (status === 'sent') return <Sent email={email} setStatus={setStatus} />;
};

export default Page;

const Send = ({ email, isSending, handleSendLink }) => {
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          Welcome
        </CardTitle>
      </CardHeader>
      <CardContent className='text-center'>
        <p className='mb-2'>
          Welcome to the Candidate Portal. Here you can access your application
          status, upcoming interviews, and more.
        </p>
        {email ? (
          <>
            <p className='font-medium mb-4'>
              Your email:{' '}
              <span className='text-primary'>{hideEmail(email)}</span>
            </p>
            <p className='text-sm text-muted-foreground'>
              Click the button below to receive a login link.
            </p>
          </>
        ) : (
          <p className='font-medium mb-4'>Invalide Candidate</p>
        )}
      </CardContent>
      {email && (
        <CardFooter>
          <UIButton
            className='w-full'
            onClick={handleSendLink}
            isLoading={isSending}
            disabled={isSending}
          >
            Send Login Link
          </UIButton>
        </CardFooter>
      )}
    </Card>
  );
};

const Sent = ({ email, setStatus }) => {
  return (
    <Card className='w-full max-w-md mx-auto text-center'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Login Link Sent!</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <CheckCircle className='w-16 h-16 text-green-500 mb-4' />
        <p className='mb-2'>We&apos;ve successfully sent a login link to:</p>
        <p className='font-medium text-primary mb-4'>{email}</p>
        <p className='text-sm text-muted-foreground'>
          Please check your email and click on the link to access your Candidate
          Portal.
        </p>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button variant='outline' onClick={() => setStatus('send')}>
          Back to Welcome
        </Button>
      </CardFooter>
    </Card>
  );
};
