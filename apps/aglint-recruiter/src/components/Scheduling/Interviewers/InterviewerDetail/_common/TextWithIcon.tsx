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
      <div className='flex h-4 w-4 items-center pt-0.5'>
        {icon || <Earth />}
      </div>
      <p>{textContent}</p>
    </div>
  );
}
