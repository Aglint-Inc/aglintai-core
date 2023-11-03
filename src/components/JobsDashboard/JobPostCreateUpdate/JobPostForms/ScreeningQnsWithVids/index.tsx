import React from 'react';

import { ScreeningQuestion } from '@/devlink';

import Categories from './Categories';
import ToggleBtn from '../utils/UIToggle';
import { useJobForm } from '../../JobPostFormProvider';

const ScreeningQns = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  return (
    <>
      <ScreeningQuestion
        textQuestionCount={totalQns}
        slotAssessmentQuestion={
          <>
            <Categories />
          </>
        }
        slotToggleAssessment={
          <ToggleBtn
            handleChange={(newVal) => {
              handleUpdateFormFields({
                path: 'videoAssessment',
                value: newVal,
              });
            }}
            isChecked={jobForm.formFields.videoAssessment}
          />
        }
      />
    </>
  );
};

export default ScreeningQns;
