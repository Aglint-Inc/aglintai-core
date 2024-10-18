/* eslint-disable no-unused-vars */
import { X } from 'lucide-react';
import React from 'react';

function Chip({
  name,
  index,
  id,
  onRemove,
  disable = false,
  handleRemoveKeyword,
}: {
  name: string;
  index?: number;
  disable?: boolean;
  onRemove?: () => void;
  id?: number | string;
  handleRemoveKeyword?: ({
    id,
    name,
  }: {
    id: number | string;
    name: string;
  }) => void;
}) {
  return (
    <span
      key={index}
      className={`flex items-center rounded-sm bg-muted px-3 py-1 text-sm text-foreground ${disable ? 'opacity-[0.6]' : ''}`}
    >
      {name}
      {!disable && (
        <button
          onClick={() => {
            if (id && handleRemoveKeyword) handleRemoveKeyword({ id, name });
            else onRemove && onRemove();
          }}
          className='ml-2 text-muted-foreground duration-200 hover:text-foreground focus:outline-none'
          aria-label={`Remove ${name}`}
        >
          <X className='h-3 w-3' />
        </button>
      )}
    </span>
  );
}

export default Chip;

/* eslint-disable no-unused-vars */
// import { X } from 'lucide-react';
// import React from 'react';

// function Chip({
//   name,
//   index,
//   id,
//   disable = false,
//   handleRemoveKeyword,
// }: {
//   name: string;
//   index: number;
//   disable?: boolean;
//   id: number | string;
//   handleRemoveKeyword?: ({
//     id,
//     name,
//   }: {
//     id: number | string;
//     name: string;
//   }) => void;
// }) {
//   return (
//     <span
//       key={index}
//       className={`bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center ${disable ? 'opacity-[0.8]' : ''}`}
//     >
//       {name}
//       {disable && (
//         <button
//           onClick={() => handleRemoveKeyword({ id, name })}
//           className='ml-2 text-muted-foreground hover:text-gray-700 focus:outline-none'
//           aria-label={`Remove ${name}`}
//         >
//           <X className='h-4 w-4' />
//         </button>
//       )}
//     </span>
//   );
// }

// export default Chip;
