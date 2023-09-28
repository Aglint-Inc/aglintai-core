import { Switch } from '@mui/material';
import { get } from 'lodash';

import { NewJobStep4 } from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';

import { FormJobType, useJobForm } from '../JobPostFormProvider';

function StepFour() {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const screeningConfig = get(jobForm, 'formFields.screeningConfig', {
    feedbackVisible: false,
    screening: {
      minScore: true,
      minApplicants: true,
      minNoApplicants: 40,
      minNoResumeScore: 50,
    },
    useAglintMatchingAlgo: true,
    shortlist: {
      algoScore: true,
      interviewScore: true,
      minAlgoScore: 8,
      minInterviewScore: 80,
    },
  }) as FormJobType['screeningConfig'];

  const autoScreening =
    screeningConfig.screening.minScore ||
    screeningConfig.screening.minApplicants;

  const autoShortList =
    screeningConfig.shortlist.algoScore ||
    screeningConfig.shortlist.interviewScore;

  return (
    <NewJobStep4
      isAutomatedScreeningChecked1={screeningConfig.screening.minApplicants}
      isAutomatedScreeningChecked2={screeningConfig.screening.minScore}
      isShortlistCandidateChecked1={screeningConfig.shortlist.interviewScore}
      isShortlistCandidateChecked2={screeningConfig.shortlist.algoScore}
      onClickAutomateScreeningCheck1={{
        onClick: () => {
          autoScreening &&
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.screening.minApplicants',
              value: !screeningConfig.screening.minApplicants,
            });
        },
      }}
      onClickAutomatedScreeningCheck2={{
        onClick: () => {
          autoScreening &&
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.screening.minScore',
              value: !screeningConfig.screening.minScore,
            });
        },
      }}
      onClickShortlistCandidateCheck1={{
        onClick: () => {
          autoShortList &&
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.shortlist.interviewScore',
              value: !screeningConfig.shortlist.interviewScore,
            });
        },
      }}
      onClickShortlistCandidateCheck2={{
        onClick: () => {
          autoShortList &&
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.shortlist.algoScore',
              value: !screeningConfig.shortlist.algoScore,
            });
        },
      }}
      slotAutomateScreeningToggle={
        <>
          <Switch
            size='small'
            color='info'
            checked={autoScreening}
            onChange={() => {
              handleUpdateFormFields({
                saveField: 'screening',
                path: 'screeningConfig.screening',
                value: {
                  ...screeningConfig.screening,
                  minScore: autoScreening ? false : true,
                  minApplicants: autoScreening ? false : true,
                },
              });
            }}
          />
        </>
      }
      slotAutomatedScreeningCount1={
        <UITextField
          type='number'
          width={'70px'}
          placeholder='100'
          disabled={!autoScreening}
          onChange={(e) => {
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.screening.minNoApplicants',
              value: e.target.value,
            });
          }}
          defaultValue={screeningConfig.screening.minNoApplicants}
          value={screeningConfig.screening.minNoApplicants}
        />
      }
      slotAutomatedScreeningCount2={
        <UITextField
          disabled={!autoScreening}
          type='number'
          width={'70px'}
          placeholder='8'
          onChange={(e) => {
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.screening.minNoResumeScore',
              value: e.target.value,
            });
          }}
          defaultValue={screeningConfig.screening.minNoResumeScore}
          value={screeningConfig.screening.minNoResumeScore}
        />
      }
      slotResumeJdToggle={
        <>
          <Switch
            color='info'
            size='small'
            checked={screeningConfig.useAglintMatchingAlgo}
            defaultChecked={screeningConfig.useAglintMatchingAlgo}
            onChange={() => {
              handleUpdateFormFields({
                saveField: 'screening',
                path: 'screeningConfig.useAglintMatchingAlgo',
                value: !screeningConfig.useAglintMatchingAlgo,
              });
            }}
          />
        </>
      }
      slotShortlistCandidateToggle={
        <Switch
          size='small'
          color='info'
          checked={autoShortList}
          defaultChecked={autoShortList}
          onChange={() => {
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.shortlist',
              value: {
                ...screeningConfig.shortlist,
                algoScore: autoShortList ? false : true,
                interviewScore: autoShortList ? false : true,
              },
            });
          }}
        />
      }
      slotShortlistCandidateCount1={
        <UITextField
          type='number'
          width={'70px'}
          disabled={!autoShortList}
          onChange={(e) => {
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.shortlist.minInterviewScore',
              value: e.target.value,
            });
          }}
          value={screeningConfig.shortlist.minInterviewScore}
          defaultValue={screeningConfig.shortlist.minInterviewScore}
        />
      }
      slotShortlistCandidateCount2={
        <UITextField
          type='number'
          width={'70px'}
          disabled={!autoShortList}
          onChange={(e) => {
            handleUpdateFormFields({
              saveField: 'screening',
              path: 'screeningConfig.shortlist.minAlgoScore',
              value: e.target.value,
            });
          }}
          value={screeningConfig.shortlist.minAlgoScore}
          defaultValue={screeningConfig.shortlist.minAlgoScore}
        />
      }
      slotAiFeedbackToggle={
        <>
          <Switch
            size='small'
            color='info'
            defaultChecked={screeningConfig.feedbackVisible}
            checked={screeningConfig.feedbackVisible}
            onChange={() => {
              handleUpdateFormFields({
                path: 'screeningConfig.feedbackVisible',
                value: !screeningConfig.feedbackVisible,
                saveField: 'screening',
              });
            }}
          />
        </>
      }
    />
  );
}

export default StepFour;
