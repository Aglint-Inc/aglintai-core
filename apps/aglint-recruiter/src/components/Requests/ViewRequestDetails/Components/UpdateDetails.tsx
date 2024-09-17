/* eslint-disable no-unused-vars */
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import React, { useState } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';
interface StatusListProps {
  updateButton: React.ReactNode;
  handleChange: ({ label, value }: { label: string; value: string }) => void;
  items: { label: string; value: string }[];
}
function UpdateDetails({ updateButton, handleChange, items }: StatusListProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{updateButton}</PopoverTrigger>
      <PopoverContent className='w-40 p-2' align='start' side='left'>
        <div className='flex flex-col space-y-2'>
          {items.map((item) => (
            <Label
              key={item.value}
              onClick={() => {
                handleChange(item);
                setOpen(false);
              }}
              className='cursor-pointer rounded-md p-2 hover:bg-slate-200'
            >
              <span>{capitalizeFirstLetter(item.label)}</span>
            </Label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateDetails;
