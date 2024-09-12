import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Plus } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { useCreateRequest, useCreateRequestActions } from '../hooks';
import { Actions } from './actions';

export const Pop = (props: PropsWithChildren) => {
  const open = useCreateRequest((state) => state.open);
  const { onOpenChange } = useCreateRequestActions();
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Plus className='mr-2 h-4 w-4' /> New Request
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-[400px] px-4 py-2'
        align='start'
        sideOffset={4}
      >
        {props.children}
        <Actions />
      </PopoverContent>
    </Popover>
  );
};
