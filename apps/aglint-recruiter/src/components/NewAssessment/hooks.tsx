import { useDrop } from 'react-dnd';

import { useAssessmentQuestionCreate } from '@/src/queries/assessment/questions';
import { type RecommendationQuestion } from '@/src/queries/assessment/types';


export const useRecommendationCardDrop = () => {
  const {
    mutation: { mutate },
  } = useAssessmentQuestionCreate();

  const handleAddQuestion = (question: RecommendationQuestion) => {
    mutate(question);
  };
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'recommedation-card',
    drop: ({ question }: { question: RecommendationQuestion }) =>
      handleAddQuestion(question),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return { isOver, canDrop, dropRef };
};
