import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin' />
    </div>
  );
};

export default Loader;
