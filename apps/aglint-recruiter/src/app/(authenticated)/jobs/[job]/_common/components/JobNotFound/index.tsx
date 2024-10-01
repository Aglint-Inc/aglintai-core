import { Button } from '@components/ui/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export const JobNotFound = () => {
  return (
    <div className='flex min-h-[90vh] w-full items-start justify-center'>
      <div className='mx-auto w-full max-w-xl rounded-lg p-8 text-center'>
        <div className='flex justify-center'>
          <FileQuestion stroke='1' className='h-24 w-24' />
        </div>
        <h1 className='mb-2 text-4xl font-medium text-gray-800'>404</h1>
        <h2 className='mb-2 mt-0 text-xl font-medium text-gray-600'>
          Job Not Found
        </h2>
        <p className='text-muted-foreground'>
          Oops! The Job you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link href='/' passHref>
          <Button className='mt-4 inline-flex items-center'>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
