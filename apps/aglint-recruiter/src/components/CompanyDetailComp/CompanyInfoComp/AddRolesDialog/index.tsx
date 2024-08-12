// import { Autocomplete, Dialog, Stack, Typography } from '@mui/material';
// import React, { useEffect, useRef, useState } from 'react';

// import { AddRolesPop } from '@/devlink/AddRolesPop';
// import { ButtonSoft } from '@/devlink/ButtonSoft';
// import { ButtonSolid } from '@/devlink/ButtonSolid';
// import { IconButtonGhost } from '@/devlink/IconButtonGhost';
// import { RolesPill } from '@/devlink/RolesPill';
// import UITextField from '@/src/components/Common/UITextField';
// import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

// interface RolesProps {
//   handleClose: () => void;
//   open: boolean;
//   handleChange: (
//     // eslint-disable-next-line no-unused-vars
//     recruiter: ReturnType<typeof useAuthDetails>['recruiter'],
//   ) => void;
// }

// const AddRolesDialog: React.FC<RolesProps> = ({
//   handleClose,
//   open,
//   handleChange,
// }) => {
//   const { recruiter } = useAuthDetails();
//   const [inputValue, setInputValue] = useState('');
//   const [options, setOptions] = useState([]);
//   const [roles, setRoles] = useState<string[]>([]);
//   const [inputError, setInputError] = useState(false);
//   const iniRoles = useRef([]);

//   const handleInputChange = (event, newInputValue) => {
//     setInputValue(newInputValue);
//     // Add the user's input as the first option
//     if (!initialRoles.includes(newInputValue) && newInputValue.trim() !== '') {
//       setOptions([newInputValue, ...initialRoles]);
//     } else {
//       setOptions(initialRoles);
//     }
//   };

//   useEffect(() => {
//     if (recruiter?.available_roles && open) {
//       setRoles(recruiter?.available_roles);
//       setOptions(initialRoles);
//       iniRoles.current = recruiter?.available_roles;
//     }
//   }, [recruiter?.available_roles, open]);

//   let initialRoles = [];
//   if (localStorage?.getItem('roles')) {
//     if (Array.isArray(JSON.parse(localStorage?.getItem('roles')))) {
//       initialRoles = JSON.parse(localStorage?.getItem('roles'));
//     }
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && inputValue.trim() !== '') {
//       const newValue = inputValue.trim();
//       if (!roles.includes(newValue)) {
//         setRoles([...new Set([...roles, newValue])]);
//       }
//       setTimeout(() => {
//         setInputValue('');
//         setOptions(initialRoles);
//       }, 10);
//     }
//   };

//   function compareChanges() {
//     const set1 = new Set(roles);
//     const set2 = new Set(iniRoles.current);

//     if (set1.size !== set2.size) {
//       return false;
//     }
//     return [...set1].every((element) => set2.has(element));
//   }

//   return (
//     <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
//       <AddRolesPop
//         slotRolesPills={roles.map((role, ind) => {
//           return (
//             <RolesPill
//               key={ind}
//               textRoles={role}
//               onClickRemoveRoles={{
//                 onClick: () => {
//                   setRoles(roles.filter((rol) => role != rol));
//                 },
//               }}
//             />
//           );
//         })}
//         slotInput={
//           <Autocomplete
//             sx={{ mt: roles.length > 0 ? 'var(--space-2)' : '0px' }}
//             fullWidth
//             freeSolo
//             id='free-solo-2-demo'
//             options={options}
//             inputValue={inputValue}
//             onInputChange={handleInputChange}
//             getOptionLabel={(option) => option}
//             renderOption={(props, option) => {
//               if (option === inputValue) {
//                 return (
//                   <li
//                     {...props}
//                     // style={{ background: '#d8dcde50', margin: '1px' }}
//                   >
//                     <Stack
//                       direction={'row'}
//                       width={'100%'}
//                       onClick={() => {
//                         setRoles([...new Set([...roles, option])]);
//                         setTimeout(() => {
//                           setInputValue('');
//                           setOptions(initialRoles);
//                         }, 50);
//                       }}
//                       alignItems={'center'}
//                       spacing={'var(--space-1)'}
//                     >
//                       <Typography variant='body1'>{option}</Typography>
//                       <Typography variant='caption'>- Add Role</Typography>
//                     </Stack>
//                   </li>
//                 );
//               }
//               return (
//                 <li {...props}>
//                   <Stack
//                     width={'100%'}
//                     onClick={() => {
//                       if (!roles.includes(option)) {
//                         setRoles([...new Set([...roles, option])]);
//                         setTimeout(() => {
//                           setInputValue('');
//                         }, 50);
//                         setOptions(initialRoles);
//                       }
//                     }}
//                   >
//                     <Typography variant='body1'>{option}</Typography>
//                   </Stack>
//                 </li>
//               );
//             }}
//             renderInput={(params) => (
//               <UITextField
//                 {...params}
//                 placeholder='Type or Choose from the list and press enter'
//                 InputProps={{
//                   ...params.InputProps,
//                   type: 'search',
//                 }}
//                 onFocus={() => setInputError(false)}
//                 error={inputError}
//                 helperText='Make any changes then add the Roles'
//                 onKeyDown={handleKeyDown}
//               />
//             )}
//           />
//         }
//         slotClose={
//           <IconButtonGhost
//             iconName='close'
//             size={2}
//             color={'neutral'}
//             onClickButton={{
//               onClick: () => {
//                 handleClose();
//               },
//             }}
//           />
//         }
//         slotButton={
//           <>
//             <ButtonSoft
//               textButton='Cancel'
//               size={2}
//               color={'neutral'}
//               onClickButton={{
//                 onClick: () => {
//                   handleClose();
//                 },
//               }}
//             />
//             <ButtonSolid
//               textButton='Add'
//               size={2}
//               onClickButton={{
//                 onClick: () => {
//                   if (!compareChanges()) {
//                     handleChange({
//                       ...recruiter,
//                       available_roles: roles,
//                     });
//                     handleClose();
//                   } else {
//                     setInputError(true);
//                   }
//                 },
//               }}
//             />
//           </>
//         }
//       />
//     </Dialog>
//   );
// };

// export default AddRolesDialog;
