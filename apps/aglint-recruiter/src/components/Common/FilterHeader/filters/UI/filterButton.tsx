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
            <div className='flex row gap-2 items-center'>
              {slotLeftIcon ? slotLeftIcon : false}
              {text}
              {slotRightIcon ? slotRightIcon : false}
            </div>
            {isDotVisible && isActive && (
              <span className='absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white' />
            )}
          </Button>
        </PopoverTrigger>
        {type == 'popover' && (
          <PopoverContent className='p-0 w-max'>
            {popover}
            <Button
              variant='ghost'
              className='gap-1 justify-start w-full hover:rounded-t-none'
              onClick={resetFilter}
            >
              <Repeat size={15} /> <p>Reset</p>
            </Button>
          </PopoverContent>
        )}
      </Popover>
    );
}
