import type { DatabaseTable } from '@aglint/shared-types';
import { CommandItem, CommandList } from '@components/ui/command';
import { CommandEmpty } from 'cmdk';
import { Calendar } from 'lucide-react';

import { useCreateRequestActions } from '../../hooks';
import { RequestLayout } from '../common/requestLayout';
import { CONTAINER_HEIGHT } from '../../constants';

export const List = () => {
  return <Content />;
};

type Options = {
  id: DatabaseTable['request']['type'];
  label: string;
}[];

const requestTypes: Options = [
  {
    id: 'cancel_schedule_request',
    label: 'Cancel request',
  },
  {
    id: 'decline_request',
    label: 'Decline request',
  },
  {
    id: 'reschedule_request',
    label: 'Reschedule request',
  },
  {
    id: 'schedule_request',
    label: 'Schedule request',
  },
];

const Content = () => {
  const { selectRequestType } = useCreateRequestActions();
  return (
    <CommandList
      className={`w-full h-[${CONTAINER_HEIGHT}px] overflow-y-auto overflow-x-hidden`}
    >
      <CommandEmpty>
        <RequestLayout>No suggestions available.</RequestLayout>
      </CommandEmpty>
      {requestTypes.map(({ id, label }) => (
        <CommandItem
          key={id}
          value={id}
          onSelect={() => selectRequestType({ id, label })}
        >
          <>
            <Calendar className='mr-2 h-4 w-4' />
            <span>{label}</span>
          </>
        </CommandItem>
      ))}
    </CommandList>
  );
};
