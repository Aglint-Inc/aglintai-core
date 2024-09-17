import { NotFound } from '@/components/Common/404';

import Seo from '../components/Common/Seo';

export default function PageNotFound() {
  return (
    <>
      <Seo
        title='Page Not Found - 404 | Aglint AI'
        description='AI for People Products'
      />
<<<<<<< HEAD
      <NotFound />
=======
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 text-center shadow-lg'>
          <div className='flex justify-center'>
            <FileQuestion stroke='1' className='h-24 w-24' />
          </div>
          <h1 className='text-4xl font-bold text-gray-800'>404</h1>
          <h2 className='text-2xl font-semibold text-gray-600'>
            Page Not Found
          </h2>
          <p className='text-gray-500'>
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <Link href='/' passHref>
            <Button className='inline-flex items-center'>
              <Home className='mr-2 mt-4 h-4 w-4' />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f
    </>
  );
}
