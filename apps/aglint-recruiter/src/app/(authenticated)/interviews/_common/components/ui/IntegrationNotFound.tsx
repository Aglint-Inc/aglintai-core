import { EmptyState } from '@components/empty-state';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { AlertTriangle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';

export function IntegrationNotFound({
  loading,
  recruiter_id,
}: {
  loading: boolean;
  recruiter_id: any;
}) {
  const router = useRouter();
  return (
    <div className='container-lg mx-auto w-full px-4'>
      <div className='mx-auto flex w-full max-w-md flex-col items-center border-none px-6 pb-8 pt-6 text-center shadow-none'>
        <EmptyState
          icon={Calendar}
          header='No interviews found'
          description='There are no upcoming interviews.'
        />
      </div>
      <div className='flex h-full flex-col'>
        <div className='mx-auto flex h-full max-w-2xl flex-col gap-2.5'>
          {loading ? (
            <div className='flex h-20 w-full items-center justify-center'>
              <Loader className='h-8 w-8 animate-spin' />
            </div>
          ) : (
            <Alert variant='warning'>
              <AlertTriangle className='h-4 w-4 text-yellow-500' />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                <div className='flex flex-row items-center'>
                  <p>
                    Your calendar is not connected. Please connect calendar from
                    your
                    <Link href={`/user/${recruiter_id}`} className='ml-1'>
                      profile.
                    </Link>
                  </p>
                  <UIButton
                    variant='outline'
                    className='ml-2'
                    onClick={() => {
                      router.push(`/user/${recruiter_id}`);
                    }}
                  >
                    View Profile
                  </UIButton>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
