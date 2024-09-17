'use client';

import { AlertCircle } from 'lucide-react';
import React from 'react';

const JobNotFound = () => {
  return (
    <div className='mx-auto flex max-w-sm flex-col items-center justify-center rounded-lg bg-neutral-100 p-4 text-center shadow-md'>
      <AlertCircle className='mb-4 h-24 w-24 text-red-500' />
      <h3 className='mb-2 text-2xl font-semibold'>Job not found</h3>
      <p className='text-gray-600'>
        Sorry, we couldn&apos;t find the job you&apos;re looking for. Please try
        searching again or contact support.
      </p>
    </div>
  );
};

export default JobNotFound;
