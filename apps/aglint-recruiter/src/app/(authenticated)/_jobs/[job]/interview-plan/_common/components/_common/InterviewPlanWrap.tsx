'use client';
import { ArrowDown, ArrowUp, Edit } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

import { InterviewPlanDetail } from './InterviewPlanDetail';

export function InterviewPlanWrap({
  textStageName = 'This is a global text component',
  onClickEdit,
  textInterviewCount = 'This is a global text component',
  slotRightIconButton,
  slotInputButton,
  isInputVisible = false,
  slotInterviewPlanDetail,
  isSlotInterviewPlanVisible = true,
  onClickUp,
  onClickDown,
  isTopArrowVisible = true,
  isBottomArrowVisible = true,
}) {
  return (
    <div className='relative flex items-start gap-2'>
      <div className='w-full rounded-lg border border-transparent bg-neutral-100 p-4 transition-colors duration-200 hover:border-neutral-300 md:p-5'>
        <div className='relative'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <UITypography type='small' variant='p'>
                {textStageName}
              </UITypography>

              <UIButton
                variant='ghost'
                size='sm'
                icon={<Edit />}
                className='opacity-0 transition-opacity duration-300 hover:opacity-100'
                onClick={onClickEdit}
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
          <div className='flex flex-col gap-2'>
            {slotInterviewPlanDetail ?? <InterviewPlanDetail />}
          </div>
        )}
      </div>
      <div className='absolute right-0 top-0 flex translate-x-[120%] flex-col gap-2'>
        {isTopArrowVisible && (
          <UIButton
            variant='secondary'
            size='sm'
            className='opacity-0 transition-opacity duration-300 hover:opacity-100'
            onClick={onClickUp}
            icon={<ArrowUp />}
          />
        )}
        {isBottomArrowVisible && (
          <UIButton
            variant='secondary'
            size='sm'
            className='opacity-0 transition-opacity duration-300 hover:opacity-100'
            onClick={onClickDown}
            icon={<ArrowDown />}
          />
        )}
      </div>
    </div>
  );
}
