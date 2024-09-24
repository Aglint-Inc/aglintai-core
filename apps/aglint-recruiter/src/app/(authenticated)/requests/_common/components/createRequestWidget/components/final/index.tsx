import type { DatabaseTable, Type } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Combobox } from '@components/combobox';
import { Textarea } from '@components/ui/textarea';
import type { DateRange as DateRangeType } from 'react-day-picker';

import DateRangePicker from '@/components/Common/DateRange';

import { useCreateRequest, useCreateRequestActions } from '../../hooks';

export const Final = () => {
  return (
    <div className='m-1 flex flex-col items-center justify-center gap-4'>
      <Dates />
      <Priority />
      <Notes />
    </div>
  );
};

const Dates = () => {
  const { start_date, end_date } = useCreateRequest((state) => state.dates);
  const { setDates } = useCreateRequestActions();
  const onChange = (newDateRange: DateRangeType | undefined) => {
    setDates({
      start_date: newDateRange?.from?.toISOString() || null,
      end_date: newDateRange?.to?.toISOString() || null,
    });
  };
  return (
    <DateRangePicker
      value={[dayjsLocal(start_date), dayjsLocal(end_date)]}
      onChange={onChange}
      disablePast
      className='w-full'
    />
  );
};

const Notes = () => {
  const note = useCreateRequest((state) => state.note);
  const { setNote } = useCreateRequestActions();
  return (
    <Textarea
      placeholder='Type a note here.'
      value={note}
      onChange={(e) => setNote(e.target.value)}
      className='min-h-[180px]'
    />
  );
};

const Priority = () => {
  const priority = useCreateRequest((state) => state.priority);
  const { setPriority } = useCreateRequestActions();
  return (
    <Combobox
      value={priority}
      setValue={setPriority}
      options={priorityOptions}
      buttonPlaceholder='Select priority'
      inputPlaceholder='Search priority'
    />
  );
};

const priorityOptions: Required<
  Type<
    Parameters<typeof Combobox>[0]['options'],
    { value: DatabaseTable['request']['priority'] }
  >[number]
>[] = [
  {
    value: 'standard',
    label: 'Standard request',
  },
  {
    value: 'urgent',
    label: 'Urgent request',
  },
];
