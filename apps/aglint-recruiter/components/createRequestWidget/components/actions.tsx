import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ArrowRight, X } from 'lucide-react';

import { SafeObject } from '@/utils/safeObject';

import type { Menus } from '../contexts/createRequestContext';
import { useCreateRequest, useCreateRequestActions } from '../hooks';

export const Actions = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Selections />
      <Buttons />
    </div>
  );
};

const Selections = () => {
  const selections = useCreateRequest((state) => state.selections);
  const { resetMenu } = useCreateRequestActions();
  return SafeObject.entries(selections)
    .filter(([, value]) => Boolean(value))
    .map(([key, { label }]) => (
      <Badge key={key} variant='secondary' className='text-sm'>
        {getKey(key)} : {label}
        <button className='ml-1' onClick={() => resetMenu(key)}>
          <X className='h-3 w-4' />
        </button>
      </Badge>
    ));
};

const Buttons = () => {
  return (
    <div className='flex justify-between'>
      <Button variant='outline'>Cancel</Button>
      <Button>
        Next <ArrowRight className='ml-2 h-4 w-4' />
      </Button>
    </div>
  );
};

const getKey = (key: Menus) => {
  switch (key) {
    case 'jobs':
      return 'Job';
    case 'requestType':
      return 'Request type';
  }
};
