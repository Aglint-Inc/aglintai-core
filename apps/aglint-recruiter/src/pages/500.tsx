import { Button } from '@components/ui/button';
import { Home, ServerCrash } from 'lucide-react';
import Link from 'next/link';

import Seo from '@/components/Common/Seo';

export default function ServerError() {
  return (
    <>
      <Seo
        title='Internal server Error | Aglint AI'
        description='AI for People Products'
      />
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-center space-y-6 p-8 bg-white rounded-lg shadow-lg max-w-md w-full'>
          <div className='flex justify-center'>
            <ServerCrash stroke='1' className='h-24 w-24' />
          </div>
          <h1 className='text-4xl font-bold text-gray-800'>500</h1>
          <h2 className='text-2xl font-semibold text-gray-600'>Server Error</h2>
          <p className='text-gray-500'>
            Oops! Something went wrong on our end. We&apos;re working to fix it.
          </p>
          <Link href='/' passHref>
            <Button className='inline-flex items-center'>
              <Home className='mr-2 h-4 w-4' />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
