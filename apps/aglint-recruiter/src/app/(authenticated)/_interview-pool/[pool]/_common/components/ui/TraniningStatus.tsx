import { RotateCcw, RotateCw } from 'lucide-react';

interface TrainingStatusProps {
  isShadow?: boolean;
  isReverseShadow?: boolean;
  isCompletedVisible?: boolean;
  isPendingApprovalVisible?: boolean;
  isNotCompletedVisible?: boolean;
}

export function TrainingStatus({
  isShadow = true,
  isReverseShadow = false,
  isCompletedVisible = true,
  isPendingApprovalVisible = false,
  isNotCompletedVisible = false,
}: TrainingStatusProps) {
  return (
    <div className='flex flex-col items-start'>
      {isCompletedVisible && (
        <div className='flex items-center gap-1 rounded-sm bg-green-100 px-3 py-1 text-green-800'>
          {isShadow && <RotateCw className='h-4 w-4' />}
          {isReverseShadow && <RotateCcw className='h-4 w-4' />}
          <span className='text-xs font-medium'>Completed</span>
        </div>
      )}
      {isPendingApprovalVisible && (
        <div className='flex items-center gap-1 rounded-sm bg-orange-100 px-3 py-1 text-orange-800'>
          {isReverseShadow && <RotateCcw className='h-4 w-4' />}
          {isShadow && <RotateCw className='h-4 w-4' />}
          <span className='text-xs'>Pending Approval</span>
        </div>
      )}
      {isNotCompletedVisible && (
        <div className='flex items-center gap-1 rounded-sm bg-gray-100 px-3 py-1 text-gray-800'>
          {isShadow && <RotateCw className='h-4 w-4' />}
          {isReverseShadow && <RotateCcw className='h-4 w-4' />}
          <span className='text-xs font-medium'>Not Completed</span>
        </div>
      )}
    </div>
  );
}
