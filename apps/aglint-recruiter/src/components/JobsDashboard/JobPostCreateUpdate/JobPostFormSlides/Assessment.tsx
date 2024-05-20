import { Collapse, Stack } from '@mui/material';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { JobEditWarning } from '@/devlink/JobEditWarning';
import { JobWarningList } from '@/devlink/JobWarningList';
import { NewJobStep4 } from '@/devlink/NewJobStep4';
import { WorkflowRadioItem } from '@/devlink/WorkflowRadioItem';
import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';

import { useJobForm } from '../JobPostFormProvider';
function Assessment() {
  const { jobForm } = useJobForm();
  return (
    <NewJobStep4
      slotWarning={
        <>
          <JobEditWarning
            slotWarningList={
              <>
                <JobWarningList
                  textWarning={
                    'Workflow is configurable only when assessment is enabled'
                  }
                />
              </>
            }
          />
        </>
      }
      slotApplicationWorkflow={<WorkFlow flow='screening' />}
      slotInterviewWorkflow={<WorkFlow flow='interview' />}
      slotInterviewEmail={<EmailSchedule flow='interviewMail' />}
      slotDisqualifyEmail={<EmailSchedule flow='disqualifiedMail' />}
      isWorkflowContentVisible={jobForm.formFields.isAssesmentEnabled}
      isAssessmentScoringVisible={jobForm.formFields.isAssesmentEnabled}
      isEmailScheduleVisible={jobForm.formFields.isAssesmentEnabled}
      // isWorkflowInfoVisible={jobForm.formFields.isAssesmentEnabled}
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
    active: false
  });
  const handleUpdate = (
    isManual,
    qualificationRange: { min: number; max: number } | null
  ) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}`,
      value: {
        isManual,
        qualificationRange: qualificationRange
          ? { min: qualificationRange.min, max: qualificationRange.max }
          : null
      }
    });
  };
  const handleChoice = (choice: 'manual' | 'automate' | 'range') => {
    switch (choice) {
      case 'manual':
        {
          setRange((prev) => {
            return { ...prev, active: false };
          });
          handleUpdate(true, null);
        }
        break;
      case 'automate':
        {
          setRange((prev) => {
            return { ...prev, active: false };
          });
          handleUpdate(false, null);
        }
        break;
      case 'range': {
        handleUpdate(false, range);
      }
    }
  };

  const handleRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < 1) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - 1);
        setRange({
          active: true,
          min: clamped,
          max: clamped + 1
        });
      } else {
        const clamped = Math.max(newValue[1], 1);
        setRange({
          active: true,
          min: clamped - 1,
          max: clamped
        });
      }
    } else {
      setRange({
        active: true,
        min: newValue[0],
        max: newValue[1]
      });
    }
  };

  const newRangeFields = (
    <Stack mt={2} gap={2} width={'651px'}>
      <Stack
        width={'100%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        fontWeight={600}
        position={'relative'}
      >
        <Stack
          width={'217px'}
          textAlign={'left'}
          style={{ color: '#d3212c' }}
        >{`Auto-disqualification  < ${range.min}`}</Stack>
        <Stack
          width={'217px'}
          textAlign={'center'}
        >{`${range.min} ≤ Manual review ≤ ${range.max} `}</Stack>
        <Stack
          width={'217px'}
          textAlign={'right'}
          style={{ color: '#069c56' }}
        >{`Auto-qualification > ${range.max}`}</Stack>
      </Stack>
      <Stack width={'650px'}>
        <Slider
          track='inverted'
          value={[range.min, range.max]}
          onChange={handleRangeChange}
          valueLabelDisplay='auto'
          disableSwap
          sx={{
            '& .MuiSlider-rail': {
              backgroundImage: `linear-gradient(to right, #f2bcc0 ${range.min}%, #eff0f0 ${range.min}%, #eff0f0 ${range.max}%, #b4e1cc ${range.max}%)`
            },
            '& .MuiSlider-track': {
              display: 'none'
            },
            '& > .MuiSlider-thumb': {
              background: '#d3212c'
            },
            '& > .MuiSlider-thumb ~ .MuiSlider-thumb': {
              background: '#069c56'
            }
          }}
        />
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
            }
          }}
          radioText={`Move all new applicants to the assessment state.`}
        />
      )}
      <WorkflowRadioItem
        onClick={{
          onClick: () => {
            handleChoice('manual');
          }
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
          }
        }}
        isChecked={workflowObj.qualificationRange !== null}
        radioText={`Use ${
          flow === 'screening' ? 'application' : 'assessment'
        } score criteria for applicant progression`}
        slotScore={
          <Collapse in={workflowObj.qualificationRange !== null}>
            {newRangeFields}
          </Collapse>
        }
      />
    </>
  );
};

const EmailSchedule = ({
  flow
}: {
  flow: 'interviewMail' | 'disqualifiedMail';
}) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const emailScheduleObj = jobForm.formFields.newScreeningConfig[`${flow}`];
  const [time, setTime] = useState({
    timestamp: emailScheduleObj.timestamp ?? '1999-12-31T18:30:00.000Z',
    active: false
  });
  const handleUpdate = (isManual: boolean, time: string) => {
    handleUpdateFormFields({
      path: `newScreeningConfig.${flow}`,
      value: {
        isManual,
        timestamp: time ?? null
      }
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
          flow === 'interviewMail' ? 'assessment' : 'disqualified'
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
            })
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

export default Assessment;
