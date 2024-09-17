'use client';
import React from 'react';

export function ApplicationDetail({
  slotApplicantInfoBox,
  slotTab,
  slotTabBody,
}) {
  return (
    <div className='h-[calc(100vh-48px)] overflow-auto'>
      <div className='p-4'>{slotApplicantInfoBox}</div>
      <div className='sticky top-0 z-10 bg-white'>{slotTab}</div>
      <div className='overflow-auto'>{slotTabBody}</div>
    </div>
  );
}