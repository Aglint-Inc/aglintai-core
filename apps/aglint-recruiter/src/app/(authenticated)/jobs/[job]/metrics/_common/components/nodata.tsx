import { BarChart } from 'lucide-react';

export const NoDataAvailable = () => {
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='flex flex-col items-center'>
        <BarChart className='mb-2 h-16 w-16 text-gray-400' />
      </div>
      <div className='text-center'>
        <h2 className='font-semibold text-muted-foreground'>
          No Data Available
        </h2>
      </div>
    </div>
  );
};
