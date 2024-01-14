import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import {
  PhoneScreening,
  ScrCheckmarkIcon,
  ScreeningWelcome,
  ScrQuestion,
  ScrQuestionOption,
  ScrQuestionsWrapper,
  ScrRadioIcon,
  ScrShortTextIcon,
} from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import KnowOffQn from './KnowOffQn';
import PhoneScreenNewQnForm from './PhoneScreenNewQnForm';
import { seedQns } from './utils';
import { PhoneScreenQuestion, useJobForm } from '../../JobPostFormProvider';
import { isEnvProd } from '../../utils';

const ScreeningComp = () => {
  const [messageOpen, setMessageOpen] = useState<{
    start: boolean;
    end: boolean;
  }>({ end: false, start: false });
  const { recruiterUser } = useAuthDetails();
  const { jobForm, handleUpdateFormFields, dispatch } = useJobForm();
  const [startMessage, setStartMessage] = useState('');
  const [endMessage, setEndMessage] = useState('');
  const [newQnsForms, setNewQnForms] = useState([]);
  const phoneScreening = jobForm.formFields.phoneScreening;

  return (
    <>
      <PhoneScreening
        slotWelcomeText={
          <>
            <ScreeningWelcome
              defaultText={phoneScreening.startMessage}
              editHeading={'Start Message'}
              tooltipText={
                'This message will appear to the candidate as a welcome message before filling the form'
              }
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
                        isdefaultEditMode={
                          q.questionLabel === 'Add custom Question'
                        }
                        qnPath={`phoneScreening.questions[${idx}]`}
                      />
                    );
                  })}
                  {newQnsForms.map((newQn) => {
                    return (
                      <ScrQuestion
                        key={newQn.id}
                        isEditView
                        isDefaultView={false}
                        slotDefault={<></>}
                        slotEdit={
                          <>
                            <PhoneScreenNewQnForm
                              key={newQn}
                              handleCancel={() =>
                                setNewQnForms((prev) =>
                                  prev.filter((q) => q !== newQn),
                                )
                              }
                              defaultEditQn={{
                                question: '',
                                type: 'shortAnswer',
                                id: nanoid(),
                                description: '',
                                isRequired: false,
                                options: [],
                                questionLabel: 'Custom Question',
                              }}
                              handleDelete={null}
                              handleDone={(editQn: PhoneScreenQuestion) => {
                                handleUpdateFormFields({
                                  path: 'phoneScreening.questions',
                                  value: [
                                    ...jobForm.formFields.phoneScreening
                                      .questions,
                                    editQn,
                                  ],
                                });
                                setNewQnForms((prev) =>
                                  prev.filter((q) => q !== newQn),
                                );
                              }}
                            />
                          </>
                        }
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
                  <ScrQuestionOption
                    text='Add Custom Question'
                    isTicked={false}
                    isAddIconVisible={true}
                    slotIcon={qnTypeToIcon('shortAnswer')}
                    onclickOption={{
                      onClick: () => {
                        setNewQnForms((prev) => [...prev, nanoid()]);
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
              defaultText={phoneScreening.endMessage}
              editHeading={'End Message'}
              tooltipText='Thank you for taking your time. We will get back to you shortly'
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
              )}&recruiter_email=${recruiterUser.email}&recruiter_name=${[
                recruiterUser.first_name,
                recruiterUser.last_name,
              ].join(' ')}`,
              '_blank',
            );
          },
        }}
        proceedButtonText={
          isEnvProd() ? 'Proceed to Email Templates' : 'Proceed to Assesment'
        }
        onclickProceedBtn={{
          onClick: () => {
            if (isEnvProd()) {
              dispatch({
                type: 'moveToSlide',
                payload: {
                  nextSlide: 'templates',
                },
              });
            } else
              dispatch({
                type: 'moveToSlide',
                payload: {
                  nextSlide: 'screening',
                },
              });
          },
        }}
        isProceedButtonVisible={jobForm.formType === 'new'}
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
