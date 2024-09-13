import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

interface InterviewerWorkloadProps {
  slotFilter?: React.ReactNode;
  textDateRange?: React.ReactNode;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  slotInterviewWorkloadList?: React.ReactNode;
}

export function InterviewerWorkload({
  slotFilter,
  textDateRange = 'This is a global text component',
  onClickLeft,
  onClickRight,
  slotInterviewWorkloadList,
}: InterviewerWorkloadProps) {
  return (
    <Card className='h-[calc(100vh-48px)] overflow-auto border-none'>
      <CardHeader className='flex flex-row justify-between items-center p-3'>
        <div>{slotFilter}</div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            className='flex items-center space-x-1'
          >
            <CalendarIcon className='h-4 w-4' />
            <span>{textDateRange}</span>
          </Button>
          <div className='flex space-x-2'>
            <UIButton
              size='sm'
              variant='outline'
              onClick={onClickLeft}
              icon={<ChevronLeftIcon />}
            />
            <UIButton
              size='sm'
              variant='outline'
              onClick={onClickRight}
              icon={<ChevronRightIcon />}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='grid grid-cols-[300px_1fr] bg-neutral-100 border-b'>
          <div className='p-2 font-medium'>Interviewer</div>
          <div className='p-2 font-medium'>Workload</div>
        </div>
        <ScrollArea className='h-[calc(100vh-117px)]'>
          <div className='flex flex-col divide-y'>
            {slotInterviewWorkloadList}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
