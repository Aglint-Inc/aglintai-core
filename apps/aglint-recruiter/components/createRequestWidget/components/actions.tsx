import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ArrowRight, X } from 'lucide-react';

import { SafeObject } from '@/utils/safeObject';

import { STEPS, type Menus } from '../contexts/createRequestContext';
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
  const { resetSelection } = useCreateRequestActions();
  return SafeObject.entries(selections)
    .filter(([, value]) =>
      Array.isArray(value) ? value.length !== 0 : Boolean(value),
    )
    .map(([key, value]) => (
      <Badge key={key} variant='secondary' className='text-sm'>
        {getKey(key)} :{' '}
        {Array.isArray(value)
          ? value.map(({ label }) => label).join(', ')
          : value.label}
        <button className='ml-1' onClick={() => resetSelection(key)}>
          <X className='h-3 w-4' />
        </button>
      </Badge>
    ));
};

const Buttons = () => {
  const { step, selections } = useCreateRequest((state) => ({
    step: state.step,
    selections: state.selections,
  }));
  const { nextPage } = useCreateRequestActions();
  const currentSelection = selections[STEPS[step]];
  const isEnabled = Array.isArray(currentSelection)
    ? currentSelection.length !== 0
    : Boolean(currentSelection);
  return (
    <div className='flex justify-between'>
      <Button variant='outline'>Cancel</Button>
      <Button disabled={!isEnabled} onClick={() => nextPage()}>
        Next <ArrowRight className='ml-2 h-4 w-4' />
      </Button>
    </div>
  );
};

const getKey = (key: Menus) => {
  switch (key) {
    case 'requestType':
      return 'Request type';
    case 'jobs':
      return 'Job';
    case 'candidates':
      return 'Candidates';
    case 'schedules':
      return 'Schedules';
  }
};
