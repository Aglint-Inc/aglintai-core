import { Button } from '@components/ui/button';
import { FileQuestion} from 'lucide-react';
import Link from 'next/link';

export const JobNotFound = () => {
  return (
    <div className='flex min-h-[90vh] items-start justify-center w-full'>
      <div className='w-full mx-auto max-w-xl rounded-lg p-8 text-center'>
        <div className='flex justify-center'>
          <FileQuestion stroke='1' className='h-24 w-24' />
        </div>
        <h1 className='text-4xl font-medium text-gray-800 mb-2 ' >404</h1>
        <h2 className='text-xl font-medium text-gray-600 mt-0 mb-2'>Job Not Found</h2>
        <p className='text-gray-500'>
          Oops! The Job you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link href='/' passHref>
          <Button className='inline-flex items-center mt-4'>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
