import { FileQuestion } from 'lucide-react';
import { memo } from 'react';

import { type ApplicationStore } from '@/context/ApplicationContext/store';

export const EmptyState = memo(({ tab }: { tab: ApplicationStore['tab'] }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='w-[100px]'>
        <FileQuestion size={100} />
      </div>
      <div>No {tab} data found</div>
    </div>
  );
});
EmptyState.displayName = 'EmptyState';
