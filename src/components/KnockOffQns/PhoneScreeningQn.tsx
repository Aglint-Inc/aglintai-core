import { Radio, Stack, TextField } from '@mui/material';
import { get } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';

import { Checkbox, PhoneScreeningQ } from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';

import CompanyLogo from './CompanyLogo';
import { PhoneScreeningResponseType, useScreeningCtx } from './ScreeningCtx';
import AUIButton from '../Common/AUIButton';
import UITypography from '../Common/UITypography';

const PhoneScreeningQn = ({ path, qnNo }) => {
  const { state, updateState } = useScreeningCtx();
  const [errorMsg, setErrorMsg] = useState('');
  const qn: PhoneScreeningResponseType = get(state, path);

  const handleSubmit = () => {
    try {
      updateState({
        path: 'showEndMessage',
        value: true,
      });
    } catch (err) {
      //
    } finally {
      //
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
    } else if (
      qn.type === 'shortAnswer' &&
      qn.candAnswer.split(' ').length < 10
    ) {
      setErrorMsg('Please enter atlease 10 words');
      return false;
    }
    return true;
  };

  if (!qn) return <></>;

  let candRespComp;
  if (qn.type === 'singleSelect' || qn.type === 'multiSelect') {
    candRespComp = (
      <>
        <Stack my={5}>
          {qn.options.map((op) => {
            return (
              <Stack
                key={op.id}
                direction={'row'}
                gap={qn.type === 'multiSelect' && 1.5}
                my={qn.type === 'multiSelect' && 1.5}
                alignItems={'center'}
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
          placeholder='Type Your Answer'
          sx={{ width: '100%', borderBottom: 1, mb: 2 }}
          variant='standard'
          value={qn.candAnswer}
          onChange={(e) => {
            updateState({
              path: `${path}.candAnswer`,
              value: e.target.value,
            });
          }}
        />
      </>
    );
  }

  return (
    <PhoneScreeningQ
      onClickBack={{
        onClick: () => {
          if (qnNo === 1) {
            updateState({
              path: 'showStartMessage',
              value: true,
            });
            return;
          }
          updateState({
            path: 'currentQn',
            value: qnNo - 1,
          });
        },
      }}
      currentQuestionNo={qnNo}
      isQuestionImp={qn.isRequired}
      slotLogo={<CompanyLogo />}
      textQuestion={qn.question}
      totalQuestionNo={state.phoneScreen.length}
      slotInputAndButton={
        <>
          {candRespComp}
          {state.phoneScreen.length === qnNo ? (
            <AUIButton
              variant='success'
              disabled={errorMsg.length > 0}
              endIcon={
                <Image
                  alt=''
                  src={'/images/svg/tick.svg'}
                  width={15}
                  height={15}
                />
              }
              onClick={handleSubmit}
            >
              Submit
            </AUIButton>
          ) : (
            <AUIButton
              endIcon={
                <Image
                  src={'/images/svg/arrowRight.svg'}
                  height={10}
                  width={10}
                  alt=''
                />
              }
              disabled={errorMsg.length > 0}
              onClick={() => {
                if (!isResponseValid()) return;
                updateState({
                  path: 'currentQn',
                  value: qnNo + 1,
                });
              }}
            >
              Ok
            </AUIButton>
          )}
          {errorMsg && (
            <Stack mt={2}>
              {<UITypography color={palette.red[400]}>{errorMsg}</UITypography>}
            </Stack>
          )}
        </>
      }
    />
  );
};

export default PhoneScreeningQn;
