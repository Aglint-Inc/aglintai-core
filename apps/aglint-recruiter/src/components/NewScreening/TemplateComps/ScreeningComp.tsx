import { Collapse, Stack } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { AddCustomQuestion } from '@/devlink2/AddCustomQuestion';
import { PhoneScreening } from '@/devlink2/PhoneScreening';
import { ScrCheckmarkIcon } from '@/devlink2/ScrCheckmarkIcon';
import { ScreeningWelcome } from '@/devlink2/ScreeningWelcome';
import { ScrQuestionOption } from '@/devlink2/ScrQuestionOption';
import { ScrQuestionsWrapper } from '@/devlink2/ScrQuestionsWrapper';
import { ScrRadioIcon } from '@/devlink2/ScrRadioIcon';
import { ScrShortTextIcon } from '@/devlink2/ScrShortTextIcon';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { usePhoneScreening } from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

import { PhoneScreenQuestion } from '../types';
import KnowOffQn from './KnowOffQn';
import { seedQns } from './utils';

const ScreeningComp = () => {
  const [messageOpen, setMessageOpen] = useState<{
    start: boolean;
    end: boolean;
  }>({ end: false, start: false });
  const { handleUpdateFormFields, phoneScreenignForm } = usePhoneScreening();

  const phoneScreening = phoneScreenignForm.phoneScreening;
  const [isqnsModeEdit, setIsqnsModeEdit] = useState([]);
  const isEmpty = phoneScreening.questions.length === 0;
  const [isLoading, setLoading] = useState(true);
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
    setLoading(false);
  }, [phoneScreening.questions.length]);

  return (
    <>
      {isLoading ? (
        <Stack
          direction={'row'}
          alignItems={'center'}
          width={'100%'}
          height={'100vh'}
          justifyContent={'center'}
        >
          <LoaderSvg />
        </Stack>
      ) : (
        <PhoneScreening
          isHeaderVisible={false}
          slotWelcomeText={
            <>
              <ScreeningWelcome
                isEnd={false}
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
                      <Stack
                        p={1.5}
                        bgcolor={'var(--neutral-1)'}
                        borderRadius={'var(--radius-4)'}
                      >
                        <UITypography type='small' fontBold='normal'>
                          {phoneScreening.startMessage}
                        </UITypography>
                      </Stack>
                    </Collapse>
                    <Collapse
                      in={messageOpen.start}
                      unmountOnExit
                      translate='yes'
                    >
                      <UITextField
                        multiline
                        maxRows={5}
                        minRows={2}
                        value={phoneScreening.startMessage}
                        onChange={(e) => {
                          handleUpdateFormFields({
                            path: 'phoneScreening.startMessage',
                            value: e.target.value,
                          });
                        }}
                        InputProps={{
                          autoFocus: true,
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
                                value: [...phoneScreening.questions, { ...qn }],
                              });
                            },
                          }}
                        />
                      );
                    })}
                    <AddCustomQuestion
                      onClickAdd={{
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
                isEnd={true}
                editHeading={'End Message'}
                tooltipText='This message will show to the candidate after taking phone screening'
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
                    <Collapse
                      in={!messageOpen.end}
                      unmountOnExit
                      translate='yes'
                    >
                      <Stack
                        p={1.5}
                        bgcolor={'var(--neutral-1)'}
                        borderRadius={'var(--space-2)'}
                      >
                        <UITypography type='small' fontBold='normal'>
                          {phoneScreening.endMessage}
                        </UITypography>
                      </Stack>
                    </Collapse>
                    <Collapse
                      in={messageOpen.end}
                      unmountOnExit
                      translate='yes'
                    >
                      <UITextField
                        multiline
                        maxRows={5}
                        minRows={2}
                        value={phoneScreening.endMessage}
                        onChange={(e) => {
                          handleUpdateFormFields({
                            path: 'phoneScreening.endMessage',
                            value: e.target.value,
                          });
                        }}
                        InputProps={{
                          autoFocus: true,
                        }}
                      />
                    </Collapse>
                  </>
                }
              />
            </>
          }
          // slotInfo={
          //   formWarnings.phoneScreening.err.length !== 0 && (
          //     <JobEditWarning
          //       slotWarningList={
          //         <>
          //           {formWarnings.phoneScreening.err.map((er, index) => (
          //             <JobWarningList key={index} textWarning={er} />
          //           ))}
          //         </>
          //       }
          //     />
          //   )
          // }
        />
      )}
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
