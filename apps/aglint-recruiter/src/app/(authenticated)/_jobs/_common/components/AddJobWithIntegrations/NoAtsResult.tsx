import { FileQuestion } from 'lucide-react';
import React from 'react';

export default function NoAtsResult() {
  return (
    <div className='flex flex-col items-center justify-center p-6 text-center'>
      <FileQuestion className='w-10 h-10 mb-2 text-muted-foreground' />
      <h3 className='font-semibold mb-2'>No Result found</h3>
      <p className='text-sm text-muted-foreground'>
        We couldn&apos;t find any Result matching your criteria.
      </p>
    </div>
  );
}
