'use client';

import { Circle, CircleCheck, CirclePlay, Loader } from 'lucide-react';

export function StagePipelineSmall({
  showText = true,
  color = 'success',
  isLeft = true,
  isRight = true,
  iconName,
  textStageName = 'This is a global text component',
}) {
  const icon =
    iconName === 'brightness_1' ? (
      <Circle size={12} />
    ) : iconName === 'not_started' ? (
      <CirclePlay size={12} />
    ) : iconName === 'atr' ? (
      <Loader size={12} />
    ) : iconName === 'check_circle' ? (
      <CircleCheck size={12} />
    ) : (
      ''
    );
  return (
    <div
      className={`h-[24px] ${isRight ? 'rounded-s-md' : isLeft ? 'rounded-e-md' : ''} flex items-center gap-0 bg-gray-300 px-1 ${color}`}
    >
      <div className='mx-2'>{icon}</div>
      {showText ? textStageName : ''}
    </div>
  );
}
