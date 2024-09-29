import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { AlertTriangle, Calendar } from 'lucide-react';
import Link from 'next/link';

import { Loader } from '@/components/Common/Loader';

export function IntegrationNotFound({
  loading,
  recruiter_id,
}: {
  loading: boolean;
  recruiter_id: any;
}) {
  return (
    <div className='container-lg mx-auto w-full px-12'>
      <div className='mx-auto flex w-full max-w-md flex-col items-center border-none px-6 pb-8 pt-6 text-center shadow-none'>
        <div className='mb-4 flex items-center justify-center'>
          <Calendar
            className='h-16 w-16 text-primary'
            strokeWidth={0.5}
            size={48}
          />
        </div>
        <h3 className='mb-2 text-lg font-semibold'>No interviews found</h3>
        <p className='mb-6 text-muted-foreground'>
          There are no upcoming interviews.
        </p>
      </div>
      <div className='flex h-full flex-col'>
        <div className='max-w-900px flex h-full flex-col gap-2.5 overflow-auto'>
          {loading ? (
            <div className='flex h-20 w-full items-center justify-center'>
              <Loader className='h-8 w-8 animate-spin' />
            </div>
          ) : (
            <Alert variant='warning'>
              <AlertTriangle className='h-4 w-4' />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Your calendar is not connected to the scheduling app. Please
                <Link href={`/user/${recruiter_id}`}>
                  connect it in your profile settings.
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
