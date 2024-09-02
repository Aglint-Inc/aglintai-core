// import { Stack } from '@mui/material';

// import { GlobalInfo } from '@/devlink2/GlobalInfo';
// import { InterviewLoad } from '@/devlink2/InterviewLoad';
// import { KeywordCard } from '@/devlink2/KeywordCard';
// import { Keywords } from '@/devlink2/Keywords';
// import { DebreifHelperText } from '@/devlink3/DebreifHelperText';
// import { HelperDropdown } from '@/devlink3/HelperDropdown';
// import { InterviewLoadHelper } from '@/devlink3/InterviewLoadHelper';
// import { KeywordsHelper } from '@/devlink3/KeywordsHelper';

// import MuiNumberfield from './Components/MuiNumberfield';
// import DebriefDefaults from './DebriefDefaults';

// // Add necessary imports and types

// const SchedulingSettingsContent = ({
//   dailyLmit,
//   weeklyLmit,
//   handleDailyValue,
//   handleWeeklyValue,
//   // handleType,
//   debriefDefaults,
//   setDebriefDefaults,
//   freeKeyWords,
//   setFreeKeywords,
//   softConflictsKeyWords,
//   setSoftConflictsKeyWords,
//   outOfOffice,
//   setOutOfOffice,
//   recruitingBlocks,
//   setRecruitingBlocks,
//   isTipVisible,
//   handleCloseInfo,
// }) => {
//   return (
//     <Stack
//       display={'flex'}
//       flexDirection={'row'}
//       width={'100%'}
//       justifyContent={'space-between'}
//       alignItems={'start'}
//       overflow={'hidden'}
//     >
//       {/* Main content */}
//       <Stack
//         width={'100%'}
//         overflow={'auto'}
//         height={'calc(100vh - 48px)'}
//         padding={2}
//         spacing={2}
//         gap={'16px'}
//       >
//         <InterviewLoad
//           borderStyle={'false'}
//           slotDailyLimit={
//             <MuiNumberfield value={dailyLmit} handleSelect={handleDailyValue} />
//           }
//           slotWeeklyLimit={
//             <MuiNumberfield
//               value={weeklyLmit}
//               handleSelect={handleWeeklyValue}
//             />
//           }
//         />
//         <DebriefDefaults
//           value={debriefDefaults}
//           setValue={setDebriefDefaults}
//         />
//         <Keywords
//           borderStyle={'false'}
//           size={'large'}
//           slotKeywordsCard={
//             <KeywordCard
//               freeKeyWords={freeKeyWords}
//               setFreeKeywords={setFreeKeywords}
//               softConflictsKeyWords={softConflictsKeyWords}
//               setSoftConflictsKeyWords={setSoftConflictsKeyWords}
//               outOfOffice={outOfOffice}
//               setOutOfOffice={setOutOfOffice}
//               recruitingBlocks={recruitingBlocks}
//               setRecruitingBlocks={setRecruitingBlocks}
//             />
//           }
//         />
//       </Stack>

//       {/* Sidebar */}
//       <Stack
//         bgcolor={'white'}
//         width={'400px'}
//         minWidth={'400px'}
//         padding={'var(--space-4)'}
//         borderLeft={'1px solid var(--neutral-6)'}
//         height={'calc(100vh - 48px)'}
//         flexDirection={'column'}
//         gap={'var(--space-4)'}
//         sx={{
//           overflowY: 'auto',
//         }}
//       >
//         <Stack flexDirection={'column'} gap={'var(--space-4)'}>
//           {isTipVisible && (
//             <Stack>
//               <GlobalInfo
//                 color={'purple'}
//                 iconName='lightbulb'
//                 textTitle={'Pro Tip'}
//                 textDescription={
//                   'Tailor the evaluation criteria to match the specific needs of the role you are hiring for by adjusting the weightages.'
//                 }
//                 showCloseButton
//                 onClickClose={{
//                   onClick: handleCloseInfo,
//                 }}
//               />
//             </Stack>
//           )}
//           <HelperDropdown
//             textName='Interview Load Tips'
//             slotBody={<InterviewLoadHelper />}
//           />
//           <HelperDropdown
//             textName='Debrief Tips'
//             slotBody={<DebreifHelperText />}
//           />
//           <HelperDropdown
//             textName='Keyword Tips'
//             slotBody={<KeywordsHelper />}
//           />
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default SchedulingSettingsContent;
