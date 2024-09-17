import { Button } from '@components/ui/button';
import { FileQuestion, Home } from 'lucide-react';
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
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 text-center shadow-lg'>
        <div className='flex justify-center'>
          <FileQuestion strokeWidth={1} className='h-24 w-24' />
        </div>
        <h1 className='text-4xl font-bold text-gray-800'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-600'>{title}</h2>
        <p className='text-gray-500'>{description}</p>
        <Link href='/' passHref>
          <Button className='inline-flex items-center'>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
