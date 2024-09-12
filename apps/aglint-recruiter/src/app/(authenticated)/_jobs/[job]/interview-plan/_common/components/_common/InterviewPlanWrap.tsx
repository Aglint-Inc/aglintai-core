'use client';
import { ArrowDown, ArrowUp, Edit } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

import { InterviewPlanDetail } from './InterviewPlanDetail';

export function InterviewPlanWrap({
  textStageName = 'This is a global text component',
  onClickEdit = {},
  textInterviewCount = 'This is a global text component',
  slotRightIconButton,
  slotInputButton,
  isInputVisible = false,
  slotInterviewPlanDetail,
  isSlotInterviewPlanVisible = true,
  onClickUp = {},
  onClickDown = {},
  isTopArrowVisible = true,
  isBottomArrowVisible = true,
}) {
  return (
    <div className='flex items-start gap-2 relative'>
      <div className='w-full p-4 md:p-5 border border-transparent rounded-lg bg-neutral-100 hover:border-neutral-300 transition-colors duration-200'>
        <div className='relative'>
          <div className='flex justify-between items-center '>
            <div className='flex gap-2 items-center'>
              <UITypography type='small' variant='p'>
                {textStageName}
              </UITypography>
              <UIButton
                variant='ghost'
                size='sm'
                icon={<Edit />}
                className='opacity-0 hover:opacity-100 transition-opacity duration-300'
                {...onClickEdit}
              />
            </div>
            <div className='flex items-center gap-2'>
              <UITypography type='small' variant='p'>
                {textInterviewCount}
              </UITypography>
              {slotRightIconButton}
            </div>
          </div>
          {isInputVisible && (
            <div className='absolute inset-0 z-10 bg-neutral-100'>
              {slotInputButton}
            </div>
          )}
        </div>
        {isSlotInterviewPlanVisible && (
          <div className='flex flex-col gap-2 '>
            {slotInterviewPlanDetail ?? <InterviewPlanDetail />}
          </div>
        )}
      </div>
      <div className='absolute top-0 right-0 translate-x-[120%] flex flex-col gap-2'>
        {isTopArrowVisible && (
          <UIButton
            variant='secondary'
            size='sm'
            className='opacity-0 hover:opacity-100 transition-opacity duration-300'
            {...onClickUp}
            icon={<ArrowUp />}
          />
        )}
        {isBottomArrowVisible && (
          <UIButton
            variant='secondary'
            size='sm'
            className='opacity-0 hover:opacity-100 transition-opacity duration-300'
            {...onClickDown}
            icon={<ArrowDown />}
          />
        )}
      </div>
    </div>
  );
}
