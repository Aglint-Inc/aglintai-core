import { BarChart2 } from 'lucide-react';
import { memo } from 'react';

export const Empty = memo(() => (
  <div className='h-[296px]'>
    <div className='flex h-full flex-col items-center justify-center'>
      <BarChart2 className='h-12 w-12 text-gray-400' />
      <p className='mt-2 text-sm text-gray-500'>No data available</p>
    </div>
  </div>
));
Empty.displayName = 'Empty';
