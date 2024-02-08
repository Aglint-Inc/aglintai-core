// import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';

// import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { RecruiterUserType } from '@/src/types/data.types';

// function TeamAutoComplete() {
//   const { members } = useAuthDetails();
//   const [options, setOptions] = useState<RecruiterUserType[]>(members || []);
//   const [inputValue, setInputValue] = useState('');
//   const [departmentState, setDepartmentState] = useState<string[]>([]);

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && inputValue.trim() !== '') {
//       const newValue = inputValue.trim();
//       if (!departmentState.includes(newValue)) {
//         setDepartmentState([
//           ...new Set([...departmentState, newValue.toLocaleLowerCase()]),
//         ]);
//       }
//     }
//   };

//   const handleInputChange = (event, newInputValue) => {
//     setInputValue(newInputValue);
//   };

//   return (
//     <>
//       <Autocomplete
//         fullWidth
//         freeSolo
//         id='free-solo-2-demo'
//         options={options}
//         inputValue={inputValue}
//         onInputChange={handleInputChange}
//         getOptionLabel={(option) => option.first_name}
//         renderOption={(props, option) => {
//           if (option === inputValue) {
//             return (
//               <li {...props} style={{ background: '#d8dcde50', margin: '1px' }}>
//                 <Stack
//                   direction={'row'}
//                   width={'100%'}
//                   onClick={() => {
//                     setDepartmentState([
//                       ...new Set([
//                         ...departmentState,
//                         option.toLocaleLowerCase(),
//                       ]),
//                     ]);
//                     setTimeout(() => {
//                       setInputValue('');
//                       setOptions(initialDepartments);
//                     }, 10);
//                   }}
//                   alignItems={'center'}
//                   spacing={'4px'}
//                 >
//                   <Typography variant='body2'>{option}</Typography>
//                   <Typography variant='caption'>- Add Department</Typography>
//                 </Stack>
//               </li>
//             );
//           }
//           return (
//             <li {...props}>
//               <Stack
//                 width={'100%'}
//                 onClick={() => {
//                   if (!departmentState.includes(option)) {
//                     setDepartmentState([
//                       ...new Set([
//                         ...departmentState,
//                         option.toLocaleLowerCase(),
//                       ]),
//                     ]);
//                     setTimeout(() => {
//                       setInputValue('');
//                     }, 50);
//                     setOptions(initialDepartments);
//                   }
//                 }}
//               >
//                 <Typography variant='body1'>{option}</Typography>
//               </Stack>
//             </li>
//           );
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label='Type or Choose from the list and press enter'
//             InputProps={{
//               ...params.InputProps,
//               type: 'search',
//               disableUnderline: true,
//             }}
//             onKeyDown={handleKeyDown}
//           />
//         )}
//       />
//     </>
//   );
// }

// export default TeamAutoComplete;
