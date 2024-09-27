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
    <div className='flex flex-row items-center gap-4'>
      <p className='w-[150px] text-base leading-5 tracking-tight'>
        {mode === 'day' ? 'Daily' : 'Weekly'} {type}
      </p>
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
        onValueChange={(value: 'Hours' | 'Interviews') => {
          onTypeChange(value, mode);
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
  );
};

export default InterviewLimitInput;
