import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Collapse, InputAdornment, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { NewJobStep4, WorkflowRadioItem } from '@/devlink';
import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';
import UITextField from '@/src/components/Common/UITextField';

import { useJobForm } from '../JobPostFormProvider';
function ScreeningSettings() {
  const { dispatch } = useJobForm();

  return (
    <NewJobStep4
      slotApplicationWorkflow={<WorkFlow flow='screening' />}
      slotInterviewWorkflow={<WorkFlow flow='interview' />}
      slotInterviewEmail={<EmailSchedule flow='interviewMail' />}
      slotDisqualifyEmail={<EmailSchedule flow='disqualifiedMail' />}
      isProceedDisable={false}
      onClickProcced={{
        onClick: () => {
          dispatch({
            type: 'moveToSlide',
            payload: {
              nextSlide: 'templates',
            },
          });
        },
      }}
    />
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
