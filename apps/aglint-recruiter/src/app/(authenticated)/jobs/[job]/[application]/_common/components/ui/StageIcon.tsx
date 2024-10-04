import { CheckCircle, CircleCheck, Network } from 'lucide-react';
import React from 'react';

function StageIcon({
  isNotScheduled,
  isCompleted,
  size = 16,
}: {
  isNotScheduled: boolean;
  isCompleted: boolean;
  size?: number;
}) {
  return (
    <>
      {isNotScheduled ? (
        <CircleCheck size={size} className='text-muted-foreground' />
      ) : isCompleted ? (
        <CheckCircle size={size} className='text-green-700' />
      ) : (
        <Network size={size} className='text-sky-700' />
      )}
    </>
  );
}

export default StageIcon;
