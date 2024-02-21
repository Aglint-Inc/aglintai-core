import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { type AssessmentQuestion } from '@/src/queries/assessment/types';

import AssessmentQuestionIcon from '../icons/questions';
import { getSafeQuestionType } from '../../utils';

const QuestionTags: React.FC<{ type: AssessmentQuestion['type'] }> = ({
  type,
}) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <AssessmentQuestionIcon type={type} />
      <Stack fontWeight={600} fontSize={'12px'}>
        {capitalize(getSafeQuestionType(type))}
      </Stack>
    </Stack>
  );
};

export default QuestionTags;
