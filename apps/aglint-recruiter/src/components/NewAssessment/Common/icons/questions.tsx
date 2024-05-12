import { type FC } from 'react';

import { type AssessmentQuestion } from '@/src/queries/assessment/types';

import { MultipleChoice, ShortAnswer } from '../svg/question';

const QuestionIcon: FC<{ type: AssessmentQuestion['type'] }> = ({ type }) => {
  switch (type) {
    case 'mcq':
      return <MultipleChoice />;
    case 'qna':
      return <ShortAnswer />;
    default:
      return <ShortAnswer />;
  }
};

export default QuestionIcon;
