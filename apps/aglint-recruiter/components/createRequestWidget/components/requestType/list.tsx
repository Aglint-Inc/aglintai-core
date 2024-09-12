import type { DatabaseTable } from '@aglint/shared-types';
import { useCreateRequestActions } from '@components/createRequestWidget/hooks';
import { CommandItem, CommandList } from '@components/ui/command';
import { CommandEmpty } from 'cmdk';
import { Calendar } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const containerHeight = 200;

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
    label: 'Schedult request',
  },
];

const Content = () => {
  const { setRequestType } = useCreateRequestActions();
  return (
    <CommandList
      className={`w-full h-[${containerHeight}px] overflow-y-auto overflow-x-hidden`}
    >
      <CommandEmpty>
        <Placeholder>No suggestions available.</Placeholder>
      </CommandEmpty>
      {requestTypes.map(({ id, label }) => (
        <CommandItem
          key={id}
          value={id}
          onSelect={() => setRequestType({ id, label })}
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

const Placeholder = (props: PropsWithChildren) => {
  return (
    <div
      className={`flex w-full h-[${containerHeight}px] items-center justify-center`}
    >
      {props.children}
    </div>
  );
};
