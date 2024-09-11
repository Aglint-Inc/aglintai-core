
import { Stack } from '@mui/material';
import NoApplicants from '@public/lottie/NoApplicants';
import { memo } from 'react';

export const EmptyList = memo(() => {
  return (
    <Stack height={'50vh'} justifyContent={'center'}>
      <Stack>
        <div className='flex flex-col items-center justify-center p-8 text-center'>
          <div className='w-20 h-20 mb-2'>
            <NoApplicants />
          </div>

          <h3 className='text-lg font-medium text-gray-900'>
            No candidates found
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            There are no candidates available at the moment.
          </p>
        </div>
      </Stack>
    </Stack>
  );
});
EmptyList.displayName = 'EmptyList';
