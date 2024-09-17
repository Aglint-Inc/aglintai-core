import { Users } from 'lucide-react';
import { memo } from 'react';

export const EmptyList = memo(() => {
  return (
    <div className='flex h-[50vh] items-center justify-center'>
      <div className='flex flex-col items-center justify-center text-center'>
        <div className='mb-2 text-gray-500'>
          <Users size={48} />
        </div>
        <h3 className='text-lg font-medium text-gray-900'>
          No candidates found
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          There are no candidates available at the moment.
        </p>
      </div>
    </div>
  );
});
EmptyList.displayName = 'EmptyList';
