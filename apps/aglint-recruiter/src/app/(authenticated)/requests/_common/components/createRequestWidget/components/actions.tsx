import { Alert } from '@components/ui/alert';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ArrowRight, X } from 'lucide-react';

import { SafeObject } from '@/utils/safeObject';

import { STEPS } from '../constants';
import {
  useCreateRequest,
  useCreateRequestActions,
  useCreateRequestMutation,
} from '../hooks';
import type { Menus } from '../types';

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

const Error = () => {
  const error = useCreateRequest((state) => state.error);
  if (!error) return <></>;
  return (
    <Alert variant='warning' className='text-sm'>
      {error}
    </Alert>
  );
};

const Buttons = () => {
  const { onOpenChange } = useCreateRequestActions();
  return (
    <>
      <Error />
      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Action />
      </div>
    </>
  );
};

const Action = () => {
  const step = useCreateRequest((state) => state.step);
  if (STEPS.length - 1 !== step) return <Next />;
  return <Submit />;
};

const Submit = () => {
  const { mutate, isPending } = useCreateRequestMutation();
  return (
    <Button disabled={isPending} onClick={() => mutate()}>
      Create Request
    </Button>
  );
};

const Next = () => {
  const step = useCreateRequest((state) => state.step);
  const selections = useCreateRequest((state) => state.selections);
  const { nextPage } = useCreateRequestActions();
  const currentSelection = selections[STEPS[step] as keyof typeof selections];
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
    case 'candidate':
      return 'Candidate';
    case 'schedules':
      return 'Schedules';
    case 'assignees':
      return 'Assignee';
  }
};
