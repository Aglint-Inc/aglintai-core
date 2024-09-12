import { Button } from '@components/ui/button';
import { ArrowRight } from 'lucide-react';

import { useCreateRequest } from '../hooks';

export const Actions = () => {
  return (
    <div className='flex flex-col gap-4'>
      <List />
      <Buttons />
    </div>
  );
};

const List = () => {
  const selections = useCreateRequest((state) => state.selections);
  return <>{JSON.stringify(selections)}</>;
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
