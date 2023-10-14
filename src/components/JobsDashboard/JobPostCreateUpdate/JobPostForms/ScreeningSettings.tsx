// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import dayjs from 'dayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Collapse, InputAdornment, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { NewJobStep4, WorkflowRadioItem } from '@/devlink';
import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';
import UITextField from '@/src/components/Common/UITextField';

// import UITextField from '@/src/components/Common/UITextField';
import { FormJobType, useJobForm } from '../JobPostFormProvider';
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
    // handleUpdateFormFields({
    //   path: 'screeningConfig.screening.minNoResumeScore',
    //   value: Number(e.target.value),
    // });
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
    // <NewJobStep4 />
    // <Stack>
    //   <ApplicationScoringWorkflow />
    //   ----------
    //   <InterviewScoringWorkflow />
    //   ----------
    //   <InterviewEmailSchedule />
    //   ----------
    //   <DisqualifiedEmailSchedule />
    // </Stack>
    <NewJobStep4
      slotApplicationWorkflow={<WorkFlow flow='screening' />}
      slotInterviewWorkflow={<WorkFlow flow='interview' />}
      slotInterviewEmail={<EmailSchedule flow='interviewMail' />}
      slotDisqualifyEmail={<EmailSchedule flow='disqualifiedMail' />}
    />
    // <>KKK</>
    // <NewJobStep4 />
  );
}

const WorkFlow = ({ flow }: { flow: 'screening' | 'interview' }) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const workflowObj = get(
    jobForm,
    `formFields.newScreeningConfig.${flow}`,
  ) as FormJobType['newScreeningConfig'][`${typeof flow}`];
  const [range, setRange] = useState(
    workflowObj.qualificationRange ?? {
      min: 0,
      max: 80,
    },
  );
  const handleManual = (value: boolean) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}.isManual`,
      value,
    });
  };
  const handleRange = (value: { min: number; max: number } | null) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}.qualificationRange`,
      value,
    });
  };
  const handleChoice = (choice: 'manual' | 'automate' | 'range') => {
    switch (choice) {
      case 'manual':
        {
          handleManual(true);
          handleRange(null);
        }
        break;
      case 'automate':
        {
          handleManual(false);
          handleRange(null);
        }
        break;
      case 'range': {
        handleManual(false);
        handleRange(range);
      }
    }
  };
  const handleRangeInput = (e: any, type: 'min' | 'max') => {
    if (e) {
      switch (type) {
        case 'min':
          {
            if (e < 0)
              setRange((prev) => {
                return { ...prev, min: 0 };
              });
            else if (e > range.max)
              setRange((prev) => {
                return { ...prev, min: range.max };
              });
            else
              setRange((prev) => {
                return {
                  ...prev,
                  min: e,
                };
              });
          }
          break;
        case 'max': {
          if (e > 100)
            setRange((prev) => {
              return { ...prev, max: 100 };
            });
          else if (e < range.min)
            setRange((prev) => {
              return { ...prev, min: range.min };
            });
          else
            setRange((prev) => {
              return {
                ...prev,
                max: e,
              };
            });
        }
      }
    }
  };
  const rangeFields = useMemo(
    () => (
      <>
        <Stack gap={2} mt={2}>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <UITextField
              value={range.max}
              type='number'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <CheckCircleIcon sx={{ color: 'rgb(34,143,103)' }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                handleRangeInput(parseInt(e.target.value), 'max')
              }
            />
            <Stack
              color={'rgb(34,143,103)'}
            >{`Candidates above this range will be qualified`}</Stack>
          </Stack>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <UITextField
              value={range.min}
              type='number'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <CancelIcon sx={{ color: 'rgb(217,63,76)' }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                handleRangeInput(parseInt(e.target.value), 'min')
              }
            />
            <Stack
              color={'rgb(217,63,76)'}
            >{`Candidates below this range will be disqualified`}</Stack>
          </Stack>
        </Stack>
      </>
    ),
    [range.min, range.max],
  );
  useEffect(() => {
    handleChoice('range');
  }, [range.min, range.max]);
  return (
    <>
      {flow === 'screening' && (
        <WorkflowRadioItem
          isChecked={
            !workflowObj.isManual && workflowObj.qualificationRange === null
          }
          onClick={{ onClick: () => handleChoice('automate') }}
          radioText={`Move all new applicants to the interviewing state.`}
        />
      )}
      <WorkflowRadioItem
        onClick={{ onClick: () => handleChoice('manual') }}
        isChecked={workflowObj.isManual}
        radioText={`Manage the process manually, without automation.`}
      />
      <WorkflowRadioItem
        onClick={{ onClick: () => handleChoice('range') }}
        isChecked={workflowObj.qualificationRange !== null}
        radioText={`Use ${
          flow === 'screening' ? 'application' : 'interview'
        } score criteria for applicant progression`}
        slotScore={
          <Collapse in={workflowObj.qualificationRange !== null}>
            {rangeFields}
          </Collapse>
        }
      />
    </>
  );
};

const EmailSchedule = ({
  flow,
}: {
  flow: 'interviewMail' | 'disqualifiedMail';
}) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const emailScheduleObj = get(
    jobForm,
    `formFields.newScreeningConfig.${flow}`,
  ) as FormJobType['newScreeningConfig'][`${typeof flow}`];
  const [time, setTime] = useState(
    emailScheduleObj.timestamp ?? '1999-12-31T18:30:00.000Z',
  );
  const handleManual = (value: boolean) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}.isManual`,
      value,
    });
  };
  const handleTime = (value: string | null) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}.timestamp`,
      value: value ? new Date(value) : null,
    });
  };
  const handleChoice = (choice: 'manual' | 'automate' | 'date') => {
    switch (choice) {
      case 'manual':
        {
          handleManual(true);
          handleTime(null);
        }
        break;
      case 'automate':
        {
          handleManual(false);
          handleTime(null);
        }
        break;
      case 'date':
        {
          handleManual(false);
          handleTime(time);
        }
        break;
    }
  };
  const timePicker = useMemo(
    () => (
      <SpecializedTimePicker
        defaultValue={dayjs(time).isValid() ? dayjs(time) : null}
        minutesStep={30}
        onChange={(e) => {
          setTime(e);
        }}
      />
    ),
    [time],
  );
  useEffect(() => {
    if (time) handleChoice('date');
  }, [time]);
  return (
    <>
      <WorkflowRadioItem
        isChecked={
          !emailScheduleObj.isManual && emailScheduleObj.timestamp === null
        }
        onClick={{ onClick: () => handleChoice('automate') }}
        radioText={`Immediately after moving to the ${
          flow === 'interviewMail' ? 'interviewing' : 'disqualified'
        } stage.`}
      />
      <WorkflowRadioItem
        isChecked={
          emailScheduleObj.isManual && emailScheduleObj.timestamp === null
        }
        onClick={{ onClick: () => handleChoice('manual') }}
        radioText={`Manage process manually, without automation.`}
      />
      <WorkflowRadioItem
        isChecked={
          !emailScheduleObj.isManual && emailScheduleObj.timestamp !== null
        }
        onClick={{ onClick: () => handleChoice('date') }}
        radioText={`Choose your preferred time.`}
        slotScore={
          <Collapse
            in={
              !emailScheduleObj.isManual && emailScheduleObj.timestamp !== null
            }
          >
            {timePicker}
          </Collapse>
        }
      />
    </>
  );
};

export default ScreeningSettings;
