import React from 'react';

import {
  NewJobStep5,
  // SkillsQuestion,
  SkillsQuestionCard,
  SkillsWithoutQuestionToggle,
  SkillsWithQuestionToggle,
} from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';

const FormFive = () => {
  const {
    jobForm: {
      formFields: { interviewType },
    },
    dispatch,
  } = useJobForm();

  const isInterviewAiPowered = interviewType === 'ai-powered';

  return (
    <NewJobStep5
      isAiPoweredScreeningChecked={isInterviewAiPowered}
      onClickAiPoweredScreening={{
        onClick: () => {
          dispatch({
            type: 'editJobField',
            payload: {
              path: 'interviewType',
              value: 'ai-powered',
            },
          });
        },
      }}
      onClickStandardScreening={{
        onClick: () => {
          dispatch({
            type: 'editJobField',
            payload: {
              path: 'interviewType',
              value: 'questions-preset',
            },
          });
        },
      }}
      isStandardScreeningChecked={!isInterviewAiPowered}
      howItWorksLink={{
        href: 'https://www.google.com',
      }}
      isHowItWorksVisible
      slotSkillsQuestion={
        <>
          {isInterviewAiPowered ? (
            <SkillsWithoutQuestionToggle />
          ) : (
            <SkillsWithQuestionToggle
              slotQuestions={
                <>
                  <SkillsQuestionCard textQuestion={'qn'} />
                </>
              }
            />
          )}
        </>
      }
    />
  );
};

export default FormFive;
