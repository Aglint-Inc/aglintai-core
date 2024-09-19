/* eslint-disable no-unused-vars */
import { Input } from '@components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { capitalize } from 'lodash';
import React from 'react';

type InterviewLimitInputProps = {
  value: number;
  max: number;
  type: 'Hours' | 'Interviews';
  onValueChange: (value: number) => void;
  onTypeChange: (type: 'Hours' | 'Interviews') => void;
};

const InterviewLimitInput: React.FC<InterviewLimitInputProps> = ({
  value,
  max,
  type,
  onValueChange,
  onTypeChange,
}) => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <Input
        type='number'
        value={value}
        onChange={(e) => onValueChange(+e.target.value)}
        max={max}
        className='w-[70px] h-9'
      />
      <Tabs
        defaultValue={type}
        value={type}
        onValueChange={(value) => onTypeChange(value as 'Hours' | 'Interviews')}
      >
        <TabsList>
          {['Interviews', 'Hours'].map((ele) => (
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
