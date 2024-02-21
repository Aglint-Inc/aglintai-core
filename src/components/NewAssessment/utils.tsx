import { AssessmentQuestion } from '@/src/queries/assessment/questions';
import { type Database } from '@/src/types/schema';

type Type = Database['public']['Tables']['assessment_question']['Row']['type'];

export const getSafeQuestionType = (type: Type) => {
  switch (type) {
    case 'code':
      return 'Code';
    case 'mcq':
      return 'Multiple Choice';
    case 'scq':
      return 'Single Choice';
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
    case 'mcq':
      return {
        answer: { options: [0] },
        description,
        question: { label: label, options: ['', ''] },
        required: required,
        duration: duration,
        type: 'mcq',
      };
    case 'qna':
      return {
        answer: { label: '' },
        description,
        question: { label: label },
        required: required,
        duration: duration,
        type: 'qna',
      };
  }
};
