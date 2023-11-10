/* eslint-disable jsx-a11y/media-has-caption */
import Stack from '@mui/material/Stack';
import React from 'react';

import { Question } from './Questions';
import { QuestionType, useJobForm } from '../../JobPostFormProvider';

function AIgeninstructionVideo() {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const videoInfo = jobForm.formFields.interviewSetting.aiGeneratedVideoInfo;

  return (
    <>
      <Stack width={'100%'}>
        <Question
          handleDeleteQn={() => {
            handleUpdateFormFields({
              path: 'interviewSetting.aiGeneratedVideoInfo',
              value: {
                ...videoInfo,
                videoUrl: '',
                videoId: '',
                question: '',
                videoQn: '',
              } as QuestionType,
            });
          }}
          question={videoInfo}
          path={`interviewSetting.aiGeneratedVideoInfo`}
          componentType='welcome'
        />
      </Stack>
    </>
  );
}

export default AIgeninstructionVideo;
