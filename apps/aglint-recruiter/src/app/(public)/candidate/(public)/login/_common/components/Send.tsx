import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

import { UIButton } from '@/components/Common/UIButton';

import { hideEmail } from '../utils';

export const Send = ({
  email,
  isSending,
  handleSendLink,
}: {
  email: string;
  isSending: boolean;
  handleSendLink: () => void;
}) => {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>
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
            <p className='mb-4 font-medium'>
              Your email:{' '}
              <span className='text-primary'>{hideEmail(email)}</span>
            </p>
            <p className='text-sm text-muted-foreground'>
              Click the button below to receive a login link.
            </p>
          </>
        ) : (
          <p className='mb-4 font-medium'>Invalid Candidate</p>
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
