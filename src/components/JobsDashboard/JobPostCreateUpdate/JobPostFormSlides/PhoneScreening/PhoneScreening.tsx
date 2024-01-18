import { Collapse } from '@mui/material';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

import {
  PhoneScreening,
  ScrCheckmarkIcon,
  ScreeningWelcome,
  ScrQuestionOption,
  ScrQuestionsWrapper,
  ScrRadioIcon,
  ScrShortTextIcon,
} from '@/devlink2';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import KnowOffQn from './KnowOffQn';
import { seedQns } from './utils';
import { PhoneScreenQuestion, useJobForm } from '../../JobPostFormProvider';

const ScreeningComp = () => {
  const [messageOpen, setMessageOpen] = useState<{
    start: boolean;
    end: boolean;
  }>({ end: false, start: false });
  const { recruiterUser } = useAuthDetails();
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const phoneScreening = jobForm.formFields.phoneScreening;
  const [isqnsModeEdit, setIsqnsModeEdit] = useState([]);
  const isEmpty = phoneScreening.questions.length === 0;

  useEffect(() => {
    let qnIdOpen = localStorage.getItem('qnIdOpen');
    setIsqnsModeEdit(
      phoneScreening.questions.map((q) => {
        if (q.id === qnIdOpen) {
          return { id: q.id, isEdit: true };
        }
        return { id: q.id, isEdit: false };
      }),
    );
  }, [phoneScreening.questions.length]);

  return (
    <>
      <PhoneScreening
        slotWelcomeText={
          <>
            <ScreeningWelcome
              isCloseVisible={messageOpen.start}
              isEditButtonVisible={!messageOpen.start}
              editHeading={'Start Message'}
              tooltipText={
                'This message will appear to the candidate as a welcome message before filling the form'
              }
              onclickEdit={{
                onClick: () => {
                  setMessageOpen((p) => ({ ...p, start: !p.start }));
                },
              }}
              onclickClose={{
                onClick: () => {
                  setMessageOpen((p) => ({ ...p, start: !p.start }));
                },
              }}
              slotInput={
                <>
                  <Collapse
                    in={!messageOpen.start}
                    unmountOnExit
                    translate='yes'
                  >
                    <UITypography type='small' fontBold='normal'>
                      {phoneScreening.startMessage}
                    </UITypography>
                  </Collapse>
                  <Collapse
                    in={messageOpen.start}
                    unmountOnExit
                    translate='yes'
                  >
                    <UITextField
                      multiline
                      maxRows={5}
                      minRows={1}
                      value={phoneScreening.startMessage}
                      onChange={(e) => {
                        handleUpdateFormFields({
                          path: 'phoneScreening.startMessage',
                          value: e.target.value,
                        });
                      }}
                    />
                  </Collapse>
                </>
              }
            />
          </>
        }
        slotQuestions={
          <>
            <ScrQuestionsWrapper
              slotQuestions={
                !isEmpty ? (
                  <>
                    {phoneScreening.questions.map((q, idx) => {
                      return (
                        <KnowOffQn
                          key={q.id}
                          isEditMode={
                            isqnsModeEdit.find((m) => m.id === q.id)?.isEdit
                          }
                          qnPath={`phoneScreening.questions[${idx}]`}
                          changeMode={(mode: boolean) => {
                            setIsqnsModeEdit((prev) => {
                              const newState = [...prev];
                              return newState.map((nm) => {
                                if (nm.id === q.id)
                                  return { ...nm, isEdit: mode };
                                return nm;
                              });
                            });
                          }}
                        />
                      );
                    })}
                  </>
                ) : undefined
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
                  <ScrQuestionOption
                    text='Add Custom Question'
                    isTicked={false}
                    isAddIconVisible={true}
                    slotIcon={qnTypeToIcon('shortAnswer')}
                    onclickOption={{
                      onClick: () => {
                        let newQn: PhoneScreenQuestion = {
                          description: '',
                          id: nanoid(),
                          isRequired: false,
                          options: [],
                          question: '',
                          questionLabel: 'Add custom Question',
                          showDescription: false,
                          type: 'shortAnswer',
                        };
                        localStorage.setItem('qnIdOpen', newQn.id);
                        handleUpdateFormFields({
                          path: 'phoneScreening.questions',
                          value: [...phoneScreening.questions, newQn],
                        });
                      },
                    }}
                  />
                </>
              }
            />
          </>
        }
        slotEndText={
          <>
            <ScreeningWelcome
              editHeading={'End Message'}
              tooltipText='Thank you for taking your time. We will get back to you shortly'
              onclickEdit={{
                onClick: () => {
                  setMessageOpen((p) => ({ ...p, end: !p.end }));
                },
              }}
              isCloseVisible={messageOpen.end}
              isEditButtonVisible={!messageOpen.end}
              onclickClose={{
                onClick: () => {
                  setMessageOpen((p) => ({ ...p, end: !p.end }));
                },
              }}
              slotInput={
                <>
                  <Collapse in={!messageOpen.end} unmountOnExit translate='yes'>
                    <UITypography type='small' fontBold='normal'>
                      {phoneScreening.endMessage}
                    </UITypography>
                  </Collapse>
                  <Collapse in={messageOpen.end} unmountOnExit translate='yes'>
                    <UITextField
                      multiline
                      maxRows={5}
                      minRows={1}
                      value={phoneScreening.endMessage}
                      onChange={(e) => {
                        handleUpdateFormFields({
                          path: 'phoneScreening.endMessage',
                          value: e.target.value,
                        });
                      }}
                    />
                  </Collapse>
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
              )}&recruiter_email=${recruiterUser.email}&recruiter_name=${[
                recruiterUser.first_name,
                recruiterUser.last_name,
              ].join(' ')}`,
              '_blank',
            );
          },
        }}
      />
    </>
  );
};

export default ScreeningComp;

export const qnTypeToIcon = (type: PhoneScreenQuestion['type']) => {
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
