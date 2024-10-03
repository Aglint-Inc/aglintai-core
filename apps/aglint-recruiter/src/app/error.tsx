'use client';

import { TriangleAlert } from 'lucide-react';

const Error = () => {
  return (
    <>
      <div className='flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-3'>
        <TriangleAlert className='h-10 w-10 text-red-600' strokeWidth={1} />
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='text-lg font-medium'> Something went wrong. </div>
          <div className='text-sm text-gray-500'>Try reloading the page.</div>
        </div>
      </div>
    </>
  );
};

export default Error;
