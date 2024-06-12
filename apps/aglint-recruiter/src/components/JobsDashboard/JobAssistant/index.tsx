// import {
//   Divider,
//   Drawer,
//   IconButton,
//   InputBase,
//   Paper,
//   Stack,
//   Typography,
// } from '@mui/material';
// import { Editor } from '@tiptap/react';
// import { marked } from 'marked';
// import { useEffect, useState } from 'react';

// import { ChatMessage } from '@/devlink/ChatMessage';
// import { JobAssist } from '@/devlink/JobAssist';
// import { JobAssistCardSmall } from '@/devlink/JobAssistCardSmall';
// import { CalculatingResumeScore } from '@/public/lottie/CalculatingResumeScore';
// import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { JobApplication } from '@/src/context/JobApplicationsContext/types';
// import { useJobAssistantContext } from '@/src/context/JobAssistant';
// import {
//   chatusers,
//   getSuggestedPrompts,
// } from '@/src/context/JobAssistant/utils';
// import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';

// import EmptyState from '../../CandidateDatabase/Search/EmptyState';
// import Loader from '../../Common/Loader';
// import MuiAvatar from '../../Common/MuiAvatar';
// import ApplicationDetails from '../../JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
// import CandidateCard from './CandidateCard';
// import ChatEditor, { SendIcon } from './ChatEditor';
// import DynamicSuggestion from './DynanicSuggetions';
// import LeftPanel from './LeftPannel';
// function JobAssistant({ setMaximizeChat, maximizeChat }) {
//   const { recruiter, recruiterUser } = useAuthDetails();
//   const {
//     handleChat,
//     messages,
//     textMessage,
//     setTextMessage,
//     setBackEndText,
//     currentChat,
//     resLoading,
//     candidates,
//     fetching,
//     companyDetails,
//     applicationDetails,
//     setApplicationDetails,
//   } = useJobAssistantContext();
//   const [open, setOpen] = useState(false);
//   //@ts-ignore
//   const skills = companyDetails?.jd_json?.skills
//     .filter((item) => !item.isMustHave)
//     .map((ele) => ele.field);
//   let suggestionsPrompts = [];
//   let applicationList = [] as JobApplication[];

//   let getEditorRef: () => Editor = null;

//   useEffect(() => {
//     const TypoElement = document.getElementById('chat_scroll');
//     if (TypoElement)
//       TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
//   }, [messages]);

//   const loadingMessages = [
//     'Please wait, job assistant is creating!',
//     'Job assistant created!',
//     'Passing the job descriptions to assistant',
//     'Plase wait we are almost done!',
//   ];
//   const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

//   useEffect(() => {
//     let i = 0;
//     if (fetching) {
//       const timeint = setInterval(() => {
//         if (i === loadingMessages.length - 1) {
//           setLoadingMessage(
//             loadingMessages[Number(loadingMessages.length - 1)],
//           );
//           clearInterval(timeint);
//         }
//         setLoadingMessage(loadingMessages[Number(i)]);
//         i = i + 1;
//       }, 3000);
//     }
//   }, [fetching]);

//   return candidates.length && !fetching ? (
//     <Stack direction={'row'} height={'100%'} width={'100%'}>
//       {maximizeChat && <LeftPanel />}
//       <Stack width={maximizeChat ? '80%' : '100%'} spacing={'10px'}>
//         {currentChat && (
//           <JobAssist
//             isMinimizeIconVisible={!maximizeChat}
//             isMaxIconVisible={maximizeChat}
//             isViewMoreVisible={false}
//             onClickMaximize={{
//               onClick: () => {
//                 setMaximizeChat((pre) => !pre);
//               },
//             }}
//             onClickMinimize={{
//               onClick: () => {
//                 setMaximizeChat((pre) => !pre);
//               },
//             }}
//             isStartingScreenVisible={!fetching && !messages.length}
//             isChatBody={fetching || !!messages.length}
//             slotLogo={
//               <MuiAvatar
//                 variant='rounded-small'
//                 src={recruiter?.logo}
//                 level={recruiter?.name}
//               />
//             }
//             slotChat={
//               <>
//                 {fetching ? (
//                   <>
//                     <Stack gap={'20px'} alignItems={'center'} mt={'40px'}>
//                       <Loader />
//                       <YTransform uniqueKey={loadingMessage}>
//                         <Typography>{loadingMessage}</Typography>
//                       </YTransform>
//                     </Stack>
//                   </>
//                 ) : (
//                   messages.length &&
//                   messages.map((ele, i) => {
//                     const { sender, content } = ele;
//                     const {
//                       searchArguments,
//                       active,
//                       message,
//                       result_applications,
//                     } = content;
//                     applicationList = result_applications;
//                     if (searchArguments) {
//                       suggestionsPrompts = getSuggestedPrompts(
//                         searchArguments,
//                         applicationList,
//                         companyDetails.location,
//                         skills,
//                       );
//                     }

//                     return (
//                       <ChatMessage
//                         key={i}
//                         slotProfile={
//                           sender == chatusers.recruiter ? (
//                             <MuiAvatar
//                               variant='rounded-small'
//                               src={recruiterUser.profile_image}
//                               level={recruiterUser.first_name}
//                             />
//                           ) : (
//                             <AssistantLogo width={40} height={40} />
//                           )
//                         }
//                         slotMessages={
//                           active && (
//                             <>
//                               {sender === chatusers.assistant &&
//                               resLoading &&
//                               i === messages.length - 1 ? (
//                                 <Stack
//                                   position={'relative'}
//                                   height={'100px'}
//                                   width={'30px'}
//                                 >
//                                   <Stack
//                                     top={'-32px'}
//                                     left={'-35px'}
//                                     width={'110px'}
//                                     position={'absolute'}
//                                   >
//                                     <CalculatingResumeScore />
//                                   </Stack>
//                                 </Stack>
//                               ) : (
//                                 message.html && (
//                                   <>
//                                     <div
//                                       dangerouslySetInnerHTML={{
//                                         __html: marked(
//                                           message.html
//                                             ?.replaceAll('<p></p>', '')
//                                             ?.replaceAll('```', '')
//                                             .replaceAll(
//                                               /.*\b[Aa]pplication.[Ii][Dd].*\n/g,
//                                               '',
//                                             ),
//                                         ),
//                                       }}
//                                     />
//                                   </>
//                                 )
//                               )}
//                             </>
//                           )
//                         }
//                         textHeading={sender}
//                         isMessageCardVisible={
//                           sender === chatusers.assistant &&
//                           applicationList &&
//                           applicationList.length !== 0
//                         }
//                         slotMessageCard={
//                           sender === chatusers.assistant &&
//                           !active &&
//                           applicationList
//                             ?.sort(
//                               (a, b) => b?.overall_score - a?.overall_score,
//                             )
//                             .map((application) => {
//                               return (
//                                 <>
//                                   <CandidateCard
//                                     application={application as JobApplication}
//                                     setOpen={setOpen}
//                                   />
//                                 </>
//                               );
//                             })
//                         }
//                       />
//                     );
//                   })
//                 )}
//               </>
//             }
//             slotAssistCards={
//               messages &&
//               messages.length === 0 && (
//                 <>
//                   <DynamicSuggestion
//                     getEditorRef={() => getEditorRef()}
//                     skills={skills}
//                   />
//                 </>
//               )
//             }
//             isSuggestionVisible={true}
//             slotSuggestion={
//               <SuggestedPrompts
//                 getEditorRef={() => getEditorRef()}
//                 suggestionsPrompts={suggestionsPrompts}
//               />
//             }
//             slotInput={
//               <>
//                 {candidates.length && !resLoading ? (
//                   <ChatEditor
//                     onChange={(event) => {
//                       const div = document.createElement('div');
//                       div.innerHTML = event.html;
//                       div
//                         .querySelectorAll('span')
//                         .forEach(
//                           (node) =>
//                             (node.textContent =
//                               '```' + node.getAttribute('data-id') + '```'),
//                         );
//                       setBackEndText(div.textContent);
//                       setTextMessage(event);
//                     }}
//                     getEditorRef={(func) => (getEditorRef = func)}
//                     onClick={handleChat}
//                     value={textMessage?.text?.trim()}
//                     dataList={candidates}
//                   />
//                 ) : (
//                   <FakeInput />
//                 )}
//               </>
//             }
//           />
//         )}
//       </Stack>

//       <Stack>
//         <Drawer
//           anchor={'right'}
//           open={open}
//           onClose={() => {
//             setOpen(false);
//           }}
//         >
//           <ApplicationDetails
//             open={true}
//             onClose={() => {
//               setOpen(false);
//               setApplicationDetails(null);
//             }}
//             application={applicationDetails}
//             hideNextPrev={true}
//           />
//         </Drawer>
//       </Stack>
//     </Stack>
//   ) : (
//     <Stack direction={'row'} flexDirection={'column'} mt={10}>
//       <Stack>
//         <EmptyState />
//       </Stack>
//       No candidates found.
//     </Stack>
//   );
// }

// export default JobAssistant;

// function SuggestedPrompts({ suggestionsPrompts, getEditorRef }) {
//   const { messages, textMessage, setTextMessage, resLoading, setBackEndText } =
//     useJobAssistantContext();
//   return (
//     <>
//       {!resLoading && messages.length && !textMessage?.text
//         ? [...suggestionsPrompts].map((ele, i) => {
//             return (
//               <ScrollList key={i} uniqueKey={i}>
//                 <JobAssistCardSmall
//                   key={i}
//                   textSuggestion={ele}
//                   onClickCard={{
//                     onClick: () => {
//                       setTextMessage({
//                         html: `<p>${ele}</p>`,
//                         text: ele,
//                         wordCount: ele.length,
//                       });
//                       setBackEndText(`<p>${ele}</p>`);

//                       getEditorRef().commands.setContent(ele);
//                       getEditorRef().commands.focus(ele.length + 1);
//                       const firstBacktickPos = ele.indexOf('`');

//                       const secondBacktickPos = ele.indexOf(
//                         '`',
//                         firstBacktickPos + 1,
//                       );
//                       if (firstBacktickPos > 0 && secondBacktickPos > 0) {
//                         getEditorRef().commands.setTextSelection({
//                           from: firstBacktickPos + 2,
//                           to: secondBacktickPos + 1,
//                         });
//                       }
//                     },
//                   }}
//                 />
//               </ScrollList>
//             );
//           })
//         : null}
//     </>
//   );
// }

// function AssistantLogo({ width, height }) {
//   return (
//     <Stack>
//       <svg
//         xmlns='http://www.w3.org/2000/svg'
//         width={width || 40}
//         height={height || 40}
//         viewBox='0 0 21 20'
//         fill='none'
//       >
//         <path
//           d='M17.3493 9.16316C15.0809 8.59474 13.944 8.31579 13.1598 7.53158C12.3756 6.74211 12.0967 5.61053 11.5282 3.34211L10.6914 0L9.85456 3.34211C9.28614 5.61053 9.0072 6.74737 8.22299 7.53158C7.43351 8.31579 6.30193 8.59474 4.03351 9.16316L0.691406 10L4.03351 10.8368C6.30193 11.4053 7.43877 11.6842 8.22299 12.4684C9.0072 13.2579 9.28614 14.3895 9.85456 16.6579L10.6914 20L11.5282 16.6579C12.0967 14.3895 12.3756 13.2526 13.1598 12.4684C13.9493 11.6842 15.0809 11.4053 17.3493 10.8368L20.6914 10L17.3493 9.16316Z'
//           fill='#FF6224'
//         />
//       </svg>
//     </Stack>
//   );
// }

// function FakeInput() {
//   return (
//     <Stack width={'100%'} direction={'row'} spacing={'10px'}>
//       <Paper
//         component='form'
//         sx={{
//           p: '0px 15px',
//           display: 'flex',
//           alignItems: 'center',
//           width: '100%',
//           borderRadius: 'var(--radius-4)',
//         }}
//       >
//         <InputBase
//           disabled={true}
//           fullWidth
//           placeholder='Chat with assistant'
//           multiline
//           maxRows={3}
//           autoComplete='off'
//           type='text'
//           sx={{
//             height: '58px',
//             // padding: '0px 11px',
//           }}
//         />

//         <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
//         <IconButton
//           type='button'
//           sx={{ p: '10px' }}
//           aria-label='search'
//           disabled={true}
//         >
//           <SendIcon />
//         </IconButton>
//       </Paper>
//     </Stack>
//   );
// }
