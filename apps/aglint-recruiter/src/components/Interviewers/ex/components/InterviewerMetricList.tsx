import { Card } from '@components/ui/card';
import { cn } from '@lib/utils';
import React from 'react';

interface InterviewerMetricListProps {
  slotImage?: React.ReactNode;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textCount?: React.ReactNode;
  countHours?: React.ReactNode;
  countInterviews?: React.ReactNode;
  countDeclines?: React.ReactNode;
  onClickCard?: React.HTMLAttributes<HTMLDivElement>;
  isDeclineVisible?: boolean;
}

export function InterviewerMetricList({
  slotImage,
  textName = 'This is a global text component',
  textRole = 'This is a global text component',
  textCount = '1.',
  countHours = '24',
  countInterviews = '24',
  countDeclines = '24',
  onClickCard = {},
  isDeclineVisible = true,
}: InterviewerMetricListProps) {
  return (
    <Card
      className={cn(
        'flex justify-between items-center p-2 px-3 rounded-md cursor-pointer hover:bg-neutral-100 mb-3',
        // Add any additional classes from your CSS module here
      )}
      {...onClickCard}
    >
      <div className='flex items-center space-x-2'>
        <span>{textCount}</span>
        <div className='flex items-center space-x-2'>
          {slotImage}
          <div>
            <p className='text-sm font-medium'>{textName}</p>
            <p className='text-sm text-neutral-500'>{textRole}</p>
          </div>
        </div>
      </div>
      <div className='flex space-x-1'>
        <MetricItem label='Hours' value={countHours} />
        <MetricItem
          label='Interviews'
          value={countInterviews}
          color='text-green-600'
        />
        {isDeclineVisible && (
          <MetricItem
            label='Declines'
            value={countDeclines}
            color='text-red-600'
          />
        )}
      </div>
    </Card>
  );
}

interface MetricItemProps {
  label: string;
  value: React.ReactNode;
  color?: string;
}

function MetricItem({ label, value, color = 'text-black' }: MetricItemProps) {
  return (
    <div className='flex flex-col items-center justify-center p-2 bg-neutral-100 rounded-md'>
      <span className={cn('text-sm font-medium', color)}>{value}</span>
      <span className='text-[10px] leading-3'>{label}</span>
    </div>
  );
}
