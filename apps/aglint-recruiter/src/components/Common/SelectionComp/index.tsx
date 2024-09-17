import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { type FC, type ReactNode } from 'react';

const SelectionComp: FC<{
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  children: ReactNode;
  height?: number;
}> = ({ value, onChange, children, height = 40 }) => {
  return (
    <div className='w-full'>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full border border-input transition-colors hover:border-neutral-600 focus:border-neutral-900 focus:ring-0 ${
            height ? `h-[${height}px]` : 'h-10'
          }`}
        >
          <SelectValue>{value}</SelectValue>
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
};

export default SelectionComp;
