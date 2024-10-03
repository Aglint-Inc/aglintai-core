/* eslint-disable no-unused-vars */
import { Input } from '@components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import capitalize from 'lodash/capitalize';
import React from 'react';

type InterviewLimitInputProps = {
  value: number;
  max: number;
  type: 'Hours' | 'Interviews';
  onValueChange: (value: number) => void;
  onTypeChange: (_type: 'Hours' | 'Interviews', _mode: 'day' | 'week') => void;
  mode: 'day' | 'week';
};

const InterviewLimitInput: React.FC<InterviewLimitInputProps> = ({
  value,
  max,
  type,
  onValueChange,
  onTypeChange,
  mode,
}) => {
  const tabs = ['Interviews', 'Hours'];
  return (
    <div className='flex flex-col space-y-1'>
      <p className='w-[150px] text-sm text-muted-foreground'>
        {mode === 'day' ? 'Daily' : 'Weekly'} {type}
      </p>
      <div className='flex flex-row items-center gap-2'>
        <Input
          type='number'
          value={value}
          onChange={(e) => onValueChange(+e.target.value)}
          max={max}
          className='h-9 w-[70px]'
        />
        <Tabs
          defaultValue={type}
          value={type}
          onValueChange={(value: string) => {
            onTypeChange(value as 'Hours' | 'Interviews', mode);
          }}
        >
          <TabsList>
            {tabs.map((ele) => (
              <TabsTrigger key={ele} value={ele}>
                {capitalize(ele.replaceAll('_', ' '))}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default InterviewLimitInput;
