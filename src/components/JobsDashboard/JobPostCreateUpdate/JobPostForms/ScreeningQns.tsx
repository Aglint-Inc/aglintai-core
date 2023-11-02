import { Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import {
  AddSocialLink,
  GenerateQuestion,
  QuestionSkeletonLoader,
  ScreeningQuestionMenu,
  ScreeningQuestions,
  SkillsQuestionCard,
  SkillsQuestionInput,
} from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { JobFormErrorParams } from '@/src/components/Job/JobForm';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { generateInterviewQns } from '@/src/utils/prompts/addNewJob/generateInterviewQns';

import {
  FormJobType,
  InterviewConfigType,
  InterviewParam,
  useJobForm,
} from '../JobPostFormProvider';

// ;
const ScreeningQns = ({ setFormError }) => {
  const { jobForm, dispatch } = useJobForm();
  const [activeCateg, setActiveCateg] = useState<InterviewParam>('skill');
  const params = get(
    jobForm,
    'formFields.interviewConfig',
    [],
  ) as FormJobType['interviewConfig'];

  const totalQns = Object.keys(params)
    // eslint-disable-next-line security/detect-object-injection
    .map((k: InterviewParam) => params[k].questions.length)
    .reduce((p, curr) => {
      return p + curr;
    }, 0);
  return (
    <>
      <ScreeningQuestions
        slotScreeningRight={
          <StandardScreenSingle
            param={get(params, `${activeCateg}`)}
            paramKey={activeCateg}
            setFormError={setFormError}
          />
        }
        slotSkillMenu={
          <>
            <ScreeningQuestionMenu
              textSkills={'Skills'}
              isSkillMenuActive={activeCateg === 'skill'}
              onClickSkill={{
                onClick: () => {
                  setActiveCateg('skill');
                },
              }}
              textNoofQuestions={
                get(params, 'skill.questions', []).length + ' Questions'
              }
            />
            <ScreeningQuestionMenu
              textSkills={'Behavior'}
              isSkillMenuActive={activeCateg === 'behavior'}
              onClickSkill={{
                onClick: () => {
                  setActiveCateg('behavior');
                },
              }}
              textNoofQuestions={
                get(params, 'behavior.questions', []).length + ' Questions'
              }
            />
            <ScreeningQuestionMenu
              textSkills={'Communication'}
              isSkillMenuActive={activeCateg === 'communication'}
              onClickSkill={{
                onClick: () => {
                  setActiveCateg('communication');
                },
              }}
              textNoofQuestions={
                get(params, 'communication.questions', []).length + ' Questions'
              }
            />
            <ScreeningQuestionMenu
              textSkills={'Performance'}
              isSkillMenuActive={activeCateg === 'performance'}
              onClickSkill={{
                onClick: () => {
                  setActiveCateg('performance');
                },
              }}
              textNoofQuestions={
                get(params, 'performance.questions', []).length + ' Questions'
              }
            />
            <ScreeningQuestionMenu
              textSkills={'Education'}
              isSkillMenuActive={activeCateg === 'education'}
              onClickSkill={{
                onClick: () => {
                  setActiveCateg('education');
                },
              }}
              textNoofQuestions={
                get(params, 'education.questions', []).length + ' Questions'
              }
            />
            <ScreeningQuestionMenu
              textSkills={'General'}
              isSkillMenuActive={activeCateg === 'general'}
              onClickSkill={{
                onClick: () => {
                  setActiveCateg('general');
                },
              }}
              textNoofQuestions={
                get(params, 'general.questions', []).length + ' Questions'
              }
            />
          </>
        }
        textCountActiveQuestion={totalQns}
        isAddJob={jobForm.formType === 'new'}
        isProceedDisable={false}
        onClickProceed={{
          onClick: () => {
            // console.log(params);
            dispatch({
              type: 'moveToSlide',
              payload: {
                nextSlide: 'workflow',
              },
            });
          },
        }}
      />
    </>
  );
};

const StandardScreenSingle = ({
  param,
  paramKey,
  setFormError,
}: {
  param: InterviewConfigType;
  paramKey: InterviewParam;
  setFormError: any;
}) => {
  const { recruiter } = useAuthDetails();
  const [showForm, setShowForm] = useState(false);
  const [questionInput, setQuestionInput] = useState('');
  const [isAiGenerating, setAiGenerating] = useState(false);
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const handleCloseForm = () => {
    setQuestionInput('');
    setShowForm(false);
  };

  const handleAdd = () => {
    if (!questionInput) return;
    const existingQns = get(
      jobForm,
      `formFields.interviewConfig.[${paramKey}].questions`,
      [],
    ) as InterviewConfigType['questions'];
    const updatedQns: InterviewConfigType['questions'] = [
      ...existingQns,
      { question: questionInput, id: nanoid() },
    ];
    handleUpdateFormFields({
      path: `interviewConfig.[${paramKey}].questions`,
      value: [...updatedQns],
    });

    handleCloseForm();
  };

  const handleGenerateInterviewQns = async () => {
    try {
      setAiGenerating(true);
      setFormError((p: JobFormErrorParams) => ({
        ...p,
        aiQnGen: p.aiQnGen + 1,
      }));
      const qns = await generateInterviewQns(
        param.questions.map((p) => p.question).slice(0, 5),
        htmlToText(get(jobForm, 'formFields.jobDescription', '')),
        param.copy,
        paramKey == 'skill' ? jobForm.formFields.skills : undefined,
      );

      // old code

      if (recruiter?.email != 'dheeraj+1@aglinthq.com') {
        const newQns = qns.map((q) => ({
          id: nanoid(),
          question: q,
        })) as InterviewConfigType['questions'];
        handleUpdateFormFields({
          path: `interviewConfig.${paramKey}.questions`,
          value: [...param.questions, ...newQns],
        });
      }
      if (recruiter?.email == 'dheeraj+1@aglinthq.com') {
        // new code
        const newQns = [];
        const axiosRequests = [];

        qns.forEach((q) => {
          // Create an Axios request for each question and store it in an array
          const request = axios
            .post('/api/generateVideo', { text: q })
            .then(({ data }) => {
              const {
                data: { video_id },
              } = data;
              newQns.push({
                id: nanoid(),
                question: q,
                video_id: video_id,
                video_url: '',
              });
            });
          axiosRequests.push(request);
        });

        // Use Promise.all to wait for all Axios requests to complete
        Promise.all(axiosRequests)
          .then(() => {
            // All requests have completed, you can now log newQns
            // console.log(newQns);
            handleUpdateFormFields({
              path: `interviewConfig.${paramKey}.questions`,
              value: [...param.questions, ...newQns],
            });
          })
          .catch((error) => {
            return error;
            // console.error('An error occurred:', error);
          });
        // new code end
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setAiGenerating(false);
      setTimeout(() => {
        setFormError(
          (p: JobFormErrorParams) => ({
            ...p,
            aiQnGen: p.aiQnGen - 1,
          }),
          1500,
        );
      });
    }
  };

  const qns = get(
    jobForm,
    `formFields.interviewConfig.[${paramKey}].questions`,
    [],
  ) as InterviewConfigType['questions'];

  const enableAddQuestion = param.questions.length <= 10;
  return (
    <>
      <Stack border={1} borderColor={palette.grey[200]} borderRadius={'5px'}>
        <Stack p={1} direction={'row'} justifyContent={'space-between'}>
          <Stack>
            <UITypography fontBold='normal'>{param.copy}</UITypography>
          </Stack>
        </Stack>
        <Collapse in={true} translate='yes' unmountOnExit mountOnEnter>
          <Stack p={1} gap={1}>
            {qns.map((q) => {
              return (
                <InterviewQn
                  qnId={q.id}
                  key={q.id}
                  question={q.question}
                  paramKey={paramKey}
                />
              );
            })}
            {isAiGenerating && <QuestionSkeletonLoader />}
            {isAiGenerating && <QuestionSkeletonLoader />}
            {isAiGenerating && <QuestionSkeletonLoader />}
            {showForm && (
              <SkillsQuestionInput
                slotInput={
                  <Stack p={0.4}>
                    <UITextField
                      noBorder
                      onChange={(e) => setQuestionInput(e.target.value)}
                      value={questionInput}
                      multiline
                    />
                  </Stack>
                }
                onClickSave={{
                  onClick: handleAdd,
                }}
                onClickCancel={{
                  onClick: handleCloseForm,
                }}
              />
            )}
            <Stack direction={'row'}>
              {
                <AddSocialLink
                  textLabel='Add Custom Question'
                  onClickAddSocialLink={{
                    onClick: () => {
                      setShowForm(true);
                    },
                  }}
                />
              }
            </Stack>
            {enableAddQuestion && (
              <GenerateQuestion
                isGenerateButtonDisable={isAiGenerating}
                onClickGenerate={{
                  onClick: handleGenerateInterviewQns,
                }}
              />
            )}
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
};

const InterviewQn = ({
  paramKey,
  qnId,
  question,
}: {
  paramKey: InterviewParam;
  qnId: string;
  question: string;
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editingQn, setEditingQn] = useState('');
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const handleDelete = () => {
    const existingQns = get(
      jobForm,
      `formFields.interviewConfig.[${paramKey}].questions`,
      [],
    ) as InterviewConfigType['questions'];
    const updatedQns = existingQns.filter((q) => q.id !== qnId);
    handleUpdateFormFields({
      path: `interviewConfig.[${paramKey}].questions`,
      value: [...updatedQns],
    });
  };

  const handleEdit = () => {
    const existingQns = get(
      jobForm,
      `formFields.interviewConfig.[${paramKey}].questions`,
      [],
    ) as InterviewConfigType['questions'];
    const updatedQns: InterviewConfigType['questions'] = existingQns.map(
      (p) => {
        if (p.id === qnId) {
          return {
            id: nanoid(),
            question: editingQn,
          };
        }
        return p;
      },
    );
    handleUpdateFormFields({
      path: `interviewConfig.[${paramKey}].questions`,
      value: [...updatedQns],
    });
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowEdit(false);
    setEditingQn('');
  };

  if (showEdit) {
    return (
      <SkillsQuestionInput
        slotInput={
          <Stack p={0.4}>
            <UITextField
              noBorder
              onChange={(e) => setEditingQn(e.target.value)}
              value={editingQn}
              multiline
            />
          </Stack>
        }
        onClickSave={{
          onClick: handleEdit,
        }}
        onClickCancel={{
          onClick: handleCloseForm,
        }}
        isSaveIconsVisible={true}
      />
    );
  }

  return (
    <SkillsQuestionCard
      onClickDelete={{
        onClick: handleDelete,
      }}
      onClickEdit={{
        onClick: () => {
          setEditingQn(question);
          setShowEdit(true);
        },
      }}
      textQuestion={question}
    />
  );
};

export default ScreeningQns;
