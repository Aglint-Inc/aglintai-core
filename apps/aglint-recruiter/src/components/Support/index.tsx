// import {
//   Avatar,
//   AvatarProps,
//   Drawer,
//   InputAdornment,
//   Stack,
//   TextField,
//   TextFieldProps,
// } from '@mui/material';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react';
// import { useEffect } from 'react';

// import SupportEmptyLottie from '@/public/lottie/supportEmptyLottie';

// import { AllTickets } from '@/devlink/AllTickets';
// import { Assignee } from '@/devlink/Assignee';
// import { InboxTickets } from '@/devlink/InboxTickets';
// import { Priority } from '@/devlink/Priority';
// import { StatusPill } from '@/devlink/StatusPill';
// import { TicketEmptyState } from '@/devlink/TicketEmptyState';
// import { WelcomeMatTickets } from '@/devlink2/WelcomeMatTickets';
// // import {
// //   getPriorityIcon,
// //   useSupportContext,
// // } from '@/src/context/SupportContext/SupportContext';
// import { palette } from '@/src/context/Theme/Theme';
// import { Public_jobsType, Support_ticketType } from '@/src/types/data.types';
// import {
//   // allPriority,
//   // allStatus,
//   mapPriorityColor,
//   mapStatusColor,
// } from '@/src/utils/support/supportUtils';
// import { capitalizeAll, getRandomColor } from '@/src/utils/text/textUtils';

// import Loader from '../Common/Loader';
// import { capitalize } from '../JobApplicationsDashboard/utils';
// import SupportTicketDetails from './SupportTicket';
// dayjs.extend(relativeTime);

function Support() {
  // const {
  //   tickets,
  //   openTicket,
  //   // setOpenTicket,
  //   setOpenTicketIndex,
  //   allChecked,
  //   setAllChecked,
  //   filters,
  //   sort,
  //   setSort,
  //   sortOrder,
  //   setSortOrder,
  //   search,
  //   setSearch,
  //   randomColors,
  //   loading,
  // } = useSupportContext();
  // const router = useRouter();

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (!router.query.status) {
  //       // router.push(`?status=all`, undefined, {
  //       //   shallow: true,
  //       // });
  //       router.query = { ...router.query, status: 'all' };
  //     }
  //   }
  // }, [router.isReady]);
  // return (
  //   <>
  //     {loading ? (
  //       <Loader />
  //     ) : tickets.length == 0 ? (
  //       <WelcomeMatTickets />
  //     ) : (
  //       <AllTickets
  //         slotTicketList={
  //           tickets.length ? (
  //             tickets.map((ticket, index) => (
  //               <Ticket
  //                 key={ticket.id}
  //                 ticket={ticket}
  //                 index={index}
  //                 candidateBackgroundColor={randomColors[ticket.id]}
  //               />
  //             ))
  //           ) : (
  //             <TicketEmptyState slotLottie={<SupportEmptyLottie />} />
  //           )
  //         }
  //         onClickAllTicketCheck={{
  //           onClick: () => {
  //             setAllChecked(!allChecked);
  //           },
  //         }}
  //         isAllTicketChecked={allChecked}
  //         onClickPriority={{
  //           onClick: () => {
  //             if (sort === 'priority') {
  //               // @ts-ignore
  //               setSortOrder(-1 * sortOrder);
  //             } else {
  //               setSort('priority');
  //               setSortOrder(1);
  //             }
  //           },
  //         }}
  //         isSortPriorityArrowVisible={sort === 'priority'}
  //         onClickSortCandidateName={{
  //           onClick: () => {
  //             if (sort === 'name') {
  //               // @ts-ignore
  //               setSortOrder(-1 * sortOrder);
  //             } else {
  //               setSort('name');
  //               setSortOrder(1);
  //             }
  //           },
  //         }}
  //         isSortCandidateArrowVisible={sort === 'name'}
  //         onClickSortAssignee={{
  //           onClick: () => {
  //             if (sort === 'assignee') {
  //               // @ts-ignore
  //               setSortOrder(-1 * sortOrder);
  //             } else {
  //               setSort('assignee');
  //               setSortOrder(1);
  //             }
  //           },
  //         }}
  //         isSortAssigneeArrowVisible={sort === 'assignee'}
  //         onClickSortStatus={{
  //           onClick: () => {
  //             if (sort === 'status') {
  //               // @ts-ignore
  //               setSortOrder(-1 * sortOrder);
  //             } else {
  //               setSort('status');
  //               setSortOrder(1);
  //             }
  //           },
  //         }}
  //         isSortStatusVisible={sort === 'status'}
  //         onClickSortLastUpdate={{
  //           onClick: () => {
  //             if (sort === 'lastUpdate') {
  //               // @ts-ignore
  //               setSortOrder(-1 * sortOrder);
  //             } else {
  //               setSort('lastUpdate');
  //               setSortOrder(1);
  //             }
  //           },
  //         }}
  //         isSortUpdateArrowVisible={sort === 'lastUpdate'}
  //         onClickSortJobInfo={{
  //           onClick: () => {
  //             if (sort === 'jobInfo') {
  //               // @ts-ignore
  //               setSortOrder(-1 * sortOrder);
  //             } else {
  //               setSort('jobInfo');
  //               setSortOrder(1);
  //             }
  //           },
  //         }}
  //         isSortJobArrowVisible={sort === 'jobInfo'}
  //         slotSearch={
  //           <CustomTextField
  //             placeholder='Search'
  //             value={search}
  //             name='search'
  //             onChange={(e) => {
  //               setSearch(e.target.value);
  //             }}
  //             sx={{ height: '32px', width: '245px' }}
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment
  //                   position='start'
  //                   sx={{
  //                     '&': {
  //                       margin: '0!important',
  //                       paddingRight: '8px',
  //                     },
  //                   }}
  //                 >
  //                   <SearchIcon />
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />
  //         }
  //         textHeaderStatus={capitalize(filters.status)}
  //       />
  //     )}

  //     <Drawer
  //       open={Boolean(openTicket)}
  //       onClose={() => {
  //         setOpenTicketIndex(-1);
  //       }}
  //       anchor={'right'}
  //       sx={{
  //         '& .MuiPaper-root': { overflowY: 'hidden' },
  //       }}
  //     >
  //       <SupportTicketDetails
  //         ticketProp={openTicket}
  //         onClose={() => {
  //           setOpenTicketIndex(-1);
  //         }}
  //       />
  //     </Drawer>
  //   </>
  // );
  return <>Coming Soon</>;
}
export default Support;

// const Ticket = ({
//   ticket,
//   index,
//   candidateBackgroundColor,
// }: {
//   ticket: Support_ticketType & { jobsDetails: Public_jobsType };
//   index: number;
//   candidateBackgroundColor?: string;
// }) => {
//   const { updateTicket, allAssignee } = useSupportContext();
//   const { setOpenTicketIndex, allChecked } = useSupportContext();
//   const [checked, setChecked] = useState(false);
//   const assignedTo =
//     ticket &&
//     allAssignee
//       .find((item) => ticket.support_group_id === item.recruiter.id)
//       ?.employees.find((employee) => {
//         return ticket.assign_to === employee.user_id;
//       });
//   return (
//     <InboxTickets
//       key={ticket.id}
//       textTicketsId={ticket.id}
//       // textAssigneeName={ticket.assign_to || 'Not Assigned'}
//       slotIssue={
//         <LineText
//           line='two'
//           color={palette.grey[600]}
//           text={
//             ticket.content?.length
//               ? // @ts-ignore
//                 ticket.content[ticket.content.length - 1].text
//               : ''
//           }
//         />
//       }
//       slotAssignee={
//         <AssignmentComponent
//           assign_to={capitalize(
//             `${assignedTo?.first_name || ''} ${assignedTo?.last_name || ''}`,
//           )}
//           imageUrl={assignedTo?.profile_image}
//           // @ts-ignore
//           setAssignedTo={(assign_to) => updateTicket({ assign_to }, ticket.id)}
//         />
//       }
//       textCandidateName={ticket.user_name}
//       textJobRole={
//         <LineText line='two' text={ticket.jobsDetails?.job_title || ''} />
//       }
//       isChecked={allChecked || checked}
//       // textStatus={ticket.state}
//       slotStatus={
//         <StatusComponent
//           status={capitalizeAll(ticket?.state || '')}
//           setStatus={(state) => {
//             // @ts-ignore
//             updateTicket({ state }, ticket.id);
//           }}
//         />
//       }
//       // textPriority={ticket.priority}
//       slotPriority={
//         <PriorityComponent
//           priority={capitalize(ticket.priority)}
//           setPriority={(priority) => {
//             // @ts-ignore
//             updateTicket({ priority }, ticket.id);
//           }}
//         />
//       }
//       textDate={dayjs(ticket.updated_at).fromNow()}
//       textCompanyLocations={''}
//       textIssues={<LineText text={ticket.title || ''} />}
//       // colorTextPriority={{
//       //   style: {
//       //     color: mapPriorityColor(ticket.priority),
//       //   },
//       // }}
//       // colorBgPropsStatus={{
//       //   style: {
//       //     backgroundColor: mapPriorityColor(ticket.priority),
//       //   },
//       // }}
//       // slotPriorityIcon={<>{getPriorityIcon(ticket.priority || '')}</>}
//       // slotAssigneeImage={
//       //   <Avatar
//       //     src=''
//       //     alt={ticket.assign_to || 'Not Assigned'}
//       //     sx={{ height: '100%', width: '100%' }}
//       //   />
//       // }
//       slotCandidateImage={
//         <CustomAvatar
//           src=''
//           alt={ticket.user_name || ''}
//           backgroundColor={candidateBackgroundColor}
//         />
//       }
//       onClickCheck={{
//         onClick: (e) => {
//           e.stopPropagation();
//           setChecked(!checked);
//         },
//       }}
//       onClickCard={{
//         onClick: () => {
//           // router.push(`/support/${ticket.id}`);
//           setOpenTicketIndex(index);
//         },
//       }}
//     />
//   );
// };

// const AssignmentComponent = ({
//   assign_to,
//   imageUrl, // setAssignedTo,
// }: {
//   assign_to: string;
//   imageUrl?: string;
//   // eslint-disable-next-line no-unused-vars
//   setAssignedTo: (value: string) => void;
// }) => {
//   // const { allAssignee } = useSupportContext();
//   // const [open, setOpen] = useState(false);

//   return (
//     // <Stack
//     //   onClick={(e) => {
//     //     e.stopPropagation();
//     //     open || setOpen(true);
//     //   }}
//     //   sx={{
//     //     cursor: 'pointer',
//     //   }}
//     // >
//     //   {open ? (
//     //     <CustomAutoComplete
//     //       setOpen={setOpen}
//     //       value={assign_to}
//     //       options={allAssignee.map((assignee) => ({
//     //         id: assignee.id,
//     //         title: assignee.title,
//     //       }))}
//     //       onChange={setAssignedTo}
//     //     />
//     //   ) : (
//     <Assignee
//       textAssigneeName={
//         <LineText
//           line='one'
//           color={palette.grey[600]}
//           text={assign_to || 'Not Assigned'}
//         />
//       }
//       slotAssigneeImage={
//         <CustomAvatar src={imageUrl || ''} alt={'user_name'} />
//       }
//     />
//     //   )}
//     // </Stack>
//   );
// };

// const PriorityComponent = ({
//   priority, // setPriority,
// }: {
//   priority: string;
//   // eslint-disable-next-line no-unused-vars
//   setPriority: (value: string) => void;
// }) => {
//   // const [open, setOpen] = useState(false);

//   return (
//     // <Stack
//     //   onClick={(e) => {
//     //     e.stopPropagation();
//     //     open || setOpen(true);
//     //   }}
//     //   sx={{
//     //     cursor: 'pointer',
//     //   }}
//     // >
//     //   {open ? (
//     //     <CustomAutoComplete
//     //       setOpen={setOpen}
//     //       value={priority}
//     //       options={allPriority}
//     //       onChange={setPriority}
//     //     />
//     //   ) : (
//     <Priority
//       textPriority={priority}
//       slotPriorityIcon={getPriorityIcon(priority)}
//       colorTextPriority={{
//         style: {
//           color: mapPriorityColor(priority),
//         },
//       }}
//     />
//     //   )}
//     // </Stack>
//   );
// };

// const StatusComponent = ({
//   status, // setStatus,
// }: {
//   status: string;
//   // eslint-disable-next-line no-unused-vars
//   setStatus: (value: string) => void;
// }) => {
//   // const [open, setOpen] = useState(false);

//   return (
//     // <Stack
//     //   onClick={(e) => {
//     //     e.stopPropagation();
//     //     open || setOpen(true);
//     //   }}
//     //   sx={{
//     //     cursor: 'pointer',
//     //   }}
//     // >
//     //   {open ? (
//     //     <CustomAutoComplete
//     //       setOpen={setOpen}
//     //       value={status}
//     //       options={allStatus}
//     //       onChange={setStatus}
//     //     />
//     //   ) : (
//     <StatusPill
//       textStatus={status}
//       colorBgPropsStatus={{
//         style: {
//           backgroundColor: mapStatusColor(status),
//         },
//       }}
//     />
//     //   )}
//     // </Stack>
//   );
// };

// // const CustomAutoComplete = ({
// //   value,
// //   options,
// //   setOpen,
// //   onChange,
// // }: {
// //   // eslint-disable-next-line no-unused-vars
// //   setOpen: (x: boolean) => void;
// //   options: string[] | { id: string; title: string }[];
// //   value: string;
// //   // eslint-disable-next-line no-unused-vars
// //   onChange: (value: string) => void;
// // }) => {
// //   return (
// //     <Autocomplete
// //       open={true}
// //       value={value}
// //       options={[...options]}
// //       getOptionLabel={(option) => {
// //         // @ts-ignore
// //         return capitalize(option.title || option);
// //       }}
// //       renderInput={(params) => (
// //         <TextField
// //           {...params}
// //           inputProps={{
// //             ...params.inputProps,
// //           }}
// //           InputProps={{
// //             ...params.InputProps,
// //             disableUnderline: true,
// //           }}
// //           variant='filled'
// //           // eslint-disable-next-line jsx-a11y/no-autofocus
// //           autoFocus={true}
// //           onBlur={() => {
// //             setOpen(false);
// //           }}
// //           sx={{
// //             minWidth: '150px',
// //             '& .MuiAutocomplete-root': { height: '30px' },
// //             '& .MuiFormControl-root ': { margin: 0 },

// //             '& input': { padding: '0px!important', fontSize: '14px' },
// //             '& .MuiInputBase-root': {
// //               padding: '4px 26px 4px 4px !important',
// //             },
// //             '& .MuiAutocomplete-endAdornment': {
// //               right: '4px!important',
// //             },
// //           }}
// //         />
// //       )}
// //       onChange={(_, newValue) => {
// //         if (newValue) {
// //           // @ts-ignore
// //           onChange(newValue.id || newValue);
// //           setOpen(false);
// //         }
// //       }}
// //     />
// //   );
// // };

// const LineText = ({
//   text,
//   color,
//   line = 'one',
// }: {
//   text: string;
//   color?: string;
//   line?: 'one' | 'two';
// }) => {
//   return (
//     <Stack
//       className={line === 'one' ? 'one-line-clamp' : 'two-line-clamp'}
//       dangerouslySetInnerHTML={{
//         __html: text,
//       }}
//       sx={{
//         color: color,
//       }}
//     ></Stack>
//   );
// };

// const CustomTextField = (rest: TextFieldProps) => {
//   const { sx, error, ...props } = rest;
//   return (
//     <Stack gap={1}>
//       {/* <Typography fontFamily={'inherit'}>
//         {label}
//         {required && '*'}
//     </Typography> * /}

//       {/* @ts-ignore */}
//       <TextField
//         variant='outlined'
//         {...props}
//         sx={{
//           ...sx,
//           padding: '0px',
//           '& .MuiInputBase-root': { padding: '6px 12px' },
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

// const CustomAvatar = ({
//   src,
//   alt,
//   variant,
//   isRandomColor = false,
//   backgroundColor,
// }: {
//   src: string;
//   alt: string;
//   variant?: AvatarProps['variant'];
//   isRandomColor?: boolean;
//   backgroundColor?: string;
// }) => {
//   return (
//     <Avatar
//       src={src}
//       alt={alt || ''}
//       {...(variant ? { variant } : {})}
//       sx={{
//         height: '100%',
//         width: '100%',
//         fontSize: '1em',
//         ...(backgroundColor
//           ? { backgroundColor }
//           : isRandomColor
//             ? { backgroundColor: getRandomColor() }
//             : {}),
//       }}
//     >
//       {alt.toLocaleUpperCase().slice(0, 1)}
//     </Avatar>
//   );
// };

// const SearchIcon = () => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='16'
//       height='16'
//       viewBox='0 0 16 16'
//       fill='none'
//     >
//       <path
//         fill-rule='evenodd'
//         clip-rule='evenodd'
//         d='M0 6C0 9.31371 2.68629 12 6 12C7.47685 12 8.82908 11.4664 9.87442 10.5815L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L10.5815 9.87442C11.4664 8.82908 12 7.47685 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6ZM6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z'
//         fill='#68737D'
//       />
//     </svg>
//   );
// };
