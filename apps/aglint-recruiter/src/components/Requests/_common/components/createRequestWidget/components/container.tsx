import { Button as UIButton } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Plus } from 'lucide-react';
import { memo, type PropsWithChildren } from 'react';

import { useCreateRequest, useCreateRequestActions } from '../hooks';
import { Actions } from './actions';
import { Navigation } from './navigation';

export const Container = memo((props: PropsWithChildren) => {
  const open = useCreateRequest((state) => state.open);
  const { onOpenChange } = useCreateRequestActions();
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <Button />
      <Content>{props.children}</Content>
    </Popover>
  );
});
Container.displayName = 'Container';

const Content = memo((props: PropsWithChildren) => {
  return (
    <PopoverContent
      className='w-[300px] px-4 py-2'
      align='end'
      side='bottom'
      sideOffset={10}
     
    >
      <Navigation />
      {props.children}
      <Actions />
    </PopoverContent>
  );
});
Content.displayName = 'Content';

const Button = memo(() => {
  return (
    <PopoverTrigger asChild>
      <UIButton variant='outline'>
        <Plus className='mr-2 h-4 w-4' /> New Request
      </UIButton>
    </PopoverTrigger>
  );
});
Button.displayName = 'Button';
