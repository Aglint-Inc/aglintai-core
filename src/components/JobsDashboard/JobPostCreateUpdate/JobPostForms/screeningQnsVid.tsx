import axios from 'axios';
import { htmlToText } from 'html-to-text';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import {
  AddScreeningQuestion,
  AssessmentQuestions,
  ScreeningQuestion,
  ScreeningQuestionCard,
  ScreeningQuestionLoader,
} from '@/devlink';
import ScreeningVideoGenerating from '@/src/components/Common/Lotties/ScreeningVideoGenerating';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { generateInterviewQns } from '@/src/utils/prompts/addNewJob/generateInterviewQns';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import ToggleBtn from './utils/UIToggle';
import {
  InterviewConfigType,
  QuestionType,
  useJobForm,
} from '../JobPostFormProvider';
import { supabaseWrap } from '../utils';

const ScreeningQns = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  return (
    <>
      <ScreeningQuestion
        textQuestionCount={totalQns}
        slotAssessmentQuestion={
          <>
            <Categories />
          </>
        }
        slotToggleAssessment={
          <ToggleBtn
            handleChange={(newVal) => {
              handleUpdateFormFields({
                path: 'videoAssessment',
                value: newVal,
              });
            }}
            isChecked={jobForm.formFields.videoAssessment}
          />
        }
      />
    </>
  );
};

export default ScreeningQns;

const Categories = () => {
  const { jobForm } = useJobForm();

  return (
    <>
      {jobForm.formFields.interviewConfig.map((categ, categIdx) => {
        return (
          <>
            <Category categ={categ} key={categ.id} categIdx={categIdx} />
          </>
        );
      })}
    </>
  );
};

const Category = ({
  categ,
  categIdx,
}: {
  categIdx: number;
  categ: InterviewConfigType;
}) => {
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [newQn, setNewQn] = useState('');
  const handleGenerateInterviewQns = async () => {
    try {
      setAiGenerating(true);
      const qns = await generateInterviewQns(
        categ.questions.map((p) => p.question),
        htmlToText(get(jobForm, 'formFields.jobDescription', '')),
        categ.copy,
        categ.category == 'skill' ? jobForm.formFields.skills : undefined,
      );

      const categIdx = jobForm.formFields.interviewConfig.findIndex(
        (c) => c.category === categ.category,
      );

      const newQns: InterviewConfigType['questions'] = qns.map((q) => ({
        id: nanoid(),
        question: q,
        videoId: '',
        videoQn: '',
      }));
      handleUpdateFormFields({
        path: `interviewConfig[${categIdx}.questions`,
        value: [...categ.questions, ...newQns],
      });
    } catch (err) {
      //
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAddnewQn = () => {
    if (!newQn) return;

    handleUpdateFormFields({
      path: `interviewConfig[${categIdx}].questions`,
      value: [
        ...categ.questions,
        {
          id: nanoid(),
          question: newQn,
          video_id: '',
          videoQn: '',
        },
      ],
    });
    setShowAddForm(false);
    setNewQn('');
  };

  return (
    <>
      <AssessmentQuestions
        textQuestionHeader={categ.copy}
        textQuestionCount={`(${categ.questions.length} Questions)`}
        slotQuestionVideo={
          <>
            <Questions
              questions={categ.questions}
              categ={categ.category}
              categIdx={categIdx}
            />
            {aiGenerating && (
              <>
                <ScreeningQuestionLoader />
                <ScreeningQuestionLoader />
                <ScreeningQuestionLoader />
              </>
            )}
            {showAddForm && (
              <AddScreeningQuestion
                slotInput={
                  <UITextField
                    multiline
                    fullWidth
                    value={newQn}
                    onChange={(e) => {
                      setNewQn(e.target.value);
                    }}
                  />
                }
                onClickCancel={{
                  onClick: () => {
                    setShowAddForm(false);
                  },
                }}
                onClickAdd={{
                  onClick: handleAddnewQn,
                }}
              />
            )}
          </>
        }
        onClickAddAi={{
          onClick: handleGenerateInterviewQns,
        }}
        onClickAddManually={{
          onClick: () => {
            setShowAddForm(true);
          },
        }}
      />
    </>
  );
};

const Questions = ({
  questions,
  categIdx,
}: {
  categIdx: number;
  categ: string;
  questions: InterviewConfigType['questions'];
}) => {
  const { handleUpdateFormFields } = useJobForm();
  const handleDeleteQn = (qnId) => {
    const updatedQns = questions.filter((q) => q.id !== qnId);
    handleUpdateFormFields({
      path: `interviewConfig[${categIdx}].questions`,
      value: updatedQns,
    });
  };

  return (
    <>
      {questions.map((q, index) => {
        return (
          <>
            {
              <Question
                question={q}
                key={q.id}
                path={`interviewConfig[${categIdx}].questions[${index}]`}
                handleDeleteQn={handleDeleteQn}
              />
            }
          </>
        );
      })}
    </>
  );
};

const Question = ({
  question,
  path,
  handleDeleteQn,
}: {
  question: QuestionType;
  path: string;
  // eslint-disable-next-line no-unused-vars
  handleDeleteQn: (qnId: any) => void;
}) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [showEdit, setShowEdit] = useState(false);
  const [editQn, setEditQn] = useState(question.question);
  const [playing, setPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const [d] = supabaseWrap(
          await supabase
            .from('ai_videos')
            .select()
            .eq('video_id', question.videoId),
        );
        if (d) {
          setVideoUrl(d.file_url);
        }
      } catch (err) {
        toast.error('Something went wrong. Please try again');
      }
    })();
  }, []);

  const handleSave = () => {
    if (!editQn) return;
    handleUpdateFormFields({
      path: `${path}.question`,
      value: editQn,
    });
    setShowEdit(false);
  };

  const handleGenerateVideo = async () => {
    try {
      let videoInfo;
      if (process.env.NODE_ENV === 'development') {
        videoInfo = { video_id: 'def5da2177c44b089ccf6fa597cc3c4d' };
      } else {
        let {
          data: { data },
        } = await axios.post('/api/generateVideo', {
          text: question.question,
        });
        videoInfo = data;
      }

      handleUpdateFormFields({
        path: `${path}`,
        value: {
          ...question,
          videoId: videoInfo.video_id,
          videoQn: question.question,
        },
      });
    } catch (err) {
      toast.error('Something went wrong please try again');
    }
  };

  const handleRegenerate = () => {
    setVideoUrl('');
    handleUpdateFormFields({
      path: `${path}.videoId`,
      value: '',
    });
    handleGenerateVideo();
  };

  const handleVideoPlay = () => {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  };

  return (
    <>
      <ScreeningQuestionCard
        slotInput={
          <>
            {showEdit ? (
              <UITextField
                multiline
                fullWidth
                defaultValue={question.question}
                value={editQn}
                onChange={(e) => {
                  setEditQn(e.target.value);
                }}
              />
            ) : (
              <UITypography type='small'>{question.question}</UITypography>
            )}
          </>
        }
        isEditButtonVisible={!showEdit}
        isGenerateButtonVisible={false}
        isSaveButtonVisible={showEdit}
        onClickEdit={{
          onClick: () => {
            setShowEdit(true);
          },
        }}
        onClickDelete={{
          onClick: () => {
            handleDeleteQn(question.id);
          },
        }}
        onClickCancel={{
          onClick: () => {
            setShowEdit(false);
          },
        }}
        onClickSave={{
          onClick: handleSave,
        }}
        // slotEmptyVideo={}
        onClickGenerateVideo={{
          onClick: () => {
            handleGenerateVideo();
          },
        }}
        onClickPlay={{
          onClick: handleVideoPlay,
        }}
        onClickPause={{
          onClick: handleVideoPlay,
        }}
        slotGeneratingLottie={<ScreeningVideoGenerating />}
        slotVideo={
          videoUrl ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={videoUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              ref={videoRef}
              onEnded={() => {
                setPlaying(false);
              }}
            />
          ) : (
            <Image
              src={'/images/EmptyVideo.png'}
              width={250}
              height={145}
              alt=''
              style={{
                objectFit: 'cover',
              }}
            />
          )
        }
        isVideoVisible={jobForm.formFields.videoAssessment}
        isPlayButtonVisible={!playing}
        isPauseButtonVisible={playing}
        isPlayPauseButtonVisible={videoUrl.length !== 0}
        isGenerateVisible={!question.videoId}
        isGeneratingLoaderVisible={question.videoId && !videoUrl}
        isErrorVisible={
          question.videoQn && question.question !== question.videoQn
        }
        onClickRetry={{
          onClick: () => {
            handleRegenerate();
          },
        }}
        textButtonError={'Regenerate'}
        textError={`Changed question click 'Regenrate'`}
      />
    </>
  );
};
