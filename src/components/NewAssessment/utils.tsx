import { AssessmentQuestion } from '@/src/queries/assessment/questions';
import { type Database } from '@/src/types/schema';

type Type = Database['public']['Tables']['assessment_question']['Row']['type'];

export const getSafeQuestionType = (type: Type) => {
  switch (type) {
    case 'code':
      return 'Code';
    case 'mcq':
      return 'Multiple Choice';
    case 'tfq':
      return 'Single Choice';
    case 'match':
      return 'Matching';
    case 'qna':
      return 'Short Answer';
  }
};

export const getQuestionDefaults = (
  type: Type,
  label: AssessmentQuestion['question']['label'] = '',
  description: AssessmentQuestion['description'] = { show: false, value: '' },
  required: AssessmentQuestion['required'] = true,
  duration: AssessmentQuestion['duration'] = 2,
): Partial<AssessmentQuestion> => {
  switch (type) {
    // case 'code':
    //   return {};
    case 'mcq':
      return {
        answer: { options: [true, false] },
        description,
        question: { label: label, options: ['', ''] },
        required: required,
        duration: duration,
        type: 'mcq',
      };
    // case 'tfq':
    //   return {};
    // case 'match':
    //   return {};
    case 'qna':
      return {
        answer: { expected_answer: '' },
        description,
        question: { label: label },
        required: required,
        duration: duration,
        type: 'qna',
      };
  }
};
