import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ArrowRight, X } from 'lucide-react';

import { SafeObject } from '@/utils/safeObject';

import { type Menus, STEPS } from '../contexts/createRequestContext';
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
  const { onOpenChange } = useCreateRequestActions();
  return (
    <div className='flex justify-between'>
      <Button variant='outline' onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Submit />
    </div>
  );
};

const Submit = () => {
  const step = useCreateRequest((state) => state.step);
  const selections = useCreateRequest((state) => state.selections);
  const { nextPage } = useCreateRequestActions();
  if (step === 5)
    return <Button onClick={() => nextPage()}>Create Request</Button>;
  const currentSelection = selections[STEPS[step]];
  const isEnabled = Array.isArray(currentSelection)
    ? currentSelection.length !== 0
    : Boolean(currentSelection);
  return (
    <Button disabled={!isEnabled} onClick={() => nextPage()}>
      Next <ArrowRight className='ml-2 h-4 w-4' />
    </Button>
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
    case 'assignees':
      return 'Assignee';
  }
};
