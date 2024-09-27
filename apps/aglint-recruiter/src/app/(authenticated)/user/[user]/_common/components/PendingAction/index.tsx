import { AlertTriangle } from 'lucide-react';
import { type Key } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

export const PendingActions = () => {
  return (
    <UISectionCard title='Pending Actions'>
      <div className='space-y-4'>
        {[1, 2, 3, 4].map((action: Key | null | undefined) => (
          <div
            key={action}
            className='flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-4'
          >
            <div className='flex items-start space-x-3'>
              <AlertTriangle className='mt-1 h-5 w-5 text-yellow-500' />
              <div>
                <h3 className='font-medium text-yellow-800'>type</h3>
                <p className='text-sm text-yellow-700'>details</p>
                <p className='mt-1 text-xs text-yellow-600'>Deadline</p>
              </div>
            </div>
            <UIButton
              size='sm'
              variant='outline'
              className='border-yellow-300 text-yellow-700 hover:bg-yellow-100'
            >
              Take Action
            </UIButton>
          </div>
        ))}
      </div>
    </UISectionCard>
  );
};
