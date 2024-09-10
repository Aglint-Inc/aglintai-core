import { BarChart2 } from 'lucide-react';
import { memo } from 'react';

export const Empty = memo(() => (
  <div className='h-[296px]'>
    <div className='flex flex-col items-center justify-center h-full'>
      <BarChart2 className='w-12 h-12 text-gray-400' />
      <p className='mt-2 text-sm text-gray-500'>No data available</p>
    </div>
  </div>
));
Empty.displayName = 'Empty';
