import { Radio, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import { useState } from 'react';

import { ButtonOutlined } from '@/devlink/ButtonOutlined';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Checkbox } from '@/devlink/Checkbox';
import { PhoneScreeningQ } from '@/devlink/PhoneScreeningQ';
import toast from '@/src/utils/toast';

import UITypography from '../Common/UITypography';
import { API_FAIL_MSG } from '../JobsDashboard/JobPostCreateUpdate/utils';
import CompanyLogo from './CompanyLogo';
import {
  PhoneScreeningResponseType,
  useScreeningCtx,
} from './ScreeningCtxProvider';
import { phoneScreenEmail } from './utils';

const PhoneScreeningQn = ({ path, qnNo }) => {
  const { state, updateState } = useScreeningCtx();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const qn: PhoneScreeningResponseType = get(state, path);

  const handleSubmit = async () => {
    try {
      if (!isResponseValid()) return;

      if (state.isPreview) {
        updateState({
          path: 'showEndMessage',
          value: true,
        });
        phoneScreenEmail({
          candidate: state.candidate,
          company: state.company,
          role: state.jobTitle,
          screenResp: state.phoneScreen,
        });
        return;
      }

      setIsSubmitting(true);

      const candResponse = {
        response: state.phoneScreen,
        applied_at: new Date().toUTCString(),
      };
      await axios.post('/api/phone-screening/submit', {
        candResponse: candResponse,
        application_id: state.applicationId,
      });

      phoneScreenEmail({
        candidate: state.candidate,
        company: state.company,
        role: state.jobTitle,
        screenResp: state.phoneScreen,
      });
      updateState({
        path: 'showEndMessage',
        value: true,
      });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isResponseValid = () => {
    if (!qn.isRequired) true;

    if (qn.type === 'multiSelect' && !qn.options.find((q) => q.isChecked)) {
      setErrorMsg('Please select atleast one option');
      return false;
    } else if (
      qn.type === 'singleSelect' &&
      !qn.options.find((q) => q.isChecked)
    ) {
      setErrorMsg('Please select an option');
      return false;
    } else if (qn.type === 'shortAnswer' && qn.candAnswer.length === 0) {
      setErrorMsg('Please answer the question');
      return false;
    }
    return true;
  };

  if (!qn) return <></>;

  let candRespComp;
  if (qn.type === 'singleSelect' || qn.type === 'multiSelect') {
    candRespComp = (
      <>
        <Stack>
          {qn.options.map((op) => {
            return (
              <Stack
                key={op.id}
                direction={'row'}
                gap={qn.type === 'multiSelect' && 1.5}
                alignItems={'center'}
                my={qn.type === 'multiSelect' && 0.5}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (qn.type === 'multiSelect') {
                    updateState({
                      path: `${path}.options`,
                      value: qn.options.map((op2) => {
                        if (op2.id === op.id) op2.isChecked = !op2.isChecked;
                        return { ...op2 };
                      }),
                    });
                    setErrorMsg('');
                  }

                  if (qn.type === 'singleSelect') {
                    updateState({
                      path: `${path}.options`,
                      value: qn.options.map((op2) => {
                        if (op2.id === op.id) op2.isChecked = true;
                        else op2.isChecked = false;
                        return { ...op2 };
                      }),
                    });
                    setErrorMsg('');
                  }
                }}
              >
                {qn.type === 'multiSelect' && (
                  <Checkbox isChecked={op.isChecked} />
                )}
                {qn.type === 'singleSelect' && (
                  <Radio size='small' checked={op.isChecked} color='default' />
                )}
                <UITypography>{op.option}</UITypography>
              </Stack>
            );
          })}
        </Stack>
      </>
    );
  } else if (qn.type === 'shortAnswer') {
    candRespComp = (
      <>
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={10}
          placeholder='Type Your Answer'
          sx={{ width: '100%', borderBottom: 1, mb: 2 }}
          variant='standard'
          value={qn.candAnswer}
          onChange={(e) => {
            updateState({
              path: `${path}.candAnswer`,
              value: e.target.value,
            });
            setErrorMsg('');
          }}
        />
      </>
    );
  }

  return (
    <PhoneScreeningQ
      slotButton={
        <>
          {state.currentQn > 1 && (
            <ButtonOutlined
              textButton='Pre'
              size={3}
              iconName='arrow_back_ios'
              isLeftIcon
              iconSize={2}
              onClickButton={{
                onClick: () => {
                  updateState({
                    path: 'currentQn',
                    value: qnNo - 1,
                  });
                },
              }}
            />
          )}
          {state.phoneScreen.length !== qnNo && (
            <ButtonSolid
              textButton='Next'
              size={3}
              iconName={'arrow_forward_ios'}
              isRightIcon
              iconSize={2}
              onClickButton={{
                onClick: () => {
                  if (!isResponseValid()) return;
                  updateState({
                    path: 'currentQn',
                    value: qnNo + 1,
                  });
                },
              }}
            />
          )}
          {state.phoneScreen.length === qnNo && (
            <ButtonSolid
              textButton='Submit'
              size={3}
              onClickButton={{
                onClick: handleSubmit,
              }}
            />
          )}
        </>
      }
      isDescriptionVisible={qn.showDescription}
      textDescription={qn.description || ''}
      currentQuestionNo={qnNo}
      isQuestionImp={qn.isRequired}
      slotLogo={<CompanyLogo />}
      textQuestion={
        <>
          {qn.question}
          <span style={{ color: 'var(--error-11)' }}> *</span>
        </>
      }
      totalQuestionNo={state.phoneScreen.length}
      isOkDisable={errorMsg.length > 0}
      isSubmitDisable={errorMsg.length > 0 || isSubmitting}
      onClickSubmit={{
        onClick: handleSubmit,
      }}
      slotInputAndButton={
        <>
          {candRespComp}

          {errorMsg && (
            <Stack mt={2}>
              {
                <UITypography color={'var(--error-11)'}>
                  {errorMsg}
                </UITypography>
              }
            </Stack>
          )}
        </>
      }
    />
  );
};

export default PhoneScreeningQn;
