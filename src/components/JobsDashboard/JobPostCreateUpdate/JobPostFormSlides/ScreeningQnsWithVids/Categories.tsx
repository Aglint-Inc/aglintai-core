import { Collapse, Stack } from '@mui/material';
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

import { Drag, DragAndDrop, Drop } from './dragDrop';
import DragCtxProvider, { useDragCtx } from './dragDrop/DragCtx';
import Questions from './Questions';
import { reorder } from '../utils/reorder';
import {
  InterviewConfigType,
  QuestionType,
  useJobForm,
} from '../../JobPostFormProvider';

const Categories = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const handleDragEnd = (result) => {
    const { source, type, destination } = result;
    if (!destination) return;
    if (type === 'droppable-category') {
      const updatedCategories = reorder(
        jobForm.formFields.interviewConfig,
        source.index,
        destination.index,
      );

      handleUpdateFormFields({
        path: 'interviewConfig',
        value: updatedCategories,
      });
    } else {
      let dragCategIdx = jobForm.formFields.interviewConfig.findIndex(
        (categ) => categ.id === source.droppableId,
      );
      if (dragCategIdx === -1) return;
      const updatedQns = reorder(
        jobForm.formFields.interviewConfig[Number(dragCategIdx)].questions,
        source.index,
        destination.index,
      );
      handleUpdateFormFields({
        path: `interviewConfig[${dragCategIdx}].questions`,
        value: updatedQns,
      });
    }
  };

  return (
    <>
      <DragCtxProvider>
        <DragAndDrop onDragEnd={handleDragEnd}>
          <Drop id={'droppable'} type={'droppable-category'}>
            {jobForm.formFields.interviewConfig.map((categ, categIdx) => {
              return (
                <>
                  <Drag
                    className='draggable-category'
                    key={categ.id}
                    id={categ.id}
                    index={categIdx}
                  >
                    <Category
                      categ={categ}
                      key={categ.id}
                      categIdx={categIdx}
                    />
                  </Drag>
                </>
              );
            })}
          </Drop>
        </DragAndDrop>
      </DragCtxProvider>
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
  const { iscategDragging } = useDragCtx();
  const handleGenerateInterviewQns = async () => {
    try {
      setAiGenerating(true);
      const qns = await generateInterviewQns(
        categ.questions.map((p) => p.question),
        htmlToText(get(jobForm, 'formFields.jobDescription', '')),
        categ.copy,
        // categ.category == 'skill' ? jobForm.formFields.skills : undefined,
      );

      const categIdx = jobForm.formFields.interviewConfig.findIndex(
        (c) => c.category === categ.category,
      );

      const newQns: InterviewConfigType['questions'] = qns.map((q) => ({
        id: nanoid(),
        question: q,
        videoId: '',
        videoQn: '',
        videoUrl: '',
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

    const newQuestion: QuestionType = {
      id: nanoid(),
      question: newQn,
      videoId: '',
      videoQn: '',
      videoUrl: '',
    };
    handleUpdateFormFields({
      path: `interviewConfig[${categIdx}].questions`,
      value: [...categ.questions, newQuestion],
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
            <Stack>
              <Collapse in={!iscategDragging}>
                <Questions
                  questions={categ.questions}
                  categIdx={categIdx}
                  categId={categ.id}
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
                        placeholder='Type the question'
                        InputProps={{ autoFocus: true }}
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
              </Collapse>
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
        isAddVisible={true}
      />
    </>
  );
};

export default Categories;
