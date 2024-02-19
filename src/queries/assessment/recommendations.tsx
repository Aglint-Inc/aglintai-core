import { useQuery } from '@tanstack/react-query';

import { type Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabase/client';

import { assessmentQueryKeys, useAssessmentId } from './keys';
import { CustomQuestionType } from './questions';

const TABLE = 'question_bank' as const;
type QuestionBankTable = Database['public']['Tables'][typeof TABLE];
type QuestionBankDb = Omit<QuestionBankTable['Row'], 'embeddings'>;
export type RecommendationQuestion = QuestionBankDb & CustomQuestionType;

export const useAssessmentRecommendedQuestions = () => {
  const { assessment_id } = useAssessmentId();
  const { queryKey } = assessmentQueryKeys.recommendations({ assessment_id });
  const response = useQuery({
    queryKey,
    queryFn: () => readAssessmentRecommendedQuestionsDbAction(),
  });
  return { ...response };
};

const readAssessmentRecommendedQuestionsDbAction = async () => {
  const { data, error } = await supabase
    .from(TABLE)
    .select(
      'id, created_at, question, answer, type, level, duration, description, required',
    )
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data as unknown as RecommendationQuestion[];
};
