// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import dayjs from 'dayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Collapse, InputAdornment, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { NewJobStep4, WorkflowRadioItem } from '@/devlink';
import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';
import UITextField from '@/src/components/Common/UITextField';

// import UITextField from '@/src/components/Common/UITextField';
import { useJobForm } from '../JobPostFormProvider';
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
  const workflowObj = jobForm.formFields.newScreeningConfig[`${flow}`];
  const [range, setRange] = useState({
    min: workflowObj.qualificationRange
      ? workflowObj.qualificationRange.min
      : 0,
    max: workflowObj.qualificationRange
      ? workflowObj.qualificationRange.max
      : 80,
    active: false,
  });
  const handleUpdate = (
    isManual,
    qualificationRange: { min: number; max: number } | null,
  ) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}`,
      value: {
        isManual,
        qualificationRange: qualificationRange
          ? { min: qualificationRange.min, max: qualificationRange.max }
          : null,
      },
    });
  };
  const handleChoice = (choice: 'manual' | 'automate' | 'range') => {
    switch (choice) {
      case 'manual':
        {
          handleUpdate(true, null);
        }
        break;
      case 'automate':
        {
          handleUpdate(false, null);
        }
        break;
      case 'range': {
        handleUpdate(false, range);
      }
    }
  };
  const handleRangeInput = (e: any, type: 'min' | 'max') => {
    if (type === 'min') {
      if (e) {
        if (e < 0)
          setRange((prev) => {
            return { ...prev, min: 0, active: true };
          });
        else if (e > 100)
          setRange((prev) => {
            return { ...prev, min: 100, active: true };
          });
        else
          setRange((prev) => {
            return {
              ...prev,
              min: e,
              active: true,
            };
          });
      } else {
        setRange((prev) => {
          return { ...prev, min: null, active: false };
        });
      }
    } else {
      if (e) {
        if (e > 100)
          setRange((prev) => {
            return { ...prev, max: 100, active: true };
          });
        else if (e < 0)
          setRange((prev) => {
            return { ...prev, max: 0, active: true };
          });
        else
          setRange((prev) => {
            return {
              ...prev,
              max: e,
              active: true,
            };
          });
      } else {
        setRange((prev) => {
          return {
            ...prev,
            max: null,
            active: false,
          };
        });
      }
    }
  };
  const rangeFields = (
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
          onChange={(e) => handleRangeInput(parseInt(e.target.value), 'max')}
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
          onChange={(e) => handleRangeInput(parseInt(e.target.value), 'min')}
        />
        <Stack
          color={'rgb(217,63,76)'}
        >{`Candidates below this range will be disqualified`}</Stack>
      </Stack>
    </Stack>
  );
  useEffect(() => {
    if (range.active) handleChoice('range');
  }, [range.min, range.max, range.active]);
  return (
    <>
      {flow === 'screening' && (
        <WorkflowRadioItem
          isChecked={
            !workflowObj.isManual && workflowObj.qualificationRange === null
          }
          onClick={{
            onClick: () => {
              handleChoice('automate');
            },
          }}
          radioText={`Move all new applicants to the interviewing state.`}
        />
      )}
      <WorkflowRadioItem
        onClick={{
          onClick: () => {
            handleChoice('manual');
          },
        }}
        isChecked={workflowObj.isManual}
        radioText={`Manage the process manually, without automation.`}
      />
      <WorkflowRadioItem
        onClick={{
          onClick: () => {
            setRange((prev) => {
              return { ...prev, active: true };
            });
          },
        }}
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
  const emailScheduleObj = jobForm.formFields.newScreeningConfig[`${flow}`];
  const [time, setTime] = useState({
    timestamp: emailScheduleObj.timestamp ?? '1999-12-31T18:30:00.000Z',
    active: false,
  });
  const handleUpdate = (isManual: boolean, time: string) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}`,
      value: {
        isManual,
        timestamp: time ?? null,
      },
    });
  };
  const handleChoice = (choice: 'manual' | 'automate' | 'date') => {
    switch (choice) {
      case 'manual':
        {
          setTime((prev) => {
            return { ...prev, active: false };
          });
          handleUpdate(true, null);
        }
        break;
      case 'automate':
        {
          setTime((prev) => {
            return { ...prev, active: false };
          });
          handleUpdate(false, null);
        }
        break;
      case 'date':
        {
          setTime((prev) => {
            return { ...prev, active: true };
          });
          handleUpdate(false, time.timestamp);
        }
        break;
    }
  };
  const timePicker = (
    <SpecializedTimePicker
      defaultValue={
        dayjs(time.timestamp).isValid()
          ? dayjs(time.timestamp)
          : dayjs('1999-12-31T18:30:00.000Z')
      }
      minutesStep={30}
      onChange={(e) => {
        setTime(() => {
          return { timestamp: new Date(e).toISOString(), active: true };
        });
      }}
    />
  );
  useEffect(() => {
    if (time.active) handleChoice('date');
  }, [time.timestamp, time.active]);
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
        onClick={{
          onClick: () =>
            setTime((prev) => {
              return { ...prev, active: true };
            }),
        }}
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
