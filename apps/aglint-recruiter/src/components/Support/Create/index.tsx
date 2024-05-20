// import {
//   Autocomplete,
//   AutocompleteProps,
//   Avatar,
//   // Checkbox,
//   Chip,
//   Stack,
//   TextField,
//   TextFieldProps,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// import { Checkbox } from '@/devlink/Checkbox';
// import { InboxContactSupport } from '@/devlink/InboxContactSupport';
// import { palette } from '@/src/context/Theme/Theme';
// import {
//   CandidateType,
//   JobApplicationType,
//   SupportTicketType,
// } from '@/src/types/data.types';
// import { getCompanyIcon } from '@/src/utils/icon/iconUtils';
// import { supabase } from '@/src/utils/supabase/client';
// import { capitalize } from '@/src/utils/text/textUtils';
// import toast from '@/src/utils/toast';

function Support() {
  // const router = useRouter();
  // const [applicationId, setApplicationId] = useState<string>(null);
  // const [ticketId, setTicketId] = useState<string>(null);
  // const [jobDetails, setJobDetails] = useState<
  //   JobApplicationType &
  //     CandidateType & {
  //       jobDetails: {
  //         company: string;
  //         job_title: string;
  //         recruiter_id: string;
  //       };
  //       companyDetails: {
  //         name: string;
  //         logo: string;
  //       };
  //     }
  // >(null);
  // const [details, setDetails] = useState<{
  //   title: string;
  //   type: string;
  //   description: string;
  //   email_update: boolean;
  //   email: string;
  // }>(null);
  // const [detailsError, setDetailsError] = useState({
  //   title: false,
  //   type: false,
  //   description: false,
  //   email: false,
  // });

  // const checkValidations = () => {
  //   const temp = { ...detailsError };
  //   let result = true;
  //   if (!details.title || details.title.trim() === '') {
  //     temp.title = true;
  //     result = false;
  //   }
  //   if (!details.type || details.type.trim() === '') {
  //     temp.type = true;
  //     result = false;
  //   }
  //   if (!details.description || details.description.trim() === '') {
  //     temp.description = true;
  //     result = false;
  //   }
  //   if (
  //     details.email_update &&
  //     (!details.email || details.email.trim() === '')
  //   ) {
  //     temp.email = true;
  //     result = false;
  //   }
  //   setDetailsError(temp);
  //   return result;
  // };

  // useEffect(() => {
  //   if (router.isReady) {
  //     const id = router.query.id as string | null;
  //     if (id) {
  //       getApplicationDetails(id)
  //         .then((data) => {
  //           setJobDetails(data);
  //           if (data?.email && data.email.trim() !== '') {
  //             setDetails({ ...details, email: data.email });
  //           }
  //         })
  //         .catch((e) => {
  //           toast.error(e.message);
  //         });
  //       setApplicationId(id);
  //     }
  //     // getJobTitle(id).then((data) => {
  //     //   setJobDetails(data);
  //     // });
  //   }
  // }, [router.isReady]);
  // return (
  //   <InboxContactSupport
  //     slotCheckbox={
  //       <Checkbox
  //         isChecked={Boolean(details?.email_update)}
  //         onClickCheck={{
  //           onClick: () => {
  //             setDetails({ ...details, email_update: !details?.email_update });
  //           },
  //         }}
  //       />
  //     }
  //     slotFormSupport={
  //       <AddSupportTicket
  //         {...{ details, detailsError, setDetailsError, setDetails }}
  //       />
  //     }
  //     textJobCompanyLocations={
  //       <>{jobDetails?.jobDetails?.company || 'details...'}</>
  //     }
  //     textJobRole={jobDetails?.jobDetails?.job_title || 'loading'}
  //     onClickReport={{
  //       onClick: () => {
  //         if (checkValidations()) {
  //           submitSupportTicketInDb({
  //             support_group_id:
  //               details.type === allType[1]
  //                 ? jobDetails.jobDetails.recruiter_id
  //                 : process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_ID,
  //             assign_to: null,
  //             // details.type === allType[1]
  //             //   ? jobDetails.jobDetails.recruiter_id
  //             //   : process.env.NEXT_PUBLIC_DEFAULT_COMPANY,
  //             id: generateCustomUUID(
  //               jobDetails?.jobDetails?.company || 'aglint',
  //             ),
  //             type: details.type,
  //             content: [
  //               {
  //                 type: 'message',
  //                 from: 'user',
  //                 id: null,
  //                 name: `${jobDetails.first_name} ${jobDetails.last_name}`,
  //                 text: details.description,
  //                 timeStamp: new Date().toISOString(),
  //               },
  //             ],
  //             job_id: jobDetails.job_id,
  //             title: details.title,
  //             user_id: null,
  //             user_name: `${jobDetails.first_name} ${jobDetails.last_name}`,
  //             application_id: applicationId,
  //             email_updates: details.email_update,
  //             email: details.email,
  //           }).then((data) => {
  //             data && setTicketId(data.id);
  //           });
  //         }
  //       },
  //     }}
  //     isTicketSubmitSuccessfully={Boolean(ticketId)}
  //     onClickCopyLinkToTicket={{
  //       onClick: () => {
  //         navigator.clipboard
  //           .writeText(`${window.location.host}/support/${ticketId}`)
  //           .then(() => {
  //             toast.message('Copied to clipboard.');
  //           });
  //       },
  //     }}
  //     slotLogo={
  //       <Avatar
  //         variant='rounded'
  //         src={
  //           jobDetails?.companyDetails?.logo ||
  //           getCompanyIcon(jobDetails?.companyDetails?.name) ||
  //           ''
  //         }
  //         alt={capitalize(jobDetails?.companyDetails?.name || '')}
  //         sx={{
  //           width: '100%',
  //           height: '100%',
  //         }}
  //       />
  //     }
  //   />
  // );
  return <>coming soon</>;
}

export default Support;

// const getApplicationDetails = async (id: string) => {
//   try {
//     const { data } = await axios.post('/api/support/getApplicationData', {
//       application_id: id,
//     });
//     return data.data;
//   } catch (e: any) {
//     toast.error(e);
//   }
// };

// const AddSupportTicket = ({
//   details,
//   detailsError,
//   setDetailsError,
//   setDetails,
// }: {
//   details: {
//     title: string;
//     type: string;
//     description: string;
//     email_update: boolean;
//     email: string;
//   };
//   detailsError: {
//     title: boolean;
//     type: boolean;
//     description: boolean;
//     email: boolean;
//   };
//   // eslint-disable-next-line no-unused-vars
//   setDetailsError: (x: {
//     title: boolean;
//     type: boolean;
//     description: boolean;
//     email: boolean;
//   }) => void;
//   // eslint-disable-next-line no-unused-vars
//   setDetails: (x: {
//     title: string;
//     type: string;
//     description: string;
//     email_update: boolean;
//     email: string;
//   }) => void;
// }) => {
//   return (
//     <Stack gap={2}>
//       <CustomTextField
//         required
//         value={details?.title}
//         label='Title'
//         placeholder='Enter your issue title'
//         error={detailsError?.title}
//         onFocus={() => {
//           setDetailsError({ ...detailsError, title: false });
//         }}
//         onChange={(e) => setDetails({ ...details, title: e.target.value })}
//       />
//       <CustomAutocomplete
//         required
//         label='Issue Type'
//         placeholder='Choose issue type'
//         error={detailsError?.type}
//         onFocus={() => {
//           setDetailsError({ ...detailsError, type: false });
//         }}
//         defaultValues={''}
//         values={details?.type}
//         options={allType}
//         freeSolo
//         onChange={(_, newValue) => {
//           if (newValue) {
//             // const tempItems = newValue.pop();
//             // tempItems &&
//             //   newValue.push(
//             //     ...tempItems.split(',').filter((ele) => ele.trim() !== ''),
//             //   );
//             setDetails({
//               ...details,
//               type: newValue,
//             });
//           }
//         }}
//       />
//       <CustomTextField
//         required
//         multiline
//         error={detailsError?.description}
//         placeholder='Describe your issue'
//         onFocus={() => {
//           setDetailsError({ ...detailsError, description: false });
//         }}
//         minRows={3}
//         value={details?.description}
//         label='Description'
//         onChange={(e) =>
//           setDetails({ ...details, description: e.target.value })
//         }
//       />

//       {details?.email_update && (
//         <CustomTextField
//           required
//           value={details?.email}
//           error={detailsError?.email}
//           label='Email'
//           onFocus={() => {
//             setDetailsError({ ...detailsError, email: false });
//           }}
//           onChange={(e) => setDetails({ ...details, email: e.target.value })}
//         />
//       )}
//     </Stack>
//   );
// };

// const CustomTextField = (rest: TextFieldProps) => {
//   const { label, required, sx, error, ...props } = rest;
//   return (
//     <Stack>
//       <Typography fontFamily={'inherit'} fontSize={'14px'}>
//         {label}
//         {required && '*'}
//         {/* {rest?.label && ':'} */}
//       </Typography>
//       {/* @ts-ignore */}
//       <TextField
//         {...props}
//         sx={{
//           ...sx,
//           padding: '0px',
//           '& .MuiInputBase-root': { padding: '10px 12px' },
//           '& input': { padding: '0px' },
//           '& .MuiFilledInput-root': error
//             ? {
//                 borderColor: palette.red[600],
//                 outlineColor: palette.red[200],
//               }
//             : {},
//         }}
//       />
//     </Stack>
//   );
// };
// // @ts-ignore
// const CustomAutocomplete = (props: AutocompleteProps) => {
//   const { label, required, error, placeholder, ...rest } = props;
//   return (
//     <Stack>
//       <Typography fontFamily={'inherit'} fontSize={'14px'}>
//         {label}
//         {required && '*'}
//         {/* {rest?.label && ':'} */}
//       </Typography>
//       <Autocomplete
//         {...rest}
//         renderTags={(value: readonly string[], getTagProps) =>
//           value.map((option: string, index: number) => (
//             <Chip
//               key={index}
//               variant='outlined'
//               label={option}
//               {...getTagProps({ index })}
//             />
//           ))
//         }
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             inputProps={{
//               ...params.inputProps,
//             }}
//             InputProps={{
//               ...params.InputProps,
//             }}
//             placeholder={placeholder}
//             variant='filled'
//             sx={{
//               '& input': { padding: '0px!important' },
//               '& .MuiInputBase-root': {
//                 padding: '10px 39px 10px 12px !important',
//               },
//               '& .MuiFilledInput-root': error
//                 ? {
//                     borderColor: palette.red[600],
//                     outlineColor: palette.red[200],
//                   }
//                 : {},
//             }}
//           />
//         )}
//       />
//     </Stack>
//   );
// };
// const allType = ['Technical difficulty', 'Other'];

// const submitSupportTicketInDb = async (
//   ticketData: Partial<SupportTicketType>,
// ) => {
//   const { data, error } = await supabase
//     .from('support_ticket')
//     //   @ts-ignore
//     .insert(ticketData)
//     .select();
//   if (!error && data.length) {
//     return data[0];
//   }
//   return null;
// };

// function generateCustomUUID(inputString) {
//   const trimmedString = inputString.replace(/\s+/g, '');
//   const prefix = trimmedString.slice(0, 4);
//   const randomNumberPart = Array.from({ length: 8 }, () =>
//     Math.floor(Math.random() * 10),
//   ).join('');
//   const customUUID = prefix + randomNumberPart;
//   return customUUID.toUpperCase();
// }
