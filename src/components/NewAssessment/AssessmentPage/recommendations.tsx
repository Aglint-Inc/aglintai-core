import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import type React from 'react';
import { useDrag } from 'react-dnd';

import { RecommendedCardLoader, RecommendedQuestionCard } from '@/devlink2';
import { useAssessmentQuestionCreate } from '@/src/queries/assessment/questions';
import { type RecommendationQuestion } from '@/src/queries/assessment/recommendations';

import { useAssessment } from './context';
import { getSafeQuestionType } from '../utils';

const AssessmentRecommendations = () => {
  const {
    recommendations: { status, data },
  } = useAssessment();
  if (status === 'pending') return <AssessmentRecommendationLoading />;
  if (status === 'error') return <></>;
  const cards = data.map((question, i) => (
    <RecommendationCard key={i} question={question} />
  ));
  return <>{cards}</>;
};

export default AssessmentRecommendations;

const AssessmentRecommendationLoading = () => {
  const cards = [...Array(8)].map((a, i) => <RecommendedCardLoader key={i} />);
  return <>{cards}</>;
};

const RecommendationCard: React.FC<{
  question: RecommendationQuestion;
}> = ({ question }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'recommedation-card',
    item: { question },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const {
    mutation: { mutate },
  } = useAssessmentQuestionCreate();

  const handleAddQuestion = () => {
    mutate(question);
  };

  return (
    <Stack ref={dragRef}>
      <RecommendedQuestionCard
        textQuestion={question.question.label}
        textQuestionType={capitalize(getSafeQuestionType(question.type))}
        onClickAddQuestion={{ onClick: () => handleAddQuestion() }}
        textDuration={`${question.duration} minutes`}
        isDragged={isDragging}
      />
    </Stack>
  );
};
