import { TabsList, TabsTrigger } from '@components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export function FilterDropDownDash<T>({
  itemList,
  value,
  onChange,
}: {
  value: T;
  itemList: { label: string; value: T }[];
  onChange: Dispatch<SetStateAction<T>>;
}) {
  const [selectedItem, setSelectedItem] = useState<T>(value);

  const handleChange = (val) => {
    onChange(val);
    setSelectedItem(val);
  };
  return (
    <>
      <Tabs defaultValue={String(selectedItem)} onValueChange={handleChange}>
        <TabsList>
          {itemList.map((item, i) => (
            <TabsTrigger
              key={i}
              value={String(item.value)}
              className='px-3 py-2 text-sm font-medium'
            >
              {capitalizeFirstLetter(String(item.label))}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
