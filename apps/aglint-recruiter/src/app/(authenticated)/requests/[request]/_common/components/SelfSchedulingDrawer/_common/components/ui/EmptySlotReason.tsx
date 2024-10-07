'use client';
import Typography from '@components/typography';
import { TreePine } from 'lucide-react';
import React from 'react';

export function EmptySlotReason({
  textMain = 'This is a global text component',
}: {
  textMain?: string;
}) {
  return (
    <div
      className={
        'flex items-center justify-start gap-3 overflow-hidden rounded-lg border border-neutral-300 p-3'
      }
    >
      <TreePine className='h-4 w-4 text-sky-800' />
      <Typography type='small' className={'text-sky-800'}>
        {textMain}
      </Typography>
    </div>
  );
}
