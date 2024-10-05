import React from 'react';

import ReverseShadowIcon from '@/authenticated/components/ReverseShadowIcon';
import ShadowIcon from '@/authenticated/components/ShadowIcon';

interface TrainingDetailListProps {
  isReverse?: boolean;
  isShadow?: boolean;
  textTraining?: React.ReactNode;
  slotTrainingStatus?: React.ReactNode;
  slotPanelBlock?: React.ReactNode;
}

export function TrainingDetailList({
  isReverse = false,
  isShadow = true,
  textTraining = 'Second Shadow',
  slotTrainingStatus,
  slotPanelBlock,
}: TrainingDetailListProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex w-full items-center gap-2.5'>
        <div>
          {isShadow && <ShadowIcon className='h-5 w-5' />}
          {isReverse && <ReverseShadowIcon className='h-5 w-5' />}
        </div>
        <div className='text-md font-normal capitalize'>{textTraining}</div>
      </div>
      <div className='w-[150px]'>{slotTrainingStatus}</div>
      <div className='flex items-center gap-2.5'>{slotPanelBlock}</div>
    </div>
  );
}
