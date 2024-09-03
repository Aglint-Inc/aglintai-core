/* eslint-disable security/detect-object-injection */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAssessment } from '@/src/components/NewAssessment/AssessmentPage/context';
import useAssessmentStore from '@/src/components/NewAssessment/Stores';
import { getQuestionDefaults } from '@/src/components/NewAssessment/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { assessmentQueryKeys, generateUUID, useAssessmentId } from './keys';
import {
  type Assessment,
  type AssessmentQuestion,
  type AssessmentQuestionInsert,
  type AssessmentQuestionUpdate,
  type RecommendationQuestion,
} from './types';

const TABLE = 'assessment_question' as const;

export const useAssessmentQuestions = () => {
  const { recruiter_id } = useAuthDetails();
  const { assessment_id } = useAssessmentId();
  const { queryKey } = assessmentQueryKeys.questions({ assessment_id });
  const response = useQuery({
    queryKey,
    queryFn: () => readAssessmentQuestionsDbAction(assessment_id),
    enabled: !!recruiter_id,
  });
  return { ...response };
};

export const useAssessmentQuestionCreate = () => {
  const { assessment } = useAssessment();
  const assessment_id = assessment?.id ?? null;
  const mode = assessment?.mode ?? null;
  const setCurrentQuestion = useAssessmentStore(
    (state) => state.setCurrentQuestion,
  );
  const queryClient = useQueryClient();
  const question_id = generateUUID();
  const { queryKey } = assessmentQueryKeys.questions({
    assessment_id,
  });
  const { queryKey: recQueryKey } = assessmentQueryKeys.recommendations({
    assessment_id,
    mode,
  });
  const mutation = useMutation({
    mutationFn: (recommededQuestion: RecommendationQuestion) =>
      createAssessmentQuestionDbAction({
        ...recommededQuestion,
        id: question_id,
        parent_question_id: recommededQuestion.id,
        assessment_id,
      }),
    onMutate: async (recommededQuestion) => {
      await queryClient.cancelQueries({ queryKey });
      const previousRecommendations =
        queryClient.getQueryData<RecommendationQuestion[]>(recQueryKey);
      const newRecommendations = previousRecommendations.filter(
        (question) => question.id !== recommededQuestion.id,
      );
      queryClient.setQueryData<RecommendationQuestion[]>(
        recQueryKey,
        newRecommendations,
      );
      const previousQuestions =
        queryClient.getQueryData<AssessmentQuestion[]>(queryKey);
      // eslint-disable-next-line no-unused-vars
      const { id, created_at, ...rest } = recommededQuestion;
      const newQuestions = [
        ...previousQuestions,
        {
          ...rest,
          id: question_id,
          parent_question_id: id,
        } as AssessmentQuestion,
      ];
      queryClient.setQueryData<AssessmentQuestion[]>(queryKey, newQuestions);
      setTimeout(() => setCurrentQuestion(previousQuestions.length), 0);
      return {
        previousRecommendations,
        previousQuestions,
        newRecommendations,
        newQuestions,
      };
    },
    onError: (err, variables, context) => {
      toast.error('Unable to add question');
      queryClient.setQueryData<AssessmentQuestion[]>(
        queryKey,
        context.previousQuestions,
      );
      queryClient.setQueryData<RecommendationQuestion[]>(
        recQueryKey,
        context.previousRecommendations,
      );
    },
    onSuccess: (question, _, context) => {
      const updatedQuestions = context.newQuestions.reduce((acc, curr) => {
        if (curr.id === question.id) acc.push(question);
        else acc.push(curr);
        return acc;
      }, [] as AssessmentQuestion[]);
      queryClient.setQueryData<AssessmentQuestion[]>(
        queryKey,
        updatedQuestions,
      );
    },
  });
  return { mutation };
};

export const useAssessmentQuestionDelete = () => {
  const { assessment_id } = useAssessmentId();
  const resetCurrentQuestion = useAssessmentStore(
    (state) => state.resetCurrentQuestion,
  );
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.questions({ assessment_id });
  const mutation = useMutation({
    mutationFn: (question_id: string) =>
      deleteAssessmentQuestionsDbAction(question_id),
    onMutate: async (question_id) => {
      await queryClient.cancelQueries({ queryKey });
      const previousQuestions =
        queryClient.getQueryData<AssessmentQuestion[]>(queryKey);
      queryClient.setQueryData<AssessmentQuestion[]>(queryKey, (prev) => {
        const newQuestions = prev.filter(
          (question) => question.id !== question_id,
        );
        return newQuestions;
      });
      resetCurrentQuestion();
      return { previousQuestions };
    },
    onError: (err, variables, context) => {
      toast.warning('Unable to delete question');
      queryClient.setQueryData<AssessmentQuestion[]>(
        queryKey,
        context.previousQuestions,
      );
    },
  });
  return { mutation };
};

export const useAssessmentQuestionUpdate = () => {
  const { assessment_id } = useAssessmentId();
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.questions({ assessment_id });
  const handleUpdateQuestion = (
    currentQuestionIndex: number,
    newQuestion: AssessmentQuestion,
  ) => {
    queryClient.setQueryData<AssessmentQuestion[]>(queryKey, (prev) => {
      const newQuestions = prev.reduce((acc, curr, i) => {
        if (currentQuestionIndex === i) acc.push({ ...newQuestion });
        else acc.push(curr);
        return acc;
      }, [] as AssessmentQuestion[]);
      return newQuestions;
    });
  };
  const mutation = useMutation({
    mutationFn: ({
      question_id,
      question,
    }: {
      question_id: AssessmentQuestion['id'];
      question: AssessmentQuestion;
    }) => updateAssessmentQuestionsDbAction(question_id, question),
  });
  return { handleUpdateQuestion, mutation };
};

export const useAssessmentAllQuestionUpdate = () => {
  const { assessment_id } = useAssessmentId();
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.questions({ assessment_id });
  const getUpdatedQuestions = (
    oldQuestions: AssessmentQuestion[],
  ): AssessmentQuestion[] => {
    return oldQuestions.reduce((acc, curr) => {
      if (curr.type !== 'qna') {
        const defaults = getQuestionDefaults(
          'qna',
          curr.question.label,
          curr.description,
          curr.required,
        );
        const newQuestion: AssessmentQuestion = {
          ...curr,
          ...(defaults as any),
        };
        acc.push(newQuestion);
      } else acc.push(curr);
      return acc as AssessmentQuestion[];
    }, [] as AssessmentQuestion[]);
  };
  const mutation = useMutation({
    mutationFn: () => {
      const oldQuestions =
        queryClient.getQueryData<AssessmentQuestion[]>(queryKey);
      const newQuestions = getUpdatedQuestions(oldQuestions);
      return upsertAssessmentQuestionsDbAction(newQuestions);
    },
    onMutate: () => {
      const oldQuestions =
        queryClient.getQueryData<AssessmentQuestion[]>(queryKey);
      const newQuestions = getUpdatedQuestions(oldQuestions);
      queryClient.setQueryData<AssessmentQuestion[]>(queryKey, newQuestions);
      return { oldQuestions };
    },
    onError: (err, variables, context) => {
      toast.warning('Unable to update questions');
      queryClient.setQueryData<AssessmentQuestion[]>(
        queryKey,
        context.oldQuestions,
      );
    },
  });
  return { mutation };
};

const createAssessmentQuestionDbAction = async (
  assessment: AssessmentQuestionInsert,
) => {
  // eslint-disable-next-line no-unused-vars
  const { created_at, ...rest } = assessment;
  const { data, error } = await supabase.from(TABLE).insert(rest).select();
  if (error) throw new Error(error.message);
  return data[0] as unknown as AssessmentQuestion;
};

const readAssessmentQuestionsDbAction = async (
  assessment_id: Assessment['id'],
) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .eq('assessment_id', assessment_id)
    .order('created_at');
  if (error) throw new Error(error.message);
  return data as unknown as AssessmentQuestion[];
};

const updateAssessmentQuestionsDbAction = async (
  question_id: AssessmentQuestion['id'],
  question: AssessmentQuestionUpdate,
) => {
  // eslint-disable-next-line no-unused-vars
  const { created_at, ...rest } = question;
  const { data, error } = await supabase
    .from(TABLE)
    .update(rest)
    .eq('id', question_id)
    .select();
  if (error) throw new Error(error.message);
  return data[0] as unknown as AssessmentQuestion;
};

const upsertAssessmentQuestionsDbAction = async (
  questions: AssessmentQuestion[],
) => {
  const { data, error } = await supabase.from(TABLE).upsert(questions).select();
  if (error) throw new Error(error.message);
  return data as unknown as AssessmentQuestion;
};

const deleteAssessmentQuestionsDbAction = async (
  question_id: AssessmentQuestion['id'],
) => {
  const { error } = await supabase.from(TABLE).delete().eq('id', question_id);
  if (error) throw new Error(error.message);
  return;
};
