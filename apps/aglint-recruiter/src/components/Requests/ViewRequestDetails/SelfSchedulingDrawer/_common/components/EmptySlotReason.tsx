'use client';
import { TreePine } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function EmptySlotReason({
  textMain = 'This is a global text component',
}: {
  textMain?: string;
}) {
  return (
    <div
      className={
        'flex overflow-hidden p-3 justify-start items-center gap-3 border border-neutral-300 rounded-lg'
      }
    >
      <TreePine className='text-sky-800 w-4 h-4' />
      <UITypography type='small' className={'text-sky-800'}>
        {textMain}
      </UITypography>
    </div>
  );
}
