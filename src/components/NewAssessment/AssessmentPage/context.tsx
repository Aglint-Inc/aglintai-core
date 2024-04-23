import { type FC, type ReactNode, createContext, useContext } from 'react';

import { useAllAssessments } from '@/src/queries/assessment';
import { useAssessmentId } from '@/src/queries/assessment/keys';
import { useAssessmentQuestions } from '@/src/queries/assessment/questions';
import { useAssessmentRecommendedQuestions } from '@/src/queries/assessment/recommendations';

const AssessmentPageContext =
  createContext<ReturnType<typeof useAssessmentActions>>(undefined);

export const useAssessment = () => {
  return useContext(AssessmentPageContext);
};

export const AssessmentPageContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useAssessmentActions();
  return (
    <AssessmentPageContext.Provider value={value}>
      {children}
    </AssessmentPageContext.Provider>
  );
};

const useAssessmentActions = () => {
  const { assessment_id } = useAssessmentId();
  const assessments = useAllAssessments();
  const assessment =
    assessments?.data?.find(({ id }) => id === assessment_id) ?? undefined;
  const questions = useAssessmentQuestions();
  const recommendations = useAssessmentRecommendedQuestions(assessment);
  const value = {
    assessment_id,
    assessment,
    questions,
    recommendations,
  };
  return value;
};
