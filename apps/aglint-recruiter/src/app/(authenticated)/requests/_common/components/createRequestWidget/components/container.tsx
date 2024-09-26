import { toast } from '@components/hooks/use-toast';
import { Button as UIButton } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Plus } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { useCompanySetup } from '@/authenticated/hooks/useCompanySetup';
import {
  setIsOnboardOpen,
  useOnboard,
} from '@/authenticated/store/OnboardStore';

import { useCreateRequest, useCreateRequestActions } from '../hooks';
import { Actions } from './actions';
import { Navigation } from './navigation';

export const Container = (props: PropsWithChildren) => {
  const open = useCreateRequest((state) => state.open);
  const { onOpenChange } = useCreateRequestActions();

  //onboarding setup check
  const { isRequestSetupPending } = useCompanySetup();
  const { isOpen: isOnboardOpen } = useOnboard();

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (isRequestSetupPending) {
          setIsOnboardOpen(true);
          if (!isOnboardOpen) {
            toast({
              title: 'Please complete this steps',
              variant: 'destructive',
            });
          }
        } else onOpenChange(value);
      }}
    >
      <Button />
      <Content>{props.children}</Content>
    </Popover>
  );
};

const Content = (props: PropsWithChildren) => {
  return (
    <PopoverContent
      className='w-[400px] px-4 py-2'
      align='end'
      sideOffset={4}
      side='bottom'
    >
      <Navigation />
      {props.children}
      <Actions />
    </PopoverContent>
  );
};

const Button = () => {
  return (
    <PopoverTrigger asChild>
      <UIButton variant='outline'>
        <Plus className='mr-2 h-4 w-4' /> New Request
      </UIButton>
    </PopoverTrigger>
  );
};
