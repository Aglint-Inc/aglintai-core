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
    <div className='overflow-auto h-[calc(100vh-48px)]'>
      <div className='flex justify-between items-center p-2 px-4 border-b border-neutral-200'>
        <div>{slotFilter}</div>
        <div className='flex items-center space-x-2'>
          <div className='px-2 py-0.5 border border-neutral-200 rounded-md bg-neutral-100'>
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
              icon={<ChevronRight className='w-4 h-4' />}
              onClick={onClickRight}
            ></UIButton>
          </div>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-[300px_257px_1fr] bg-neutral-100 border-b border-neutral-200'>
          <div className='p-1 px-3'>
            <span className='font-medium text-sm'>Trainee</span>
          </div>
          <div className='p-1 px-3'>
            <span className='font-medium text-sm'>Interview Pool</span>
          </div>
          <div className='p-1 px-3'>
            <span className='font-medium text-sm'>Training Progress</span>
          </div>
        </div>
        <div className='overflow-auto h-[calc(100vh-117px)]'>
          <div className='flex flex-col bg-neutral-200 divide-y divide-neutral-300'>
            {slotInterviewerTrainnigList}
          </div>
        </div>
      </div>
    </div>
  );
}
