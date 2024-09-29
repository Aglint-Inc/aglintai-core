import { Inbox } from 'lucide-react';

import { Actions } from './actions';

export const EmptyWorkflow = () => {
  return (
    <div className='mt-40 flex flex-col items-center justify-center p-8 text-center'>
      <div className='mb-4 rounded-full bg-muted p-3'>
        <Inbox className='h-6 w-6 text-muted-foreground' />
      </div>
      <h3 className='text-lg font-semibold'>No workflows</h3>
      <p className='mb-4 mt-2 text-sm text-muted-foreground'>
        You haven&apos;t created any workflows yet. Start by creating a new one.
      </p>
      <Actions />
    </div>
  );
};
