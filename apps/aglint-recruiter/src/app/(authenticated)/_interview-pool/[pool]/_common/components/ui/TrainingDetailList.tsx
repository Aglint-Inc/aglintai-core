import { RotateCcw, RotateCw } from 'lucide-react';
import React from 'react';

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
    <div className='flex items-center gap-2.5'>
      <div className='flex w-[300px] items-center gap-2.5'>
        <div>
          {isShadow && <RotateCw className='h-6 w-6' />}
          {isReverse && <RotateCcw className='h-6 w-6' />}
        </div>
        <div className='capitalize'>{textTraining}</div>
      </div>
      <div className='w-[150px]'>{slotTrainingStatus}</div>
      <div className='flex items-center gap-2.5'>{slotPanelBlock}</div>
    </div>
  );
}
