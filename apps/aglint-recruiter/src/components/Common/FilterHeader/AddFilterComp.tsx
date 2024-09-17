// import { Button } from '@components/ui/button';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@components/ui/popover';
// import { AddFilter } from '@devlink2/AddFilter';
// import React from 'react';

// import { capitalizeFirstLetter } from '@/utils/text/textUtils';

// export function AddFilterComp({
//   filterList,
//   setVisible,
// }: {
//   filterList: { name: string; index: number }[];
//   // eslint-disable-next-line no-unused-vars
//   setVisible: (index: number) => void;
// }) {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant='outline' className='align-items-center'>
//           <AddFilter />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className='w-auto p-0'>
//         <div className='flex flex-col'>
//           {filterList.map((item, i) => (
//             <Button
//               key={i}
//               variant='ghost'
//               className='justify-start'
//               onClick={() => setVisible(item.index)}
//             >
//               {capitalizeFirstLetter(item.name)}
//             </Button>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
