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
  id: number;
  // eslint-disable-next-line no-unused-vars
  handleRemoveKeyword: (id: number) => void;
}) {
  return (
    <span
      key={index}
      className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center'
    >
      {name}
      <button
        onClick={() => handleRemoveKeyword(id)}
        className='ml-2 text-gray-500 hover:text-gray-700 focus:outline-none'
        aria-label={`Remove ${name}`}
      >
        <X className='h-4 w-4' />
      </button>
    </span>
  );
}

export default DepartmentNameChip;
