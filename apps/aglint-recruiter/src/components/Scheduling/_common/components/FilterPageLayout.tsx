import React from 'react';

export function FilterPageLayout({ slotFilter, slotBody }) {
  return (
    <div className={'w-full p-4'}>
      {slotFilter}
      <div className={'overflow-auto *:h-[calc(100vh-96px)]'}>{slotBody}</div>
    </div>
  );
}
