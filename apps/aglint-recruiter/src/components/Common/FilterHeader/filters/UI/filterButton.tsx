import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ChevronDown, ChevronUp, Repeat } from 'lucide-react';
import { type ReactNode, useState } from 'react';

interface FilterButtonInterface {
  text: string;
  isActive?: boolean;
  isDotVisible?: boolean;
  slotLeftIcon?: React.ReactNode;
  slotRightIcon?: React.ReactNode;
  onClick?: () => void;
  popover: ReactNode;
  resetFilter?: () => void;
  type?: 'popover' | 'button';
  showCaret?: boolean;
  caretPosition?: 'left' | 'right';
}

export default function FilterButton({
  text,
  isActive = false,
  isDotVisible,
  slotLeftIcon,
  slotRightIcon,
  popover,
  showCaret = false,
  caretPosition = 'right',
  resetFilter,
  onClick,
  type = 'popover',
}: FilterButtonInterface) {
  const [caret, setCaret] = useState<boolean>(false);
  if (showCaret) {
    const Caret = caret ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    if (caretPosition == 'right') {
      slotRightIcon = (
        <>
          {slotRightIcon}
          {Caret}
        </>
      );
    } else {
      slotLeftIcon = (
        <>
          {Caret}
          {slotLeftIcon}
        </>
      );
    }
  }
  if (type)
    return (
      <Popover
        onOpenChange={() => {
          showCaret && setCaret(!caret);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant='outline' className='relative' onClick={onClick}>
            <div className='row flex items-center gap-2'>
              {slotLeftIcon ? slotLeftIcon : false}
              {text}
              {slotRightIcon ? slotRightIcon : false}
            </div>
            {isDotVisible && isActive && (
              <span className='absolute right-1 top-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-2' />
            )}
          </Button>
        </PopoverTrigger>
        {type == 'popover' && (
          <PopoverContent className='w-max border border-border p-0'>
            {popover}

            <Button
              variant='ghost'
              className='w-full justify-start gap-1 border border-border hover:rounded-t-none'
              onClick={resetFilter}
            >
              <Repeat size={15} className='text-primary' /> <p>Reset</p>
            </Button>
          </PopoverContent>
        )}
      </Popover>
    );
}
