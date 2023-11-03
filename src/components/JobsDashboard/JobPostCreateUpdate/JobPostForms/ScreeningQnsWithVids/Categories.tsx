import { Stack } from '@mui/material';
import { htmlToText } from 'html-to-text';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import {
  AddScreeningQuestion,
  AssessmentQuestions,
  ScreeningQuestionLoader,
} from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
import { generateInterviewQns } from '@/src/utils/prompts/addNewJob/generateInterviewQns';

import Questions from './Questions';
import { InterviewConfigType, useJobForm } from '../../JobPostFormProvider';

const Categories = () => {
  const { jobForm } = useJobForm();

  return (
    <>
      {jobForm.formFields.interviewConfig.map((categ, categIdx) => {
        return (
          <>
            <Category categ={categ} key={categ.id} categIdx={categIdx} />
          </>
        );
      })}
    </>
  );
};

const Category = ({
  categ,
  categIdx,
}: {
  categIdx: number;
  categ: InterviewConfigType;
}) => {
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [newQn, setNewQn] = useState('');
  const handleGenerateInterviewQns = async () => {
    try {
      setAiGenerating(true);
      const qns = await generateInterviewQns(
        categ.questions.map((p) => p.question),
        htmlToText(get(jobForm, 'formFields.jobDescription', '')),
        categ.copy,
        categ.category == 'skill' ? jobForm.formFields.skills : undefined,
      );

      const categIdx = jobForm.formFields.interviewConfig.findIndex(
        (c) => c.category === categ.category,
      );

      const newQns: InterviewConfigType['questions'] = qns.map((q) => ({
        id: nanoid(),
        question: q,
        videoId: '',
        videoQn: '',
      }));
      handleUpdateFormFields({
        path: `interviewConfig[${categIdx}.questions`,
        value: [...categ.questions, ...newQns],
      });
    } catch (err) {
      //
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAddnewQn = () => {
    if (!newQn) return;

    handleUpdateFormFields({
      path: `interviewConfig[${categIdx}].questions`,
      value: [
        ...categ.questions,
        {
          id: nanoid(),
          question: newQn,
          video_id: '',
          videoQn: '',
        },
      ],
    });
    setShowAddForm(false);
    setNewQn('');
  };

  return (
    <>
      <AssessmentQuestions
        textQuestionHeader={categ.copy}
        textQuestionCount={`(${categ.questions.length} Questions)`}
        slotQuestionVideo={
          <>
            <Stack px={2}>
              <Questions
                questions={categ.questions}
                categ={categ.category}
                categIdx={categIdx}
              />
              {aiGenerating && (
                <>
                  <ScreeningQuestionLoader />
                  <ScreeningQuestionLoader />
                  <ScreeningQuestionLoader />
                </>
              )}
              {showAddForm && (
                <AddScreeningQuestion
                  slotInput={
                    <UITextField
                      multiline
                      fullWidth
                      value={newQn}
                      onChange={(e) => {
                        setNewQn(e.target.value);
                      }}
                    />
                  }
                  onClickCancel={{
                    onClick: () => {
                      setShowAddForm(false);
                    },
                  }}
                  onClickAdd={{
                    onClick: handleAddnewQn,
                  }}
                  isVideoVisible={jobForm.formFields.videoAssessment}
                />
              )}
            </Stack>
          </>
        }
        onClickAddAi={{
          onClick: handleGenerateInterviewQns,
        }}
        onClickAddManually={{
          onClick: () => {
            setShowAddForm(true);
          },
        }}
      />
    </>
  );
};

export default Categories;
