import { Stack } from '@mui/material';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import {
  PhoneScreening,
  ScrCheckmarkIcon,
  ScrDropdown,
  ScreeningWelcome,
  ScrQuestion,
  ScrQuestionDefault,
  ScrQuestionEdit,
  ScrQuestionOption,
  ScrQuestionOptionEdit,
  ScrQuestionsWrapper,
  ScrRadioIcon,
  ScrShortTextIcon,
} from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';

import { PhoneScreenQuestion, useJobForm } from '../JobPostFormProvider';

const ScreeningComp = () => {
  const [messageOpen, setMessageOpen] = useState<{
    start: boolean;
    end: boolean;
  }>({ end: false, start: false });
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [startMessage, setStartMessage] = useState('');
  const [endMessage, setEndMessage] = useState('');
  const phoneScreening = jobForm.formFields.phoneScreening;

  return (
    <>
      <PhoneScreening
        slotWelcomeText={
          <>
            <ScreeningWelcome
              defaultText={phoneScreening.startMessage}
              editHeading={''}
              isDefaultView={!messageOpen.start}
              isEditView={messageOpen.start}
              onclickEdit={{
                onClick: () => {
                  setMessageOpen((p) => ({ ...p, start: !p.start }));
                  setStartMessage(phoneScreening.startMessage);
                },
              }}
              slotButtons={
                <>
                  <AUIButton
                    variant='text'
                    onClick={() => {
                      setMessageOpen((p) => ({ ...p, start: false }));
                      setStartMessage('');
                    }}
                  >
                    Cancel
                  </AUIButton>
                  <AUIButton
                    variant='primary'
                    size='medium'
                    onClick={() => {
                      handleUpdateFormFields({
                        path: 'phoneScreening.startMessage',
                        value: startMessage,
                      });
                      setMessageOpen((p) => ({ ...p, start: false }));
                      setStartMessage('');
                    }}
                  >
                    Update
                  </AUIButton>
                </>
              }
              slotInput={
                <>
                  <UITextField
                    multiline
                    maxRows={5}
                    minRows={1}
                    value={startMessage}
                    onChange={(e) => {
                      setStartMessage(e.target.value);
                    }}
                  />
                </>
              }
            />
          </>
        }
        slotQuestions={
          <>
            <ScrQuestionsWrapper
              slotQuestions={
                <>
                  {phoneScreening.questions.map((q, idx) => {
                    return (
                      <KnowOffQn
                        key={q.id}
                        qnIdx={idx}
                        qnPath={`phoneScreening.questions[${idx}]`}
                      />
                    );
                  })}
                </>
              }
              slotOptions={
                <>
                  {seedQns.map((qn, idx) => {
                    let isLabelAdded = Boolean(
                      phoneScreening.questions.find(
                        (q) => q.questionLabel === qn.questionLabel,
                      ),
                    );
                    return (
                      <ScrQuestionOption
                        key={idx}
                        text={qn.questionLabel}
                        isAddIconVisible={!isLabelAdded}
                        slotIcon={qnTypeToIcon(qn.type)}
                        isTicked={isLabelAdded}
                        onclickOption={{
                          onClick: () => {
                            if (
                              isLabelAdded &&
                              qn.questionLabel !== 'Add custom Question'
                            )
                              return;
                            handleUpdateFormFields({
                              path: 'phoneScreening.questions',
                              value: [
                                ...jobForm.formFields.phoneScreening.questions,
                                { ...qn },
                              ],
                            });
                          },
                        }}
                      />
                    );
                  })}
                </>
              }
            />
          </>
        }
        slotEndText={
          <>
            <ScreeningWelcome
              defaultText={phoneScreening.endMessage}
              editHeading={''}
              isDefaultView={!messageOpen.end}
              isEditView={messageOpen.end}
              onclickEdit={{
                onClick: () => {
                  setMessageOpen((p) => ({ ...p, end: !p.end }));
                  setEndMessage(phoneScreening.endMessage);
                },
              }}
              slotButtons={
                <>
                  <AUIButton
                    variant='text'
                    onClick={() => {
                      setMessageOpen((p) => ({ ...p, end: false }));
                      setEndMessage('');
                    }}
                  >
                    Cancel
                  </AUIButton>
                  <AUIButton
                    variant='primary'
                    size='medium'
                    onClick={() => {
                      handleUpdateFormFields({
                        path: 'phoneScreening.endMessage',
                        value: endMessage,
                      });
                      setMessageOpen((p) => ({ ...p, end: false }));
                      setEndMessage('');
                    }}
                  >
                    Update
                  </AUIButton>
                </>
              }
              slotInput={
                <>
                  <UITextField
                    multiline
                    maxRows={5}
                    minRows={1}
                    value={endMessage}
                    onChange={(e) => {
                      setEndMessage(e.target.value);
                    }}
                  />
                </>
              }
            />
          </>
        }
        onclickPreview={{
          onClick: () => {
            window.open(
              `${
                process.env.NEXT_PUBLIC_HOST_NAME
              }/candidate-phone-screening?job_post_id=${get(
                jobForm,
                'jobPostId',
                '',
              )}&preview=true`,
              '_blank',
            );
          },
        }}
      />
    </>
  );
};

export default ScreeningComp;

const KnowOffQn = ({ qnPath, qnIdx }) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [editQn, setEditQn] = useState<PhoneScreenQuestion | null>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const q = get(jobForm, `formFields.${qnPath}`, null) as PhoneScreenQuestion;
  if (!q) return;

  let disableEditBtn = false;

  if (
    editQn &&
    (((editQn.type === 'multiSelect' || editQn.type === 'singleSelect') &&
      editQn.options.length === 0) ||
      (editQn.type === 'shortAnswer' && editQn.question.length === 0))
  ) {
    disableEditBtn = true;
  }
  return (
    <ScrQuestion
      isDefaultView={isDefaultView}
      isEditView={!isDefaultView}
      slotDefault={
        <ScrQuestionDefault
          isRequired={q.isRequired}
          textQuestion={q.question}
          slotIcon={qnTypeToIcon(q.type)}
          onclickEdit={{
            onClick: () => {
              setIsDefaultView(false);
              setEditQn(q);
            },
          }}
          isOptionsVisible={
            q.type === 'multiSelect' || q.type === 'singleSelect'
          }
          textOption={
            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
              {q.options.map((op, idx) => (
                <UITypography key={idx}>
                  {`${idx + 1}.  ${op.option} `}
                </UITypography>
              ))}
            </Stack>
          }
        />
      }
      slotEdit={
        editQn && (
          <ScrQuestionEdit
            isReqChecked={editQn?.isRequired}
            isOptionsVisible={editQn?.type !== 'shortAnswer'}
            slotOptions={
              <>
                {editQn.options.map((op, idx) => (
                  <ScrQuestionOptionEdit
                    onclickRemove={{
                      onClick: () => {
                        const updOptions = editQn.options.filter(
                          (e) => e.id !== op.id,
                        );
                        setEditQn((prev) => ({ ...prev, options: updOptions }));
                      },
                    }}
                    key={op.id}
                    count={idx + 1}
                    slotInput={
                      <UITextField
                        value={op.option}
                        placeholder='Type Here'
                        onChange={(e) => {
                          const updOptions = editQn.options.map((t) => {
                            if (t.id === op.id) {
                              t.option = e.target.value;
                              return { ...t };
                            }
                            return t;
                          });
                          setEditQn((prev) => ({
                            ...prev,
                            options: updOptions,
                          }));
                        }}
                      />
                    }
                  />
                ))}
              </>
            }
            onclickDelete={{
              onClick: () => {
                setEditQn(null);
                setIsDefaultView(true);
                handleUpdateFormFields({
                  path: 'phoneScreening.questions',
                  value: jobForm.formFields.phoneScreening.questions.filter(
                    (_, idx) => idx !== qnIdx,
                  ),
                });
              },
            }}
            slotQuestionInput={
              <>
                <UITextField
                  multiline
                  fullWidth
                  minRows={1}
                  maxRows={3}
                  value={editQn?.question}
                  onChange={(e) => {
                    setEditQn((p) => ({ ...p, question: e.target.value }));
                  }}
                />
                <ScrDropdown
                  slotSelectedIcon={qnTypeToIcon(editQn?.type)}
                  selectedText={editQn.type}
                  onclickMultiSelect={{
                    onClick: () => {
                      setEditQn((prev) => ({ ...prev, type: 'multiSelect' }));
                      setShowDropDown((prev) => !prev);
                    },
                  }}
                  onclickShortAnswer={{
                    onClick: () => {
                      setEditQn((prev) => ({ ...prev, type: 'shortAnswer' }));
                      setShowDropDown((prev) => !prev);
                    },
                  }}
                  onclickSingleSelect={{
                    onClick: () => {
                      setEditQn((prev) => ({ ...prev, type: 'singleSelect' }));
                      setShowDropDown((prev) => !prev);
                    },
                  }}
                  isOptionsBodyVisible={showDropDown}
                  onclickTrigger={{
                    onClick: () => {
                      setShowDropDown((prev) => !prev);
                    },
                  }}
                />
              </>
            }
            onclickAddOption={{
              onClick: () => {
                setEditQn((prev) => ({
                  ...prev,
                  options: [
                    ...editQn.options,
                    {
                      id: nanoid(),
                      option: '',
                    },
                  ],
                }));
              },
            }}
            onclickRequiredCheckbox={{
              onClick: () => {
                setEditQn((prev) => ({
                  ...prev,
                  isRequired: !prev.isRequired,
                }));
              },
            }}
            slotButtons={
              <>
                <AUIButton
                  variant='text'
                  size='medium'
                  onClick={() => {
                    setIsDefaultView(true);
                    setEditQn(null);
                  }}
                >
                  Cancel
                </AUIButton>
                <AUIButton
                  variant='primary'
                  size='medium'
                  disabled={disableEditBtn}
                  onClick={() => {
                    if (!editQn?.question) return;
                    handleUpdateFormFields({
                      path: qnPath,
                      value: editQn,
                    });
                    setIsDefaultView(true);
                    setEditQn(null);
                  }}
                >
                  Update
                </AUIButton>
              </>
            }
          />
        )
      }
    />
  );
};

const seedQns: PhoneScreenQuestion[] = [
  {
    id: nanoid(),
    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question:
      'Can you provide a brief overview of your professional background and how it aligns with the responsibilities of an Enterprise Customer Success Manager ?',
    questionLabel: 'Backgound check',
  },
  {
    id: nanoid(),

    type: 'singleSelect',
    isRequired: true,
    options: [
      {
        id: nanoid(),
        option: ' Advanced proficiency',
      },
      {
        id: nanoid(),
        option: 'Intermediate proficiency',
      },
      {
        id: nanoid(),
        option: 'Basic proficiency',
      },
      {
        id: nanoid(),
        option: 'Limited proficiency',
      },
    ],

    question:
      'Which of the following best describes your expertise with [relevant skills]? (Select all that apply)',
    questionLabel: 'Expertise with skill',
  },
  {
    id: nanoid(),

    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: `This role may involve occasional travel. Do you possess a valid driver's license, and are you comfortable with potential travel requirements?`,
    questionLabel: 'Drivers licence',
  },
  {
    id: nanoid(),
    type: 'multiSelect',
    isRequired: true,
    options: [
      { id: nanoid(), option: 'Remote' },
      { id: nanoid(), option: 'Hybrid' },
      { id: nanoid(), option: 'Onsite' },
    ],
    question: `Which workplace type do you have the most experience with, and how do you ensure productivity and collaboration within that setting?`,
    questionLabel: 'Workplace type',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question:
      'Our company has a policy requiring a drug test as part of the hiring process. Are you comfortable undergoing a drug test as part of the onboarding process?',
    questionLabel: 'Drug test',
  },
  {
    id: nanoid(),

    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: `Please elaborate on your experience managing enterprise-level customer relationships, highlighting any notable achievements or challenges you've successfully navigated.`,
    questionLabel: 'Experience',
  },
  {
    id: nanoid(),

    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: `What is your current visa status in the country where you would be working remotely, and do you have any restrictions that might affect your eligibility for the role?`,
    questionLabel: 'Industry experience',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: `What is your current visa status in the country where you would be working remotely, and do you have any restrictions that might affect your eligibility for the role?`,
    questionLabel: 'Visa status',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: `Can you confirm your work authorization and eligibility to work remotely without any restrictions in the [country]?`,
    questionLabel: 'Work authorisation',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: 'Add your Custom Question Here',
    questionLabel: 'Add custom Question',
  },
];

const qnTypeToIcon = (type: PhoneScreenQuestion['type']) => {
  if (type === 'singleSelect') {
    return <ScrRadioIcon />;
  }

  if (type === 'multiSelect') {
    return <ScrCheckmarkIcon />;
  }

  if (type === 'shortAnswer') {
    return <ScrShortTextIcon />;
  }
};
