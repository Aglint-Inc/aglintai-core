'use client';

import { ArrowUpFromLine, Pause, Play, Trash2 } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

export function MemberListCardOption({
  onClickMoveToQualifier,
  isMoveToQualifierVisible = true,
  onClickPauseInterview,
  isPauseVisible = true,
  onClickResumeInterview,
  isResumeVisible = true,
  onClickRemoveModule,
  isRemoveVisible = true,
}: {
  onClickMoveToQualifier: () => void;
  isMoveToQualifierVisible?: boolean;
  onClickPauseInterview: () => void;
  isPauseVisible?: boolean;
  onClickResumeInterview: () => void;
  isResumeVisible?: boolean;
  onClickRemoveModule: () => void;
  isRemoveVisible?: boolean;
}) {
  return (
    <div className='z-2 block w-fit rounded-sm bg-white p-2'>
      {isMoveToQualifierVisible && (
        <div
          className='ease flex cursor-pointer items-center gap-2 rounded p-2 transition-all duration-200 hover:bg-neutral-300 hover:text-foreground'
          onClick={onClickMoveToQualifier}
        >
          <ArrowUpFromLine size={16} />
          <UITypography variant='p' type='small'>
            Move to qualified
          </UITypography>
        </div>
      )}
      {isPauseVisible && (
        <div
          className='ease flex cursor-pointer items-center gap-2 rounded p-2 transition-all duration-200 hover:bg-neutral-300 hover:text-foreground'
          onClick={onClickPauseInterview}
        >
          <Pause size={16} />
          <UITypography variant='p' type='small'>
            Pause
          </UITypography>
        </div>
      )}
      {isResumeVisible && (
        <div
          className='ease flex cursor-pointer items-center gap-2 rounded p-2 transition-all duration-200 hover:bg-neutral-300 hover:text-foreground'
          onClick={onClickResumeInterview}
        >
          <Play size={16} />
          <UITypography variant='p' type='small'>
            Resume
          </UITypography>
        </div>
      )}
      {isRemoveVisible && (
        <div
          className='ease flex cursor-pointer items-center gap-2 rounded p-2 transition-all duration-200 hover:bg-neutral-300 hover:text-foreground'
          onClick={onClickRemoveModule}
        >
          <Trash2 size={16} className='text-red-600' />
          <UITypography variant='p' type='small'>
            Remove
          </UITypography>
        </div>
      )}
    </div>
  );
}
