import { Button } from '@components/ui/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

interface NotFoundProps {
  title?: string;
  description?: string;
}

export function NotFound({
  title = 'Page Not Found',
  description = "Oops! The page you're looking for doesn't exist or has been moved.",
}: NotFoundProps) {
  return (
    <div className='container-lg mx-auto mt-20 flex w-full flex-col items-center justify-center px-4'>
      <div className='flex items-center justify-center'>
        <div className='flex w-full flex-col gap-2 rounded-lg bg-white p-8 text-center'>
          <div className='flex justify-center'>
            <FileQuestion strokeWidth={1} className='h-16 w-16' />
          </div>
          <h1 className='text-3xl font-medium text-gray-800'>404</h1>
          <div className='flex flex-col items-center justify-center gap-1'>
            <h2 className='text-lg font-normal text-gray-600'>{title}</h2>
            <p className='text-sm text-gray-500'>{description}</p>
          </div>

          <Link href='/' passHref>
            <Button
              variant='secondary'
              className='mt-2 inline-flex items-center'
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
