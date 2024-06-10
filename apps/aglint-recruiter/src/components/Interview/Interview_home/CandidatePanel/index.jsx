import { Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { InterviewCandidateScreen } from '@/devlink/InterviewCandidateScreen';
import { useInterviewContext } from '@/src/context/InterviewContext';

import { ActiveVoice } from '../../Components/ActiveVoice';
import CameraHolder from '../../Components/CameraHolder';
function VideoCandidatePanel() {
  const {
    getSecond,
    getminutes,
    transcript,
    submitVideoAnswers,
    submitAnswers,
    videoAssessment,
    senderRef,
    handleListing,
    listening,
    speaking,
    stopListening,
    showStartCard,
    setShowStartCard,
    startInterview,
    setCharacter
  } = useInterviewContext();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (transcript && senderRef.current) {
      senderRef.current.value = transcript;
    }
    const stackElement = senderRef.current;
    if (stackElement) stackElement.scrollTop = stackElement.scrollHeight;
  }, [transcript]);
  return (
    <>
      <InterviewCandidateScreen
        isInputVisible={showStartCard}
        isInterviewStartVisible={!showStartCard}
        onClickStart={{
          onClick: () => {
            setCharacter('');
            setShowStartCard(true);
            startInterview();
          }
        }}
        textTimer={`${getminutes < 10 && '0'}
              ${getminutes} : ${getSecond < 10 ? '0' : ''} ${getSecond}`}
        isTimerVisible={false}
        slotCameraVideo={<CameraHolder />}
        onClickEdit={{
          onClick: () => {
            setEdit(true);
            setTimeout(() => {
              senderRef.current.focus();
            }, 200);
            stopListening();
          },
          id: 'edit-pencil'
        }}
        onClickEditDone={{
          onClick: () => {
            setEdit(false);
          }
        }}
        slotText={
          <>
            <Stack height={'100%'} direction={'row'}>
              <Stack
                onClick={() => {
                  if (!speaking) {
                    setEdit(true);
                    setTimeout(() => {
                      senderRef.current.focus();
                    }, 200);
                    stopListening();
                    document.getElementById('edit-pencil').click();
                  }
                }}
                padding={'34px'}
                direction={'row'}
                display={edit ? 'none' : 'block'}
                width={'100%'}
              >
                <Typography
                  fontSize={'22px'}
                  lineHeight={'24px'}
                  color={
                    speaking || (listening && !senderRef?.current?.value)
                      ? 'rgba(255, 255, 255, 0.29)'
                      : 'rgba(255, 255, 255, 1)'
                  }
                  overflow={'auto'}
                  height={'100px'}
                >
                  {speaking
                    ? 'Listening to the question'
                    : listening && !senderRef?.current?.value
                      ? `Start speaking or click 'edit' to type your answer`
                      : senderRef?.current?.value}
                </Typography>
              </Stack>
              <Stack
                display={edit ? 'block' : 'none'}
                width={'100%'}
                // bgcolor:  'var(--neutral-1)',

                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                  '& .MuiFormControl-root': {
                    margin: '0px'
                  },
                  '& .MuiInputBase-root': {
                    height: '100%',
                    padding: { xs: '0px', sm: '34px' },
                    background: 'white.700 !important'
                  }
                  // p: { xs: '12px 20px', md: '0px' },
                }}
                position={'relative'}
              >
                <TextField
                  // onPaste={(e) => {
                  //   if (
                  //     employeeDtails[0]?.email !== 'chandankumarr3248@gmail.com'
                  //   )
                  //     e.preventDefault(); // Prevent the default paste behavior
                  // }}
                  fullWidth
                  id='candidate_answer_textarea'
                  sx={{
                    '& textarea': {
                      color: 'white.700',
                      fontSize: '22px',
                      fontWeight: 400,
                      lineHeight: '24px',
                      height: '100% !important',
                      overflow: 'auto !important',
                      background: 'rgba(255, 255, 255, 0.11)',
                      borderRadius: '20px !important',
                      padding: '15px'
                    }
                  }}
                  // className={`${classes.textField} ${classes.textFieldSmall} ${classes.textFieldExtraSmall}`}
                  inputRef={senderRef}
                  multiline
                  rows={3}
                  type='text'
                />
              </Stack>
            </Stack>
          </>
        }
        textDisplay={true}
        slotMicSpeakingLottie={<ActiveVoice />}
        onClickMicStop={{
          onClick: () => {
            handleListing();
          }
        }}
        onClickMic={{
          onClick: () => {
            handleListing();
          }
        }}
        isAllButtonDisable={speaking}
        isMicSubmitButtonDisable={edit}
        isSpeakingVisible={listening}
        isMicVisible={!listening}
        onClickSubmit={{
          onClick: () => {
            if (videoAssessment) submitVideoAnswers();
            else submitAnswers();
          }
        }}
      />
    </>
  );
}

export default VideoCandidatePanel;
