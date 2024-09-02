import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { AssessmentSubmitPop } from '@/devlink2/AssessmentSubmitPop';
import { CandidateQuestion } from '@/devlink2/CandidateQuestion';
import { CandidateQuestionLayout } from '@/devlink2/CandidateQuestionLayout';
import { handleAssessmentResultApi } from '@/src/apiUtils/assessment-result/utils';
import Loader from '@/src/components/Common/Loader';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UITextField from '@/src/components/Common/UITextField';
import { useCandidateAssessment } from '@/src/context/CandidateAssessment';
import { type responseType } from '@/src/context/CandidateAssessment/types';

import Progress from '../Progress';
import Timer from '../Timer';

let selectedMcq = [];

function ClassicMode() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const {
    fetching,
    selectedAssessment,
    assessmentQuestions,
    selectedQuestion,
    setSelectedQuestion,
  } = useCandidateAssessment();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mcqAnswers, setMcqAnswers] = useState([]);

  const [answers, setAnswers] = useState<responseType[]>([]);
  const [inputText, setInputText] = useState('');
  const [timerTime, setTimerTime] = useState(null);
  const [resultUpdated, setResultUpdated] = useState(false);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  function nextClick() {
    setInputText('');
    const userAnswer = inputRef.current?.value;

    if (currentQuestionIndex !== assessmentQuestions.length - 1) {
      setCurrentQuestionIndex((pre) => pre + 1);
      setSelectedQuestion(
        assessmentQuestions[Number(currentQuestionIndex + 1)],
      );
      setTimerTime({
        duration:
          assessmentQuestions[Number(currentQuestionIndex + 1)].duration,
        question_id: assessmentQuestions[Number(currentQuestionIndex + 1)].id,
      });
      if (inputRef.current) inputRef.current.value = '';
    }

    if (currentQuestionIndex !== assessmentQuestions.length) {
      let tempSelectedQuestion =
        assessmentQuestions[Number(currentQuestionIndex)];
      setAnswers((pre: any) => {
        if (
          pre[Number(currentQuestionIndex)]?.question_id ===
          tempSelectedQuestion.id
        ) {
          tempSelectedQuestion.type === 'mcq'
            ? pre[Number(currentQuestionIndex)]?.response.options === mcqAnswers
            : pre[Number(currentQuestionIndex)]?.response.label === userAnswer;

          return [...pre];
        } else {
          submitAnswer(
            tempSelectedQuestion.type === 'mcq'
              ? { options: mcqAnswers }
              : { label: userAnswer },
          );

          return [
            ...pre,
            {
              question_id: tempSelectedQuestion.id,
              response:
                tempSelectedQuestion.type === 'mcq'
                  ? { options: mcqAnswers }
                  : { label: userAnswer },
              type: tempSelectedQuestion.type,
            },
          ];
        }
      });
    }
  }
  function submitAnswer(ans: any) {
    axios.post('/api/candidate-assessment/assessment-result-update', {
      assessment_id: selectedAssessment.id,
      objData: {
        responses: [
          ...answers,
          {
            response: ans,
            question_id: selectedQuestion.id,
            type: selectedQuestion.type,
          },
        ] as responseType[],
      },
    });
  }
  function clickPrev() {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex((pre) => pre - 1);
      setSelectedQuestion(
        assessmentQuestions[Number(currentQuestionIndex - 1)],
      );
    }
  }

  async function submitAssessment() {
    setResultUpdated(true);
    const { data: originalAnswers } = await axios.post(
      '/api/candidate-assessment/assessment-answers',
      {
        assessment_id: router.query?.assessment_id,
      },
    );
    const { data: results } = await axios.post(
      '/api/candidate-assessment/assessment-result-details',
      {
        assessment_id: router.query?.assessment_id,
        application_id: router.query?.application_id,
      },
    );

    const responses = assessmentQuestions.map((item, i) => {
      return {
        question_id: item.id,
        type: item.type,
        question: item.question,
        answer: originalAnswers[Number(i)].answer,
        response: answers[Number(i)].response,
      };
    });

    axios.post('/api/candidate-assessment/assessment-result-update', {
      assessment_id: selectedAssessment.id,
      objData: {
        responses: responses,
        is_submitted: true,
      },
    });

    try {
      await handleAssessmentResultApi('result', {
        result_id: results.id,
      });
    } catch (error) {
      return error;
    }
    setOpenConfirmation(false);
    router.push('/assessment-thanks');
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value =
        answers[Number(currentQuestionIndex)]?.response.label || '';
      setInputText(answers[Number(currentQuestionIndex)]?.response.label || '');
    }
    setMcqAnswers(
      answers[Number(currentQuestionIndex)]?.response.options || [],
    );
    selectedMcq = answers[Number(currentQuestionIndex)]?.response.options || [];
  }, [currentQuestionIndex]);

  async function getResponse() {
    const { application_id, assessment_id } = router.query;
    setTimerTime({
      duration: assessmentQuestions[0]?.duration,
      question_id: assessmentQuestions[0]?.id,
    });
    if (application_id && assessment_id) {
      const { data: results } = await axios.post(
        '/api/candidate-assessment/assessment-result-details',
        {
          assessment_id: assessment_id,
          application_id: application_id,
        },
      );

      if (results.responses && assessmentQuestions) {
        const resultLastIndex =
          results.responses.length > 0 ? results.responses.length - 1 : 0;
        setTimerTime({
          duration: assessmentQuestions[Number(resultLastIndex)]?.duration,
          question_id: assessmentQuestions[Number(resultLastIndex)]?.id,
        });
        setCurrentQuestionIndex(resultLastIndex);
        setSelectedQuestion(assessmentQuestions[Number(resultLastIndex)]);
        if (inputRef.current) {
          inputRef.current.value =
            results.responses[Number(resultLastIndex)]?.response.label || '';
        }
        setAnswers(results.responses);
        // setAnswers(results.responses.map((item) => item.answer));
        setMcqAnswers(results.responses[Number(0)]?.response.options || []);
        selectedMcq = results.responses[Number(0)]?.response.options || [];
      }
    }
  }

  useEffect(() => {
    getResponse();
  }, [router, assessmentQuestions]);

  if (fetching) {
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Loader />
      </Stack>
    );
  }
  if (assessmentQuestions && assessmentQuestions.length) {
    return (
      <div>
        <MuiPopup
          props={{
            open: openConfirmation,
          }}
        >
          <AssessmentSubmitPop
            isLoading={resultUpdated}
            onClickSubmit={{
              onClick: submitAssessment,
            }}
            onClickCancel={{
              onClick: () => {
                setOpenConfirmation(false);
              },
            }}
          />
        </MuiPopup>
        <CandidateQuestionLayout
          isNextDisable={
            inputText.length === 0 &&
            mcqAnswers.length === 0 &&
            currentQuestionIndex !== assessmentQuestions?.length - 1
          }
          onClickNext={{
            onClick: nextClick,
          }}
          onClickPrevious={{
            onClick: clickPrev,
          }}
          onClickSubmit={{
            onClick: () => {
              nextClick();
              setOpenConfirmation(true);
            },
          }}
          isNextButtonVisible={
            currentQuestionIndex !== assessmentQuestions?.length - 1
          }
          isSubmitButtonVisible={
            currentQuestionIndex === assessmentQuestions?.length - 1
          }
          textTitle={selectedAssessment?.title}
          textTotalQuestion={`Question ${currentQuestionIndex + 1} of ${
            assessmentQuestions?.length < 10 ? '0' : ''
          }${assessmentQuestions?.length}`}
          slotTime={<Timer nextClick={nextClick} maxTime={timerTime} />}
          isTimeVisible={answers.length !== assessmentQuestions.length}
          slotQuestionProgress={
            <Progress
              currentProgress={currentQuestionIndex + 1}
              assessmentQuestions={assessmentQuestions}
            />
          }
          slotCandidateQuestion={
            <CandidateQuestion
              textQuestion={selectedQuestion?.question.label as string}
              textQuestionCount={`Question ${currentQuestionIndex + 1} of ${
                assessmentQuestions?.length < 10 ? '0' : ''
              }${assessmentQuestions?.length}`}
              textRightTitle={
                selectedQuestion?.type === 'qna'
                  ? 'Provide a short answer.'
                  : selectedQuestion?.type === 'mcq'
                    ? 'Select one or more answer.'
                    : ''
              }
              // isTextRightTitleVisible={false}
              slotRightInput={
                <>
                  {selectedQuestion?.type === 'mcq' && (
                    <FormControl>
                      <FormGroup>
                        {selectedQuestion?.question?.options.map(
                          (item: string, i: number) => {
                            return (
                              <FormControlLabel
                                disabled={selectedMcq.length > 0}
                                key={i}
                                control={
                                  <Checkbox
                                    onChange={(value) => {
                                      if (value.target.checked) {
                                        setMcqAnswers((pre) => [...pre, i]);
                                      } else {
                                        setMcqAnswers((pre) => {
                                          const tempData = pre.filter(
                                            (item) => item !== i,
                                          );
                                          return tempData;
                                        });
                                      }
                                    }}
                                    checked={mcqAnswers.includes(i)}
                                  />
                                }
                                label={item}
                              />
                            );
                          },
                        )}
                      </FormGroup>
                    </FormControl>
                  )}
                  {selectedQuestion?.type === 'qna' && (
                    <UITextField
                      InputProps={{
                        autoFocus: true,
                      }}
                      disabled={
                        answers[Number(currentQuestionIndex)]?.response?.label
                          ?.length > 0
                      }
                      multiline
                      ref={inputRef}
                      onChange={(e) => {
                        setInputText(e.target.value);
                      }}
                    />
                  )}
                </>
              }
            />
          }
        />
      </div>
    );
  } else {
    return (
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        height={'100vh'}
      >
        Questions not found.
      </Stack>
    );
  }
}

export default ClassicMode;
