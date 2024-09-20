import { FileQuestion } from 'lucide-react';
import React from 'react';

export default function NoAtsResult() {
  return (
    <div className='flex flex-col items-center justify-center p-6 text-center'>
      <FileQuestion className='mb-2 h-10 w-10 text-muted-foreground' />
      <h3 className='mb-2 font-semibold'>No Result found</h3>
      <p className='text-sm text-muted-foreground'>
        We couldn&apos;t find any Result matching your criteria.
      </p>
    </div>
  );
}
