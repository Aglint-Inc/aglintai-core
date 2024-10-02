import { X } from 'lucide-react';
import React from 'react';

function DepartmentNameChip({
  name,
  index,
  id,
  handleRemoveKeyword,
}: {
  name: string;
  index: number;
  id: number | string;
  // eslint-disable-next-line no-unused-vars
  handleRemoveKeyword: (id: number | string) => void;
}) {
  return (
    <span
      key={index}
      className='flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700'
    >
      {name}
      <button
        onClick={() => handleRemoveKeyword(id)}
        className='ml-2 text-muted-foreground hover:text-gray-700 focus:outline-none'
        aria-label={`Remove ${name}`}
      >
        <X className='h-4 w-4' />
      </button>
    </span>
  );
}

export default DepartmentNameChip;
