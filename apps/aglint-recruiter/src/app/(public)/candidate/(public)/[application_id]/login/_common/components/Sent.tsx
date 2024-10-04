import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { CheckCircle } from 'lucide-react';

export const Sent = ({
  email,
  setStatus,
}: {
  email: string;
  setStatus: React.Dispatch<React.SetStateAction<'send' | 'sent'>>;
}) => {
  return (
    <Card className='mx-auto w-full max-w-md text-center'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Login Link Sent!</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <CheckCircle className='mb-4 h-16 w-16 text-green-500' />
        <p className='mb-2'>We&apos;ve successfully sent a login link to:</p>
        <p className='mb-4 font-medium text-primary'>{email}</p>
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
