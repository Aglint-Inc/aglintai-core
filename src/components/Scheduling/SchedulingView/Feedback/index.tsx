// import { Dialog, Typography } from '@mui/material';
// import { useSearchParams } from 'next/navigation';
// import React, { useState } from 'react';

// import {
//   AvatarWithName,
//   Feedback,
//   FeedbackTableRow,
//   FeedbackViewPopup,
//   MyFeedbackPopup,
//   RoundedNumber,
//   ScheduleTabFeedback,
// } from '@/devlink3';
// import Avatar from '@/src/components/Common/MuiAvatar';
// import { ShowCode } from '@/src/components/Common/ShowCode';
// import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
// import DynamicLoader from '@/src/components/CompanyDetailComp/Interviewers/DynamicLoader';
// import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { CustomDatabase } from '@/src/types/customSchema';
// import { getFullName } from '@/src/utils/jsonResume';
// import toast from '@/src/utils/toast';

// import { TransformSchedule } from '../../Modules/types';
// import {
//   getInterviewers,
//   re_mapper,
//   saveInterviewerFeedback,
//   useInterviewerList,
// } from './util.function';

// const FeedbackWindow = ({ schedule }: { schedule: TransformSchedule }) => {
//   const param = useSearchParams();
//   const meeting_id = param.get('meeting_id');
//   const { data: interviewers, isLoading, refetch } = useInterviewerList();
//   const { isAllowed, userDetails } = useAuthDetails();
//   const user_id = userDetails?.user.id;
//   // const [loading, setLoading] = useState(true);
//   // const [interviewers, setInterviewers] = useState<
//   //   Awaited<ReturnType<typeof getInterviewers>>
//   // >([]);

//   const handelSubmit = async (
//     feedback: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
//   ) => {
//     await saveInterviewerFeedback({
//       // feedback: JSON.stringify(feedback),
//       feedback,
//       id: user_id,
//       meeting_id,
//     }).then(() => {
//       refetch();
//       return true;
//     });
//     return false;
//   };
//   // useEffect(() => {
//   //   if (meeting_id && user_id) {
//   //     getInterviewers({ meeting_id })
//   //       .then((data) => {
//   //         setInterviewers(data);
//   //       })
//   //   }
//   // }, [meeting_id, user_id]);
//   return (
//     <>
//       <ShowCode>
//         <ShowCode.When
//           isTrue={
//             schedule.interview_meeting.status === 'cancelled' ||
//             schedule.interview_meeting.status === 'confirmed' ||
//             schedule.interview_meeting.status === 'reschedule'
//           }
//         >
//           {`You can not give feedback because this interview is in ${schedule.interview_meeting.status} state`}
//         </ShowCode.When>
//         <ShowCode.When isTrue={isLoading}>
//           <DynamicLoader />
//         </ShowCode.When>
//         <ShowCode.When isTrue={isAllowed(['admin'])}>
//           <AdminFeedback {...{ user_id, interviewers, handelSubmit }} />
//         </ShowCode.When>
//         <ShowCode.Else>
//           <InterviewerFeedback {...{ interviewers, handelSubmit }} />
//         </ShowCode.Else>
//       </ShowCode>
//     </>
//   );
// };

// export default FeedbackWindow;

// const AdminFeedback = ({
//   user_id,
//   interviewers,
//   handelSubmit,
// }: {
//   user_id: string;
//   interviewers: Awaited<ReturnType<typeof getInterviewers>>;
//   handelSubmit: (
//     // eslint-disable-next-line no-unused-vars
//     x: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
//   ) => Promise<Boolean>;
// }) => {
//   const [selectedInterviewer, setSelectedInterviewer] = useState<{
//     index: number;
//     interviewer: (typeof interviewers)[number];
//   }>({ index: null, interviewer: null });

//   const [edit, setEdit] = useState(false);

//   return (
//     <>
//       <ScheduleTabFeedback
//         slotFeedbackTableRow={
//           <>
//             {interviewers.map((int, index) => {
//               int.interviewerDetails = int.interviewerDetails || {
//                 user_id: 'something',
//                 first_name: 'No',
//                 last_name: 'Name',
//                 position: 'No Position',
//                 profile_image: '',
//               };
//               return (
//                 <FeedbackTableRow
//                   key={int.id}
//                   isAddFeedback={
//                     !int.feedback && int.interviewer_id === user_id
//                   }
//                   isNoFeedback={!int.feedback}
//                   onClickFeedback={{
//                     onClick: () => {
//                       setSelectedInterviewer({
//                         index,
//                         interviewer: interviewers[Number(index)],
//                       });
//                       !interviewers[Number(index)].feedback && setEdit(true);
//                     },
//                   }}
//                   slotAvatar={
//                     <Avatar
//                       variant='circular'
//                       src={int.interviewerDetails.profile_image}
//                       level={getFullName(
//                         int.interviewerDetails.first_name,
//                         int.interviewerDetails.last_name,
//                       )}
//                     />
//                   }
//                   textInterviewerName={`${int.interviewerDetails?.first_name} ${int.interviewerDetails?.last_name}`.trim()}
//                   // @ts-ignore
//                   textFeedback={
//                     <Typography
//                       dangerouslySetInnerHTML={{
//                         __html:
//                           int.feedback?.objective || 'Feedback not Submitted',
//                       }}
//                     />
//                   }
//                   // @ts-ignore
//                   textRecommendation={re_mapper[int.feedback?.recommendation]}
//                   textjobTitle={int.interviewerDetails.position}
//                 />
//               );
//             })}
//           </>
//         }
//       />
//       {selectedInterviewer?.interviewer &&
//         [1].map(() => {
//           return (
//             <Dialog
//               key={1}
//               // fullWidth
//               open={selectedInterviewer.interviewer !== null}
//               maxWidth={'lg'}
//               // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
//             >
//               <ShowCode>
//                 <ShowCode.When isTrue={edit}>
//                   <FeedbackForm
//                     interviewerData={selectedInterviewer.interviewer}
//                     onSubmit={(feedback) =>
//                       handelSubmit(feedback).then(() => {
//                         toast.success('Feedback Saved.');
//                         setEdit(false);
//                         setSelectedInterviewer({
//                           index: null,
//                           interviewer: null,
//                         });
//                       })
//                     }
//                     onClose={() => {
//                       setEdit(false);
//                       setSelectedInterviewer({
//                         index: null,
//                         interviewer: null,
//                       });
//                     }}
//                   />
//                   {/* <MyFeedbackPopup
//                     onClickClose={{
//                       onClick: () => {
//                         currentIndex = null;
//                         setSelectedInterviewer(null);
//                         setEdit(false);
//                       },
//                     }}
//                     onClickSubmitFeedback={{
//                       onClick: () => {
//                         if (!selectedInterviewers.feedback) {
//                           return toast.warning('Please give Feedback');
//                         }
//                         handelSubmit(selectedInterviewers.feedback).then(() => {
//                           currentIndex = null;
//                           setSelectedInterviewer(null);
//                           toast.success('Feedback Saved.');
//                           setEdit(false);
//                         });
//                       },
//                     }}
//                     slotRoundedNumber={
//                       <>
//                         {Array(10)
//                           .fill(1)
//                           .map((_, i) => {
//                             return (
//                               <RoundedNumber
//                                 key={i}
//                                 textNumber={i + 1}
//                                 isActive={
//                                   (selectedInterviewers.feedback
//                                     ?.recommendation || 0) > i
//                                 }
//                                 onClickRound={{
//                                   onClick: () => {
//                                     const temp = { ...selectedInterviewers };
//                                     temp.feedback = {
//                                       ...temp.feedback,
//                                       recommendation: i + 1,
//                                     };
//                                     setSelectedInterviewer(temp);
//                                   },
//                                 }}
//                               />
//                             );
//                           })}
//                       </>
//                     }
//                     textRecommendation={
//                       re_mapper[
//                         selectedInterviewers.feedback?.recommendation || 0
//                       ]
//                     }
//                     slotObjective={
//                       // <Stack
//                       //   sx={{
//                       //     mt: '8px',
//                       //     border: '1px solid',
//                       //     borderColor: palette.grey[300],
//                       //     borderRadius: '4px',
//                       //     p: '2px',
//                       //   }}
//                       // >
//                       <TipTapAIEditor
//                         placeholder='Give Your Feedback.'
//                         initialValue={
//                           selectedInterviewers.feedback?.objective || ''
//                         }
//                         border
//                         handleChange={(html) => {
//                           const temp = { ...selectedInterviewers };
//                           temp.feedback = {
//                             ...temp.feedback,
//                             objective: html,
//                           };
//                           setSelectedInterviewer(temp);
//                         }}
//                       />
//                       // </Stack>
//                     }
//                   /> */}
//                 </ShowCode.When>
//                 <ShowCode.Else>
//                   <FeedbackViewPopup
//                     isEditFeedbackVisible={
//                       selectedInterviewer.interviewer.interviewer_id === user_id
//                     }
//                     onClickEditFeedback={{
//                       onClick: () => {
//                         setEdit(true);
//                       },
//                     }}
//                     onClickClose={{
//                       onClick: () => {
//                         setSelectedInterviewer(null);
//                         setEdit(false);
//                       },
//                     }}
//                     onClickNext={{
//                       onClick: () => {
//                         const index =
//                           (selectedInterviewer.index + 1) % interviewers.length;
//                         setSelectedInterviewer({
//                           index,
//                           interviewer: interviewers[Number(index)],
//                         });
//                       },
//                     }}
//                     onClickPrev={{
//                       onClick: () => {
//                         const index =
//                           selectedInterviewer.index - 1 > -1
//                             ? selectedInterviewer.index - 1
//                             : interviewers.length - 1;
//                         setSelectedInterviewer({
//                           index,
//                           interviewer: interviewers[Number(index)],
//                         });
//                       },
//                     }}
//                     slotAvatarWithName={
//                       <AvatarWithName
//                         textName={`${selectedInterviewer.interviewer.interviewerDetails.first_name} ${selectedInterviewer.interviewer.interviewerDetails.last_name}`}
//                         slotAvatar={
//                           <Avatar
//                             variant='circular'
//                             src={
//                               selectedInterviewer.interviewer.interviewerDetails
//                                 ?.profile_image
//                             }
//                             level={getFullName(
//                               selectedInterviewer.interviewer.interviewerDetails
//                                 ?.first_name,
//                               selectedInterviewer.interviewer.interviewerDetails
//                                 ?.last_name,
//                             )}
//                             dynamicSizing
//                           />
//                         }
//                       />
//                     }
//                     textObjective={
//                       <Typography
//                         dangerouslySetInnerHTML={{
//                           __html:
//                             selectedInterviewer.interviewer.feedback
//                               ?.objective || 'Feedback not Submitted',
//                         }}
//                       />
//                     }
//                     textRecomendation={
//                       selectedInterviewer.interviewer.feedback
//                         ? re_mapper[
//                             Number(
//                               selectedInterviewer.interviewer.feedback
//                                 .recommendation,
//                             )
//                           ]
//                         : '-'
//                     }
//                   />
//                 </ShowCode.Else>
//               </ShowCode>
//             </Dialog>
//           );
//         })}
//     </>
//   );
// };

// const InterviewerFeedback = ({
//   interviewers,
//   handelSubmit,
// }: {
//   interviewers: Awaited<ReturnType<typeof getInterviewers>>;
//   handelSubmit: (
//     // eslint-disable-next-line no-unused-vars
//     x: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
//   ) => Promise<Boolean>;
// }) => {
//   const interviewer = interviewers[0];
//   const [edit, setEdit] = useState(false);

//   return (
//     <>
//       <Feedback
//         onClickEditFeedback={{ onClick: () => setEdit(true) }}
//         textFeedback={
//           <Typography
//             dangerouslySetInnerHTML={{
//               __html:
//                 interviewer.feedback?.objective || 'Feedback not Submitted',
//             }}
//           />
//         }
//         textRecommendLevel={
//           re_mapper[interviewer.feedback?.recommendation] || '-'
//         }
//       />
//       {edit && (
//         <Dialog
//           key={1}
//           // fullWidth
//           open={edit}
//           maxWidth={'lg'}
//           // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
//         >
//           <FeedbackForm
//             interviewerData={interviewers[0]}
//             onSubmit={(feedback) =>
//               handelSubmit(feedback).then(() => {
//                 toast.success('Feedback Saved.');
//                 setEdit(false);
//               })
//             }
//             onClose={() => {
//               setEdit(false);
//             }}
//           />
//         </Dialog>
//       )}
//     </>
//   );
// };

// const FeedbackForm = ({
//   interviewerData,
//   onSubmit,
//   onClose,
// }: {
//   interviewerData: Awaited<ReturnType<typeof getInterviewers>>[number];
//   onSubmit: (
//     // eslint-disable-next-line no-unused-vars
//     x: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
//   ) => void;
//   onClose: () => void;
// }) => {
//   const [interviewer, setInterviewer] = useState(interviewerData);
//   return (
//     <MyFeedbackPopup
//       onClickClose={{
//         onClick: onClose,
//       }}
//       onClickSubmitFeedback={{
//         onClick: () => {
//           if (!interviewer.feedback) {
//             return toast.warning('Please give Feedback');
//           }
//           onSubmit(interviewer.feedback);
//         },
//       }}
//       slotRoundedNumber={
//         <>
//           {Array(10)
//             .fill(1)
//             .map((_, i) => {
//               return (
//                 <RoundedNumber
//                   key={i}
//                   textNumber={i + 1}
//                   isActive={(interviewer.feedback?.recommendation || 0) > i}
//                   onClickRound={{
//                     onClick: () => {
//                       const temp = { ...interviewer };
//                       temp.feedback = {
//                         ...temp.feedback,
//                         recommendation: i + 1,
//                       };
//                       setInterviewer(temp);
//                     },
//                   }}
//                 />
//               );
//             })}
//         </>
//       }
//       textRecommendation={re_mapper[interviewer.feedback?.recommendation || 0]}
//       slotObjective={
//         <TipTapAIEditor
//           placeholder='Give Your Feedback.'
//           initialValue={interviewer.feedback?.objective || ''}
//           border
//           handleChange={(html) => {
//             const temp = { ...interviewer };
//             temp.feedback = {
//               ...temp.feedback,
//               objective: html,
//             };
//             setInterviewer(temp);
//           }}
//         />
//       }
//     />
//   );
// };
