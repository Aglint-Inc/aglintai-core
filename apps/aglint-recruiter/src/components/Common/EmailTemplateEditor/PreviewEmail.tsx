import React from 'react';

interface PreviewEmailProps {
  slotContent: React.ReactNode;
  slotClose: React.ReactNode;
}

export function PreviewEmail({ slotContent, slotClose }: PreviewEmailProps) {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-end p-2'>{slotClose}</div>
      <div className='flex-grow overflow-auto'>{slotContent}</div>
    </div>
  );
}
