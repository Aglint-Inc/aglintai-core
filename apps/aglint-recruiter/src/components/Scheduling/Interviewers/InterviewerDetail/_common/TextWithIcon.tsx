'use client';
import { Earth } from 'lucide-react';
import React from 'react';

interface TextWithIconProps {
  icon?: React.ReactNode;
  textContent?: React.ReactNode;
}

export function TextWithIcon({
  icon,
  textContent = 'This is a global text component',
}: TextWithIconProps): React.JSX.Element {
  return (
    <div className={'flex items-start gap-1'} id='text-with-icon'>
      <div className='flex w-4 h-4 pt-0.5 items-center '>
        {icon || <Earth />}
      </div>
      <p>{textContent}</p>
    </div>
  );
}
