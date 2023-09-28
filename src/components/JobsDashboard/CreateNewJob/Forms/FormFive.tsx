import { Collapse, Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import {
  AddSocialLink,
  GenerateQuestion,
  NewJobStep5,
  SkillsQuestionCard,
  SkillsQuestionInput,
  SkillsWithoutQuestionToggle,
} from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { palette } from '@/src/context/Theme/Theme';

import {
  FormJobType,
  InterviewConfigType,
  InterviewParam,
  useJobForm,
} from '../JobPostFormProvider';

const FormFive = () => {
  const {
    jobForm: { formFields },
    handleUpdateFormFields,
  } = useJobForm();

  // const [] = useState();
  const isInterviewAiPowered =
    get(formFields, 'interviewType', '') === 'ai-powered';

  return (
    <NewJobStep5
      isAiPoweredScreeningChecked={isInterviewAiPowered}
      onClickAiPoweredScreening={{
        onClick: () => {
          handleUpdateFormFields({
            path: 'interviewType',
            value: 'ai-powered',
            saveField: 'screening',
          });
        },
      }}
      onClickStandardScreening={{
        onClick: () => {
          handleUpdateFormFields({
            path: 'interviewType',
            value: 'standard',
            saveField: 'screening',
          });
        },
      }}
      isStandardScreeningChecked={!isInterviewAiPowered}
      howItWorksLink={{
        href: 'https://www.aglinthq.com',
      }}
      isHowItWorksVisible
      slotSkillsQuestion={
        <>
          {isInterviewAiPowered ? (
            <AiScreeningConfigParams />
          ) : (
            <StandardScreeningParams />
          )}
        </>
      }
    />
  );
};

export default FormFive;
// ;
const StandardScreeningParams = () => {
  const { jobForm } = useJobForm();

  const params = get(
    jobForm,
    'formFields.interviewConfig',
    [],
  ) as FormJobType['interviewConfig'];

  return (
    <>
      <Stack gap={2}>
        {<StandardScreenSingle param={params.skill} paramKey={'skill'} />}
        {<StandardScreenSingle param={params.cultural} paramKey={'cultural'} />}
        {
          <StandardScreenSingle
            param={params.personality}
            paramKey={'personality'}
          />
        }
        {
          <StandardScreenSingle
            param={params.softSkills}
            paramKey={'softSkills'}
          />
        }
      </Stack>
    </>
  );
};

const AiScreeningConfigParams = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const params = get(
    jobForm,
    'formFields.interviewConfig',
    [],
  ) as FormJobType['interviewConfig'];
  return (
    <>
      {Object.keys(params).map((p) => {
        const paramVal = get(
          jobForm,
          `formFields.interviewConfig.[${p}].value`,
          false,
        );
        const copy = get(
          jobForm,
          `formFields.interviewConfig.[${p}].copy`,
          false,
        );
        return (
          <SkillsWithoutQuestionToggle
            key={p}
            slotToggle={
              <Switch
                size='small'
                color='info'
                checked={paramVal}
                onChange={() => {
                  handleUpdateFormFields({
                    saveField: 'screening',
                    path: `interviewConfig.[${p}].value`,
                    value: !paramVal,
                  });
                }}
              />
            }
            textSkills={copy}
          />
        );
      })}
    </>
  );
};

const StandardScreenSingle = ({
  param,
  paramKey,
}: {
  param: InterviewConfigType;
  paramKey: InterviewParam;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [questionInput, setQuestionInput] = useState('');

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
      saveField: 'screening',
      path: `interviewConfig.[${paramKey}].questions`,
      value: [...updatedQns],
    });

    handleCloseForm();
  };

  const qns = get(
    jobForm,
    `formFields.interviewConfig.[${paramKey}].questions`,
    [],
  ) as InterviewConfigType['questions'];

  return (
    <>
      <Stack border={1} borderColor={palette.grey[200]} borderRadius={'5px'}>
        <Stack p={1} direction={'row'} justifyContent={'space-between'}>
          <Stack>
            <UITypography fontBold='normal'>{param.copy}</UITypography>
          </Stack>
          <Switch
            size='small'
            color='info'
            checked={param.value}
            onChange={() => {
              handleUpdateFormFields({
                saveField: 'screening',
                path: `interviewConfig.[${paramKey}].value`,
                value: !param.value,
              });
            }}
          />
        </Stack>
        <Collapse
          in={param.value}
          translate='yes'
          unmountOnExit={false}
          mountOnEnter={false}
        >
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
            {showForm && (
              <SkillsQuestionInput
                slotInput={
                  <Stack p={0.4}>
                    <UITextField
                      noBorder
                      onChange={(e) => setQuestionInput(e.target.value)}
                      value={questionInput}
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
              <AddSocialLink
                textLabel='Add Custom Question'
                onClickAddSocialLink={{
                  onClick: () => {
                    setShowForm(true);
                  },
                }}
              />
            </Stack>
            <GenerateQuestion
              isGenerateButtonDisable={true}
              onClickGenerate={{
                onClick: () => {
                  //
                },
              }}
            />
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
      saveField: 'screening',
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
      saveField: 'screening',
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
            />
          </Stack>
        }
        onClickSave={{
          onClick: handleEdit,
        }}
        onClickCancel={{
          onClick: handleCloseForm,
        }}
      />
    );
  }

  return (
    <SkillsQuestionCard
      onClickDelete={{
        onClick: handleDelete,
      }}
      onClickDislike={{
        onClick: () => {},
      }}
      onClickEdit={{
        onClick: () => {
          setEditingQn(question);
          setShowEdit(true);
        },
      }}
      onClickLike={{
        onClick: () => {},
      }}
      textQuestion={question}
    />
  );
};
