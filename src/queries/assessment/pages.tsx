/* eslint-disable security/detect-object-injection */
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { supabase } from '@/src/utils/supabaseClient';

import { useAssessmentDashboard } from './dashboard';
import { Assessment, AssessmentQuestion } from './types';

const usePageQueryKey = () => {
  const router = useRouter();
  const assessment_id = (router?.query?.id ?? null) as string;
  return {
    assessment_id,
    pageQueryKey: ['assessmentPage', { assessment_id }],
  };
};

const useRecommendationsQueryKey = () => {
  return {
    recommendationQueryKey: ['recommendations'],
  };
};

const readAssessmentQuestionsDbAction = async (
  assessment_id: Assessment['id'],
) => {
  const { data, error } = await supabase
    .from('assessment_question')
    .select()
    .eq('assessment_id', assessment_id)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as unknown as AssessmentQuestion[];
};

export const useAssessment = () => {
  const { data } = useAssessmentDashboard();
  const { assessment_id, pageQueryKey } = usePageQueryKey();
  const assessment =
    data &&
    data.length !== 0 &&
    assessment_id &&
    data.find((assessment) => assessment.id === assessment_id);
  const response = useQuery({
    queryKey: pageQueryKey,
    queryFn: () => readAssessmentQuestionsDbAction(assessment_id),
  });
  return { assessment, assessment_id, ...response };
};

const readRecommendedQuestionsDbAction = async () => {
  const { data, error } = await supabase
    .from('question_bank')
    .select('id, created_at, question, answer, type, level, duration')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data as unknown as AssessmentQuestion[];
};

export const useRecommendedQuestion = () => {
  const { recommendationQueryKey } = useRecommendationsQueryKey();
  const response = useQuery({
    queryKey: recommendationQueryKey,
    queryFn: () => readRecommendedQuestionsDbAction(),
  });
  return { ...response };
};
