// import { Switch } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import dayjs from 'dayjs';
// import { get } from 'lodash';

import { NewJobStep4 } from '@/devlink';
// import UITextField from '@/src/components/Common/UITextField';

// import { FormJobType, useJobForm } from '../JobPostFormProvider';

function ScreeningSettings() {
  // const { jobForm, handleUpdateFormFields } = useJobForm();
  // const screeningConfig = get(
  //   jobForm,
  //   'formFields.screeningConfig',
  // ) as FormJobType['screeningConfig'];

  return (
    // <NewJobStep4
    //   isHeaderVisible={jobForm.formType === 'new'}
    //   isSettingHeadingVisible={jobForm.formType === 'new'}
    //   isAutomatedScreeningChecked1={
    //     screeningConfig.screening.isSendInterviewToAll
    //   }
    //   isAutomatedScreeningChecked2={
    //     !screeningConfig.screening.isSendInterviewToAll
    //   }
    //   isShortlistCandidateChecked1={screeningConfig.shortlist.interviewScore}
    //   onClickAutomateScreeningCheck1={{
    //     onClick: () => {
    //       handleUpdateFormFields({
    //         path: 'screeningConfig.screening.isSendInterviewToAll',
    //         value: !screeningConfig.screening.isSendInterviewToAll,
    //       });
    //     },
    //   }}
    //   onClickAutomatedScreeningCheck2={{
    //     onClick: () => {
    //       handleUpdateFormFields({
    //         path: 'screeningConfig.screening.isSendInterviewToAll',
    //         value: !screeningConfig.screening.isSendInterviewToAll,
    //       });
    //     },
    //   }}
    //   onClickShortlistCandidateCheck1={{
    //     onClick: () => {
    //       handleUpdateFormFields({
    //         path: 'screeningConfig.shortlist.interviewScore',
    //         value: !screeningConfig.shortlist.interviewScore,
    //       });
    //     },
    //   }}
    //   slotAutomatedScreeningCount2={
    //     <UITextField
    //       disabled={screeningConfig.screening.isSendInterviewToAll}
    //       type='number'
    //       width={'70px'}
    //       placeholder='8'
    //       onChange={(e) => {
    //         handleUpdateFormFields({
    //           path: 'screeningConfig.screening.minNoResumeScore',
    //           value: Number(e.target.value),
    //         });
    //       }}
    //       defaultValue={screeningConfig.screening.minNoResumeScore}
    //       value={screeningConfig.screening.minNoResumeScore}
    //     />
    //   }
    //   slotResumeJdToggle={
    //     <>
    //       <Switch
    //         color='info'
    //         size='small'
    //         checked={screeningConfig.useAglintMatchingAlgo}
    //         defaultChecked={screeningConfig.useAglintMatchingAlgo}
    //         onChange={() => {
    //           handleUpdateFormFields({
    //             path: 'screeningConfig.useAglintMatchingAlgo',
    //             value: !screeningConfig.useAglintMatchingAlgo,
    //           });
    //         }}
    //       />
    //     </>
    //   }
    //   slotShortlistCandidateCount1={
    //     <UITextField
    //       type='number'
    //       width={'70px'}
    //       disabled={!screeningConfig.shortlist.interviewScore}
    //       onChange={(e) => {
    //         handleUpdateFormFields({
    //           path: 'screeningConfig.shortlist.minInterviewScore',
    //           value: e.target.value,
    //         });
    //       }}
    //       value={screeningConfig.shortlist.minInterviewScore}
    //       defaultValue={screeningConfig.shortlist.minInterviewScore}
    //     />
    //   }
    //   slotAiFeedbackToggle={
    //     <>
    //       <Switch
    //         size='small'
    //         color='info'
    //         defaultChecked={screeningConfig.feedbackVisible}
    //         checked={screeningConfig.feedbackVisible}
    //         onChange={() => {
    //           handleUpdateFormFields({
    //             path: 'screeningConfig.feedbackVisible',
    //             value: !screeningConfig.feedbackVisible,
    //           });
    //         }}
    //       />
    //     </>
    //   }
    //   onClickImmediatelyCheck={{
    //     onClick: () => {
    //       handleUpdateFormFields({
    //         path: 'screeningConfig.screeningEmail.isImmediate',
    //         value: true,
    //       });
    //     },
    //   }}
    //   onClickParticularTimeCheck={{
    //     onClick: () => {
    //       handleUpdateFormFields({
    //         path: 'screeningConfig.screeningEmail.isImmediate',
    //         value: false,
    //       });
    //     },
    //   }}
    //   isImmediatelyChecked={screeningConfig.screeningEmail.isImmediate}
    //   isParticularTimeChecked={!screeningConfig.screeningEmail.isImmediate}
    //   isChooseTimeVisible={!screeningConfig.screeningEmail.isImmediate}
    //   slotTime={
    //     <>
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <TimePicker
    //           viewRenderers={{
    //             hours: renderTimeViewClock,
    //             minutes: renderTimeViewClock,
    //             seconds: renderTimeViewClock,
    //           }}
    //           value={dayjs(
    //             screeningConfig.screeningEmail.date
    //               ? new Date(screeningConfig.screeningEmail.date)
    //               : new Date().toISOString(),
    //           )}
    //           onChange={(date: dayjs.Dayjs | null) => {
    //             date &&
    //               dayjs(date).isValid() &&
    //               handleUpdateFormFields({
    //                 path: 'screeningConfig.screeningEmail.date',
    //                 value: dayjs(date).toISOString(),
    //               });
    //           }}
    //           slots={{
    //             textField: UITextField,
    //           }}
    //         />
    //       </LocalizationProvider>
    //     </>
    //   }
    // />
    <NewJobStep4 />
  );
}

export default ScreeningSettings;
