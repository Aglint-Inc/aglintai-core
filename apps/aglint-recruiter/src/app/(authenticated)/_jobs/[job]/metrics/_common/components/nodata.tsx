import { BarChart } from 'lucide-react';

export const NoDataAvailable = () => {
  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='flex flex-col items-center'>
        <BarChart className='w-16 h-16 mb-2 text-gray-400' />
      </div>
      <div className='text-center'>
        <h2 className='font-semibold text-muted-foreground'>No Data Available</h2>
      </div>
    </div>
  );
};
