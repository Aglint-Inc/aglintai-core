import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

interface InterviewerTrainingProps {
  slotFilter?: React.ReactNode;
  slotInterviewerTrainnigList?: React.ReactNode;
  textDateRange?: React.ReactNode;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

export function InterviewerTraining({
  slotFilter,
  slotInterviewerTrainnigList,
  textDateRange = 'This is a global text component',
  onClickLeft,
  onClickRight,
}: InterviewerTrainingProps) {
  return (
    <div className='h-[calc(100vh-48px)] overflow-auto'>
      <div className='flex items-center justify-between border-b border-neutral-200 p-2 px-4'>
        <div>{slotFilter}</div>
        <div className='flex items-center space-x-2'>
          <div className='rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5'>
            <div>
              <p>{textDateRange}</p>
              <CalendarIcon size={16} />
            </div>
          </div>
          <div className='flex space-x-2'>
            <UIButton
              variant='outline'
              size='sm'
              icon={<ChevronLeft />}
              onClick={onClickLeft}
            ></UIButton>
            <UIButton
              variant='outline'
              size='sm'
              icon={<ChevronRight className='h-4 w-4' />}
              onClick={onClickRight}
            ></UIButton>
          </div>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-[300px_257px_1fr] border-b border-neutral-200 bg-neutral-100'>
          <div className='p-1 px-3'>
            <span className='text-sm font-medium'>Trainee</span>
          </div>
          <div className='p-1 px-3'>
            <span className='text-sm font-medium'>Interview Pool</span>
          </div>
          <div className='p-1 px-3'>
            <span className='text-sm font-medium'>Training Progress</span>
          </div>
        </div>
        <div className='h-[calc(100vh-117px)] overflow-auto'>
          <div className='flex flex-col divide-y divide-neutral-300 bg-neutral-200'>
            {slotInterviewerTrainnigList}
          </div>
        </div>
      </div>
    </div>
  );
}
