'use client';

import { AlertCircle } from 'lucide-react';
import React from 'react';

const JobNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 rounded-lg bg-neutral-100 shadow-md text-center max-w-sm mx-auto'>
      <AlertCircle className='w-24 h-24 text-red-500 mb-4' />
      <h3 className='text-2xl font-semibold mb-2'>Job not found</h3>
      <p className='text-gray-600'>
        Sorry, we couldn&apos;t find the job you&apos;re looking for. Please try
        searching again or contact support.
      </p>
    </div>
  );
};

export default JobNotFound;
