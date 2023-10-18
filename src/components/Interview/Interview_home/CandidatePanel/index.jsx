import { Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { InterviewCandidateScreen } from '@/devlink';
import { useInterviewContext } from '@/src/context/InterviewContext';

import { ActiveVoice } from '../../Components/ActiveVoice';
import CameraHolder from '../../Components/CameraHolder';
function CandidatePanel() {
  const {
    getSecond,
    getminutes,
    transcript,
    submitAnswers,
    senderRef,
    handleListing,
    listening,
  } = useInterviewContext();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (transcript) {
      senderRef.current.value = transcript;
    }
    const stackElement = senderRef.current;
    stackElement.scrollTop = stackElement.scrollHeight;
    // const TypoElement = typoRef.current;
    // console.log(TypoElement.scrollHeight, stackElement.scrollHeight);
    // TypoElement.scrollTop = TypoElement.scrollHeight;
  }, [transcript]);
  return (
    <>
      <InterviewCandidateScreen
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
          },
        }}
        onClickEditDone={{
          onClick: () => {
            setEdit(false);
          },
        }}
        slotText={
          <>
            <Stack height={'100%'} direction={'row'}>
              <Stack width={'100%'} display={edit ? 'none' : 'block'}>
                <Typography
                  fontSize={'22px'}
                  padding={'34px'}
                  color={
                    listening && !senderRef?.current?.value
                      ? 'rgba(255, 255, 255, 0.29)'
                      : 'rgba(255, 255, 255, 1)'
                  }
                >
                  {listening && !senderRef?.current?.value
                    ? 'Start Speaking now'
                    : senderRef?.current?.value}
                </Typography>
              </Stack>
              <Stack
                display={edit ? 'block' : 'none'}
                width={'100%'}
                // bgcolor={'grey.100'}

                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                  '& .MuiFormControl-root': {
                    margin: '0px',
                  },
                  '& .MuiInputBase-root': {
                    height: '100%',
                    padding: { xs: '0px', sm: '34px' },
                    background: 'white.700 !important',
                  },
                  p: { xs: '12px 20px', md: '0px' },
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
                  variant='standard'
                  id='candidate_answer_textarea'
                  sx={{
                    '& textarea': {
                      color: 'white.700',
                      fontSize: '22px',
                      fontWeight: 600,
                      height: '100% !important',
                      overflow: 'auto !important',
                    },
                  }}
                  // className={`${classes.textField} ${classes.textFieldSmall} ${classes.textFieldExtraSmall}`}
                  inputRef={senderRef}
                  multiline
                  // rows={windowSize.innerWidth < 991 ? 6 : 9.7}
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
          },
        }}
        onClickMic={{
          onClick: () => {
            handleListing();
          },
        }}
        isSpeakingVisible={listening}
        isMicVisible={!listening}
        onClickSubmit={{
          onClick: () => {
            submitAnswers();
          },
        }}
      />
    </>
  );
}

export default CandidatePanel;
