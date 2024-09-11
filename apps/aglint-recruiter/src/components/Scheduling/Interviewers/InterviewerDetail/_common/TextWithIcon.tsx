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
  const Icon: React.ReactNode = icon || <Earth />;
  return (
    <div className={'flex items-start gap-1'} id='text-with-icon'>
      <div className='flex w-4 h-4 pt-0.5 items-center '>
        <Icon />
      </div>
      <p>{textContent}</p>
    </div>
  );
}
