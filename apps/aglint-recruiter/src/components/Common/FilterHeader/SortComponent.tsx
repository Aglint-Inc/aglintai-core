import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronDown,
} from 'lucide-react';
import React, { type ReactNode } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export type sortComponentType = {
  sortOptions: {
    options: string[] | { id: string; label: string }[];
    order: string[] | { id: string; label: string }[];
  };
  selected: { option: string; order: string };
  // eslint-disable-next-line no-unused-vars
  setOrder: (x: { type?: string; order?: string }) => void;
};

function SortComponent({ selected, setOrder, sortOptions }: sortComponentType) {
  if (!sortOptions.options || !sortOptions.order) return null;

  const sortOptionList = (
    typeof sortOptions.options[0] === 'object'
      ? sortOptions.options
      : sortOptions.options.map((item) => ({ id: item, label: item }))
  ) as { id: string; label: string }[];

  const orderOptionList = (
    typeof sortOptions.order[0] === 'object'
      ? sortOptions.order
      : sortOptions.order.map((item) => ({ id: item, label: item }))
  ) as { id: string; label: string }[];
  const selectedSort = orderOptionList.find(
    (item) => item.id === selected.order,
  );
  return (
    <div className='flex flex-row items-center gap-1'>
      <p className='text-muted-foreground text-sm'>Sort by</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='flex items-center gap-2'>
            {capitalizeFirstLetter(selected.option)}
            <OrderIcon order={selected.order} />
            <ChevronDown className='h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[176px] p-1'>
          <div className='flex flex-col gap-1'>
            <SortOptionsDropDown
              itemList={sortOptionList}
              selectedItem={selected.option}
              setSelectedItem={(values) => {
                setOrder({ type: values });
              }}
            />
            <SortOptionsDropDown
              icon={
                <div className='flex row gap-2 items-center'>
                  <OrderIcon order={selected.order} />
                  {capitalizeFirstLetter(selectedSort.label)}
                </div>
              }
              itemList={orderOptionList}
              selectedItem={selectedSort?.id || ''}
              setSelectedItem={(values) => {
                setOrder({ order: values });
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const SortOptionsDropDown = ({
  itemList,
  setSelectedItem,
  selectedItem,
  icon,
}: {
  itemList: { id: string; label: string }[];
  selectedItem: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (x: string) => void;
  icon?: ReactNode;
}) => {
  return (
    <Select value={selectedItem} onValueChange={setSelectedItem}>
      <SelectTrigger className='w-full'>
        <SelectValue>{icon}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {itemList.map((item, i) => (
          <SelectItem key={i} value={item.id}>
            {capitalizeFirstLetter(item.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortComponent;

const OrderIcon = ({ order }: { order: string }) => {
  if (order === 'descending' || order === 'desc') {
    return <ArrowDownWideNarrow className='h-4 w-4' />;
  } else if (order === 'ascending' || order === 'asc') {
    return <ArrowUpNarrowWide className='h-4 w-4' />;
  } else {
    return <ArrowUpNarrowWide className='h-4 w-4' />;
  }
};
